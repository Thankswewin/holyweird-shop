import express from 'express';
import supabase from '../lib/supabase.js';

const router = express.Router();

// Fallback products data (used if Supabase is not configured)
const fallbackProducts = [
    { id: '1', slug: 'lapis-housing-mark-iv', name: 'Lapis Housing Mark IV', description: 'Deep blue Lapis Lazuli housing with natural pyrite inclusions.', price_gbp: 45000, category: 'housing', stock_status: 'in_stock', material: 'Lapis Lazuli', image_url: '/assets/casing-lapis.jpg' },
    { id: '2', slug: 'obsidian-shell', name: 'Obsidian Shell', description: 'Volcanic glass finish. Fingerprint magnet, but worth it.', price_gbp: 55000, category: 'housing', stock_status: 'in_stock', material: 'Obsidian', image_url: '/assets/casing-obsidian.jpg' },
    { id: '3', slug: 'palladium-core', name: 'Palladium Core', description: 'Rare metal housing. Cold to the touch, heavy in the hand.', price_gbp: 120000, category: 'housing', stock_status: 'limited', material: 'Palladium', image_url: '/assets/casing-palladium.jpg' },
    { id: '4', slug: 'weird-orange-housing', name: 'Weird Orange Edition', description: 'High-visibility ceramic coating. Impossible to lose.', price_gbp: 45000, category: 'housing', stock_status: 'in_stock', material: 'Ceramic', image_url: '/assets/casing-orange.jpg' },
    { id: '5', slug: 'weirdphone-full-kit', name: 'The WeirdPhone: Full Kit', description: 'The complete experience. Housing, internals, and concierge membership.', price_gbp: 350000, category: 'build', stock_status: 'made_to_order', material: 'Mixed', image_url: '/assets/full-kit.jpg' },
    { id: '6', slug: 'camera-module-ring', name: 'Camera Module Ring', description: 'Reinforced titanium ring for the camera array.', price_gbp: 15000, category: 'hardware', stock_status: 'in_stock', material: 'Titanium', image_url: '/assets/detail-camera.jpg' },
    { id: '7', slug: 'side-rail-system', name: 'Side Rail System', description: 'Surgical grade steel rails for structural integrity.', price_gbp: 25000, category: 'hardware', stock_status: 'in_stock', material: 'Steel', image_url: '/assets/detail-side.jpg' },
    { id: '8', slug: 'concierge-gift-box', name: 'M.Concierge Gift Box', description: 'Premium unboxing experience for gifts.', price_gbp: 8500, category: 'accessory', stock_status: 'in_stock', material: 'Card / Velvet', image_url: '/assets/accessory-box.jpg' },
    { id: '9', slug: 'service-kit', name: 'Service Kit', description: 'Tools and cloths to keep your WeirdPhone pristine.', price_gbp: 4500, category: 'accessory', stock_status: 'in_stock', material: 'Synthetic', image_url: '/assets/product-3.jpg' },
    { id: '10', slug: 'prototype-01', name: 'Prototype 01', description: 'Early development unit. Determining function...', price_gbp: 999900, category: 'archive', stock_status: 'out_of_stock', material: 'Unknown', image_url: '/assets/product-1.jpg' }
];

/**
 * GET /api/products
 * List all products with optional filtering
 */
router.get('/', async (req, res) => {
    try {
        const { category, stock_status, material } = req.query;

        if (supabase) {
            let query = supabase.from('products').select('*');

            if (category && category !== 'all') {
                query = query.eq('category', category.toLowerCase());
            }
            if (stock_status) {
                query = query.eq('stock_status', stock_status);
            }
            if (material) {
                query = query.ilike('material', `%${material}%`);
            }

            const { data, error } = await query.order('created_at', { ascending: false });

            if (error) throw error;

            return res.json({ products: data, source: 'database' });
        }

        // Fallback: filter in memory
        let filtered = [...fallbackProducts];
        if (category && category !== 'all') {
            filtered = filtered.filter(p => p.category === category.toLowerCase());
        }
        if (stock_status) {
            filtered = filtered.filter(p => p.stock_status === stock_status);
        }

        res.json({ products: filtered, source: 'fallback' });

    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

/**
 * GET /api/products/:slug
 * Get single product by slug
 */
router.get('/:slug', async (req, res) => {
    try {
        const { slug } = req.params;

        if (supabase) {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    return res.status(404).json({ error: 'Product not found' });
                }
                throw error;
            }

            return res.json({ product: data });
        }

        // Fallback
        const product = fallbackProducts.find(p => p.slug === slug);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ product });

    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

export default router;
