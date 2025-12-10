import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import heroVideo from '@/assets/hero.mp4';
import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';
import dollyImg from '@/assets/dolly-preview.jpg';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">

            {/* HERO SECTION */}
            <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
                {/* Remote/Local Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-60"
                    >
                        <source src={heroVideo} type="video/mp4" />
                    </video>
                    {/* Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-obsidian/80 via-transparent to-obsidian/80" />
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white via-palladium to-white/50 drop-shadow-lg">
                            WEIRD WILD WORLD
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light tracking-wide">
                            WeirdPhone® — Palladium, Lapis & Handmade Editions. <br />
                            Luxury tech reimagined for the bold.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="flex flex-col md:flex-row gap-4 justify-center items-center"
                    >
                        <Link to="/shop">
                            <Button size="lg" className="bg-white text-obsidian hover:bg-palladium min-w-[200px]">
                                Shop WeirdPhone
                            </Button>
                        </Link>
                        <Link to="/dolly-builder">
                            <Button size="lg" variant="outline" className="min-w-[200px] backdrop-blur-md">
                                Build Your Dolly
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* FEATURED CAROUSEL */}
            <section className="py-24 bg-obsidian relative">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Exclusive Drops</h2>
                            <p className="text-gray-400">Limited edition housings and hardware.</p>
                        </div>
                        <Link to="/shop" className="text-weird-orange hover:text-white transition-colors flex items-center gap-2">
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { img: product1, title: "Lapis Housing", price: "£450" },
                            { img: product2, title: "Palladium Core", price: "£1,200" },
                            { img: product3, title: "Weird Orange Kit", price: "£85" }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="group relative bg-white/5 rounded-xl overflow-hidden border border-white/10"
                            >
                                <div className="aspect-[4/5] overflow-hidden bg-black">
                                    <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                                <div className="absolute bottom-0 left-0 p-6 w-full">
                                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                                    <div className="flex justify-between items-center">
                                        <span className="text-palladium">{item.price}</span>
                                        <Button size="sm" variant="glass" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            Add to Cart
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DOLLY TEASER */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-lapis/20" />
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="flex gap-4 mb-4">
                            <span className="bg-weird-orange/20 text-weird-orange px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">New</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                            DOLLY'S <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-lapis to-purple-400">TREASURE</span>
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Bespoke builds: Space Grade · Relic · Play Mode. <br />
                            Create your 1-of-1. Choose materials, finishes and extras.
                            Save & share configs with your friends.
                        </p>
                        <ul className="space-y-4">
                            {[
                                { icon: Sparkles, text: "Space Grade Materials" },
                                { icon: Shield, text: "Certified Durability" },
                                { icon: Zap, text: "Weird Engine Optimization" }
                            ].map((feat, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-400">
                                    <feat.icon className="w-5 h-5 text-lapis" /> {feat.text}
                                </li>
                            ))}
                        </ul>
                        <Link to="/dolly-builder">
                            <Button size="lg" className="mt-4 bg-lapis hover:bg-lapis/80 text-white min-w-[200px]">
                                Start Configuration
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-lapis/30 blur-3xl rounded-full" />
                        <img src={dollyImg} alt="Dolly Builder" className="relative z-10 rounded-2xl border border-white/20 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700" />
                    </motion.div>
                </div>
            </section>

            {/* M.CONCIERGE */}
            <section className="py-24 bg-white/5 border-t border-white/10 text-center">
                <div className="container mx-auto px-4 max-w-3xl space-y-8">
                    <h2 className="text-3xl font-bold tracking-widest uppercase">M.Concierge</h2>
                    <p className="text-xl text-gray-300">
                        High-end personal styling & luxury lifestyle globally.
                        Live from London — access anything, anytime, anywhere.
                    </p>
                    <Link to="/m-concierge">
                        <Button variant="outline" size="lg" className="border-weird-orange text-weird-orange hover:bg-weird-orange hover:text-white">
                            Request Access
                        </Button>
                    </Link>
                </div>
            </section>

        </div>
    );
};

export default Home;
