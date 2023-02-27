import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/Container'


const schedule = [
  {
    date: '2023Q1',
    dateTime: '0',
    summary:
      'Customizing relevant rights and interests play based on the V1 version of "the GPT USERS"',
    timeSlots: [
      {
        name: 'Use Chat GPT',
        description: 'Eligible to use more commercial version of chatGPT',
        // start: '9:00AM',
        // end: '10:00AM',
      },
      {
        name: 'Sign in to get points',
        description:
          'You can get 1 point for signing in every day, and you can get 48 points for signing in with "the GPT User"',
        // start: '9:00AM',
        // end: '10:00AM',
      },
      {
        name: 'Chat to earn',
        description:
          'Each dialogue will consume 1 point. After the points are consumed, they will be recorded and subsequently converted into UGPT',
        // start: '9:00AM',
        // end: '10:00AM',
      },
    ],
  },
  {
    date: '2023Q2',
    dateTime: '1',
    summary:
      'Launch V2 version of "THE GPT BOTS" and launch Gamefi based on ChatGPT\'s play to earn',
    timeSlots: [
      {
        name: 'the GPT Bots',
        description:
          'Launched a rarer V2 version NFT "the GPT Bot", holders of V1 can enjoy priority purchase and discounts',
        // start: '9:00AM',
        // end: '10:00AM',
      },
      {
        name: 'Play to earn',
        description:
          'Develop a casual game based on chatGPT, and earn tokens through entertainment',
        // start: '9:00AM',
        // end: '10:00AM',
      },
      {
        name: 'More',
        description:
          'DAO community establishes and publishes Token governance methods',
        // start: '9:00AM',
        // end: '10:00AM',
      },
    ],
  },
  {
    date: '2023Q2',
    dateTime: '2',
    summary: 'Launch the latest burning game and stacking mechanism',
    timeSlots: [
      {
        name: 'Burning Gameplay',
        description: 'Will not be announced yet, so stay tuned',
        // start: '9:00AM',
        // end: '10:00AM',
      },
      {
        name: 'Staking & Deployment',
        description: 'Get more stable income by pledging NFT and UGPT',
        // start: '9:00AM',
        // end: '10:00AM',
      },
      {
        name: 'More',
        description: 'ChatFi open platform, derivatives platform, etc.',
        // start: '9:00AM',
        // end: '10:00AM',
      },
    ],
  },
]

