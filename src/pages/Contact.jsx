import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // In production, this would send to a backend endpoint
        alert('Message sent! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-obsidian">
            {/* Hero */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-2xl mx-auto mb-16"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Contact Us</h1>
                        <p className="text-xl text-gray-400">
                            Questions about your order? Need custom work? We're here to help.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/5 rounded-2xl border border-white/10 p-8"
                        >
                            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-weird-orange focus:outline-none transition-colors"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-weird-orange focus:outline-none transition-colors"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Subject</label>
                                    <select
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-weird-orange focus:outline-none transition-colors"
                                    >
                                        <option value="">Select a topic</option>
                                        <option value="order">Order Inquiry</option>
                                        <option value="custom">Custom Build</option>
                                        <option value="repair">Repair / Clinic</option>
                                        <option value="concierge">M.Concierge</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Message</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-weird-orange focus:outline-none transition-colors resize-none"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <Button type="submit" size="lg" className="w-full bg-white text-black hover:bg-palladium">
                                    Send Message <Send className="w-4 h-4 ml-2" />
                                </Button>
                            </form>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-8"
                        >
                            {/* WhatsApp Card */}
                            <div className="bg-[#25D366]/10 rounded-2xl border border-[#25D366]/30 p-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center">
                                        <MessageCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">Chat on WhatsApp</h3>
                                        <p className="text-gray-400 text-sm">Fastest response time</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 mb-6">
                                    Get instant support via WhatsApp. Available Mon-Fri, 9am-6pm GMT.
                                </p>
                                <a
                                    href="https://wa.me/message/IE35TWMR422CH1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white border-none">
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        Start Chat
                                    </Button>
                                </a>
                            </div>

                            {/* Contact Details */}
                            <div className="bg-white/5 rounded-2xl border border-white/10 p-8 space-y-6">
                                <h3 className="text-xl font-bold mb-4">Other Ways to Reach Us</h3>

                                <div className="flex items-start gap-4">
                                    <Mail className="w-5 h-5 text-weird-orange mt-1" />
                                    <div>
                                        <p className="font-medium">Email</p>
                                        <a href="mailto:hello@weirdphone.com" className="text-gray-400 hover:text-weird-orange transition-colors">
                                            hello@weirdphone.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Phone className="w-5 h-5 text-weird-orange mt-1" />
                                    <div>
                                        <p className="font-medium">Phone</p>
                                        <a href="tel:+447950559195" className="text-gray-400 hover:text-weird-orange transition-colors">
                                            +44 7950 559195
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <MapPin className="w-5 h-5 text-weird-orange mt-1" />
                                    <div>
                                        <p className="font-medium">Location</p>
                                        <p className="text-gray-400">London, United Kingdom</p>
                                    </div>
                                </div>
                            </div>

                            {/* Response Time */}
                            <div className="text-center text-sm text-gray-500">
                                <p>We typically respond within 24 hours.</p>
                                <p>For urgent matters, use WhatsApp.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
