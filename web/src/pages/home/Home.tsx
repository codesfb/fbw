import Navbar from '@/components/Navbar'
import UnderConstruction from '@/components/common/UnderConstruction'

type PageProps = {
  title?: string
  description?: string
}

export function Home({ title, description }: PageProps) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <UnderConstruction pageName={title} description={description} />
    </div>
  )
}

export default Home
