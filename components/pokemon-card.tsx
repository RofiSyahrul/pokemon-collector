import { forwardRef, useCallback } from 'react'
import Image from 'next/image'
import { Box, mergeClass, Text } from 'goods-core'
import { ResponsiveValue } from '@styled-system/core'
import { capitalize } from 'lib/helpers'
import { useImageFallback } from 'hooks/image-fallback'
import { useAppDispatch, useAppState } from 'context/app.context'
import { Button } from 'goods-ui'

interface PokemonCardProps extends PokemonOverview {
  nickname?: string
  href?: string
  onClick?(e: React.MouseEvent): void
}

const imgSize: ResponsiveValue<string> = {
  xs: '96px',
  sm: '64px',
  md: '80px',
  lg: '96px',
}

const PokemonCard = forwardRef<HTMLDivElement, PokemonCardProps>(
  ({ id, image, name, nickname, href, onClick }, ref) => {
    const { setRef, isVisible, src } = useImageFallback(image)
    const { ownedPokemon } = useAppState()
    const dispatch = useAppDispatch()

    const removePokemon = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        const { dataset } = e.currentTarget
        const pokemon: MyPokemon = {
          id: Number(dataset.id || ''),
          name: dataset.name || '',
          nickname: dataset.nickname || '',
          image: dataset.image || '',
        }
        dispatch({ type: 'REMOVE_MY_POKEMON', payload: { pokemon } })
      },
      []
    )

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
        {...(!nickname && { as: 'a', cursor: 'pointer', href, onClick })}
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
            className={mergeClass('pokemon-name', nickname ? 'nickname' : '')}
            rule='title'
            dRule='subtitle'
            c='black40'
            cAlpha={0.96}
          >
            {nickname || capitalize(name)}
          </Text>
          {nickname && (
            <Button
              posi='absolute'
              data-id={id}
              data-name={name}
              data-image={image}
              data-nickname={nickname}
              px='xxs'
              py='xxxs'
              bg='red60'
              top='0px'
              right='0px'
              minH='fit-content'
              className='remove-btn'
              onClick={removePokemon}
            >
              Remove
            </Button>
          )}
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
