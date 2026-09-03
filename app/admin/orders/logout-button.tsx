"use client"

import { useRouter } from "next/navigation"

export default function LogoutButton() {
    const router = useRouter()

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" })
        router.push("/admin/login")
    }

    return (
        <button
            onClick={handleLogout}
            className="text-sm text-red-500 border border-red-500 px-4 py-2 rounded-lg"
        >
            Logout
        </button>
    )
}