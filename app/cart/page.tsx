"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface CartItem {
    name: string
    price: number
    qty: number
    size?: string
    color?: string
}

export default function CartPage() {
    const router = useRouter()
    const [cart, setCart] = useState<CartItem[]>([])

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
        setCart(storedCart)
    }, [])

    // 🧮 Calculate total
    const total = cart.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    )

    const updateCart = (updated: CartItem[]) => {
        setCart(updated)
        localStorage.setItem("cart", JSON.stringify(updated))
    }

    // ❌ Remove item
    const removeItem = (index: number) => {
        const updated = [...cart]
        updated.splice(index, 1)
        updateCart(updated)
    }

    // ➕➖ Change quantity
    const changeQty = (index: number, delta: number) => {
        const updated = [...cart]
        const newQty = updated[index].qty + delta
        if (newQty < 1) return
        updated[index] = { ...updated[index], qty: newQty }
        updateCart(updated)
    }

    return (
        <main className="max-w-5xl mx-auto px-6 py-10">

            <h1 className="text-3xl font-bold mb-8">
                🛒 Your Cart
            </h1>

            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="space-y-6">

                    {cart.map((item, index) => (
                        <div
                            key={index}
                            className="border p-4 rounded-xl flex justify-between items-center"
                        >

                            <div>
                                <h2 className="font-semibold">
                                    {item.name}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Size: {item.size} | Color: {item.color}
                                </p>

                                <div className="flex items-center gap-3 mt-2">
                                    <button
                                        onClick={() => changeQty(index, -1)}
                                        className="w-7 h-7 border rounded-md text-sm"
                                    >
                                        −
                                    </button>
                                    <span className="text-sm">{item.qty}</span>
                                    <button
                                        onClick={() => changeQty(index, 1)}
                                        className="w-7 h-7 border rounded-md text-sm"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="font-bold">
                                    PKR {item.price * item.qty}
                                </p>

                                <button
                                    onClick={() => removeItem(index)}
                                    className="text-red-500 text-sm mt-2"
                                >
                                    Remove
                                </button>
                            </div>

                        </div>
                    ))}

                    {/* TOTAL */}
                    <div className="border-t pt-6 flex justify-between font-bold text-xl">
                        <span>Total</span>
                        <span>PKR {total}</span>
                    </div>

                    {/* CHECKOUT BUTTON */}
                    <button
                        onClick={() => router.push("/checkout")}
                        className="w-full bg-black text-white py-3 rounded-xl"
                    >
                        Proceed to Checkout
                    </button>

                </div>
            )}

        </main>
    )
}