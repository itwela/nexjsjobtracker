import Stripe from 'stripe'

const sk = process.env.STRIPE_S_KEY as string

export const stripe = new Stripe(sk, {
    typescript: true,
})


export const getStripeSession = async ({ priceId, domainUrl, customerId }: { priceId: string, domainUrl: string, customerId: string }) => {
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: 'subscription', // Fixed typo: 'mide' to 'mode'
        billing_address_collection: 'auto',
        line_items: [{ price: priceId, quantity: 1 }],
        payment_method_types: ['card'], // Fixed payment method types
        customer_update: {
          address: 'auto',
          name: 'auto',
        },
        success_url: `${domainUrl}/payment/success`,
        cancel_url: `${domainUrl}/payment/cancelled`, // Added missing comma
      });
  
      return session.url as string;
    };