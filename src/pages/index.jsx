import Head from 'next/head'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Newsletter } from '@/components/Newsletter'
import { Schedule } from '@/components/Schedule'
import { Speakers } from '@/components/Speakers'
import { Sponsors } from '@/components/Sponsors'

import { WagmiConfig, createClient,configureChains,mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { getDefaultProvider } from 'ethers'


const { chains, provider,webSocketProvider } = configureChains(
  [mainnet],
  [
    publicProvider()
  ]
);

const client = createClient({
  provider,
  webSocketProvider,
})

export default function Home() {
  return (
    <>
      <WagmiConfig client={client}>
      <Head>
        <title>ChatAI</title>
        <meta
          name="description"
          content="At DeceptiConf you’ll learn about the latest dark patterns being developed to trick even the smartest visitors, and you’ll learn how to deploy them without ever being detected."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <Speakers />
        <Schedule />
        <Sponsors />
        {/* <Newsletter /> */}
      </main>
      <Footer />
      </WagmiConfig>
    </>
  )
}
