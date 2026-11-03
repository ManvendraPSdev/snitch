import { useState } from 'react'

const FormField = ({ id, label, type = 'text', error, ...inputProps }) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type
  const errorId = `${id}-error`

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#46433e]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`h-13 w-full rounded-none border bg-white px-4 text-[15px] text-[#181818] outline-none transition-all duration-200 placeholder:text-[#aaa69e] focus:ring-2 ${error ? 'border-[#b42318] focus:border-[#b42318] focus:ring-[#b42318]/10' : 'border-[#d8d4cc] hover:border-[#aaa69e] focus:border-[#171717] focus:ring-[#171717]/5'} ${isPassword ? 'pr-12' : ''}`}
          {...inputProps}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[#625f58] transition-colors hover:text-black"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden="true">
                <path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 4.2A10.7 10.7 0 0 1 12 4c5.5 0 9 6 9 6a17.5 17.5 0 0 1-2.1 3.1M6.6 6.6C4.2 8.1 3 10 3 10s3.5 6 9 6a9.7 9.7 0 0 0 4.1-.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden="true">
                <path d="M3 10s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <p id={errorId} className="mt-2 text-xs leading-5 text-[#b42318]">{error}</p>}
    </div>
  )
}

export default FormField
