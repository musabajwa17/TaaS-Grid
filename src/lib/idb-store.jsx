import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'cv-insight-files';
const STORE_NAME = 'files';


let dbPromise = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'name' });
        }
      },
    });
  }
  return dbPromise;
}

export const fileStore = {
  async saveFiles(files) {
    const db = await getDB();
    
    // Read all files to ArrayBuffers BEFORE opening the transaction
    // This is critical because any non-IDB async operation (like file.arrayBuffer()) 
    // mid-transaction will cause the transaction to auto-commit/become inactive.
    const fileData = await Promise.all(
      files.map(async (file) => ({
        name: file.name,
        type: file.type,
        data: await file.arrayBuffer(),
        lastModified: file.lastModified,
      }))
    );

    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    
    for (const item of fileData) {
      await store.put(item);
    }
    
    return tx.done;
  },

  async getFile(name) {
    const db = await getDB();
    const stored = await db.get(STORE_NAME, name);
    if (!stored) return null;
    return new File([stored.data], stored.name, {
      type: stored.type,
      lastModified: stored.lastModified,
    });
  },

  async getAllFiles() {
    const db = await getDB();
    const all = await db.getAll(STORE_NAME);
    return all.map(stored => new File([stored.data], stored.name, {
      type: stored.type,
      lastModified: stored.lastModified,
    }));
  },

  async clear() {
    const db = await getDB();
    await db.clear(STORE_NAME);
  }
};
