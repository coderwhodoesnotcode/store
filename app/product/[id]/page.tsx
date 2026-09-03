import { products } from "@/lib/products"
import ProductView from "@/components/ProductView"

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {

  const { id } = await params
  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <ProductView product={product} />
    </main>
  )
}