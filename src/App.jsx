import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Philosophy from './components/Philosophy'
import Protocol from './components/Protocol'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  return (
    <div style={{ background: '#0D0D12', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Pricing />
      <Footer />
    </div>
  )
}