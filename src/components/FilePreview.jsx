import React, { useMemo, useState } from 'react';
import { X, Download, ExternalLink, FileText, Calendar, HardDrive, Edit2 } from 'lucide-react';
import ImageEditor from './ImageEditor';

const FilePreview = ({ file, onClose }) => {
    const [isEditing, setIsEditing] = useState(false);

    // Helper to get object URL from Base64 or Blob
    const objectUrl = useMemo(() => {
        if (!file) return null;
        if (file.data instanceof Blob) {
            return URL.createObjectURL(file.data);
        } else if (typeof file.data === 'string') {
            // Assume Base64 from API
            return file.data;
        }
        return null;
    }, [file]);

    if (!file) return null;

    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf';
    const formattedDate = useMemo(() => new Date(file.timestamp).toLocaleString(), [file.timestamp]);
    const formattedSize = useMemo(() => (file.size / 1024).toFixed(1) + ' KB', [file.size]);

    if (isEditing) {
        return (
            <div style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0, 0, 0, 0.8)', zIndex: 1100,
                padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <ImageEditor
                    file={file}
                    onSave={() => setIsEditing(false)}
                    onCancel={() => setIsEditing(false)}
                />
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--overlay-bg)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
        }} onClick={onClose}>
            <div
                className="glass-panel"
                style={{
                    width: '95%',
                    height: '90%',
                    maxWidth: '1400px',
                    background: 'var(--panel-bg)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    flexDirection: 'row',
                    overflow: 'hidden',
                    borderRadius: '24px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Left: Content Viewer (Image/PDF) */}
                <div style={{
                    flex: 3,
                    background: 'var(--content-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    padding: '2rem'
                }}>
                    {isImage && (
                        <img
                            src={objectUrl}
                            alt={file.name}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain'
                            }}
                        />
                    )}

                    {isPdf && (
                        <iframe
                            src={objectUrl}
                            title={file.name}
                            style={{ width: '100%', height: '100%', border: 'none', borderRadius: '12px' }}
                        />
                    )}

                    {!isImage && !isPdf && (
                        <div style={{ textAlign: 'center', color: 'var(--text-primary)' }}>
                            <p>Preview not available for this file type.</p>
                            <a href={objectUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                                Open in new tab <ExternalLink size={16} />
                            </a>
                        </div>
                    )}
                </div>

                {/* Right: Metadata Sidebar */}
                <div style={{
                    flex: 1,
                    minWidth: '300px',
                    borderLeft: '1px solid var(--glass-border)',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'var(--glass-bg)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                color: 'var(--text-primary)',
                                cursor: 'pointer',
                                padding: '8px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        marginBottom: '2rem',
                        lineHeight: 1.3,
                        overflowWrap: 'break-word',
                        color: 'var(--text-primary)'
                    }}>
                        {file.name}
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ background: 'rgba(168, 85, 247, 0.2)', padding: '10px', borderRadius: '12px', color: '#e879f9' }}>
                                <FileText size={20} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Type</div>
                                <div style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)' }}>{file.type}</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ background: 'rgba(56, 189, 248, 0.2)', padding: '10px', borderRadius: '12px', color: '#38bdf8' }}>
                                <HardDrive size={20} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Size</div>
                                <div style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)' }}>{formattedSize}</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ background: 'rgba(251, 146, 60, 0.2)', padding: '10px', borderRadius: '12px', color: '#fb923c' }}>
                                <Calendar size={20} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Uploaded</div>
                                <div style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)' }}>{formattedDate}</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
                        {isImage && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="btn-primary"
                                style={{
                                    flex: 1,
                                    padding: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    background: 'var(--glass-bg)',
                                    color: 'var(--color-primary)',
                                    border: '1px solid var(--color-primary)'
                                }}
                            >
                                <Edit2 size={18} /> Edit
                            </button>
                        )}
                        <a
                            href={objectUrl}
                            download={file.name}
                            className="btn-primary"
                            style={{
                                flex: 1,
                                padding: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                textDecoration: 'none',
                                textAlign: 'center'
                            }}
                        >
                            <Download size={18} /> Download
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilePreview;
