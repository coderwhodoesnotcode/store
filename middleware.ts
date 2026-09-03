import { NextRequest, NextResponse } from "next/server"
import { getAdminToken } from "@/lib/admin-auth"

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("admin_session")?.value
    const expectedToken = await getAdminToken()

    if (token !== expectedToken) {
        const loginUrl = new URL("/admin/login", req.url)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/orders/:path*"],
}