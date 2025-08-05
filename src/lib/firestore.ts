import { 
  collection, 
  addDoc, 
  serverTimestamp,
  query,
  orderBy,
  getDocs,
  limit,
  where
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
    // Normalize email to lowercase for consistent checking
    const normalizedEmail = email.trim().toLowerCase();
    console.log('Checking email existence for:', normalizedEmail);
    
    // Query for existing email
    const q = query(
      collection(db, COLLECTION_NAME),
      where('email', '==', normalizedEmail)
    );
    
    const querySnapshot = await getDocs(q);
    console.log('Email check result:', querySnapshot.empty ? 'Email not found' : 'Email already exists');
    
    // If any documents are found, the email exists
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking email existence:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: (error as any)?.code,
      details: error
    });
    
    // Check if it's a permission error
    if ((error as any)?.code === 'permission-denied' || 
        (error as any)?.message?.includes('permission') ||
        (error as any)?.message?.includes('insufficient permissions')) {
      console.warn('Permission denied for email existence check. This might be due to Firestore rules not being deployed yet.');
      // For now, allow submission but log the issue
      return false;
    }
    
    // For other errors, allow submission but log the error for debugging
    return false;
  }
}; 