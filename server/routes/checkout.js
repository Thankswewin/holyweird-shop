import express from 'express';
import stripe from '../lib/stripe.js';
import supabase from '../lib/supabase.js';

const router = express.Router();

/**
 * POST /api/checkout/create-session
 * Create a Stripe Checkout Session
 */
router.post('/create-session', async (req, res) => {
    try {
        const { items, customerEmail, customConfig } = req.body;

        if (!stripe) {
            return res.status(503).json({
                error: 'Payment service unavailable',
                message: 'Stripe is not configured. Please add STRIPE_SECRET_KEY to environment.'
            });
        }

        if (!items || !items.length) {
            return res.status(400).json({ error: 'No items provided' });
        }

        // Build line items for Stripe
        const lineItems = items.map(item => ({
            price_data: {
                currency: 'gbp',
                product_data: {
                    name: item.name,
                    description: item.description || undefined,
                    images: item.image ? [item.image] : undefined,
                    metadata: {
                        product_id: item.id,
                        custom_config: customConfig ? JSON.stringify(customConfig) : undefined
                    }
                },
                unit_amount: item.price_gbp || (item.price * 100), // Convert to pence if needed
            },
            quantity: item.quantity || 1,
        }));

        // Calculate total for order record
        const totalAmount = lineItems.reduce((sum, item) =>
            sum + (item.price_data.unit_amount * item.quantity), 0
        );

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: lineItems,
            customer_email: customerEmail || undefined,
            success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cart`,
            metadata: {
                custom_config: customConfig ? JSON.stringify(customConfig) : undefined
            },
            shipping_address_collection: {
                allowed_countries: ['GB', 'US', 'AE', 'NL', 'NG', 'DE', 'FR', 'IT', 'ES']
            },
            billing_address_collection: 'required',
        });

        // Create pending order in database
        if (supabase) {
            const { error: orderError } = await supabase.from('orders').insert({
                stripe_session_id: session.id,
                user_email: customerEmail,
                total_amount: totalAmount,
                status: 'pending'
            });

            if (orderError) {
                console.error('Failed to create order record:', orderError);
                // Don't fail the checkout, just log it
            }
        }

        res.json({
            sessionId: session.id,
            url: session.url
        });

    } catch (error) {
        console.error('Checkout error:', error);
        res.status(500).json({
            error: 'Failed to create checkout session',
            message: error.message
        });
    }
});

/**
 * GET /api/checkout/session/:sessionId
 * Get checkout session details (for success page)
 */
router.get('/session/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;

        if (!stripe) {
            return res.status(503).json({ error: 'Payment service unavailable' });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['line_items', 'customer']
        });

        res.json({
            id: session.id,
            status: session.payment_status,
            customerEmail: session.customer_details?.email,
            amountTotal: session.amount_total,
            currency: session.currency
        });

    } catch (error) {
        console.error('Error retrieving session:', error);
        res.status(500).json({ error: 'Failed to retrieve session' });
    }
});

export default router;
