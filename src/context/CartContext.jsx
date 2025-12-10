import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'holyweird_cart';

// Initial state
const initialState = {
    items: [],
    isOpen: false,
};

// Actions
const ACTIONS = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    CLEAR_CART: 'CLEAR_CART',
    TOGGLE_CART: 'TOGGLE_CART',
    SET_CART: 'SET_CART',
};

// Reducer
function cartReducer(state, action) {
    switch (action.type) {
        case ACTIONS.ADD_ITEM: {
            const existingIndex = state.items.findIndex(
                item => item.id === action.payload.id &&
                    JSON.stringify(item.customConfig) === JSON.stringify(action.payload.customConfig)
            );

            if (existingIndex > -1) {
                // Update quantity if item exists
                const newItems = [...state.items];
                newItems[existingIndex].quantity += action.payload.quantity || 1;
                return { ...state, items: newItems };
            }

            // Add new item
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
            };
        }

        case ACTIONS.REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter((_, index) => index !== action.payload),
            };

        case ACTIONS.UPDATE_QUANTITY:
            return {
                ...state,
                items: state.items.map((item, index) =>
                    index === action.payload.index
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };

        case ACTIONS.CLEAR_CART:
            return { ...state, items: [] };

        case ACTIONS.TOGGLE_CART:
            return { ...state, isOpen: !state.isOpen };

        case ACTIONS.SET_CART:
            return { ...state, items: action.payload };

        default:
            return state;
    }
}

// Provider
export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Load cart from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                dispatch({ type: ACTIONS.SET_CART, payload: parsed });
            } catch (e) {
                console.error('Failed to load cart:', e);
            }
        }
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    }, [state.items]);

    // Helper functions
    const addItem = (item) => dispatch({ type: ACTIONS.ADD_ITEM, payload: item });
    const removeItem = (index) => dispatch({ type: ACTIONS.REMOVE_ITEM, payload: index });
    const updateQuantity = (index, quantity) =>
        dispatch({ type: ACTIONS.UPDATE_QUANTITY, payload: { index, quantity } });
    const clearCart = () => dispatch({ type: ACTIONS.CLEAR_CART });
    const toggleCart = () => dispatch({ type: ACTIONS.TOGGLE_CART });

    // Computed values
    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const value = {
        items: state.items,
        isOpen: state.isOpen,
        itemCount,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

export default CartContext;
