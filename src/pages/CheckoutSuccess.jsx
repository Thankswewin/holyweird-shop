import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { checkoutAPI } from '@/lib/api';
import { useCart } from '@/context/CartContext';

const CheckoutSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const { clearCart } = useCart();

    useEffect(() => {
        // Clear cart on successful checkout
        clearCart();

        async function fetchSession() {
            if (sessionId) {
                try {
                    const data = await checkoutAPI.getSession(sessionId);
                    setSession(data);
                } catch (err) {
                    console.error('Failed to fetch session:', err);
                }
            }
            setLoading(false);
        }
        fetchSession();
    }, [sessionId, clearCart]);

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-2xl mx-auto text-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                </div>

                <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
                <p className="text-xl text-gray-400 mb-8">
                    Thank you for your purchase. Your order is being processed.
                </p>

                {loading ? (
                    <div className="animate-pulse bg-white/10 h-32 rounded-xl" />
                ) : session ? (
                    <div className="bg-white/5 rounded-2xl border border-white/10 p-8 mb-8 text-left">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Package className="w-5 h-5" />
                            Order Details
                        </h2>
                        <div className="space-y-2 text-gray-300">
                            <div className="flex justify-between">
                                <span>Order ID</span>
                                <span className="font-mono text-sm">{session.id?.slice(-12)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Email</span>
                                <span>{session.customerEmail || 'Not provided'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Total</span>
                                <span className="font-bold text-white">
                                    £{((session.amountTotal || 0) / 100).toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Status</span>
                                <span className="text-green-400 capitalize">{session.status}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white/5 rounded-2xl border border-white/10 p-8 mb-8">
                        <p className="text-gray-400">
                            Your order has been placed successfully. You'll receive a confirmation email shortly.
                        </p>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/shop">
                        <Button size="lg" variant="outline">
                            Continue Shopping
                        </Button>
                    </Link>
                    <Link to="/">
                        <Button size="lg">
                            Back to Home <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccess;
