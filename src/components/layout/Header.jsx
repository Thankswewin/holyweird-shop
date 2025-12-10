import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { itemCount, toggleCart } = useCart();

    const navLinks = [
        { name: 'Shop', path: '/shop' },
        { name: 'Dolly', path: '/dolly-builder' },
        { name: 'D$T', path: '/weird-engine' },
        { name: 'M.Concierge', path: '/m-concierge' },
        { name: 'Clinic', path: '/weird-clinic' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full glass-panel border-b-0 border-white/5">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-tighter hover:text-palladium transition-colors">
                    W<span className="text-weird-orange">.</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wide text-[11px]"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                        <Search className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white relative">
                        <Heart className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-300 hover:text-white relative"
                        onClick={toggleCart}
                    >
                        <ShoppingBag className="w-5 h-5" />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-weird-orange rounded-full text-[10px] font-bold flex items-center justify-center">
                                {itemCount > 9 ? '9+' : itemCount}
                            </span>
                        )}
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hidden sm:flex">
                        <User className="w-5 h-5" />
                    </Button>

                    {/* Mobile Menu Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-obsidian/95 backdrop-blur-xl border-b border-white/10 p-4 animate-in slide-in-from-top-2">
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-lg font-medium text-gray-200 hover:text-weird-orange transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/cart"
                            className="text-lg font-medium text-weird-orange"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Cart ({itemCount})
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;

