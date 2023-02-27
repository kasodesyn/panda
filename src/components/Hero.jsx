import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// import {parseEther} from "ethers/utils"

import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from 'wagmi'
import { address as addressContract, abi } from './contract/main'
import whiteLists from './contract/whitlist'

export function Hero() {
  const [amount, setAmount] = useState(1)
  const [wl, setWl] = useState(whiteLists)
  const [isWl, setIsWl] = useState(false)
  const [price, setPrice] = useState(0.009)

  const { address } = useAccount()

  useEffect(() => {
    setWl((x) => x.map((item) => item.toUpperCase()))
  }, [])

  useEffect(() => {
    setIsWl(() => {
      return wl.includes(address?.toUpperCase())
    })
  }, [wl, address])

  useEffect(() => {
    if (isWl) {
      setPrice(0)
      setAmount(1)
    } else {
      setPrice(0.009)
    }
  }, [isWl, address])

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: addressContract,
    abi,
    functionName: 'mintGuest',
    args: [parseInt(amount), isWl],
    // enabled: Boolean(amount),
    // chainId: "1",
    overrides: {
      value: ethers.utils.parseEther(price.toString()).mul(amount),
    },
  })

  const emoji = () => {
    if (amount == 100) return '👑🤖👑'
    if (amount >= 80) return '👪🤖👪'
    if (amount >= 70) return '👼🏼🤖👼🏼'
    if (amount >= 60) return '🫃🏼🤖🫃🏼'
    if (amount >= 50) return '🤺🤖🤺'
    if (amount >= 40) return '💋🤖💋'
    if (amount >= 30) return '👨‍❤️‍👨🤖👨‍❤️‍👨'
    if (amount >= 20) return '💗🤖💗'
    if (amount >= 10) return '🌭🤖🌭'
    if (amount >= 5) return '🍕🤖🍕'
    if (amount >= 3) return '🍗🤖🍗'
    return '🤖'
  }

  const { data, error, isError, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  function Controller() {
    return (
      <div>
        {!isWl && (
          <button
            onClick={() => setAmount((v) => (v - 1 < 1 ? 1 : v - 1))}
            className="hover:bg-grey inline-flex justify-center rounded-2xl bg-black p-2 text-base font-semibold text-white focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-blue-500 active:text-white/70"
          >
            -
          </button>
        )}
        &nbsp; {amount} {isWl && 'whitlist'} &nbsp;
        {!isWl && (
          <button
            onClick={() => {
              if (isWl) {
                setAmount((v) => (v + 1 > 1 ? 1 : v + 1))
              } else {
                setAmount((v) => (v + 1 > 100 ? 100 : v + 1))
              }
            }}
            className="hover:bg-grey inline-flex justify-center rounded-2xl bg-black p-2 text-base font-semibold text-white focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-blue-500 active:text-white/70"
          >
            +
          </button>
        )}
      </div>
    )
  }

  function Mint(params) {
    return (
      <div>
        {Math.floor(amount * price * 1000) / 1000} ETH &nbsp;&nbsp;
        <button
          disabled={!write}
          onClick={() => {
            write?.()
          }}
          className="hover:bg-grey inline-flex justify-center rounded-2xl bg-black p-2 text-base font-semibold text-white focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-blue-500 active:text-white/70"
        >
          🤖️ {isLoading ? 'Minting...' : 'Mint'} 🤖️
        </button>
        <div className="text-sm text-red-600">
          {(isPrepareError || isError) && (
            <div>
              Error: &nbsp;
              {/* {(prepareError || error)?.message} */}
              Captured by aliens...
            </div>
          )}
          {isSuccess && (
            <div className="text-sm text-green-600">
              Successfully minted your NFT!
              <div>
                <a
                  className="underline"
                  href={`https://goerli.etherscan.io/tx/${data?.hash}`}
                >
                  Tranciations on Etherscan
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="relative pt-10 pb-20 sm:py-24">
      <div className="absolute inset-x-0 -top-48 -bottom-14 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h1 className="text-black-600 pixelfont font-display text-5xl font-bold tracking-tighter sm:text-7xl">
            GET ONE “Voyager Panda ”NFT!
          </h1>
          <div className="mt-6 space-y-6 font-display text-2xl tracking-tight ">
            <p>
              In the game, players can use cryptocurrencies to buy travel
              supplies for their pandas, Food, attraction tickets, and other
              items can also be rewarded through in-game challenges and quests.
              The style of this game is fresh and lovely, and the music is very
              warm.
            </p>
          </div>
          <Button href="#" className="mt-10 w-full sm:hidden">
            Get your tickets
          </Button>
          <dl className="mt-10 grid grid-cols-2 gap-y-6 gap-x-10 sm:mt-16 sm:gap-y-10 sm:gap-x-16 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left">
            {[
              // ['Mint Price', '0.009 ETH'],
              // ['Mint Time', '2023/02/19 20:00(SGT)'],
              // ['Quantity' + emoji(), Controller()],
              // ['Mint Cost', Mint()],
              ['Mint', 'SOLD OUT'],
            ].map(([name, value]) => (
              <div key={name}>
                <dt className="text-black-600 font-mono text-sm">{name}</dt>
                <dd className="mt-0.5 text-2xl font-semibold tracking-tight ">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  )
}
