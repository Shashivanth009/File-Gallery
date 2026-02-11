const API_BASE = '/api';

export const createRoom = async () => {
    const res = await fetch(`${API_BASE}/create-room`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to create room');
    return res.json();
};

export const getRoom = async (code) => {
    const res = await fetch(`${API_BASE}/room/${code}`);
    if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error('Failed to fetch room');
    }
    return res.json();
};

// Helper to convert file to Base64
const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export const uploadFile = async (code, file) => {
    const base64Data = await fileToBase64(file);

    const res = await fetch(`${API_BASE}/upload/${code}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: file.name,
            type: file.type,
            size: file.size,
            data: base64Data
        })
    });

    if (!res.ok) throw new Error('Failed to upload file');
    return res.json();
};
