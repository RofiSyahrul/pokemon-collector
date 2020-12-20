import { forwardRef } from 'react'
import Image from 'next/image'
import { Box, Text } from 'goods-core'
import { ResponsiveValue } from '@styled-system/core'
import { capitalize } from 'lib/helpers'
import { useImageFallback } from 'hooks/image-fallback'

interface PokemonCardProps {
  imageSrc: string
  name: string
  owned: number
  isMyPokemon?: boolean
  href?: string
}

const imgSize: ResponsiveValue<string> = {
  xs: '96px',
  sm: '64px',
  md: '80px',
  lg: '96px',
}

/* memo( */
const PokemonCard = forwardRef<HTMLDivElement, PokemonCardProps>(
  ({ imageSrc, name, owned, isMyPokemon, href }, ref) => {
    const { setRef, isVisible, src } = useImageFallback(imageSrc)

    return (
      <Box
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
        {...(!isMyPokemon && { as: 'a', cursor: 'pointer', href })}
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
            objectFit='cover'
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
            {capitalize(name)}
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
            <Text as='span' rule='caption' c='white'>
              {`Owned: ${owned}`}
            </Text>
          </Box>
        </Box>
      </Box>
    )
  }
) /* ,
  isEqual
) */

export default PokemonCard
