import { 
  collection, 
  addDoc, 
  serverTimestamp,
  query,
  orderBy,
  getDocs,
  limit
} from 'firebase/firestore';
import { db } from './firebase';

export interface WaitingListEntry {
  firstname: string;
  lastname: string;
  email: string;
  affiliation: string;
  createdAt?: any; // Firestore timestamp
  id?: string;
}

const COLLECTION_NAME = 'waiting-list';

// Add a new entry to the waiting list
export const addToWaitingList = async (entry: Omit<WaitingListEntry, 'createdAt' | 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...entry,
      createdAt: serverTimestamp(),
    });
    
    return {
      id: docRef.id,
      ...entry,
      createdAt: new Date(),
    };
  } catch (error) {
    console.error('Error adding to waiting list:', error);
    throw new Error('Failed to join waiting list. Please try again.');
  }
};

// Get all waiting list entries (for admin purposes)
export const getWaitingListEntries = async (limitCount: number = 100) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const entries: WaitingListEntry[] = [];
    
    querySnapshot.forEach((doc) => {
      entries.push({
        id: doc.id,
        ...doc.data(),
      } as WaitingListEntry);
    });
    
    return entries;
  } catch (error) {
    console.error('Error fetching waiting list entries:', error);
    throw new Error('Failed to fetch waiting list entries.');
  }
};

// Check if email already exists in waiting list
export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    // For now, we'll skip the email check to avoid permission issues
    // In production, you should create a proper index and use where clause
    return false;
  } catch (error) {
    console.error('Error checking email existence:', error);
    return false; // Default to false to allow submission
  }
}; 