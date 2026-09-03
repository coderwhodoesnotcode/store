export default function TrustBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-6 text-center border-b">

      <div>
        <p className="font-semibold">🚚 COD</p>
        <p className="text-xs text-gray-500">Cash on Delivery</p>
      </div>

      <div>
        <p className="font-semibold">⚡ Fast Delivery</p>
        <p className="text-xs text-gray-500">3–5 Days</p>
      </div>

      <div>
        <p className="font-semibold">🎓 Student Designs</p>
        <p className="text-xs text-gray-500">Relatable & Viral</p>
      </div>

      <div>
        <p className="font-semibold">🇵🇰 Pakistan Wide</p>
        <p className="text-xs text-gray-500">All Cities</p>
      </div>

    </div>
  )
}