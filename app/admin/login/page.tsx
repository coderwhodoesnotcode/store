"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
    const router = useRouter()
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        })

        setLoading(false)

        if (!res.ok) {
            setError("Incorrect password")
            return
        }

        router.push("/admin/orders")
    }

    return (
        <main className="max-w-sm mx-auto px-6 py-20">
            <h1 className="text-2xl font-bold mb-6">Admin Login</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full border rounded-lg px-3 py-2"
                    required
                    autoFocus
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-3 rounded-xl disabled:opacity-50"
                >
                    {loading ? "Checking..." : "Login"}
                </button>
            </form>
        </main>
    )
}