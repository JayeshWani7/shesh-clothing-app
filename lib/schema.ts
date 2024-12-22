import { z } from 'zod'

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  images: z.array(z.string()).optional(),
  price: z.object({
    id: z.string(),
    amount: z.number().optional(),
    display_amount: z.string().optional(),
  }),
})

export const productListSchema = z.object({
  data: z.array(productSchema),
  has_more: z.boolean(),
  starting_after: z.string().optional(),
})

