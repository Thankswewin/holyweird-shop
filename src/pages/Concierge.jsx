import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import conciergeHero from '@/assets/concierge-hero.jpg';

const Concierge = () => {
    return (
        <div className="min-h-screen bg-obsidian">
            {/* HERO */}
            <section className="relative py-16 md:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-black" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">M.CONCIERGE</h1>
                            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                                High-end personal styling & luxury lifestyle globally. <br />
                                Live from London — access anything, anytime, anywhere.
                            </p>
                        </motion.div>
                    </div>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="max-w-md mx-auto"
                    >
                        <img
                            src={conciergeHero}
                            alt="WeirdPhone Lifestyle"
                            className="w-full rounded-2xl shadow-2xl border border-white/10"
                        />
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* LEFT: INFO */}
                <div className="space-y-12">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold border-l-4 border-weird-orange pl-6">The Service</h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            M.Concierge offers an exclusive gateway to the WeirdPhone ecosystem and beyond.
                            From bespoke hardware commissioning to global travel and lifestyle management.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { icon: Shield, title: "Secure Builds", desc: "Priority access to prototype hardware." },
                            { icon: Globe, title: "Global Reach", desc: "Sourcing luxury assets worldwide." },
                            { icon: Clock, title: "24/7 Access", desc: "Direct line to Milda J & team." },
                            { icon: MessageCircle, title: "Direct Chat", desc: "WhatsApp integration for instant requests." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <item.icon className="w-8 h-8 text-palladium mb-4" />
                                <h3 className="font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <h3 className="text-xl font-bold mb-4">Direct Contact</h3>
                        <div className="space-y-2 text-gray-200">
                            <p>Milda Juskaite</p>
                            <p>+44 7950 559195</p>
                            <a href="mailto:milda@mconcierge.co.uk" className="text-weird-orange hover:underline">milda@mconcierge.co.uk</a>
                            <div className="pt-4">
                                <a
                                    href="https://wa.me/message/IE35TWMR422CH1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button className="bg-[#25D366] hover:bg-[#20bd5a] text-white border-none">
                                        <MessageCircle className="w-4 h-4 mr-2" /> Chat on WhatsApp
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: FORM */}
                <div className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-weird-orange/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />

                    <h2 className="text-3xl font-bold mb-8 relative z-10">Request Access / Booking</h2>

                    <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-gray-500">First Name</label>
                                <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-weird-orange focus:outline-none transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-gray-500">Last Name</label>
                                <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-weird-orange focus:outline-none transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-500">Email Address</label>
                            <input type="email" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-weird-orange focus:outline-none transition-colors" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-500">Service Type</label>
                            <select className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-weird-orange focus:outline-none transition-colors">
                                <option>WeirdPhone Commission</option>
                                <option>Lifestyle Management</option>
                                <option>Travel Booking</option>
                                <option>Sourcing Request</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-500">Message</label>
                            <textarea rows={3} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-weird-orange focus:outline-none transition-colors resize-none" placeholder="Tell us about your request..." />
                        </div>

                        {/* Compact futuristic file upload */}
                        <div className="flex items-center gap-4 p-3 bg-black/40 rounded-xl border border-white/10 hover:border-white/30 transition-all cursor-pointer group">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-weird-orange/20 to-purple-500/20 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                                <svg className="w-5 h-5 text-weird-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-white font-medium">Add Attachment</p>
                                <p className="text-xs text-gray-500">Images, moodboards, specs</p>
                            </div>
                            <div className="text-xs text-gray-600 px-2 py-1 bg-white/5 rounded-md">Optional</div>
                        </div>

                        <Button size="lg" className="w-full bg-gradient-to-r from-white to-palladium text-black hover:opacity-90 font-bold tracking-wide mt-2 group">
                            Submit Request
                            <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Concierge;
