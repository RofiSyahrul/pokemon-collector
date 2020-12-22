import { forwardRef } from 'react'
import Image from 'next/image'
import { Box, Text } from 'goods-core'
import { ResponsiveValue } from '@styled-system/core'
import { capitalize } from 'lib/helpers'
import { useImageFallback } from 'hooks/image-fallback'
import { useAppState } from 'context/app.context'

interface PokemonCardProps extends PokemonOverview {
  nickname?: string
  href?: string
}

const imgSize: ResponsiveValue<string> = {
  xs: '96px',
  sm: '64px',
  md: '80px',
  lg: '96px',
}

const PokemonCard = forwardRef<HTMLDivElement, PokemonCardProps>(
  ({ id, image, name, nickname, href }, ref) => {
    const { setRef, isVisible, src } = useImageFallback(image)
    const { ownedPokemon } = useAppState()

    return (
      <Box
        id={`${id}-${name}${nickname ? `-${nickname}` : ''}`}
        className='pokemon-card'
        fDir='row'
        fAlign='center'
        w
        bTopLeftRad='full'
        bBotLeftRad='full'
        bTopRightRad='l'
        bBotRightRad='l'
        bg='white20'
        shadow='high'
        h={imgSize}
        ref={ref}
        transform={isVisible ? 'none' : 'scale(0.8)'}
        transition='transform 250ms ease-in'
        {...(!nickname && { as: 'a', cursor: 'pointer', href })}
      >
        <Box
          as='span'
          s={imgSize}
          radius='full'
          className='pokemon-img-box'
          shadow='high'
          b='1px solid'
          bC='green50'
          posi='relative'
          bg='white'
          ref={setRef}
        >
          <Image
            src={src}
            objectFit='contain'
            loading='lazy'
            layout='fill'
            alt={`Image of ${name}`}
          />
        </Box>
        <Box
          as='span'
          className='pokemon-text-box'
          bTopRightRad='l'
          bBotRightRad='l'
          f='1'
          h
          posi='relative'
          px='xxs'
        >
          <Text
            as='span'
            className='pokemon-name'
            rule='title'
            dRule='subtitle'
            c='black40'
            cAlpha={0.96}
          >
            {nickname || capitalize(name)}
          </Text>
          <Box
            as='span'
            className='total-my-pokemons'
            posi='absolute'
            bottom='0px'
            right='0px'
            p='xxxs'
            bTopLeftRad='l'
            bBotRightRad='l'
            bg='green50'
          >
            <Text as='span' rule='caption' fSize='12px' c='white'>
              {nickname
                ? capitalize(name)
                : `Owned: ${ownedPokemon[name] || 0}`}
            </Text>
          </Box>
        </Box>
      </Box>
    )
  }
)

PokemonCard.displayName = 'PokemonCard'

export default PokemonCard
