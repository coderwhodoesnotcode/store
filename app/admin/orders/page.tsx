import { supabaseAdmin } from "@/lib/supabase-admin"
import LogoutButton from "./logout-button"

interface OrderItem {
    name: string
    price: number
    qty: number
    size?: string
    color?: string
}

interface Order {
    id: string
    name: string
    email: string
    whatsapp: string
    phone: string
    alt_phone: string | null
    address: string
    items: OrderItem[]
    total: number
    created_at: string
}

export default async function AdminOrdersPage() {
    const { data: orders, error } = await supabaseAdmin
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })

    return (
        <main className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Orders</h1>
                <LogoutButton />
            </div>

            {error && (
                <p className="text-red-500">Failed to load orders: {error.message}</p>
            )}

            {!error && orders?.length === 0 && <p>No orders yet</p>}

            {!error && orders && orders.length > 0 && (
                <div className="space-y-6">
                    {(orders as Order[]).map((order) => (
                        <div key={order.id} className="border rounded-xl p-5">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <p className="font-semibold">{order.name}</p>
                                    <p className="text-sm text-gray-500">{order.email}</p>
                                </div>
                                <p className="text-sm text-gray-400">
                                    {new Date(order.created_at).toLocaleString()}
                                </p>
                            </div>

                            <div className="text-sm text-gray-600 mb-3 space-y-1">
                                <p>WhatsApp: {order.whatsapp}</p>
                                <p>Phone: {order.phone}</p>
                                {order.alt_phone && <p>Alt Phone: {order.alt_phone}</p>}
                                <p>Address: {order.address}</p>
                            </div>

                            <div className="border-t pt-3 space-y-1">
                                {order.items.map((item, i) => (
                                    <div key={i} className="flex justify-between text-sm">
                                        <span>
                                            {item.name} ({item.size}, {item.color}) x{item.qty}
                                        </span>
                                        <span>PKR {item.price * item.qty}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t mt-3 pt-3 flex justify-between font-bold">
                                <span>Total</span>
                                <span>PKR {order.total}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}