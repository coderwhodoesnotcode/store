// app/checkout/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

interface CartItem {
    name: string
    price: number
    qty: number
    size?: string
    color?: string
}

interface FormData {
    name: string
    email: string
    whatsapp: string
    phone: string
    altPhone: string
    address: string
}

export default function CheckoutPage() {
    const router = useRouter()
    const [cart, setCart] = useState<CartItem[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const [form, setForm] = useState<FormData>({
        name: "",
        email: "",
        whatsapp: "",
        phone: "",
        altPhone: "",
        address: "",
    })

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
        setCart(storedCart)
    }, [])

    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const validate = () => {
        if (!form.name.trim()) return "Name is required"
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) return "Valid email is required"
        if (!form.whatsapp.trim()) return "WhatsApp number is required"
        if (!form.phone.trim()) return "Phone number is required"
        if (!form.address.trim()) return "Address is required"
        if (cart.length === 0) return "Your cart is empty"
        return ""
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        const validationError = validate()
        if (validationError) {
            setError(validationError)
            return
        }

        setLoading(true)

        const { error: insertError } = await supabase.from("orders").insert({
            name: form.name,
            email: form.email,
            whatsapp: form.whatsapp,
            phone: form.phone,
            alt_phone: form.altPhone || null,
            address: form.address,
            items: cart,
            total: total,
        })

        setLoading(false)

        if (insertError) {
            setError("Something went wrong. Please try again.")
            console.error(insertError)
            return
        }

        localStorage.removeItem("cart")
        router.push("/checkout/success")
    }

    return (
        <main className="max-w-5xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-10">
                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Full Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">WhatsApp Number *</label>
                            <input
                                type="tel"
                                name="whatsapp"
                                value={form.whatsapp}
                                onChange={handleChange}
                                placeholder="03XXXXXXXXX"
                                className="w-full border rounded-lg px-3 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Phone Number *</label>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="03XXXXXXXXX"
                                className="w-full border rounded-lg px-3 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Alternative Number</label>
                            <input
                                type="tel"
                                name="altPhone"
                                value={form.altPhone}
                                onChange={handleChange}
                                placeholder="Optional"
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Address *</label>
                            <textarea
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                rows={3}
                                className="w-full border rounded-lg px-3 py-2"
                                required
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-3 rounded-xl disabled:opacity-50"
                        >
                            {loading ? "Placing Order..." : "Place Order"}
                        </button>
                    </form>

                    {/* ORDER SUMMARY */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Order Summary</h2>

                        {cart.map((item, index) => (
                            <div key={index} className="border p-4 rounded-xl flex justify-between">
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-gray-500">
                                        Size: {item.size} | Color: {item.color}
                                    </p>
                                    <p className="text-sm">Qty: {item.qty}</p>
                                </div>
                                <p className="font-bold">PKR {item.price * item.qty}</p>
                            </div>
                        ))}

                        <div className="border-t pt-4 flex justify-between font-bold text-xl">
                            <span>Total</span>
                            <span>PKR {total}</span>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}