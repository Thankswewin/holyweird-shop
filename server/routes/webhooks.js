import express from 'express';
import stripe from '../lib/stripe.js';
import supabase from '../lib/supabase.js';

const router = express.Router();

/**
 * POST /api/webhooks/stripe
 * Handle Stripe webhook events
 * Note: This route receives raw body (not JSON parsed)
 */
router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!stripe) {
        return res.status(503).json({ error: 'Stripe not configured' });
    }

    let event;

    try {
        // Verify webhook signature
        if (webhookSecret && sig) {
            event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
        } else {
            // For local testing without signature verification
            event = JSON.parse(req.body.toString());
            console.warn('⚠️  Webhook signature verification skipped (no secret configured)');
        }
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).json({ error: `Webhook Error: ${err.message}` });
    }

    // Handle the event
    console.log(`📬 Received webhook: ${event.type}`);

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;
                await handleCheckoutComplete(session);
                break;
            }

            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object;
                console.log(`💰 Payment succeeded: ${paymentIntent.id}`);
                break;
            }

            case 'payment_intent.payment_failed': {
                const paymentIntent = event.data.object;
                console.log(`❌ Payment failed: ${paymentIntent.id}`);
                await handlePaymentFailed(paymentIntent);
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        res.json({ received: true });

    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
});

/**
 * Handle successful checkout completion
 */
async function handleCheckoutComplete(session) {
    console.log(`✅ Checkout completed: ${session.id}`);
    console.log(`   Customer: ${session.customer_details?.email}`);
    console.log(`   Amount: £${(session.amount_total / 100).toFixed(2)}`);

    if (!supabase) {
        console.log('   (Supabase not configured - skipping database update)');
        return;
    }

    try {
        // Update order status to paid
        const { error: updateError } = await supabase
            .from('orders')
            .update({
                status: 'paid',
                stripe_payment_intent: session.payment_intent,
                customer_name: session.customer_details?.name,
                shipping_address: session.shipping_details?.address,
                billing_address: session.customer_details?.address,
                updated_at: new Date().toISOString()
            })
            .eq('stripe_session_id', session.id);

        if (updateError) {
            console.error('Failed to update order:', updateError);
        } else {
            console.log('   Order status updated to PAID');
        }

        // TODO: Send confirmation email via SendGrid/Resend
        // await sendOrderConfirmationEmail(session);

    } catch (error) {
        console.error('Error in handleCheckoutComplete:', error);
    }
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(paymentIntent) {
    if (!supabase) return;

    try {
        // Find and update the order
        const { error } = await supabase
            .from('orders')
            .update({
                status: 'cancelled',
                notes: `Payment failed: ${paymentIntent.last_payment_error?.message || 'Unknown error'}`,
                updated_at: new Date().toISOString()
            })
            .eq('stripe_payment_intent', paymentIntent.id);

        if (error) {
            console.error('Failed to update failed order:', error);
        }
    } catch (error) {
        console.error('Error in handlePaymentFailed:', error);
    }
}

export default router;
