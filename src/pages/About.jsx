import React from 'react';
import { motion } from 'framer-motion';
import { Gem, Rocket, Shield, Sparkles, Target, Zap } from 'lucide-react';

const About = () => {
    const features = [
        { icon: Rocket, title: 'Space-Grade Materials', desc: 'Exotic alloys engineered for extreme durability' },
        { icon: Gem, title: 'Precision Diamonds', desc: 'Astrally aligned gems & lunar-dust finishes' },
        { icon: Zap, title: 'Laser Engraving', desc: 'Micro-engineered details on every surface' },
        { icon: Shield, title: 'Device Protection', desc: 'Premium armor for ultimate protection' },
        { icon: Sparkles, title: 'Boutique Customization', desc: 'Couture-level craftsmanship' },
        { icon: Target, title: 'Performance-Centric', desc: 'Durable, minimalist, high-impact design' },
    ];

    return (
        <div className="min-h-screen bg-obsidian">
            {/* Hero */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-lapis/20 via-transparent to-weird-orange/10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-weird-orange/5 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <span className="text-weird-orange font-mono text-sm uppercase tracking-[0.3em] mb-6 block">
                            About Us
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">
                            Holyweird Tech<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-palladium to-weird-orange">
                                Innovations
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                            A next-generation luxury technology studio specializing in premium device customization,
                            ultra-high-end accessories, and state-of-the-art hardware transformations.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 border-t border-white/10">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="prose prose-invert prose-lg"
                        >
                            <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                We fuse advanced engineering, precision craftsmanship, and future-forward material science
                                to elevate everyday devices into hyper-customized, performance-enhanced masterpieces.
                            </p>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                From ultra-lux phone armor to limited-edition accessories engineered with couture-level detail,
                                Holyweird Tech merges art direction, luxury craftsmanship, and futuristic engineering into a
                                single, unmistakable signature.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 bg-white/5">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Expertise</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-weird-orange/50 transition-colors"
                            >
                                <feature.icon className="w-10 h-10 text-weird-orange mb-4" />
                                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-400">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h2 className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-6">Our Mission</h2>
                        <blockquote className="text-3xl md:text-4xl font-bold leading-relaxed mb-8">
                            <span className="text-weird-orange">"</span>
                            Reinvent the device. Redefine the experience.<br />
                            Build the finest, strangest, cleanest luxury tech on Earth.
                            <span className="text-weird-orange">"</span>
                        </blockquote>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 border-t border-white/10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
                        {[
                            { value: '500+', label: 'Custom Builds' },
                            { value: '15+', label: 'Countries Served' },
                            { value: '99%', label: 'Client Satisfaction' },
                            { value: '∞', label: 'Possibilities' }
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-4xl md:text-5xl font-bold text-weird-orange mb-2">{stat.value}</div>
                                <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
