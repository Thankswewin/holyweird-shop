import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';

const ProductCard = ({ product }) => {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
        });

        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group relative bg-white/5 rounded-xl overflow-hidden border border-white/10 flex flex-col h-full"
        >
            {/* Image Container */}
            <div className="aspect-[4/5] overflow-hidden bg-black relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <Link to={`/product/${product.slug}`}>
                        <Button size="icon" variant="glass" className="rounded-full">
                            <Eye className="w-4 h-4" />
                        </Button>
                    </Link>
                    <Button
                        size="icon"
                        className={`rounded-full transition-colors ${added ? 'bg-green-500' : 'bg-weird-orange hover:bg-weird-orange/80'}`}
                        onClick={handleAddToCart}
                        disabled={product.availability === 'Out of Stock'}
                    >
                        {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                    </Button>
                </div>

                {/* Badges */}
                {product.availability === 'Limited' && (
                    <span className="absolute top-3 right-3 bg-red-500/80 text-white text-[10px] font-bold uppercase px-2 py-1 rounded backdrop-blur-md">
                        Limited
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <Link to={`/product/${product.slug}`}>
                        <h3 className="text-lg font-bold leading-tight truncate pr-2 hover:text-weird-orange transition-colors" title={product.name}>
                            {product.name}
                        </h3>
                    </Link>
                </div>

                <p className="text-sm text-gray-400 mb-4 uppercase tracking-wider text-[10px]">
                    {product.category} • {product.material}
                </p>

                <div className="mt-auto flex justify-between items-center pt-3 border-t border-white/5">
                    <span className="text-lg font-mono text-palladium">£{product.price}</span>
                    {product.availability === 'Out of Stock' ? (
                        <span className="text-xs text-gray-500 uppercase font-bold">Sold Out</span>
                    ) : (
                        <span className="text-xs text-green-400 capitalize flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            {product.availability}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;

