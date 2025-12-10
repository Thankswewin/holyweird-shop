import express from 'express';
import { nanoid } from 'nanoid';
import supabase from '../lib/supabase.js';

const router = express.Router();

// In-memory store for when Supabase is not configured
const configStore = new Map();

/**
 * POST /api/dolly/save-config
 * Save a Dolly Builder configuration
 */
router.post('/save-config', async (req, res) => {
    try {
        const { config, totalPrice, userEmail } = req.body;

        if (!config) {
            return res.status(400).json({ error: 'Configuration is required' });
        }

        // Generate a short, shareable ID
        const shareId = nanoid(10);

        if (supabase) {
            const { data, error } = await supabase
                .from('dolly_configs')
                .insert({
                    share_id: shareId,
                    config: config,
                    total_price: totalPrice,
                    user_email: userEmail
                })
                .select()
                .single();

            if (error) throw error;

            return res.json({
                success: true,
                shareId: shareId,
                shareUrl: `${process.env.FRONTEND_URL}/dolly-builder?config=${shareId}`
            });
        }

        // Fallback: store in memory
        configStore.set(shareId, {
            config,
            totalPrice,
            userEmail,
            createdAt: new Date().toISOString()
        });

        res.json({
            success: true,
            shareId: shareId,
            shareUrl: `${process.env.FRONTEND_URL}/dolly-builder?config=${shareId}`,
            note: 'Stored in memory (will be lost on server restart)'
        });

    } catch (error) {
        console.error('Error saving config:', error);
        res.status(500).json({ error: 'Failed to save configuration' });
    }
});

/**
 * GET /api/dolly/config/:shareId
 * Retrieve a saved configuration
 */
router.get('/config/:shareId', async (req, res) => {
    try {
        const { shareId } = req.params;

        if (supabase) {
            const { data, error } = await supabase
                .from('dolly_configs')
                .select('*')
                .eq('share_id', shareId)
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    return res.status(404).json({ error: 'Configuration not found' });
                }
                throw error;
            }

            return res.json({
                config: data.config,
                totalPrice: data.total_price,
                createdAt: data.created_at
            });
        }

        // Fallback: check memory store
        const stored = configStore.get(shareId);
        if (!stored) {
            return res.status(404).json({ error: 'Configuration not found' });
        }

        res.json({
            config: stored.config,
            totalPrice: stored.totalPrice,
            createdAt: stored.createdAt
        });

    } catch (error) {
        console.error('Error retrieving config:', error);
        res.status(500).json({ error: 'Failed to retrieve configuration' });
    }
});

export default router;
