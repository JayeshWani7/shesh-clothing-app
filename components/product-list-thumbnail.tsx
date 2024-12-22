'use client'

import { ProductBuyForm } from '@/components/product-buy-form'
import { useCart } from '@/lib/cart'
import { productSchema } from '@/lib/schema'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { z } from 'zod'
import { Button } from './ui/button'

export function ProductListThumbnail({
  product,
}: {
  product: z.infer<typeof productSchema>
}) {
  const { addItem } = useCart()

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10">
        <Image
          src={product.images?.[0] ?? '/placeholder.svg'}
          alt={product.name}
          width={400}
          height={400}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex items-center gap-2 py-4">
        <div className="flex flex-col gap-1">
          <div className="font-medium">{product.name}</div>
          <div className="text-white/60">{product.price.display_amount}</div>
        </div>
        <div className="ml-auto flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="border-white/10 hover:bg-white/10"
            onClick={() => addItem({ ...product, quantity: 1 })}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
          <ProductBuyForm priceId={product.price.id} />
        </div>
      </div>
    </div>
  )
}

export function ProductListThumbnailSkeleton() {
  return <div className="aspect-square rounded-lg bg-white/10" />
}

