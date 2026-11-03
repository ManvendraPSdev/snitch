import { useSelector } from 'react-redux'
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import Login from '../features/auth/pages/Login'
import Signup from '../features/auth/pages/Signup'
import './App.css'

const GuestRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user)
  return user ? <Navigate to="/" replace /> : children
}

const Home = () => {
  const user = useSelector((state) => state.auth.user)

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#171717]">
      <header className="flex items-center justify-between border-b border-[#dedbd4] px-5 py-6 sm:px-10">
        <Link to="/" className="text-xl font-black tracking-[0.28em]">SNITCH</Link>
        {user ? (
          <p className="text-sm text-[#625f58]">Hello, <span className="font-semibold text-[#171717]">{user.name}</span></p>
        ) : (
          <nav className="flex items-center gap-5 text-sm font-medium">
            <Link to="/login" className="transition-colors hover:text-[#77736c]">Sign in</Link>
            <Link to="/signup" className="bg-[#171717] px-4 py-2.5 text-white transition-colors hover:bg-[#323232]">Join now</Link>
          </nav>
        )}
      </header>
      <main className="mx-auto flex min-h-[calc(100vh-81px)] max-w-7xl flex-col justify-center px-5 py-20 sm:px-10">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#77736c]">The new everyday</p>
        <h1 className="max-w-4xl text-6xl font-black uppercase leading-[0.92] tracking-[-0.055em] sm:text-8xl">
          Your wardrobe<span className="text-[#8aaa28]">.</span><br />Your rules.
        </h1>
        <p className="mt-8 max-w-lg text-base leading-7 text-[#77736c]">
          {user ? `You're signed in as ${user.email}. Your account is ready for the latest drops.` : 'Sign in or create an account to keep up with new drops and everyday statement pieces.'}
        </p>
        {!user && (
          <Link to="/signup" className="mt-9 w-fit bg-[#171717] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#323232]">
            Create your account
          </Link>
        )}
      </main>
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App