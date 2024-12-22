import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { User } from 'lucide-react'
import Link from 'next/link'
import { Cart } from '@/components/cart'

const bottomsItems = [
  { title: 'Pants', href: '#' },
  { title: 'Shorts', href: '#' },
  { title: 'Skirts', href: '#' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black">
      <div className="container flex h-14 items-center">
        <Button variant="ghost" size="icon" className="mr-8" asChild>
          <Link href="/account">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Link>
        </Button>
        <NavigationMenu className="mx-auto">
          <NavigationMenuList className="gap-6">
            <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium uppercase transition-colors hover:bg-white/10 focus:bg-white/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Tees
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium uppercase transition-colors hover:bg-white/10 focus:bg-white/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Shirts & Shackets
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-9 bg-transparent text-sm font-medium uppercase hover:bg-white/10 focus:bg-white/10">
                Bottoms
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-48 gap-3 bg-black p-4">
                  {bottomsItems.map(item => (
                    <li key={item.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 focus:bg-white/10"
                        >
                          <div className="text-sm font-medium uppercase leading-none">
                            {item.title}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium uppercase transition-colors hover:bg-white/10 focus:bg-white/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Bags
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium uppercase transition-colors hover:bg-white/10 focus:bg-white/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Sweatshirts
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Cart />
      </div>
    </header>
  )
}

