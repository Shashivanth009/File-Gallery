import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { family: 4 })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increased limit for base64 images

// Schemas
const fileSchema = new mongoose.Schema({
    name: String,
    type: String, // 'application/pdf', 'image/png', etc.
    size: Number,
    data: String, // Base64 string
    timestamp: { type: Date, default: Date.now },
});

const roomSchema = new mongoose.Schema({
    code: { type: String, unique: true, required: true },
    files: [fileSchema],
    createdAt: { type: Date, default: Date.now }
});

const Room = mongoose.model('Room', roomSchema);
// 1. Create a Room
app.post('/api/create-room', async (req, res) => {
    try {
        const code = uuidv4().slice(0, 6).toUpperCase(); // 6-char unique code
        const newRoom = new Room({ code, files: [] });
        await newRoom.save();
        res.json({ code });
    } catch (err) {
        console.error('Error creating room:', err);
        res.status(500).json({ error: err.message });
    }
});

// 2. Join/Get Room Files
app.get('/api/room/:code', async (req, res) => {
    try {
        const room = await Room.findOne({ code: req.params.code });
        if (!room) return res.status(404).json({ error: 'Room not found' });
        res.json(room);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Upload File to Room
app.post('/api/upload/:code', async (req, res) => {
    try {
        const { name, type, size, data } = req.body;
        const room = await Room.findOne({ code: req.params.code });
        if (!room) return res.status(404).json({ error: 'Room not found' });

        room.files.push({ name, type, size, data });
        await room.save();

        // Return the newly added file
        res.json(room.files[room.files.length - 1]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Vercel requires exporting the app
export default app;

// Only listen if not running in a serverless environment (optional check)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
