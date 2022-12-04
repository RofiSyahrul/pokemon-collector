'use client'

import type { FC } from 'react'

import clsx from 'clsx'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import ArrowIcon from '@/icons/arrow'
import GithubIcon from '@/icons/github'
import HomeIcon from '@/icons/home'

interface HeaderProps {
  activeLink?: 'home' | 'my-pokemons'
}

const Navigation: FC<HeaderProps> = ({ activeLink }) => {
  const isHomepage = activeLink === 'home'
  const isMyPokemonsPage = activeLink === 'my-pokemons'

  return (
    <nav>
      <ul className='flex items-center h-full p-0 list-none gap-2 lg:gap-4'>
        <li>
          <Link
            aria-current={isHomepage ? 'page' : undefined}
            className={clsx(
              'block relative w-8 h-8 lg:w-10 lg:h-10',
              'current-page:text-primary-bright'
            )}
            href='/'
            title='Go to homepage'
          >
            <HomeIcon className='w-full h-full' />
            <span className='sr-only'>Home</span>
          </Link>
        </li>
        <li>
          <Link
            aria-current={isMyPokemonsPage ? 'page' : undefined}
            className={clsx(
              'block relative w-8 h-8 lg:w-10 lg:h-10',
              'current-page:cursor-default',
              'current-page:pointer-events-none',
              'current-page:text-primary-bright',
              'current-page:border-b',
              'current-page:border-solid',
              'current-page:border-primary-bright'
            )}
            href='/my-pokemons'
            title='Go to my pokemons page'
          >
            <Image
              alt='My Pokemons'
              height={40}
              layout='intrinsic'
              loading='eager'
              objectFit='contain'
              src={IMAGE_FALLBACK}
              width={40}
            />
            <span className='sr-only'>My Pokemons</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

const Header: FC<HeaderProps> = ({ activeLink }) => {
  const router = useRouter()

  return (
    <header
      className={clsx(
        'sticky top-0 left-0 z-20 w-full h-16 lg:h-20 shadow-xl shadow-neutral-dim0 bg-neutral-dim',
        'flex justify-between items-center px-2 lg:px-4'
      )}
    >
      {activeLink === 'home' ? (
        <a
          className='relative w-8 h-8 lg:w-10 lg:h-10 rounded-full'
          href={GITHUB_URL}
          target='_blank'
          rel='noopener noreferrer'
          title='Github Repository'
        >
          <GithubIcon className='w-full h-full' />
          <span className='sr-only'>Github</span>
        </a>
      ) : (
        <button
          className='btn btn-text w-8 h-8 lg:w-10 lg:h-10'
          onClick={router.back}
          title='Go back'
          type='button'
        >
          <ArrowIcon className='w-full h-full' />
          <span className='sr-only'>Go back</span>
        </button>
      )}
      <Navigation activeLink={activeLink} />
    </header>
  )
}

export default Header
