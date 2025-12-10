import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';

// PayPal payment link - replace with your actual PayPal.me link
const PAYPAL_LINK = 'https://www.paypal.me/holyweirdtech';

const Cart = () => {
    const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

    const handleCheckout = () => {
        if (items.length === 0) return;

        // Build order summary for PayPal note
        const orderSummary = items.map(item => `${item.name} x${item.quantity}`).join(', ');

        // Redirect to PayPal with amount
        const paypalUrl = `${PAYPAL_LINK}/${totalPrice.toFixed(2)}GBP`;

        // Store order in localStorage for reference
        localStorage.setItem('pendingOrder', JSON.stringify({
            items,
            total: totalPrice,
            date: new Date().toISOString()
        }));

        window.open(paypalUrl, '_blank');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
            </Link>

            <h1 className="text-4xl font-bold mb-8">Your Cart</h1>

            {items.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                    <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                    <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                    <p className="text-gray-400 mb-6">Add some weird items to get started.</p>
                    <Link to="/shop">
                        <Button size="lg">Browse Products</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item, index) => (
                            <div
                                key={`${item.id}-${index}`}
                                className="flex gap-6 bg-white/5 rounded-xl p-6 border border-white/10"
                            >
                                <div className="w-24 h-24 rounded-lg overflow-hidden bg-black shrink-0">
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold mb-1">{item.name}</h3>
                                    <p className="text-gray-400 text-sm mb-4">{item.description}</p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))}
                                                className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(index, item.quantity + 1)}
                                                className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <span className="text-xl font-mono">£{(item.price * item.quantity).toFixed(2)}</span>
                                            <button
                                                onClick={() => removeItem(index)}
                                                className="text-gray-400 hover:text-red-400 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={clearCart}
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            Clear Cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/5 rounded-2xl border border-white/10 p-6 sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span>£{totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Shipping</span>
                                    <span>Calculated separately</span>
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-4 mb-6">
                                <div className="flex justify-between text-xl font-bold">
                                    <span>Total</span>
                                    <span>£{totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <Button
                                size="lg"
                                className="w-full bg-[#0070ba] hover:bg-[#003087] text-white"
                                onClick={handleCheckout}
                            >
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.765.765 0 0 1 .757-.629h6.557c2.627 0 4.574.567 5.6 1.676.453.489.766 1.017.945 1.59.185.592.243 1.29.174 2.12-.066.793-.226 1.494-.478 2.1a5.972 5.972 0 0 1-.918 1.583 4.76 4.76 0 0 1-1.391 1.111c-.538.306-1.152.532-1.828.676-.696.15-1.466.225-2.287.225H9.697a.765.765 0 0 0-.757.63l-.793 5.018-.234 1.487a.329.329 0 0 1-.325.276H7.076z" />
                                </svg>
                                Pay with PayPal
                            </Button>

                            <p className="text-xs text-gray-500 text-center mt-4">
                                You'll be redirected to PayPal to complete your purchase
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;

