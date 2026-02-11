import React, { useState } from 'react';
import { Grid, List } from 'lucide-react';
import FileItem from './FileItem';

const Gallery = ({ files, onPreview, onDelete }) => {
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    if (files.length === 0) {
        return (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                No files uploaded yet. Add some PDFs or images to get started!
            </div>
        );
    }

    return (
        <div>
            <div className="header" style={{ marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: 'none' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>My Gallery</h2>
                <div className="glass-panel" style={{ padding: '0.25rem', display: 'flex', gap: '0.25rem', borderRadius: '8px' }}>
                    <button
                        onClick={() => setViewMode('grid')}
                        style={{
                            background: viewMode === 'grid' ? 'rgba(255,255,255,0.1)' : 'transparent',
                            border: 'none',
                            padding: '0.5rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            color: viewMode === 'grid' ? 'var(--color-primary)' : 'var(--text-secondary)'
                        }}
                    >
                        <Grid size={20} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        style={{
                            background: viewMode === 'list' ? 'rgba(255,255,255,0.1)' : 'transparent',
                            border: 'none',
                            padding: '0.5rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            color: viewMode === 'list' ? 'var(--color-primary)' : 'var(--text-secondary)'
                        }}
                    >
                        <List size={20} />
                    </button>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(200px, 1fr))' : '1fr',
                gap: '1.5rem'
            }}>
                {files.map((file) => (
                    <FileItem
                        key={file.id}
                        file={file}
                        onPreview={onPreview}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default Gallery;
