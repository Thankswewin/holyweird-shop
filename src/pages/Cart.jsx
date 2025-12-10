import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { checkoutAPI } from '@/lib/api';

const Cart = () => {
    const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

    const handleCheckout = async () => {
        if (items.length === 0) return;

        try {
            const checkoutItems = items.map(item => ({
                id: item.id,
                name: item.name,
                description: item.description,
                price_gbp: item.price * 100,
                quantity: item.quantity,
                image: item.image,
            }));

            const { url } = await checkoutAPI.createSession(checkoutItems);

            if (url) {
                window.location.href = url;
            } else {
                alert('Checkout is not configured yet. Please add Stripe credentials.');
            }
        } catch (error) {
            console.error('Checkout failed:', error);
            alert('Checkout failed. Please try again.');
        }
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
                                    <span>Calculated at checkout</span>
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
                                className="w-full bg-weird-orange hover:bg-weird-orange/80"
                                onClick={handleCheckout}
                            >
                                Proceed to Checkout
                            </Button>

                            <p className="text-xs text-gray-500 text-center mt-4">
                                Secure checkout powered by Stripe
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
