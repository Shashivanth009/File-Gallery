import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoom, uploadFile } from '../utils/api';
import FileUpload from '../components/FileUpload';
import Gallery from '../components/Gallery';
import FilePreview from '../components/FilePreview';
import { Copy, Check, ArrowLeft } from 'lucide-react';

const Room = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [previewFile, setPreviewFile] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetchRoomData();
        // Poll for updates every 5 seconds (simple real-time sim)
        const interval = setInterval(fetchRoomData, 5000);
        return () => clearInterval(interval);
    }, [roomId]);

    const fetchRoomData = async () => {
        try {
            const room = await getRoom(roomId);
            if (room) {
                // Sort by newest
                setFiles(room.files.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
            } else {
                setError('Room not found');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (newFiles) => {
        // Optimistic UI update? No, let's wait for server for simplicity
        for (const file of newFiles) {
            // We know FileUpload passes { data, name, type... } but we need 'file' object roughly
            // Actually FileUpload passes File objects.
            // But wait, my FileUpload component calls saveFile(idb).
            // I need to refactor FileUpload to NOT use idb, or pass the raw file up.
            // Let's modify FileUpload to accept a prop `customUploadHandler`.
            // OR better, just handle the file object here.

            // Wait, the current FileUpload component does `saveFile` internally.
            // I need to change FileUpload to simpler logic.
        }
    };

    // Refactored Upload Handler to be passed to FileUpload
    const customUploadHandler = async (fileList) => {
        // fileList is array of File objects from the input/drop event
        const uploadedFiles = [];
        for (const file of fileList) {
            try {
                // Basic validation
                if (file.size > 5 * 1024 * 1024) {
                    alert(`File ${file.name} is too large (Max 5MB)`);
                    continue;
                }
                const uploaded = await uploadFile(roomId, file);
                uploadedFiles.push(uploaded);
            } catch (err) {
                console.error("Upload failed", err);
                alert(`Failed to upload ${file.name}`);
            }
        }
        if (uploadedFiles.length > 0) {
            fetchRoomData();
        }
    };

    const copyCode = () => {
        navigator.clipboard.writeText(roomId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading && files.length === 0) return <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>Loading Room...</div>;
    if (error) return (
        <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
            <h2 style={{ color: '#ef4444' }}>{error}</h2>
            <button className="btn-primary" onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>Go Home</button>
        </div>
    );

    return (
        <div className="container">
            <header className="header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={() => navigate('/')}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="title" style={{ fontSize: '1.8rem' }}>Room {roomId}</h1>
                </div>

                <button
                    className="glass-panel"
                    onClick={copyCode}
                    style={{
                        padding: '0.5rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer',
                        color: copied ? '#4ade80' : 'var(--text-primary)'
                    }}
                >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Share Code'}
                </button>
            </header>

            {/* We need to modify FileUpload to accept a direct "onFilesSelected" prop instead of doing IDB logic internally 
          OR we update FileUpload to detect if we are in API mode.
          Let's assume I will update FileUpload to be dumb.
      */}
            <FileUpload onUpload={customUploadHandler} isApiMode={true} />

            <Gallery
                files={files}
                onPreview={setPreviewFile}
                onDelete={() => alert("Deletion not supported in Hackathon mode")}
            />

            {previewFile && (
                <FilePreview
                    file={previewFile}
                    onClose={() => setPreviewFile(null)}
                />
            )}
        </div>
    );
};

export default Room;
