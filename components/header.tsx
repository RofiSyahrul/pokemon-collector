/* eslint-disable jsx-a11y/anchor-is-valid */
import { memo } from 'react'
import { useRouter } from 'next/router'
import { Box, Icon, mergeClass } from 'goods-core'
import Image from 'next/image'
import Link from 'next/link'

const githubIcon =
  'https://github.githubassets.com/apple-touch-icon-114x114.png'

const HOME_PATH = '/'
const MY_POKEMONS_PATH = '/my-pokemons'

const Header = memo(() => {
  const router = useRouter()
  const { pathname } = router
  const isHome = pathname === HOME_PATH
  const isMyPokemons = pathname === MY_POKEMONS_PATH
  return (
    <Box
      as='header'
      posi='sticky'
      top='0px'
      left='0px'
      z='appBar'
      w
      h={{ xs: '64px', lg: '80px' }}
      shadow='high'
      bg='white'
      fDir='row'
      fJustify='space-between'
      fAlign='center'
      px={{ xs: 'xs', lg: 'm' }}
    >
      {isHome ? (
        <a
          href={GITHUB_URL}
          target='_blank'
          rel='noreferrer'
          className='navigation github-link'
        >
          <Image
            src={githubIcon}
            alt='Github'
            layout='fill'
            objectFit='contain'
          />
        </a>
      ) : (
        <Icon
          name='arrow'
          s={{ xs: '32px', lg: '40px' }}
          c='black30'
          cursor='pointer'
          onClick={router.back}
        />
      )}
      <Box fDir='row' as='nav' fAlign='center' h>
        <Link href={HOME_PATH}>
          <a
            className={mergeClass(
              'navigation home-link',
              isHome ? 'active' : ''
            )}
            title='Go to homepage'
          >
            <Icon
              c='green50'
              name={isHome ? 'home' : 'homeOff'}
              s={{ xs: '32px', lg: '40px' }}
            />
          </a>
        </Link>
        <Link href={MY_POKEMONS_PATH}>
          <a
            className={mergeClass(
              'navigation my-pokemons-link',
              isMyPokemons ? 'active' : ''
            )}
            title='Go to my pokemons page'
          >
            <Image
              src={IMAGE_FALLBACK}
              alt='My Pokemons'
              layout='fill'
              objectFit='contain'
            />
          </a>
        </Link>
      </Box>
    </Box>
  )
})

export default Header
