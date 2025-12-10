import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="w-full bg-black/40 border-t border-white/5 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="text-2xl font-bold tracking-tighter">
                            HOLYWEIRD<span className="text-weird-orange">.</span>
                        </Link>
                        <p className="text-sm text-gray-400 max-w-xs">
                            Luxury tech reimagined. WeirdPhone® hardware, bespoke Dolly builds, and exclusive memberships.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500">Explore</h4>
                        <ul className="space-y-2">
                            <li><Link to="/shop" className="text-sm text-gray-300 hover:text-white hover:underline transition-all">Shop</Link></li>
                            <li><Link to="/dolly-builder" className="text-sm text-gray-300 hover:text-white hover:underline transition-all">Dolly Builder</Link></li>
                            <li><Link to="/m-concierge" className="text-sm text-gray-300 hover:text-white hover:underline transition-all">M.Concierge</Link></li>
                            <li><Link to="/weird-clinic" className="text-sm text-gray-300 hover:text-white hover:underline transition-all">Weird Clinic</Link></li>
                            <li><Link to="/swap" className="text-sm text-gray-300 hover:text-white hover:underline transition-all">Swap</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500">Contact</h4>
                        <div className="text-sm text-gray-300 space-y-1">
                            <p>Milda Juskaite</p>
                            <p>+44 7950 559195</p>
                            <a href="mailto:milda@mconcierge.co.uk" className="hover:text-weird-orange">milda@mconcierge.co.uk</a>
                            <p className="mt-2 text-xs text-gray-500">@holyweirdtechnology</p>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500">Join the Weird List</h4>
                        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Email address"
                                className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-weird-orange transition-colors"
                            />
                            <button className="bg-white text-black px-4 py-2 rounded text-xs font-bold uppercase hover:bg-palladium transition-colors">
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
                    <p>&copy; {new Date().getFullYear()} HolyWeird Technology. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/legal/shipping" className="hover:text-gray-400">Shipping</Link>
                        <Link to="/legal/returns" className="hover:text-gray-400">Returns</Link>
                        <Link to="/legal/privacy" className="hover:text-gray-400">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
