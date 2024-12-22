'use server'

import { CartItem } from '@/lib/cart'
import { createCartCheckoutSession, createCheckoutSession } from '@/lib/stripe'

export async function checkoutAction(_prevState: unknown, formData: FormData) {
  const priceId = formData.get('priceId') as string
  await createCheckoutSession({ priceId })
}

export async function cartCheckoutAction(_prevState: unknown, formData: FormData) {
  const items = JSON.parse(formData.get('items') as string) as CartItem[]
  await createCartCheckoutSession({ items })
}

