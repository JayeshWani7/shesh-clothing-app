import { CartItem } from '@/lib/cart'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function createCheckoutSession({ priceId }: { priceId: string }) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://v0.dev',
  })

  redirect(session.url!)
}

export async function createCartCheckoutSession({
  items,
}: {
  items: CartItem[]
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(item => ({
      price: item.price.id,
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: 'https://v0.dev',
  })

  redirect(session.url!)
}

