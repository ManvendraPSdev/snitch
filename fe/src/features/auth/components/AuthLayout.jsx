import { Link } from 'react-router-dom'

const AuthLayout = ({ eyebrow, title, description, children, footer }) => {
  return (
    <main className="min-h-screen bg-[#f7f6f2] text-[#161616] lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-[#151515] px-12 py-10 text-white lg:flex xl:px-16 xl:py-12">
        <div className="pointer-events-none absolute -right-28 top-1/3 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-12 top-[42%] h-64 w-64 rounded-full border border-white/10" />
        <Link to="/" className="relative z-10 w-fit text-2xl font-black tracking-[0.28em]">
          SNITCH
        </Link>

        <div className="relative z-10 max-w-xl py-16">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
            Made for the new generation
          </p>
          <p className="text-6xl font-black uppercase leading-[0.92] tracking-[-0.055em] xl:text-7xl">
            Style that<br />speaks<span className="text-[#c7ff3e]">.</span>
          </p>
          <p className="mt-8 max-w-md text-base leading-7 text-white/60">
            Everyday essentials. Statement silhouettes. Discover fashion designed to keep up with you.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.25em] text-white/45">
          <span className="h-px w-10 bg-[#c7ff3e]" />
            New drops. Limited runs.
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10 lg:px-12">
        <div className="w-full max-w-[440px] animate-[fade-up_0.55s_ease-out_both]">
          <Link to="/" className="mb-12 inline-block text-xl font-black tracking-[0.28em] lg:hidden">
            SNITCH
          </Link>
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#77736c]">
            {eyebrow}
          </p>
          <h1 className="text-4xl font-bold tracking-[-0.045em] text-[#151515] sm:text-[42px]">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#77736c]">{description}</p>
          <div className="mt-9">{children}</div>
          <div className="mt-8 text-center text-sm text-[#77736c]">{footer}</div>
        </div>
      </section>
    </main>
  )
}

export default AuthLayout
