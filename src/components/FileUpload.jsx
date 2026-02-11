import React, { useRef, useState } from 'react';
import { Upload, Cloud } from 'lucide-react';
import { saveFile } from '../utils/db';

const FileUpload = ({ onUpload }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const processFiles = async (files) => {
        // Convert FileList to Array
        const fileArray = Array.from(files);

        // Filter valid types
        const validFiles = fileArray.filter(file =>
            file.type.startsWith('image/') || file.type === 'application/pdf'
        );

        if (validFiles.length > 0) {
            // Pass raw files to parent. Parent decides if (API or IDB).
            onUpload(validFiles);
        }
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        setIsDragging(false);
        await processFiles(e.dataTransfer.files);
    };

    const handleFileSelect = async (e) => {
        await processFiles(e.target.files);
    };

    return (
        <div
            className={`glass-panel upload-zone ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
            style={{
                padding: '3rem',
                textAlign: 'center',
                borderStyle: 'dashed',
                borderWidth: '2px',
                borderColor: isDragging ? 'var(--color-primary)' : 'var(--glass-border)',
                cursor: 'pointer',
                marginBottom: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
            }}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                multiple
                accept="image/*,application/pdf"
                style={{ display: 'none' }}
            />
            <div style={{
                background: 'rgba(56, 189, 248, 0.1)',
                padding: '1rem',
                borderRadius: '50%',
                color: 'var(--color-primary)'
            }}>
                <Cloud size={48} />
            </div>
            <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                    Drag & Drop files here
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                    or click to browse (PDF, PNG, JPG)
                </p>
            </div>
        </div>
    );
};

export default FileUpload;
