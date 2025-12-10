/**
 * Product Seed Script for HolyWeird
 * Run this after setting up Supabase to populate the products table
 * 
 * Usage: node server/seed/products.js
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase credentials in .env file');
    console.log('   Please ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Product data (matches table structure)
const products = [
    {
        slug: 'lapis-housing-mark-iv',
        name: 'Lapis Housing Mark IV',
        description: 'Deep blue Lapis Lazuli housing with natural pyrite inclusions.',
        price_gbp: 45000,
        category: 'housing',
        material: 'Lapis Lazuli',
        availability: 'In Stock',
        image_url: '/assets/casing-lapis.jpg',
        featured: true
    },
    {
        slug: 'obsidian-shell',
        name: 'Obsidian Shell',
        description: 'Volcanic glass finish. Fingerprint magnet, but worth it.',
        price_gbp: 55000,
        category: 'housing',
        material: 'Obsidian',
        availability: 'In Stock',
        image_url: '/assets/casing-obsidian.jpg',
        featured: false
    },
    {
        slug: 'palladium-core',
        name: 'Palladium Core',
        description: 'Rare metal housing. Cold to the touch, heavy in the hand.',
        price_gbp: 120000,
        category: 'housing',
        material: 'Palladium',
        availability: 'Limited',
        image_url: '/assets/casing-palladium.jpg',
        featured: true
    },
    {
        slug: 'weird-orange-housing',
        name: 'Weird Orange Edition',
        description: 'High-visibility ceramic coating. Impossible to lose.',
        price_gbp: 45000,
        category: 'housing',
        material: 'Ceramic',
        availability: 'In Stock',
        image_url: '/assets/casing-orange.jpg',
        featured: false
    },
    {
        slug: 'weirdphone-full-kit',
        name: 'The WeirdPhone: Full Kit',
        description: 'The complete experience. Housing, internals, and concierge membership.',
        price_gbp: 350000,
        category: 'build',
        material: 'Mixed',
        availability: 'Made to Order',
        image_url: '/assets/full-kit.jpg',
        featured: true
    },
    {
        slug: 'camera-module-ring',
        name: 'Camera Module Ring',
        description: 'Reinforced titanium ring for the camera array.',
        price_gbp: 15000,
        category: 'hardware',
        material: 'Titanium',
        availability: 'In Stock',
        image_url: '/assets/detail-camera.jpg',
        featured: false
    },
    {
        slug: 'side-rail-system',
        name: 'Side Rail System',
        description: 'Surgical grade steel rails for structural integrity.',
        price_gbp: 25000,
        category: 'hardware',
        material: 'Steel',
        availability: 'In Stock',
        image_url: '/assets/detail-side.jpg',
        featured: false
    },
    {
        slug: 'concierge-gift-box',
        name: 'M.Concierge Gift Box',
        description: 'Premium unboxing experience for gifts.',
        price_gbp: 8500,
        category: 'accessory',
        material: 'Card / Velvet',
        availability: 'In Stock',
        image_url: '/assets/accessory-box.jpg',
        featured: false
    },
    {
        slug: 'service-kit',
        name: 'Service Kit',
        description: 'Tools and cloths to keep your WeirdPhone pristine.',
        price_gbp: 4500,
        category: 'accessory',
        material: 'Synthetic',
        availability: 'In Stock',
        image_url: '/assets/product-3.jpg',
        featured: false
    },
    {
        slug: 'prototype-01',
        name: 'Prototype 01',
        description: 'Early development unit. Determining function...',
        price_gbp: 999900,
        category: 'archive',
        material: 'Unknown',
        availability: 'Limited',
        image_url: '/assets/product-1.jpg',
        featured: false
    }
];

async function seedProducts() {
    console.log('🌱 Starting product seed...\n');

    try {
        // First, clear existing products
        console.log('   Clearing existing products...');
        const { error: deleteError } = await supabase
            .from('products')
            .delete()
            .neq('id', '00000000-0000-0000-0000-000000000000');

        if (deleteError) {
            console.warn('   Warning: Could not clear products:', deleteError.message);
        }

        // Insert new products
        console.log(`   Inserting ${products.length} products...`);

        const { data, error } = await supabase
            .from('products')
            .insert(products)
            .select();

        if (error) {
            throw error;
        }

        console.log('\n✅ Successfully seeded products!\n');
        console.log('   Products created:');
        data.forEach(p => {
            console.log(`   - ${p.name} (${p.slug}) - £${(p.price_gbp / 100).toFixed(2)}`);
        });

    } catch (error) {
        console.error('\n❌ Seed failed:', error.message);
        process.exit(1);
    }
}

seedProducts();
