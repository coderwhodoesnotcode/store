import Link from "next/link"
import Image from "next/image"
import { products } from "@/lib/products"

export default function ProductSection() {
  return (
    <section className="px-6 py-14">

      <h2 className="text-2xl font-bold mb-6">
        🔥 Trending T-Shirts
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {products.map((p) => (
          <div
            key={p.id}
            className="border rounded-2xl overflow-hidden bg-white hover:shadow-lg transition"
          >

            {/* IMAGE */}
            <div className="h-60 relative">
              <Image
                  src={p.variants[0].images[0]}
                alt={p.name}
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="p-4">

              <h3 className="font-semibold">{p.name}</h3>

              <p className="text-gray-500 text-sm mt-1">
                PKR {p.price}
              </p>

              <Link href={`/product/${p.id}`}>
                <button className="mt-4 w-full bg-black text-white py-2 rounded-xl">
                  View Product
                </button>
              </Link>

            </div>

          </div>
        ))}

      </div>
    </section>
  )
}