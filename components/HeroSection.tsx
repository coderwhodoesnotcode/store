export default function HeroSection() {
  return (
    <section className="px-6 py-20 text-center bg-gradient-to-b from-black to-gray-900 text-white">

      <p className="text-sm text-gray-300">
        🇵🇰 Pakistan’s Student Fashion Brand
      </p>

      <h1 className="text-4xl md:text-6xl font-bold mt-3 leading-tight">
        Wear Your Student Identity 🎓
      </h1>

      <p className="mt-5 text-gray-300 max-w-xl mx-auto">
        Funny, relatable & motivational T-shirts made for students who live the grind.
      </p>

      <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
        <a className="bg-white text-black px-6 py-3 rounded-xl font-semibold">
          Shop T-Shirts
        </a>

        <a className="border border-white px-6 py-3 rounded-xl">
          View Latest Drop
        </a>
      </div>

      <p className="mt-6 text-xs text-gray-400">
        🚚 Cash on Delivery Available All Over Pakistan
      </p>

    </section>
  )
}