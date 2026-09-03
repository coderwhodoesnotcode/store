"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Navbar() {

  const [cartCount, setCartCount] = useState(0)

  // 🧠 Load cart count from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartCount(cart.length)
  }, [])

  return (
    <nav className="w-full border-b bg-white sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/">
          <h1 className="text-xl font-bold cursor-pointer">
            StallWalt
          </h1>
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6">

          <Link href="/">
            <span className="text-sm hover:text-gray-600 cursor-pointer">
              Home
            </span>
          </Link>

          {/* CART */}
          <Link href="/cart">
            <div className="relative cursor-pointer">

              <span className="text-sm">
                Cart 🛒
              </span>

              {/* CART COUNT BADGE */}
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-black text-white text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}

            </div>
          </Link>

        </div>

      </div>
    </nav>
  )
}