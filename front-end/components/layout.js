import Navbar from './navbar/navbar'

export default function Layout({ children }) {

  return (
    <>
      <Navbar />
      <main className="content" >
        {children}
      </main>
    </>
  )
}