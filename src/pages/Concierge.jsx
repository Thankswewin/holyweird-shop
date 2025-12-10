import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const Concierge = () => {
    return (
        <div className="min-h-screen bg-obsidian">
            {/* HERO */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-lapis/10" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-obsidian" />

                <div className="relative z-10 text-center max-w-3xl px-4">
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

                    <div className="bg-lapis/20 p-8 rounded-2xl border border-lapis/50">
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
                            <textarea rows={4} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-weird-orange focus:outline-none transition-colors" placeholder="Tell us about your request..." />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-500">Attachment</label>
                            <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-white/30 transition-colors cursor-pointer">
                                <p className="text-sm text-gray-400">Drop files here or click to upload</p>
                                <p className="text-xs text-gray-600 mt-1">Images, moodboards, specs</p>
                            </div>
                        </div>

                        <Button size="lg" className="w-full bg-white text-black hover:bg-palladium mt-4">
                            Submit Request <Send className="w-4 h-4 ml-2" />
                        </Button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Concierge;
