import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../app/firebase';

export function useInventory() {
  const [inventory, setInventory] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch inventory data and categories
  const updateInventory = useCallback(async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(firestore, 'inventory'));
      const inventoryData = {};
      const categoriesSet = new Set();
      snapshot.forEach(doc => {
        const data = doc.data();
        inventoryData[doc.id] = data;
        categoriesSet.add(data.category);
      });
      setInventory(inventoryData);
      setCategories(Array.from(categoriesSet).sort());
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    updateInventory();
  }, [updateInventory]);

  // Open or reset the dialog
  const handleOpen = (itemId = null) => {
    if (itemId) {
      const item = inventory[itemId];
      setEditingItem(itemId);
      setItemName(item.name);
      setItemQuantity(item.quantity.toString());
      setItemCategory(item.category);
    } else {
      setEditingItem(null);
      setItemName('');
      setItemQuantity('');
      setItemCategory('');
    }
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
    setEditingItem(null);
    setItemName('');
    setItemQuantity('');
    setItemCategory('');
  };

  // Add or update item
  const handleAddOrUpdateItem = async () => {
    if (itemName.trim() && itemQuantity && itemCategory.trim()) {
      try {
        const itemId = editingItem || itemName.trim().toLowerCase();
        const newItem = {
          name: itemName.trim(),
          quantity: parseInt(itemQuantity, 10),
          category: itemCategory.trim(),
        };

        await setDoc(doc(firestore, 'inventory', itemId), newItem);
        
        setInventory(prevInventory => ({
          ...prevInventory,
          [itemId]: newItem,
        }));

        if (!categories.includes(newItem.category)) {
          setCategories(prevCategories => [...prevCategories, newItem.category].sort());
        }

        handleClose();
      } catch (error) {
        console.error("Error adding/updating item:", error);
      }
    } else {
      console.error("Invalid input: some fields are empty");
    }
  };

  // Remove item
  const handleRemoveItem = async (itemId) => {
    try {
      await deleteDoc(doc(firestore, 'inventory', itemId));

      setInventory(prevInventory => {
        const newInventory = { ...prevInventory };
        delete newInventory[itemId];
        return newInventory;
      });

      const remainingCategories = new Set(Object.values(inventory).map(item => item.category));
      setCategories(Array.from(remainingCategories).sort());
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Increase item quantity
  const handleIncreaseQuantity = async (itemId) => {
    try {
      const item = inventory[itemId];
      const updatedQuantity = item.quantity + 1;
      await setDoc(doc(firestore, 'inventory', itemId), { ...item, quantity: updatedQuantity });

      setInventory(prevInventory => ({
        ...prevInventory,
        [itemId]: { ...item, quantity: updatedQuantity },
      }));
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  // Decrease item quantity
  const handleDecreaseQuantity = async (itemId) => {
    try {
      const item = inventory[itemId];
      if (item) {
        const updatedQuantity = Math.max(0, item.quantity - 1);
        await setDoc(doc(firestore, 'inventory', itemId), { ...item, quantity: updatedQuantity });

        setInventory(prevInventory => ({
          ...prevInventory,
          [itemId]: { ...item, quantity: updatedQuantity },
        }));
      } else {
        console.error("Item not found:", itemId);
      }
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  return {
    inventory,
    loading,
    open,
    itemName,
    itemQuantity,
    itemCategory,
    editingItem,
    categories,
    handleOpen,
    handleClose,
    handleAddOrUpdateItem,
    handleRemoveItem,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    setItemName,
    setItemQuantity,
    setItemCategory,
    updateInventory,
  };
}
