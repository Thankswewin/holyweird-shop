import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, ShoppingBag, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { productsAPI } from '@/lib/api';

const ProductDetail = () => {
    const { slug } = useParams();
    const { addItem, toggleCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        async function fetchProduct() {
            try {
                setLoading(true);
                const { product } = await productsAPI.getBySlug(slug);
                setProduct(product);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [slug]);

    const handleAddToCart = () => {
        if (!product) return;

        addItem({
            id: product.id,
            name: product.name,
            price: product.price_gbp ? product.price_gbp / 100 : product.price,
            image: product.image_url || product.image,
            description: product.description,
        });

        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-20">
                <div className="animate-pulse space-y-8">
                    <div className="h-8 w-48 bg-white/10 rounded" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="aspect-square bg-white/10 rounded-2xl" />
                        <div className="space-y-4">
                            <div className="h-12 w-3/4 bg-white/10 rounded" />
                            <div className="h-6 w-1/2 bg-white/10 rounded" />
                            <div className="h-24 bg-white/10 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
                <p className="text-gray-400 mb-8">{error || 'This product could not be found.'}</p>
                <Link to="/shop">
                    <Button>Back to Shop</Button>
                </Link>
            </div>
        );
    }

    const price = product.price_gbp ? product.price_gbp / 100 : product.price;
    const imageUrl = product.image_url || product.image;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <Link to="/shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Shop
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                >
                    <div className="aspect-square bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                        <img
                            src={imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>

                {/* Product Info */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <div>
                        <p className="text-sm text-weird-orange uppercase tracking-widest mb-2">
                            {product.category}
                        </p>
                        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                        <p className="text-3xl font-mono text-palladium">
                            £{price.toFixed(2)}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                        <span className={`px-3 py-1 rounded-full ${product.stock_status === 'in_stock' ? 'bg-green-500/20 text-green-400' :
                                product.stock_status === 'limited' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-red-500/20 text-red-400'
                            }`}>
                            {product.stock_status?.replace('_', ' ').toUpperCase()}
                        </span>
                        {product.material && (
                            <span className="text-gray-400">
                                Material: {product.material}
                            </span>
                        )}
                    </div>

                    <p className="text-gray-300 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="border-t border-white/10 pt-6 space-y-4">
                        <div className="flex gap-4">
                            <Button
                                size="lg"
                                className={`flex-1 ${added ? 'bg-green-500' : 'bg-weird-orange hover:bg-weird-orange/80'}`}
                                onClick={handleAddToCart}
                                disabled={product.stock_status === 'out_of_stock'}
                            >
                                {added ? (
                                    <>
                                        <Check className="w-5 h-5 mr-2" />
                                        Added!
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag className="w-5 h-5 mr-2" />
                                        Add to Cart
                                    </>
                                )}
                            </Button>
                            <Button size="lg" variant="outline">
                                <Heart className="w-5 h-5" />
                            </Button>
                        </div>

                        {added && (
                            <button
                                onClick={toggleCart}
                                className="text-sm text-weird-orange hover:underline w-full text-center"
                            >
                                View Cart →
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetail;
