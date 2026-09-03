import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import TrustBar from "@/components/TrustBar"
import ProductSection from "@/components/ProductSection"
import WhySection from "@/components/WhySection"
// import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <TrustBar />
      <ProductSection />
      <WhySection />
      {/* <Footer /> */}
    </main>
  )
}