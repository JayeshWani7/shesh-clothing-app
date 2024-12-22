import { cn } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'
import { CartProvider } from '@/lib/cart'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Stripe Products and Checkout',
  description:
    'A template to showcase Stripe products, Next.js Server Actions, and a checkout flow.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          'flex min-h-svh flex-col bg-black text-white antialiased',
          inter.className
        )}
      >
        <CartProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
        </CartProvider>
      </body>
    </html>
  )
}

