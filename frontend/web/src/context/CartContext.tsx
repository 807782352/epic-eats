import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction = 
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'INCREASE_QUANTITY'; payload: { id: number } }
  | { type: 'DECREASE_QUANTITY'; payload: { id: number } }
  | { type: 'CLEAR_CART' };

const initialState: CartState = JSON.parse(localStorage.getItem('cart') || '{}') || { items: [] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  // 确保 state.items 是一个数组
  const items = state.items || [];

  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = items.find(item => item.id === action.payload.id);
      if (existingItem) {
        const updatedItems = items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        localStorage.setItem('cart', JSON.stringify({ ...state, items: updatedItems }));
        return { ...state, items: updatedItems };
      }
      const newItem = { ...action.payload, quantity: 1 };
      const newItems = [...items, newItem];
      localStorage.setItem('cart', JSON.stringify({ ...state, items: newItems }));
      return { ...state, items: newItems };
    case 'REMOVE_ITEM':
      const filteredItems = items.filter(item => item.id !== action.payload.id);
      localStorage.setItem('cart', JSON.stringify({ ...state, items: filteredItems }));
      return { ...state, items: filteredItems };
    case 'INCREASE_QUANTITY':
      const increasedItems = items.map(item =>
        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem('cart', JSON.stringify({ ...state, items: increasedItems }));
      return { ...state, items: increasedItems };
    case 'DECREASE_QUANTITY':
      const decreasedItems = items.map(item =>
        item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
      ).filter(item => item.quantity > 0);
      localStorage.setItem('cart', JSON.stringify({ ...state, items: decreasedItems }));
      return { ...state, items: decreasedItems };
    case 'CLEAR_CART':
      localStorage.removeItem('cart');
      return { items: [] };
    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
