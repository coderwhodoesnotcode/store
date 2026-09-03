"use client"

import { useState } from "react"
import Image from "next/image"
import AddToCart from "./AddToCart"

export default function ProductView({ product }: any) {

  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0]
  )

  return (
    <div className="grid md:grid-cols-2 gap-10">

      {/* IMAGE */}
      <div>
        <div className="h-[420px] bg-gray-100 rounded-2xl overflow-hidden">
          <Image
            src={selectedVariant.images[0]}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-full object-contain p-4"
          />
        </div>
      </div>

      {/* INFO */}
      <div>

        <h1 className="text-3xl font-bold">{product.name}</h1>

        <p className="text-gray-600 mt-3">
          {product.description}
        </p>

        <p className="text-2xl font-bold mt-4">
          PKR {product.price}
        </p>

        {/* COLOR SELECTOR */}
        <div className="mt-6">
          <p className="font-semibold">Color</p>

          <div className="flex gap-2 mt-2">
            {product.variants.map((v: any) => (
              <button
                key={v.color}
                onClick={() => setSelectedVariant(v)}
                className={`px-4 py-2 border rounded-lg ${
                  selectedVariant.color === v.color
                    ? "bg-black text-white"
                    : ""
                }`}
              >
                {v.color}
              </button>
            ))}
          </div>
        </div>

        {/* PASS SELECTED VARIANT */}
        <AddToCart product={product} variant={selectedVariant} />

      </div>
    </div>
  )
}