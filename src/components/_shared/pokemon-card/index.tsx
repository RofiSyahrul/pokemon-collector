import { forwardRef, useMemo } from 'react'

import clsx from 'clsx'
import Image from 'next/legacy/image'
import Link from 'next/link'

import Skeleton from '@/components/_shared/skeleton'
import capitalize from '@/utils/capitalize'

import styles from './_styles.module.css'
import RemovePokemonButton from './components/remove-pokemon-button'
import TotalOwnedPokemons from './components/total-owned-pokemons'

interface PokemonCardProps extends PokemonOverview {
  href?: string
  nickname?: string
  priority?: boolean
  variant?: 'basic' | 'my-pokemon'
}

const PokemonCard = forwardRef<HTMLAnchorElement, PokemonCardProps>(
  ({ href, image, name, nickname, priority, variant = 'basic' }, ref) => {
    const isMyPokemonCard = variant === 'my-pokemon'

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
            <Link className={titleClassName} ref={ref} href={href}>
              {title}
            </Link>
          ) : (
            <span className={titleClassName}>{title}</span>
          )}
          {isMyPokemonCard && nickname && (
            <RemovePokemonButton
              className='absolute p-1 top-0 right-0'
              nickname={nickname}
            />
          )}
          {isMyPokemonCard ? (
            <div className={styles.card__label}>{capitalizedName}</div>
          ) : (
            <TotalOwnedPokemons
              name={name}
              loadingPlaceholder={
                <Skeleton
                  className={styles.card__label}
                  height={24}
                  style={{
                    backgroundColor: 'var(--skeleton-bg-primary)',
                    borderRadius: '0.5rem 0 0.5rem 0',
                  }}
                  width={60}
                />
              }
            />
          )}
        </div>
      </div>
    )
  }
)

export default PokemonCard
