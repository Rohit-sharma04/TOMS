import stripe from "stripe";
import { challanModel } from "../model/challan.model.js";
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

export const createCheckoutSessionController = async (req, res) => {
    try {
        console.log("req body", req.body);
        const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);
        const { challanId } = req.body;
        console.log("create session", challanId)
        const challan = await challanModel.findById(challanId);
        console.log("challan", challan)
        console.log("CLIENT_URL",process.env.CLIENT_URL)
        if (!challan) {
            return res.status(404).json({ success: false, message: 'Challan not found' });
        }

        const session = await stripeClient.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: `Traffic Challan Payment - ${challan._id}`,
                            description: challan.description,
                        },
                        unit_amount: challan.fine * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/paymentSuccess`,
            cancel_url: `${process.env.CLIENT_URL}/paymentFailed`,

            payment_intent_data: {
                metadata: {
                    challanId
                }
            }
        });
        console.log("session ", session)
        res.json({ sessionURL: session.url });
    } catch (error) {
        console.error('Error in making payment:', error);
        res.status(500).json({ success: false, message: `Error in making payment: ${error.message}` });
    }
}



export const handleStripeWebhookEvent = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.log("error = ", err.message)
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':

            const paymentIntent = event.data.object;
            console.log("payment Intent", paymentIntent)
            const { challanId } = paymentIntent.metadata;
            console.log("Payment successful for challan ID:", challanId);

            try {
                // Update the status of the challan to "Completed"
                await challanModel.findByIdAndUpdate(challanId, { status: "Completed" });
                console.log(`Challan ID ${challanId} status updated to "Completed"`);

            } catch (error) {
                console.error('Error updating challan status:', error);
            }
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    // Return a 200 response to acknowledge receipt of the event
    res.send();
}
