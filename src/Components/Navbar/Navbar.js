import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="flex bg-blue-600 h-16 items-center justify-between px-5 text-white">
      <h1 className="text-lg font-bold"> Latest International News </h1>
      <div className="space-x-3">
        <Link to="/" className="p-2 rounded-xl hover:text-blue-600 hover:bg-blue-100"> Home </Link>
        <Link to="/user/:id" className="p-2 rounded-xl hover:text-blue-600 hover:bg-blue-100"> User's News </Link>
        <Link to="/login" className="p-2 rounded-xl hover:text-blue-600 hover:bg-blue-100"> Sign In </Link>
      </div>
    </nav>
  )
}

export default Navbar
