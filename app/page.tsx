import { Hero } from '@/components/hero'
import { ProductList } from '@/components/product-list'
import { getProducts } from '@/lib/products'
import '../app/globals.css';

export default async function Page() {
  const products = await getProducts()

  return (
    <div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-4">
      <Hero />
      <ProductList list={products} />
    </div>
  )
}

