import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Save, Share2, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import casingLapis from '@/assets/casing-lapis.jpg';
import casingPalladium from '@/assets/casing-palladium.jpg';
import casingObsidian from '@/assets/casing-obsidian.jpg';
import fullKit from '@/assets/full-kit.jpg';

const STEPS = [
    { id: 'mode', title: 'Mode' },
    { id: 'material', title: 'Material' },
    { id: 'finish', title: 'Finish' },
    { id: 'addons', title: 'Add-ons' },
    { id: 'review', title: 'Review' }
];

const OPTIONS = {
    mode: [
        { id: 'space', name: 'Space Grade', description: 'Certified for zero-g environments. Ultra-durable.', price: 1000 },
        { id: 'relic', name: 'Relic Mode', description: 'Pre-aged, battle-scarred aesthetic. Unique patina.', price: 1200 },
        { id: 'play', name: 'Play Mode', description: 'High-contrast, vibrant components for the bold.', price: 900 }
    ],
    material: [
        { id: 'titanium', name: 'Titanium', image: casingPalladium, price: 500 },
        { id: 'lapis', name: 'Lapis Lazuli', image: casingLapis, price: 800 },
        { id: 'obsidian', name: 'Obsidian', image: casingObsidian, price: 600 },
        { id: 'ceramic', name: 'Ceramic', image: fullKit, price: 400 }
    ],
    finish: [
        { id: 'matte', name: 'Matte', price: 0 },
        { id: 'gloss', name: 'High Gloss', price: 100 },
        { id: 'brushed', name: 'Brushed', price: 150 }
    ],
    addons: [
        { id: 'engraving', name: 'Laser Engraving', price: 50 },
        { id: 'concierge', name: 'M.Concierge access (1 Year)', price: 500 },
        { id: 'care', name: 'WeirdCare+', price: 200 }
    ]
};

