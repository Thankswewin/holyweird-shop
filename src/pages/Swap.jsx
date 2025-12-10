import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ArrowRight, Check, Upload, DollarSign, Package } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const Swap = () => {
    const [step, setStep] = useState(1);
    const [deviceCondition, setDeviceCondition] = useState(null);

    const conditions = [
        { id: 'excellent', label: 'Excellent', value: '100%', desc: 'Like new, no visible wear' },
        { id: 'good', label: 'Good', value: '80%', desc: 'Minor scratches, fully functional' },
        { id: 'fair', label: 'Fair', value: '60%', desc: 'Visible wear, all features work' },
        { id: 'poor', label: 'Poor', value: '40%', desc: 'Significant damage, may need repair' }
    ];

    const benefits = [
        { icon: DollarSign, title: 'Best Value', desc: 'Competitive trade-in prices' },
        { icon: RefreshCw, title: 'Instant Credit', desc: 'Apply to your next purchase' },
        { icon: Package, title: 'Free Shipping', desc: 'We cover all shipping costs' },
        { icon: Check, title: 'Data Wipe', desc: 'Secure factory reset included' }
    ];

    return (
        <div className="min-h-screen bg-obsidian">
            {/* Hero */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-transparent" />
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <span className="text-green-500 font-mono text-sm uppercase tracking-widest mb-4 block">
                            Trade-In Program
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            SWAP<span className="text-green-500">.</span>
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed mb-8">
                            Trade in your current device and get credit towards your next WeirdPhone.
                            Simple. Fair. Sustainable.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-12 border-t border-white/10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {benefits.map((benefit, i) => (
                            <div key={i} className="text-center p-6">
                                <benefit.icon className="w-8 h-8 text-green-500 mx-auto mb-3" />
                                <h3 className="font-bold mb-1">{benefit.title}</h3>
                                <p className="text-xs text-gray-400">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trade-in Wizard */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="bg-white/5 rounded-3xl border border-white/10 p-8 md:p-12">

                        {/* Progress */}
                        <div className="flex items-center justify-between mb-12">
                            {[1, 2, 3].map((s) => (
                                <div key={s} className="flex items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-green-500 text-black' : 'bg-white/10 text-gray-500'
                                        }`}>
                                        {step > s ? <Check className="w-5 h-5" /> : s}
                                    </div>
                                    {s < 3 && (
                                        <div className={`w-full h-1 mx-2 ${step > s ? 'bg-green-500' : 'bg-white/10'
                                            }`} style={{ width: '100px' }} />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Step 1: Device Info */}
                        {step === 1 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-bold">What are you trading in?</h2>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-gray-500">Device Type</label>
                                    <select className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white">
                                        <option>WeirdPhone Mark IV</option>
                                        <option>WeirdPhone Mark III</option>
                                        <option>WeirdPhone Mark II</option>
                                        <option>WeirdPhone Original</option>
                                        <option>Other (specify)</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-gray-500">Serial Number (optional)</label>
                                    <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white" />
                                </div>

                                <Button size="lg" className="w-full bg-green-500 hover:bg-green-600 text-black" onClick={() => setStep(2)}>
                                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </motion.div>
                        )}

                        {/* Step 2: Condition */}
                        {step === 2 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-bold">What condition is it in?</h2>

                                <div className="grid grid-cols-2 gap-4">
                                    {conditions.map((cond) => (
                                        <div
                                            key={cond.id}
                                            onClick={() => setDeviceCondition(cond.id)}
                                            className={`cursor-pointer p-4 rounded-xl border transition-all ${deviceCondition === cond.id
                                                    ? 'bg-green-500/10 border-green-500'
                                                    : 'bg-white/5 border-white/10 hover:border-white/30'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="font-bold">{cond.label}</span>
                                                <span className="text-green-500 font-mono text-sm">{cond.value}</span>
                                            </div>
                                            <p className="text-xs text-gray-400">{cond.desc}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    <Button size="lg" variant="outline" onClick={() => setStep(1)}>
                                        Back
                                    </Button>
                                    <Button
                                        size="lg"
                                        className="flex-1 bg-green-500 hover:bg-green-600 text-black"
                                        onClick={() => setStep(3)}
                                        disabled={!deviceCondition}
                                    >
                                        Get Quote <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Quote */}
                        {step === 3 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6 text-center"
                            >
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                                    <Check className="w-10 h-10 text-green-500" />
                                </div>

                                <h2 className="text-2xl font-bold">Your Estimated Value</h2>

                                <div className="text-5xl font-mono font-bold text-green-500">
                                    £{deviceCondition === 'excellent' ? '850' :
                                        deviceCondition === 'good' ? '680' :
                                            deviceCondition === 'fair' ? '510' : '340'}
                                </div>

                                <p className="text-gray-400">
                                    This is an estimate. Final value confirmed upon inspection.
                                </p>

                                <div className="bg-white/5 rounded-xl p-6 text-left">
                                    <h3 className="font-bold mb-4">Next Steps</h3>
                                    <ul className="space-y-3 text-sm text-gray-300">
                                        <li className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-green-500 mt-0.5" />
                                            We'll email you a prepaid shipping label
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-green-500 mt-0.5" />
                                            Ship your device within 7 days
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-green-500 mt-0.5" />
                                            Receive store credit within 48 hours of inspection
                                        </li>
                                    </ul>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-gray-500">Email for shipping label</label>
                                    <input type="email" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-center" placeholder="your@email.com" />
                                </div>

                                <Button size="lg" className="w-full bg-green-500 hover:bg-green-600 text-black">
                                    <Upload className="w-4 h-4 mr-2" /> Request Shipping Label
                                </Button>

                                <button onClick={() => setStep(1)} className="text-sm text-gray-400 hover:text-white">
                                    Start Over
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Swap;
