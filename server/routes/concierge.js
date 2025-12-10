import express from 'express';
import supabase from '../lib/supabase.js';

const router = express.Router();

// In-memory store for when Supabase is not configured
const requestStore = [];

/**
 * POST /api/concierge/request
 * Submit a concierge service request
 */
router.post('/request', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            requestType,
            message,
            attachments
        } = req.body;

        // Validation
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const requestData = {
            first_name: firstName,
            last_name: lastName,
            user_email: email,
            phone: phone,
            request_type: requestType || 'other',
            message: message,
            attachments: attachments || [],
            status: 'new'
        };

        if (supabase) {
            const { data, error } = await supabase
                .from('concierge_requests')
                .insert(requestData)
                .select()
                .single();

            if (error) throw error;

            // TODO: Send notification email to M.Concierge team
            // await sendConciergeNotification(data);

            return res.json({
                success: true,
                requestId: data.id,
                message: 'Your request has been submitted. Our concierge team will be in touch shortly.'
            });
        }

        // Fallback: store in memory
        const request = {
            id: `req_${Date.now()}`,
            ...requestData,
            created_at: new Date().toISOString()
        };
        requestStore.push(request);

        console.log('📩 New concierge request (in-memory):', request);

        res.json({
            success: true,
            requestId: request.id,
            message: 'Your request has been submitted. Our concierge team will be in touch shortly.',
            note: 'Stored in memory (connect Supabase for persistence)'
        });

    } catch (error) {
        console.error('Error submitting request:', error);
        res.status(500).json({ error: 'Failed to submit request' });
    }
});

/**
 * GET /api/concierge/requests (Admin only - would need auth)
 * List all concierge requests
 */
router.get('/requests', async (req, res) => {
    try {
        // TODO: Add authentication check for admin

        if (supabase) {
            const { data, error } = await supabase
                .from('concierge_requests')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            return res.json({ requests: data });
        }

        // Fallback
        res.json({ requests: requestStore });

    } catch (error) {
        console.error('Error fetching requests:', error);
        res.status(500).json({ error: 'Failed to fetch requests' });
    }
});

export default router;