const DollyBuilder = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [config, setConfig] = useState({
        mode: null,
        material: null,
        finish: null,
        addons: []
    });

    const handleSelect = (category, item) => {
        setConfig(prev => ({
            ...prev,
            [category]: item
        }));
    };

    const toggleAddon = (item) => {
        setConfig(prev => {
            const exists = prev.addons.find(a => a.id === item.id);
            if (exists) {
                return { ...prev, addons: prev.addons.filter(a => a.id !== item.id) };
            }
            return { ...prev, addons: [...prev.addons, item] };
        });
    };

    const calculateTotal = () => {
        let total = 2000; // Base price
        if (config.mode) total += config.mode.price;
        if (config.material) total += config.material.price;
        if (config.finish) total += config.finish.price;
        config.addons.forEach(a => total += a.price);
        return total;
    };

    const nextStep = () => {
        if (currentStep < STEPS.length - 1) setCurrentStep(c => c + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(c => c - 1);
    };

    // --- RENDER HELPERS ---

    const renderStepContent = () => {
        switch (STEPS[currentStep].id) {
            case 'mode':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {OPTIONS.mode.map(mode => (
                            <div
                                key={mode.id}
                                onClick={() => handleSelect('mode', mode)}
                                className={cn(
                                    "cursor-pointer p-6 rounded-xl border transition-all duration-300 relative overflow-hidden group",
                                    config.mode?.id === mode.id
                                        ? "bg-lapis/20 border-lapis shadow-[0_0_20px_rgba(13,79,139,0.3)]"
                                        : "bg-white/5 border-white/10 hover:border-white/30"
                                )}
                            >
                                <h3 className="text-xl font-bold mb-2">{mode.name}</h3>
                                <p className="text-sm text-gray-400 mb-4">{mode.description}</p>
                                <span className="text-weird-orange font-mono">+£{mode.price}</span>
                                {config.mode?.id === mode.id && (
                                    <div className="absolute top-4 right-4 text-lapis">
                                        <Check className="w-6 h-6" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                );

            case 'material':
                return (
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                        {OPTIONS.material.map(mat => (
                            <div
                                key={mat.id}
                                onClick={() => handleSelect('material', mat)}
                                className={cn(
                                    "cursor-pointer rounded-xl border transition-all duration-300 overflow-hidden relative group aspect-video",
                                    config.material?.id === mat.id
                                        ? "border-lapis ring-2 ring-lapis/50"
                                        : "border-white/10 hover:border-white/30"
                                )}
                            >
                                <img src={mat.image} alt={mat.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 flex flex-col justify-end">
                                    <h3 className="text-xl font-bold">{mat.name}</h3>
                                    <span className="text-gray-300 font-mono text-sm">+£{mat.price}</span>
                                </div>
                                {config.material?.id === mat.id && (
                                    <div className="absolute top-4 right-4 bg-lapis rounded-full p-1 shadow-lg">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                );

            case 'finish':
                return (
                    <div className="space-y-4">
                        {OPTIONS.finish.map(finish => (
                            <div
                                key={finish.id}
                                onClick={() => handleSelect('finish', finish)}
                                className={cn(
                                    "cursor-pointer p-4 rounded-lg border flex justify-between items-center transition-all",
                                    config.finish?.id === finish.id
                                        ? "bg-white/10 border-white text-white"
                                        : "bg-transparent border-white/10 text-gray-400 hover:bg-white/5"
                                )}
                            >
                                <span className="font-medium">{finish.name}</span>
                                <span>+£{finish.price}</span>
                            </div>
                        ))}
                    </div>
                );

            case 'addons':
                return (
                    <div className="space-y-4">
                        {OPTIONS.addons.map(addon => {
                            const selected = config.addons.some(a => a.id === addon.id);
                            return (
                                <div
                                    key={addon.id}
                                    onClick={() => toggleAddon(addon)}
                                    className={cn(
                                        "cursor-pointer p-4 rounded-lg border flex justify-between items-center transition-all",
                                        selected
                                            ? "bg-weird-orange/20 border-weird-orange text-white"
                                            : "bg-transparent border-white/10 text-gray-400 hover:bg-white/5"
                                    )}
                                >
                                    <span className="font-medium">{addon.name}</span>
                                    <span>+£{addon.price}</span>
                                </div>
                            );
                        })}
                    </div>
                );

            case 'review':
                return (
                    <div className="bg-white/5 rounded-xl p-8 border border-white/10 space-y-6">
                        <h3 className="text-2xl font-bold border-b border-white/10 pb-4">Configuration Summary</h3>
                        <div className="space-y-4 text-gray-300">
                            <div className="flex justify-between">
                                <span>Mode</span>
                                <span className="text-white font-medium">{config.mode?.name || '-'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Material</span>
                                <span className="text-white font-medium">{config.material?.name || '-'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Finish</span>
                                <span className="text-white font-medium">{config.finish?.name || '-'}</span>
                            </div>
                            <div className="border-t border-white/5 pt-4">
                                <span className="block mb-2 text-sm text-gray-500 uppercase">Add-ons</span>
                                {config.addons.length > 0 ? (
                                    <ul className="space-y-2">
                                        {config.addons.map(a => (
                                            <li key={a.id} className="flex justify-between text-sm">
                                                <span>{a.name}</span>
                                                <span>£{a.price}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span className="text-sm italic">None selected</span>
                                )}
                            </div>
                        </div>
                        <div className="border-t border-white/20 pt-6 flex justify-between items-center">
                            <span className="text-xl font-bold">Total Estimate</span>
                            <span className="text-3xl font-bold text-weird-orange">£{calculateTotal().toLocaleString()}</span>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-obsidian py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">DOLLY BUILDER</h1>
                    <p className="text-gray-400">Construct your bespoke WeirdPhone.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* LEFT: PREVIEW (Sticky) */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
                        <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 relative aspect-[9/16]">
                            <img
                                src={config.material?.image || fullKit}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                            <div className="absolute bottom-0 w-full p-6">
                                <h3 className="text-2xl font-bold mb-1">{config.mode?.name || "New Configuration"}</h3>
                                <p className="text-sm text-gray-400 mb-4">{config.material?.name || "Select Material"}</p>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="glass" className="flex-1"><Save className="w-4 h-4 mr-2" /> Save</Button>
                                    <Button size="sm" variant="glass" className="flex-1"><Share2 className="w-4 h-4 mr-2" /> Share</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: BUILDER STEPS */}
                    <div className="lg:col-span-8">
                        {/* Stepper Nav */}
                        <div className="flex justify-between items-center mb-8 bg-white/5 p-2 rounded-full border border-white/10 overflow-x-auto">
                            {STEPS.map((step, idx) => (
                                <div
                                    key={step.id}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                                        currentStep === idx
                                            ? "bg-white text-black"
                                            : idx < currentStep
                                                ? "text-white/50"
                                                : "text-white/30"
                                    )}
                                >
                                    <span className={cn(
                                        "w-5 h-5 rounded-full flex items-center justify-center text-[10px]",
                                        currentStep === idx ? "bg-black text-white" : "bg-white/10"
                                    )}>
                                        {idx + 1}
                                    </span>
                                    {step.title}
                                </div>
                            ))}
                        </div>

                        {/* Content Area */}
                        <div className="min-h-[400px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h2 className="text-2xl font-bold mb-6">{STEPS[currentStep].title}</h2>
                                    {renderStepContent()}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation Footer */}
                        <div className="mt-12 flex justify-between pt-8 border-t border-white/10">
                            <Button
                                variant="ghost"
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                className="text-gray-400 hover:text-white"
                            >
                                <ChevronLeft className="w-4 h-4 mr-2" /> Back
                            </Button>

                            {currentStep === STEPS.length - 1 ? (
                                <Button size="lg" className="bg-weird-orange hover:bg-weird-orange/80">
                                    Add to Cart — £{calculateTotal().toLocaleString()}
                                </Button>
                            ) : (
                                <Button size="lg" onClick={nextStep}>
                                    Next Step <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DollyBuilder;
