import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import FormField from '../components/FormField'
import { useAuth } from '../hook/useAuth'

const initialValues = { fullName: '', email: '', contact: '', password: '', isSeller: false }

const Signup = () => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const loading = useSelector((state) => state.auth.loading)
  const { handelRegister } = useAuth()
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target
    setValues((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setFormError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = {}

    if (values.fullName.trim().length < 3) nextErrors.fullName = 'Full name must be at least 3 characters.'
    if (!values.email.trim()) nextErrors.email = 'Email is required.'
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = 'Enter a valid email address.'
    if (!/^\d{10}$/.test(values.contact)) nextErrors.contact = 'Enter a valid 10-digit contact number.'
    if (values.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.'

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    try {
      await handelRegister({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        contact: values.contact,
        password: values.password,
        isSeller: values.isSeller,
      })
      navigate('/', { replace: true })
    } catch (error) {
      setFormError(error.message)
    }
  }

  return (
    <AuthLayout
      eyebrow="Join the community"
      title="Create your account"
      description="One account for faster checkouts, order updates and the latest drops."
      footer={<>Already have an account? <Link to="/login" className="ml-1 font-semibold text-[#171717] underline decoration-[#b7b2a8] underline-offset-4 transition-colors hover:decoration-[#171717]">Sign in</Link></>}
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {formError && (
          <div role="alert" className="border-l-2 border-[#b42318] bg-[#fff1f0] px-4 py-3 text-sm leading-5 text-[#912018]">
            {formError}
          </div>
        )}
        <FormField
          id="signup-name"
          name="fullName"
          label="Full name"
          placeholder="Your full name"
          autoComplete="name"
          value={values.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />
        <FormField
          id="signup-email"
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
          id="signup-contact"
          name="contact"
          type="tel"
          label="Contact number"
          placeholder="10-digit mobile number"
          autoComplete="tel"
          inputMode="numeric"
          maxLength={10}
          value={values.contact}
          onChange={handleChange}
          error={errors.contact}
        />
        <FormField
          id="signup-password"
          name="password"
          type="password"
          label="Password"
          placeholder="At least 6 characters"
          autoComplete="new-password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <label className="flex cursor-pointer items-center gap-3 py-1 text-sm text-[#625f58]">
          <input
            type="checkbox"
            name="isSeller"
            checked={values.isSeller}
            onChange={handleChange}
            className="h-4 w-4 accent-[#171717]"
          />
          I want to create a seller account
        </label>
        <button
          type="submit"
          disabled={loading}
          className="flex h-13 w-full items-center justify-center gap-3 bg-[#171717] px-5 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all duration-200 hover:bg-[#323232] focus:outline-none focus:ring-2 focus:ring-[#171717] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" aria-hidden="true" />}
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default Signup
