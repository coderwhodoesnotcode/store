"use client"

import { useState } from "react"

export default function AddToCart({ product, variant }: any) {

  const [size, setSize] = useState("")
  const [qty, setQty] = useState(1)

  const handleAddToCart = () => {
    if (!size) {
      alert("Please select size")
      return
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      size,
      color: variant.color, // 🔥 comes from ProductView
      qty,
    }

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")

    existingCart.push(cartItem)

    localStorage.setItem("cart", JSON.stringify(existingCart))

    alert("Added to cart 🛒")
  }

  return (
    <div className="mt-6 space-y-4">

      {/* SIZE */}
      <div>
        <p className="font-semibold">Size</p>
        <div className="flex gap-2 mt-2">
          {product.sizes.map((s: string) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`px-4 py-2 border rounded-lg ${
                size === s ? "bg-black text-white" : ""
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* SELECTED COLOR DISPLAY */}
      <div>
        <p className="font-semibold">Selected Color</p>
        <div className="mt-2 px-4 py-2 border rounded-lg inline-block bg-gray-100">
          {variant.color}
        </div>
      </div>

      {/* QUANTITY */}
      <div>
        <p className="font-semibold">Quantity</p>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3 py-1 border rounded"
          >
            -
          </button>

          <span>{qty}</span>

          <button
            onClick={() => setQty((q) => q + 1)}
            className="px-3 py-1 border rounded"
          >
            +
          </button>
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-black text-white py-3 rounded-xl font-semibold"
      >
        Add to Cart 🛒
      </button>

    </div>
  )
}