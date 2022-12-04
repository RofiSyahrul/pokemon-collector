import type { FC } from 'react'

import clsx from 'clsx'

import styles from './about.module.css'

interface AboutItemProps {
  title: string
  value: string
  name: string
}

const AboutItem: FC<AboutItemProps> = ({ title, value, name }) => {
  return (
    <div
      className={clsx('flex flex-col w-full', {
        [styles.about__ability]: name === 'ability',
      })}
    >
      <strong className={styles.about__title}>{title}</strong>
      <strong className={styles.about__value}>{value}</strong>
    </div>
  )
}

interface AboutProps {
  weight: string
  height: string
  abilityTitle: string
  ability: string
}

const About: FC<AboutProps> = ({ weight, height, abilityTitle, ability }) => {
  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 grid-flow-row'>
      <AboutItem title='Weight' value={weight} name='weight' />
      <AboutItem title='Height' value={height} name='height' />
      <AboutItem title={abilityTitle} value={ability} name='ability' />
    </div>
  )
}

export default About
