import { firestore } from '../app/firebase';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  addDoc,
  getDocs,
  runTransaction
} from 'firebase/firestore';

// Add item or update its quantity
export const addItem = async ({ name, quantity, category }) => {
  try {
    const inventoryRef = collection(firestore, 'inventory');
    const q = query(inventoryRef, where("name", "==", name));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Item doesn't exist, add new item
      await addDoc(inventoryRef, { name, quantity, category });
    } else {
      // Item exists, update quantity
      const docRef = doc(firestore, 'inventory', querySnapshot.docs[0].id);
      await runTransaction(firestore, async (transaction) => {
        const docSnap = await transaction.get(docRef);
        if (!docSnap.exists()) {
          throw new Error('Document does not exist!');
        }
        const currentQuantity = docSnap.data().quantity || 0;
        transaction.update(docRef, { quantity: currentQuantity + quantity, category });
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Error adding/updating item:', error);
    return { success: false, error: error.message };
  }
}

// Update item details
export const updateItem = async (oldName, newItem) => {
  try {
    const inventoryRef = collection(firestore, 'inventory');
    const oldDocRef = doc(inventoryRef, oldName.toLowerCase());
    const newDocRef = doc(inventoryRef, newItem.name.toLowerCase());

    if (oldName.toLowerCase() !== newItem.name.toLowerCase()) {
      // If the name has changed, use a transaction to handle deletion and addition
      await runTransaction(firestore, async (transaction) => {
        const oldDocSnap = await transaction.get(oldDocRef);
        if (!oldDocSnap.exists()) {
          throw new Error('Old document does not exist!');
        }
        transaction.delete(oldDocRef);
        transaction.set(newDocRef, { name: newItem.name, quantity: newItem.quantity, category: newItem.category });
      });
    } else {
      // If only the quantity or category has changed, update the existing document
      await updateDoc(oldDocRef, { quantity: newItem.quantity, category: newItem.category });
    }
  } catch (error) {
    console.error('Error updating item:', error);
  }
}

// Remove item or decrease quantity
export const removeItem = async (item) => {
  try {
    const docRef = doc(collection(firestore, 'inventory'), item.toLowerCase());
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity > 1) {
        await updateDoc(docRef, { quantity: quantity - 1 });
      } else {
        await deleteDoc(docRef);
      }
    } else {
      console.error('Item not found:', item);
    }
  } catch (error) {
    console.error('Error removing item:', error);
  }
}
