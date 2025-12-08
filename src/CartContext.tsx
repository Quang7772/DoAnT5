import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { Product, CartItem } from "./data/product";

// ====================== INTERFACE =======================
interface CartContextType {
  cartItems: CartItem[];
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
}

// ====================== CONTEXT =======================
const CartContext = createContext<CartContextType | undefined>(undefined);

// ====================== PROVIDER =======================
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem("MY_APP_CART");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Lưu giỏ hàng vào localStorage
  useEffect(() => {
    localStorage.setItem("MY_APP_CART", JSON.stringify(cartItems));
  }, [cartItems]);

  // ====================== ADD TO CART =======================
  const addToCart = (product: Product) => {
    const fixedProduct = {
      ...product,
      id: Number(product.id), // Đảm bảo id là số
      price: Number(product.price), // Đảm bảo price là số
    };

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === fixedProduct.id);

      if (existing) {
        // Tăng số lượng nếu tồn tại
        return prev.map((item) =>
          item.product.id === fixedProduct.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Nếu chưa có → thêm sản phẩm mới
      return [...prev, { product: fixedProduct, quantity: 1 }];
    });
  };

  // ====================== REMOVE PRODUCT =======================
  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== id));
  };

  // ====================== INCREASE =======================
  const increaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // ====================== DECREASE =======================
  const decreaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ====================== CLEAR CART =======================
  const clearCart = () => setCartItems([]);

  // ====================== TOTAL PRICE =======================
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ====================== CUSTOM HOOK =======================
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
