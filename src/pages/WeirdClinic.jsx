import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Shield, Clock, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import clinicBg from '@/assets/clinic-bg.jpg';

const WeirdClinic = () => {
    const [selectedService, setSelectedService] = useState(null);

    const services = [
        {
            id: 'diagnostic',
            name: 'Full Diagnostic',
            price: 45,
            duration: '24-48 hours',
            description: 'Complete hardware and software analysis with detailed report.',
            icon: Shield
        },
        {
            id: 'repair',
            name: 'Component Repair',
            price: 'From £120',
            duration: '3-5 days',
            description: 'Professional repair of damaged components with OEM parts.',
            icon: Wrench
        },
        {
            id: 'restoration',
            name: 'Full Restoration',
            price: 'From £450',
            duration: '7-14 days',
            description: 'Complete teardown and rebuild. Your device, reborn.',
            icon: CheckCircle
        },
        {
            id: 'emergency',
            name: 'Emergency Service',
            price: '+50%',
            duration: '24-48 hours',
            description: 'Priority queue processing for urgent repairs.',
            icon: AlertTriangle
        }
    ];

    const process = [
        { step: 1, title: 'Submit', desc: 'Fill in the form with your device details' },
        { step: 2, title: 'Ship', desc: 'Send your device using our prepaid label' },
        { step: 3, title: 'Diagnose', desc: 'Our technicians assess the damage' },
        { step: 4, title: 'Approve', desc: 'Review and approve the repair quote' },
        { step: 5, title: 'Repair', desc: 'Expert repair with quality parts' },
        { step: 6, title: 'Return', desc: 'Device shipped back fully insured' }
    ];

    return (
        <div className="min-h-screen bg-obsidian font-mono">
            {/* Hero with blurred background */}
            <section className="relative py-24 overflow-hidden">
                {/* Blurred background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm scale-110"
                    style={{ backgroundImage: `url(${clinicBg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/60 to-obsidian" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <span className="text-red-500 font-mono text-sm uppercase tracking-[0.3em] mb-4 block">
                            Professional Repair Services
                        </span>

                        {/* Glitch effect title */}
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight relative">
                            <span className="glitch-text" data-text="WEIRD.CLINIC">
                                WEIRD<span className="text-red-500">.</span>CLINIC
                            </span>
                        </h1>

                        <p className="text-xl text-gray-300 leading-relaxed mb-8 font-sans">
                            Expert diagnostics and repair for your WeirdPhone.
                            Factory-trained technicians. OEM-quality parts.
                            Full warranty on all services.
                        </p>
                        <div className="flex gap-4">
                            <Button size="lg" className="bg-red-500 hover:bg-red-600 font-mono">
                                Book Repair <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                            <Button size="lg" variant="outline" className="font-mono border-white/20 hover:border-white/40 hover:bg-white/5">
                                Check Status
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 border-t border-white/10">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center tracking-tight">Our Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                whileHover={{ y: -5 }}
                                onClick={() => setSelectedService(service.id)}
                                className={`cursor-pointer p-6 rounded-2xl border transition-all ${selectedService === service.id
                                        ? 'bg-red-500/10 border-red-500'
                                        : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                                    }`}
                            >
                                <service.icon className={`w-10 h-10 mb-4 ${selectedService === service.id ? 'text-red-500' : 'text-palladium'
                                    }`} />
                                <h3 className="text-xl font-bold mb-2 tracking-tight">{service.name}</h3>
                                <p className="text-sm text-gray-400 mb-4 font-sans">{service.description}</p>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-red-400 font-mono">{service.price}</span>
                                    <span className="text-gray-500 flex items-center gap-1 font-mono">
                                        <Clock className="w-3 h-3" /> {service.duration}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Timeline */}
            <section className="py-16 bg-white/5">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center tracking-tight">How It Works</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {process.map((item, i) => (
                            <div key={item.step} className="text-center relative">
                                <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-500 font-bold flex items-center justify-center mx-auto mb-4 font-mono">
                                    {item.step}
                                </div>
                                <h3 className="font-bold mb-1 tracking-tight">{item.title}</h3>
                                <p className="text-xs text-gray-400 font-sans">{item.desc}</p>
                                {i < process.length - 1 && (
                                    <div className="hidden lg:block absolute top-6 left-[60%] w-[80%] h-[2px] bg-white/10" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Booking Form */}
            <section className="py-16 relative overflow-hidden">
                {/* Subtle background */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-5 blur-md"
                    style={{ backgroundImage: `url(${clinicBg})` }}
                />

                <div className="container mx-auto px-4 max-w-2xl relative z-10">
                    <div className="bg-white/5 rounded-3xl border border-white/10 p-8 md:p-12 backdrop-blur-sm">
                        <h2 className="text-3xl font-bold mb-8 text-center tracking-tight">Request Service</h2>
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Name</label>
                                    <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none font-mono" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Email</label>
                                    <input type="email" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none font-mono" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Device Serial Number</label>
                                <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none font-mono" placeholder="Found in Settings > About" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Issue Description</label>
                                <textarea rows={4} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none font-sans" placeholder="Describe the problem in detail..." />
                            </div>

                            <Button size="lg" className="w-full bg-red-500 hover:bg-red-600 font-mono tracking-wide">
                                Submit Request
                            </Button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Glitch CSS animation */}
            <style>{`
        .glitch-text {
          position: relative;
          display: inline-block;
        }
        
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch-text::before {
          animation: glitch-1 2s infinite linear alternate-reverse;
          color: #ef4444;
          z-index: -1;
        }
        
        .glitch-text::after {
          animation: glitch-2 3s infinite linear alternate-reverse;
          color: #3b82f6;
          z-index: -2;
        }
        
        @keyframes glitch-1 {
          0%, 90%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
          92% { clip-path: inset(40% 0 20% 0); transform: translate(-2px, 2px); }
          94% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
          96% { clip-path: inset(20% 0 40% 0); transform: translate(-1px, 1px); }
          98% { clip-path: inset(80% 0 5% 0); transform: translate(1px, -2px); }
        }
        
        @keyframes glitch-2 {
          0%, 88%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
          90% { clip-path: inset(25% 0 35% 0); transform: translate(2px, -2px); }
          93% { clip-path: inset(55% 0 15% 0); transform: translate(-2px, 1px); }
          95% { clip-path: inset(15% 0 55% 0); transform: translate(1px, -1px); }
          97% { clip-path: inset(70% 0 10% 0); transform: translate(-1px, 2px); }
        }
      `}</style>
        </div>
    );
};

export default WeirdClinic;
