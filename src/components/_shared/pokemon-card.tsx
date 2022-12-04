import { forwardRef, useCallback, useMemo } from 'react'
import type { MouseEvent, MouseEventHandler } from 'react'

import Image from 'next/image'

import { useAppDispatch, useAppState } from '@/context/app.context'

import capitalize from '@/utils/capitalize'
import clsx from 'clsx'
import styles from './pokemon-card.module.css'

interface PokemonCardProps extends PokemonOverview {
  href?: string
  nickname?: string
  onClick?(e: MouseEvent): void
  priority?: boolean
  variant?: 'basic' | 'my-pokemon'
}

const PokemonCard = forwardRef<HTMLAnchorElement, PokemonCardProps>(
  (
    { href, id, image, name, nickname, onClick, priority, variant = 'basic' },
    ref
  ) => {
    const isMyPokemonCard = variant === 'my-pokemon'
    const { ownedPokemon } = useAppState()
    const dispatch = useAppDispatch()

    const { capitalizedName, title, titleClassName } = useMemo(() => {
      const capitalized = capitalize(name)
      if (isMyPokemonCard) {
        return {
          capitalizedName: capitalized,
          title: nickname ?? '',
          titleClassName: clsx(styles.card__name, styles.card__nickname),
        }
      }

      return {
        capitalizedName: capitalized,
        title: capitalized,
        titleClassName: styles.card__name,
      }
    }, [isMyPokemonCard, name, nickname])

    const removePokemon = useCallback<MouseEventHandler<HTMLButtonElement>>(
      e => {
        e.stopPropagation()
        const { dataset } = e.currentTarget
        dispatch({
          type: 'REMOVE_MY_POKEMON',
          payload: {
            pokemon: {
              id: Number(dataset.id ?? ''),
              image: dataset.image ?? '',
              name: dataset.name ?? '',
              nickname: dataset.nickname ?? '',
            },
          },
        })
      },
      []
    )

    return (
      <div className={clsx(styles.card, { [styles.card_linkable]: !!href })}>
        <div className={styles['card__image-container']}>
          <Image
            alt={`Image of ${name}`}
            height={96}
            layout='intrinsic'
            loading={priority ? 'eager' : 'lazy'}
            objectFit='contain'
            priority={priority}
            src={image}
            width={96}
          />
        </div>
        <div className={styles.card__content}>
          {href ? (
            <a
              className={titleClassName}
              ref={ref}
              href={href}
              onClick={onClick}
            >
              {title}
            </a>
          ) : (
            <span className={titleClassName}>{title}</span>
          )}
          {isMyPokemonCard && (
            <button
              className='btn btn-solid btn-danger absolute p-1 top-0 right-0 min-h-fit'
              data-id={id}
              data-image={image}
              data-name={name}
              data-nickname={nickname}
              onClick={removePokemon}
              type='button'
            >
              Remove
            </button>
          )}
          <div className={styles.card__label}>
            {isMyPokemonCard
              ? capitalizedName
              : `Owned: ${ownedPokemon[name] ?? 0}`}
          </div>
        </div>
      </div>
    )
  }
)

export default PokemonCard
