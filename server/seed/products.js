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

// Product data (matches frontend data structure)
const products = [
    {
        slug: 'lapis-housing-mark-iv',
        name: 'Lapis Housing Mark IV',
        description: 'Deep blue Lapis Lazuli housing with natural pyrite inclusions.',
        price_gbp: 45000, // £450.00 in pence
        category: 'housing',
        stock_status: 'in_stock',
        material: 'Lapis Lazuli',
        image_url: '/assets/casing-lapis.jpg',
        metadata: { finish: 'polished', weight: '45g' }
    },
    {
        slug: 'obsidian-shell',
        name: 'Obsidian Shell',
        description: 'Volcanic glass finish. Fingerprint magnet, but worth it.',
        price_gbp: 55000,
        category: 'housing',
        stock_status: 'in_stock',
        material: 'Obsidian',
        image_url: '/assets/casing-obsidian.jpg',
        metadata: { finish: 'mirror', weight: '52g' }
    },
    {
        slug: 'palladium-core',
        name: 'Palladium Core',
        description: 'Rare metal housing. Cold to the touch, heavy in the hand.',
        price_gbp: 120000,
        category: 'housing',
        stock_status: 'limited',
        material: 'Palladium',
        image_url: '/assets/casing-palladium.jpg',
        metadata: { finish: 'brushed', weight: '78g', limited_edition: true }
    },
    {
        slug: 'weird-orange-housing',
        name: 'Weird Orange Edition',
        description: 'High-visibility ceramic coating. Impossible to lose.',
        price_gbp: 45000,
        category: 'housing',
        stock_status: 'in_stock',
        material: 'Ceramic',
        image_url: '/assets/casing-orange.jpg',
        metadata: { finish: 'matte', weight: '38g' }
    },
    {
        slug: 'weirdphone-full-kit',
        name: 'The WeirdPhone: Full Kit',
        description: 'The complete experience. Housing, internals, and concierge membership.',
        price_gbp: 350000,
        category: 'build',
        stock_status: 'made_to_order',
        material: 'Mixed',
        image_url: '/assets/full-kit.jpg',
        metadata: { includes_concierge: true, build_time_days: 14 }
    },
    {
        slug: 'camera-module-ring',
        name: 'Camera Module Ring',
        description: 'Reinforced titanium ring for the camera array.',
        price_gbp: 15000,
        category: 'hardware',
        stock_status: 'in_stock',
        material: 'Titanium',
        image_url: '/assets/detail-camera.jpg',
        metadata: {}
    },
    {
        slug: 'side-rail-system',
        name: 'Side Rail System',
        description: 'Surgical grade steel rails for structural integrity.',
        price_gbp: 25000,
        category: 'hardware',
        stock_status: 'in_stock',
        material: 'Steel',
        image_url: '/assets/detail-side.jpg',
        metadata: {}
    },
    {
        slug: 'concierge-gift-box',
        name: 'M.Concierge Gift Box',
        description: 'Premium unboxing experience for gifts.',
        price_gbp: 8500,
        category: 'accessory',
        stock_status: 'in_stock',
        material: 'Card / Velvet',
        image_url: '/assets/accessory-box.jpg',
        metadata: {}
    },
    {
        slug: 'service-kit',
        name: 'Service Kit',
        description: 'Tools and cloths to keep your WeirdPhone pristine.',
        price_gbp: 4500,
        category: 'accessory',
        stock_status: 'in_stock',
        material: 'Synthetic',
        image_url: '/assets/product-3.jpg',
        metadata: {}
    },
    {
        slug: 'prototype-01',
        name: 'Prototype 01',
        description: 'Early development unit. Determining function...',
        price_gbp: 999900,
        category: 'archive',
        stock_status: 'out_of_stock',
        material: 'Unknown',
        image_url: '/assets/product-1.jpg',
        metadata: { collectors_item: true }
    }
];

async function seedProducts() {
    console.log('🌱 Starting product seed...\n');

    try {
        // First, clear existing products (optional - comment out to append)
        console.log('   Clearing existing products...');
        const { error: deleteError } = await supabase
            .from('products')
            .delete()
            .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

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
