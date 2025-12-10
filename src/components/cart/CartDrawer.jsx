import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';

// PayPal payment link - replace with your actual PayPal.me link
const PAYPAL_LINK = 'https://www.paypal.me/holyweirdtech';

const CartDrawer = () => {
    const { items, isOpen, toggleCart, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

    const handleCheckout = () => {
        if (items.length === 0) return;

        // Redirect to PayPal with amount
        const paypalUrl = `${PAYPAL_LINK}/${totalPrice.toFixed(2)}GBP`;

        // Store order in localStorage for reference
        localStorage.setItem('pendingOrder', JSON.stringify({
            items,
            total: totalPrice,
            date: new Date().toISOString()
        }));

        window.open(paypalUrl, '_blank');
        toggleCart();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-obsidian border-l border-white/10 z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5" />
                                Your Cart
                            </h2>
                            <Button variant="ghost" size="icon" onClick={toggleCart}>
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {items.length === 0 ? (
                                <div className="text-center py-12 text-gray-400">
                                    <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                    <p>Your cart is empty</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item, index) => (
                                        <div
                                            key={`${item.id}-${index}`}
                                            className="flex gap-4 bg-white/5 rounded-lg p-4"
                                        >
                                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-black shrink-0">
                                                {item.image && (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium truncate">{item.name}</h3>
                                                <p className="text-sm text-gray-400">£{item.price}</p>

                                                {/* Quantity controls */}
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button
                                                        onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))}
                                                        className="w-6 h-6 rounded bg-white/10 flex items-center justify-center hover:bg-white/20"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(index, item.quantity + 1)}
                                                        className="w-6 h-6 rounded bg-white/10 flex items-center justify-center hover:bg-white/20"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeItem(index)}
                                                className="text-gray-400 hover:text-red-400 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-white/10 p-6 space-y-4">
                                <div className="flex justify-between text-lg">
                                    <span className="text-gray-400">Subtotal</span>
                                    <span className="font-bold">£{totalPrice.toFixed(2)}</span>
                                </div>
                                <Button
                                    size="lg"
                                    className="w-full bg-[#0070ba] hover:bg-[#003087] text-white"
                                    onClick={handleCheckout}
                                >
                                    Pay with PayPal
                                </Button>
                                <button
                                    onClick={clearCart}
                                    className="w-full text-sm text-gray-400 hover:text-white transition-colors"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;

