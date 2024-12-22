'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet'
import { useCart } from '@/lib/cart'
import { cartCheckoutAction } from '@/lib/actions'
import Image from 'next/image'
import { Minus, Plus, ShoppingCart, X } from 'lucide-react'

export function Cart() {
  const { state, removeItem, updateQuantity } = useCart()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-8">
          <ShoppingCart className="h-5 w-5" />
          {state.items.length > 0 && (
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs font-medium text-black">
              {state.items.length}
            </span>
          )}
          <span className="sr-only">Cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col border-l border-white/10 bg-black md:max-w-[420px]">
        <SheetHeader>
          <SheetTitle className="text-white">Cart</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-4 overflow-auto py-4">
          {state.items.length === 0 ? (
            <p className="text-sm text-white/60">No items in your cart.</p>
          ) : (
            state.items.map(item => (
              <div
                key={item.id}
                className="flex items-start gap-4 rounded-lg border border-white/10 p-4"
              >
                <div className="h-20 w-20 overflow-hidden rounded-lg border border-white/10">
                  <Image
                    src={item.images?.[0] ?? '/placeholder.svg'}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium leading-none">
                        {item.name}
                      </h4>
                      <p className="mt-1 text-sm text-white/60">
                        {item.price.display_amount}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="-mr-2 -mt-1 h-8 w-8 text-white/60 hover:text-white"
                      onClick={() => removeItem(item.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-white/10 hover:bg-white/10"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(0, item.quantity - 1))
                      }
                    >
                      <Minus className="h-3 w-3" />
                      <span className="sr-only">Decrease quantity</span>
                    </Button>
                    <span className="w-8 text-center tabular-nums">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-white/10 hover:bg-white/10"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                      <span className="sr-only">Increase quantity</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {state.items.length > 0 && (
          <SheetFooter>
            <div className="flex w-full flex-col gap-4">
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <div className="text-base font-medium">Total</div>
                <div className="text-base font-medium tabular-nums">
                  {state.total.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </div>
              </div>
              <form
                action={async (formData: FormData) => {
                  formData.set('items', JSON.stringify(state.items))
                  await cartCheckoutAction(null, formData)
                }}
              >
                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-white/90"
                >
                  Proceed to Checkout
                </Button>
              </form>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}

