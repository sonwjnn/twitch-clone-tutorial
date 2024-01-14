import { Container } from './_components/container'
import { Navbar } from './_components/navbar'
import { Sidebar } from './_components/sidebar'

interface BrowseLayoutProps {
  children: React.ReactNode
}

const BrowseLayout = ({ children }: BrowseLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        {/* <Suspense fallback={<SidebarSkeleton />}> */}
        <Sidebar />
        {/* </Suspense> */}
        <Container>{children}</Container>
      </div>
    </>
  )
}

export default BrowseLayout
