"use client"

import { useState } from "react"

export default function OrderForm() {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: ""
  })

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {

    // STEP 1: basic validation
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all fields")
      return
    }

    // STEP 2: send order (later connect Supabase)
    console.log("Order:", form)

    // STEP 3: WhatsApp redirect (VERY IMPORTANT for Pakistan COD)
    const message = `New Order:%0AName: ${form.name}%0APhone: ${form.phone}%0AAddress: ${form.address}`

    window.open(`https://wa.me/92XXXXXXXXXX?text=${message}`, "_blank")
  }

  return (
    <div className="grid gap-4 max-w-md">

      <input
        name="name"
        placeholder="Full Name"
        className="border p-3 rounded-lg"
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone Number"
        className="border p-3 rounded-lg"
        onChange={handleChange}
      />

      <textarea
        name="address"
        placeholder="Full Address"
        className="border p-3 rounded-lg"
        onChange={handleChange}
      />

      <button
        onClick={handleSubmit}
        className="bg-black text-white py-3 rounded-xl"
      >
        Confirm Order (COD)
      </button>

      <p className="text-xs text-gray-500 text-center">
        We will contact you on WhatsApp after order confirmation.
      </p>

    </div>
  )
}