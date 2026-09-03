// Edge-compatible — uses Web Crypto API instead of Node's "crypto" module
export async function getAdminToken() {
    const password = process.env.ADMIN_PASSWORD!
    const secret = process.env.ADMIN_SECRET!

    const data = new TextEncoder().encode(`${password}:${secret}`)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))

    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}