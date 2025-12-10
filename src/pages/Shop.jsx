import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/data/products';
import { cn } from '@/lib/utils';

const Shop = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        category: 'All',
        material: 'All',
        availability: 'All'
    });

    // Extract unique values for filters
    const categories = ['All', ...new Set(products.map(p => p.category))];
    const materials = ['All', ...new Set(products.map(p => p.material))];
    const availabilities = ['All', 'In Stock', 'Limited', 'Made to Order'];

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchCategory = activeFilters.category === 'All' || product.category === activeFilters.category;
            const matchMaterial = activeFilters.material === 'All' || product.material === activeFilters.material;
            const matchAvailability = activeFilters.availability === 'All' || product.availability === activeFilters.availability;
            return matchCategory && matchMaterial && matchAvailability;
        });
    }, [activeFilters]);

    const FilterSection = ({ title, options, filterKey }) => (
        <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">{title}</h4>
            <div className="space-y-2">
                {options.map(option => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer group">
                        <div className={cn(
                            "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                            activeFilters[filterKey] === option
                                ? "bg-weird-orange border-weird-orange"
                                : "border-gray-600 group-hover:border-gray-400"
                        )}>
                            {activeFilters[filterKey] === option && <div className="w-2 h-2 bg-white rounded-full sm" />}
                        </div>
                        <input
                            type="radio"
                            name={filterKey}
                            className="hidden"
                            checked={activeFilters[filterKey] === option}
                            onChange={() => setActiveFilters(prev => ({ ...prev, [filterKey]: option }))}
                        />
                        <span className={cn(
                            "text-sm transition-colors",
                            activeFilters[filterKey] === option ? "text-white" : "text-gray-400 group-hover:text-gray-300"
                        )}>{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b border-white/5 pb-8">
                <div>
                    <h1 className="text-4xl font-bold mb-2">SHOP</h1>
                    <p className="text-gray-400">Exclusive hardware, upgrades, and bespoke builds.</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="md:hidden"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                        <Filter className="w-4 h-4 mr-2" /> Filters
                    </Button>
                    <div className="hidden md:flex items-center text-sm text-gray-500">
                        Showing {filteredProducts.length} items
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters (Desktop) */}
                <aside className="hidden md:block w-64 shrink-0">
                    <div className="sticky top-24 glass-panel p-6 rounded-xl">
                        <FilterSection title="Category" options={categories} filterKey="category" />
                        <FilterSection title="Material" options={materials} filterKey="material" />
                        <FilterSection title="Availability" options={availabilities} filterKey="availability" />
                    </div>
                </aside>

                {/* Mobile Filters Drawer */}
                <AnimatePresence>
                    {isFilterOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="md:hidden overflow-hidden bg-white/5 rounded-xl mb-6"
                        >
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold">Filters</h3>
                                    <Button size="icon" variant="ghost" onClick={() => setIsFilterOpen(false)}><X className="w-4 h-4" /></Button>
                                </div>
                                <FilterSection title="Category" options={categories} filterKey="category" />
                                <FilterSection title="Material" options={materials} filterKey="material" />
                                <FilterSection title="Availability" options={availabilities} filterKey="availability" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Product Grid */}
                <div className="flex-1">
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10 border-dashed">
                            <p className="text-gray-400 text-lg">No strange artifacts found.</p>
                            <Button
                                variant="ghost"
                                className="mt-4 text-weird-orange"
                                onClick={() => setActiveFilters({ category: 'All', material: 'All', availability: 'All' })}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    )}

                    {/* Builder Banner */}
                    <div className="mt-16 bg-gradient-to-r from-lapis to-obsidian rounded-2xl p-8 relative overflow-hidden border border-white/10">
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Build Your Own Dolly</h3>
                                <p className="text-gray-200">Customize every aspect. From the core to the casing.</p>
                            </div>
                            <Button size="lg" className="bg-white text-lapis hover:bg-gray-100 whitespace-nowrap">
                                Start Builder
                            </Button>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
