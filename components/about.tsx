import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { Box } from 'goods-core'
import { ResponsiveValue } from '@styled-system/core'

interface AboutItemProps {
  title: string
  value: string
  name: string
}

const AboutItem = memo<AboutItemProps>(({ title, value, name }) => {
  return (
    <Box w className={`about-${name}-box`}>
      <strong className='attribute-title'>{title}</strong>
      <strong className='about-item-value'>{value}</strong>
    </Box>
  )
}, isEqual)

interface AboutProps {
  weight: string
  height: string
  abilityTitle: string
  ability: string
}

const gTempCol: ResponsiveValue<string> = {
  xs: '1fr',
  md: '1fr 1fr',
  xl: '1fr 1fr 1fr',
}

const About = memo<AboutProps>(({ weight, height, abilityTitle, ability }) => {
  return (
    <Box w d='grid' gTempCol={gTempCol} gap='16px' gAutoFlow='row'>
      <AboutItem title='Weight' value={weight} name='weight' />
      <AboutItem title='Height' value={height} name='height' />
      <AboutItem title={abilityTitle} value={ability} name='ability' />
    </Box>
  )
}, isEqual)

export default About
