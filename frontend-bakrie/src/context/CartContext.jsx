import { useState, useEffect, createContext } from "react"; // Hapus useContext
import { 
    fetchMyCart, 
    addToCart, 
    deleteItemFromCart, 
    updateItemQuantity 
} from "../services/cartService.js";

// GANTI INI: Pakai useAuth hook kamu
import { useAuth } from "../hooks/useAuth"; 
// Pastikan path import "../hooks/useAuth" sesuai dengan lokasi file hook kamu

export const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
  // GANTI INI: Jadi lebih singkat!
  const { user } = useAuth();

  // --- LOGIC BAWAHNYA TETAP SAMA ---
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [cartItems, setCartItems] = useState([])
  const [cartTotal, setCartTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const customerId = user?.customer_id || user?.id || user?.id_customer || user?.userId;

  // Debugging
  useEffect(() => {
    if (user) {
        console.group("🔍 DEBUG CART CONTEXT");
        console.log("User from useAuth:", user);
        console.log("Final Customer ID:", customerId);
        console.groupEnd();
    }
  }, [user, customerId]);

  // Update token jika user login/logout
  useEffect(() => {
     const storedToken = localStorage.getItem('token');
     setToken(storedToken);
  }, [user]);

  const updateLocalState = (data) => {
    setCartItems(data.item_carts || [])
    setCartTotal(data.totalPrice || 0)
  };

  const refreshCart = async () => {
    if (!token || !customerId) return;
    try {
      setLoading(true)
      const res = await fetchMyCart(customerId)
      updateLocalState(res.data)
    } catch (error) {
      console.log("Gagal load cart: ", error)
    } finally {
      setLoading(false)
    }
  };

  const addItemToCart = async (productId, quantity = 1) => {
    console.log("token" , token)
    if (!token || !customerId) {
      console.error("ADD CART GAGAL: Token atau Customer ID hilang.");
      throw new Error("User not logged in");
    } 
    console.log("Customer ID" , customerId)

    try {
      setLoading(true)
      const res = await addToCart(customerId, productId, quantity)
      updateLocalState(res.data)
      return true
    } catch (error) {
      console.log("Gagal menambahkan ke cart: ", error)
      throw error
    } finally {
      setLoading(false)
    }
  };

  const updateQty = async (itemCartId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const res = await updateItemQuantity(itemCartId, newQuantity);
      updateLocalState(res.data);
    } catch (error) {
      console.error("Error updating qty:", error);
      refreshCart(); 
    }
  };

  const removeFromCart = async (itemCartId) => {
    if(!window.confirm("Hapus item ini?")) return; 
    try {
      setLoading(true);
      await deleteItemFromCart(itemCartId);
      setCartItems(prev => prev.filter(item => item.itemCartId !== itemCartId)); 
      refreshCart(); 
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setLoading(false);
    }
  };

    // const clearCart = async () => {
    //     setCartItems([]);
    //     setCartTotal(0);
    //     // Opsional: panggil API untuk hapus semua item di backend (jika ada endpoint)
    //     // await axios.delete(`${URL_BASE}/clear/${customerId}`);
    // };

  useEffect(() => {
    if (token && customerId) {
      refreshCart();
    } else {
      setCartItems([]);
      setCartTotal(0);
    }
  }, [token, customerId]); 

  return (
    <CartContext.Provider value={{ 
      cartItems,
      cartTotal,
      loading,
      refreshCart,
      addItemToCart,
      updateQty,
      removeFromCart,
        // clearCart,
      token 
     }}>
      {children}
    </CartContext.Provider>
  )
}