function ScheduleTabbed() {
  let [tabOrientation, setTabOrientation] = useState('horizontal')

  useEffect(() => {
    let smMediaQuery = window.matchMedia('(min-width: 640px)')

    function onMediaQueryChange({ matches }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(smMediaQuery)
    smMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      smMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  return (
    <Tab.Group
      as="div"
      className="mx-auto grid max-w-2xl grid-cols-1 gap-y-6 sm:grid-cols-2 lg:hidden"
      vertical={tabOrientation === 'vertical'}
    >
      <Tab.List className="-mx-4 flex gap-x-4 gap-y-10 overflow-x-auto pl-4 pb-4 sm:mx-0 sm:flex-col sm:pb-0 sm:pl-0 sm:pr-8">
        {({ selectedIndex }) =>
          schedule.map((day, dayIndex) => (
            <div
              key={day.dateTime}
              className={clsx(
                'relative w-3/4 flex-none pr-4 sm:w-auto sm:pr-0',
                dayIndex !== selectedIndex && 'opacity-70'
              )}
            >
              <DaySummary
                day={{
                  ...day,
                  date: (
                    <Tab className="[&:not(:focus-visible)]:focus:outline-none">
                      <span className="absolute inset-0" />
                      {day.date}
                    </Tab>
                  ),
                }}
              />
            </div>
          ))
        }
      </Tab.List>
      <Tab.Panels>
        {schedule.map((day) => (
          <Tab.Panel
            key={day.dateTime}
            className="[&:not(:focus-visible)]:focus:outline-none"
          >
            <TimeSlots day={day} />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

function DaySummary({ day }) {
  return (
    <>
      <h3 className="text-2xl font-semibold tracking-tight">
        <time dateTime={day.dateTime}>{day.date}</time>
      </h3>
      <p className="mt-1.5 text-base tracking-tight">{day.summary}</p>
    </>
  )
}

function TimeSlots({ day, className }) {
  return (
    <ol
      role="list"
      className={clsx(
        className,
        'space-y-8 bg-white/60 py-14 px-10 text-center shadow-xl shadow-blue-900/5 backdrop-blur'
      )}
    >
      {day.timeSlots.map((timeSlot, timeSlotIndex) => (
        <li
          key={timeSlot.start}
          aria-label={`${timeSlot.name} talking about ${timeSlot.description} at ${timeSlot.start} - ${timeSlot.end} PST`}
        >
          {timeSlotIndex > 0 && (
            <div className="mx-auto mb-8 h-px w-48 bg-indigo-500/10" />
          )}
          <h4 className="text-lg font-semibold tracking-tight">
            {timeSlot.name}
          </h4>
          {timeSlot.description && (
            <p className="mt-1 tracking-tight">{timeSlot.description}</p>
          )}
          <p className="mt-1 font-mono text-sm text-slate-500">
            <time dateTime={`${day.dateTime}T${timeSlot.start}-08:00`}>
              {timeSlot.start}
            </time>
          </p>
        </li>
      ))}
    </ol>
  )
}

function ScheduleStatic() {
  return (
    <div className="hidden lg:grid lg:grid-cols-3 lg:gap-x-8">
      {schedule.map((day) => (
        <section key={day.dateTime}>
          <DaySummary day={day} />
          <TimeSlots day={day} className="mt-10" />
        </section>
      ))}
    </div>
  )
}

export function Schedule() {
  return (
    <section id="schedule" aria-label="Schedule" className="py-20 sm:py-32">
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-4xl">
          <h2 className="pixelfont font-display text-4xl font-medium tracking-tighter sm:text-5xl">
          In-Game Transactions
          </h2>

          <p className="mt-8 font-display text-2xl tracking-tight font-bold">Travel</p>
          <p className="mt-8 font-display text-2xl tracking-tight">
            After players obtain the Voyager Panda, they can start feeding and
            nurturing it. The panda will then travel to various cities,
            exploring local cuisine, culture, and post card. Each city in the
            world has its unique features, allowing players to learn about
            different cultural backgrounds and historical stories in the game.
            Upon returning from their travels, the panda will automatically
            generate a photo of the local scene, which players can collect.
          </p>
          <p className="mt-8 font-display text-2xl tracking-tight font-bold">
            Pet Raising
          </p>
          <p className="mt-8 font-display text-2xl tracking-tight">
            During the journey, players need to provide enough food,
            accommodations, and tickets for the Voyager panda. It is important
            to ensure that it maintains good physical and mental condition,
            while also nurturing its interests and skills, such as sports,
            music, and painting. The panda's status and abilities will affect
            the effectiveness of the journey and the interactions during the
            trip, such as the richness of the generated photos.
          </p>
          <p className="mt-8 font-display text-2xl tracking-tight font-bold">
            Collection and Showcase
          </p>
          <p className="mt-8 font-display text-2xl tracking-tight">
            Players can collect various souvenirs and unique items during their
            travels, such as photos, commemorative artwork, and souvenirs. Upon
            returning from the trip, a randomly generated photo of the local
            area is automatically created, and players can choose whether to
            mint it into an NFT. It will automatically create a collection on
            OpenSea to collect or sell your NFT from each trip.
          </p>
          <p className="mt-8 font-display text-2xl tracking-tight font-bold">
            Missions and Challenges
          </p>
          <p className="mt-8 font-display text-2xl tracking-tight">
            During the journey, players will receive various tasks and
            challenges, such as finding local cuisine or completing cultural
            activities, winning competitions, and more. Completing tasks and
            challenges can earn more rewards and experience and showcase their
            travel abilities and talent.
          </p>
          <p className="mt-8 font-display text-2xl tracking-tight font-bold">
            Hidden NFT
          </p>
          <p className="mt-8 font-display text-2xl tracking-tight">
            A mysterious Voyager panda NFT is hidden within the game, and
            players who discover it will gain access to special game rules. We
            will announce more details after the NFT sale is completed.
          </p>
        </div>
      </Container>
      <div className="relative mt-14 sm:mt-24">
        <div className="absolute inset-x-0 -top-40 -bottom-32 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
        </div>
        {/* <Container className="relative">
          <ScheduleTabbed />
          <ScheduleStatic />
        </Container> */}
      </div>
    </section>
  )
}
