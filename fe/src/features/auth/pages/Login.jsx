import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import FormField from '../components/FormField'
import { useAuth } from '../hook/useAuth'

const initialValues = { email: '', password: '' }

const Login = () => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const loading = useSelector((state) => state.auth.loading)
  const { handelLogin } = useAuth()
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setFormError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = {}

    if (!values.email.trim()) nextErrors.email = 'Email is required.'
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = 'Enter a valid email address.'
    if (!values.password) nextErrors.password = 'Password is required.'

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    try {
      await handelLogin({ email: values.email.trim(), password: values.password })
      navigate('/', { replace: true })
    } catch (error) {
      setFormError(error.message)
    }
  }

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in to your account"
      description="Pick up where you left off and discover your next favourite fit."
      footer={<>New to Snitch? <Link to="/signup" className="ml-1 font-semibold text-[#171717] underline decoration-[#b7b2a8] underline-offset-4 transition-colors hover:decoration-[#171717]">Create an account</Link></>}
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {formError && (
          <div role="alert" className="border-l-2 border-[#b42318] bg-[#fff1f0] px-4 py-3 text-sm leading-5 text-[#912018]">
            {formError}
          </div>
        )}
        <FormField
          id="login-email"
          name="email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <FormField
          id="login-password"
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <button
          type="submit"
          disabled={loading}
          className="group flex h-13 w-full items-center justify-center gap-3 bg-[#171717] px-5 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all duration-200 hover:bg-[#323232] focus:outline-none focus:ring-2 focus:ring-[#171717] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" aria-hidden="true" />}
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default Login
