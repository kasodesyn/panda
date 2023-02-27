import Image from 'next/image'

import { Container } from '@/components/Container'

import logo1 from '@/images/logos/logo-1.png'
import logo2 from '@/images/logos/logo-2.png'
import logo3 from '@/images/logos/logo-3.png'
import logo4 from '@/images/logos/logo-4.png'
import logo5 from '@/images/logos/logo-5.png'
import logo6 from '@/images/logos/logo-6.png'

const sponsors = [
  { name: '', logo: logo1 },
  { name: '', logo: logo2 },
  { name: '', logo: logo3 },
  { name: '', logo: logo4 },
  { name: '', logo: logo5 },
  { name: '', logo: logo6 }
]

export function Sponsors() {
  return (
    <section id="sponsors" aria-label="Sponsors" className="py-20 sm:py-32">
      <Container>
        <h2 className="pixelfont mx-auto max-w-2xl text-center font-display text-4xl font-medium tracking-tighter sm:text-5xl">
        Partners  &  Investor
        </h2>
        <div className="mx-auto mt-20 grid max-w-max grid-cols-1 place-content-center gap-y-12 gap-x-32 sm:grid-cols-3 md:gap-x-16 lg:gap-x-32">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex items-center justify-center"
            >
              <Image src={sponsor.logo} alt={sponsor.name} unoptimized />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
