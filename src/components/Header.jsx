import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { DiamondIcon } from '@/components/DiamondIcon'
import { Logo } from '@/components/Logo'

import { useState, useEffect } from 'react'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

export function Profile() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  const [isConnected2, setIsConnected2] = useState(false)

  useEffect(() => setIsConnected2(isConnected), [isConnected])

  return (
    <>
      {isConnected2 ? (
        <button onClick={() => disconnect()}>
          {address
            ? address.slice(0, 5) +
              '...' +
              address.slice(address.length - 5, address.length)
            : 'Connect Wallet'}
        </button>
      ) : (
        <button
          onClick={() => {
            connect()
          }}
        >
          Connect Wallet
        </button>
      )}
    </>
  )
}

export function Header() {
  return (
    <header className="relative z-50 pb-11 lg:pt-11">
      <Container className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap">
        <div className="mt-10 lg:mt-0 lg:grow lg:basis-0">
          <Logo className="h-12 w-auto text-slate-900" />
        </div>
        <div className="mt-5 sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
          <Button>
            <Profile></Profile>
          </Button>
        </div>
      </Container>
    </header>
  )
}
