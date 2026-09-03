import { NextRequest, NextResponse } from "next/server"
import { getAdminToken } from "@/lib/admin-auth"

export async function POST(req: NextRequest) {
    const { password } = await req.json()

    if (password !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ error: "Incorrect password" }, { status: 401 })
    }

    const res = NextResponse.json({ success: true })
    const token = await getAdminToken()

    res.cookies.set("admin_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return res
}