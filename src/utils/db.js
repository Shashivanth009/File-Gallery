import { openDB } from 'idb';

const DB_NAME = 'file-gallery-db';
const STORE_NAME = 'files';

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

export const saveFile = async (file) => {
  const db = await initDB();
  const fileData = {
    id: crypto.randomUUID(),
    name: file.name,
    type: file.type,
    size: file.size,
    lastModified: file.lastModified,
    data: file, // Store the blob directly
    timestamp: Date.now(),
  };
  await db.put(STORE_NAME, fileData);
  return fileData;
};

export const getFiles = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const deleteFile = async (id) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};
