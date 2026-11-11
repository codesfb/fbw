'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/views/home/sections/HeroSection'
import AboutPreviewSection from '@/views/home/sections/AboutPreviewSection'
import ProjectsPreviewSection from '@/views/home/sections/ProjectsPreviewSection'
import ContactSection from '@/views/home/sections/ContactSection'

export function Home() {
  return (
    <div className="flex min-h-screen flex-col font-mono">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutPreviewSection />
        <ProjectsPreviewSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default Home
