import React, { useMemo } from 'react';
import { FileText, Image as ImageIcon, Trash2, Eye } from 'lucide-react';

const FileItem = ({ file, onPreview, onDelete }) => {
    const isImage = file.type.startsWith('image/');

    const formattedDate = useMemo(() => {
        return new Date(file.timestamp).toLocaleDateString();
    }, [file.timestamp]);

    const formattedSize = useMemo(() => {
        return (file.size / 1024).toFixed(1) + ' KB';
    }, [file.size]);

    const objectUrl = useMemo(() => {
        if (isImage) {
            if (file.data instanceof Blob) {
                return URL.createObjectURL(file.data);
            } else if (typeof file.data === 'string') {
                return file.data;
            }
        }
        return null;
    }, [file.data, isImage]);

    return (
        <div className="glass-panel file-item" style={{
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            position: 'relative',
            height: '100%'
        }}>
            <div
                onClick={() => onPreview(file)}
                style={{
                    flex: 1,
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '150px',
                    cursor: 'pointer'
                }}
            >
                {isImage ? (
                    <img
                        src={objectUrl}
                        alt={file.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <FileText size={48} color="var(--color-secondary)" />
                )}
            </div>

            <div style={{ marginTop: '0.5rem' }}>
                <h4 style={{
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {file.name}
                </h4>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.5rem',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    marginTop: '0.75rem',
                    background: 'rgba(0,0,0,0.2)',
                    padding: '0.5rem',
                    borderRadius: '6px'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.7 }}>Date</span>
                        <span style={{ color: 'var(--text-primary)' }}>{formattedDate}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.7 }}>Type</span>
                        <span style={{ color: 'var(--text-primary)' }}>{file.type.split('/')[1].toUpperCase()}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.7 }}>Size</span>
                        <span style={{ color: 'var(--text-primary)' }}>{formattedSize}</span>
                    </div>
                </div>
            </div>

            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginTop: '0.5rem'
            }}>
                <button
                    className="btn-primary"
                    onClick={() => onPreview(file)}
                    style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                >
                    <Eye size={14} /> Preview
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(file.id); }}
                    style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#ef4444',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderRadius: '8px',
                        padding: '0.5rem',
                        cursor: 'pointer'
                    }}
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    );
};

export default FileItem;
