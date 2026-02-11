import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoom, getRoom } from '../utils/api';
import { ArrowRight, Plus } from 'lucide-react';

const Home = () => {
    const [joinCode, setJoinCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCreateRoom = async () => {
        setLoading(true);
        try {
            const { code } = await createRoom();
            navigate(`/room/${code}`);
        } catch (err) {
            setError('Failed to create room. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleJoinRoom = async (e) => {
        e.preventDefault();
        if (!joinCode.trim()) return;

        setLoading(true);
        try {
            const room = await getRoom(joinCode.toUpperCase());
            if (room) {
                navigate(`/room/${room.code}`);
            } else {
                setError('Room not found. Check the code and try again.');
            }
        } catch (err) {
            setError('Error joining room.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
        }}>
            <div className="glass-panel" style={{ padding: '3rem', maxWidth: '500px', width: '100%' }}>
                <h1 className="title" style={{ marginBottom: '1rem' }}>File Gallery</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Share files instantly with a secure room code.
                </p>

                <button
                    className="btn-primary"
                    onClick={handleCreateRoom}
                    disabled={loading}
                    style={{ width: '100%', marginBottom: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                >
                    <Plus size={20} /> Create New Room
                </button>

                <div style={{ position: 'relative', marginBottom: '2rem' }}>
                    <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)' }} />
                    <span style={{
                        position: 'absolute',
                        top: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'var(--glass-bg)',
                        padding: '0 10px',
                        color: 'var(--text-secondary)',
                        fontSize: '0.8rem'
                    }}>OR</span>
                </div>

                <form onSubmit={handleJoinRoom} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Enter Room Code"
                        value={joinCode}
                        onChange={(e) => {
                            setJoinCode(e.target.value.toUpperCase());
                            setError('');
                        }}
                        style={{
                            padding: '1rem',
                            borderRadius: '12px',
                            border: '1px solid var(--glass-border)',
                            background: 'var(--input-bg)',
                            color: 'var(--text-primary)',
                            fontSize: '1rem',
                            textAlign: 'center',
                            letterSpacing: '2px',
                            outline: 'none'
                        }}
                    />
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading || !joinCode}
                        style={{ background: 'transparent', border: '1px solid var(--color-primary)', color: 'var(--color-primary)' }}
                    >
                        Join Room <ArrowRight size={16} />
                    </button>
                </form>

                {error && (
                    <div style={{ marginTop: '1rem', color: '#ef4444', fontSize: '0.9rem' }}>
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
