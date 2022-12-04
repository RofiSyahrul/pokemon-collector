import { useMemo } from 'react'
import type { CSSProperties } from 'react'

import clsx from 'clsx'

import styles from './skeleton.module.css'

export interface SkeletonProps {
  aspectRatio?: string
  className?: string
  height?: string | number
  margin?: string
  shape?: 'rounded' | 'circle' | 'pill'
  style?: CSSProperties
  width?: string | number
}

export default function Skeleton({
  aspectRatio,
  className,
  height,
  margin,
  shape = 'rounded',
  style,
  width,
}: SkeletonProps) {
  const calculatedStyle = useMemo<CSSProperties>(() => {
    if (shape !== 'circle') {
      return { aspectRatio, height, width }
    }

    const isPercentageWidth = typeof width === 'string' && /(%|vw)$/.test(width)
    if (isPercentageWidth) {
      return { height: 0, paddingTop: width, width }
    }

    return { height: width, width }
  }, [aspectRatio, height, shape, width])

  return (
    <span
      aria-busy
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuetext='Loading...'
      className={clsx(styles.skeleton, styles[`skeleton_${shape}`], className, {
        [styles['skeleton_has-aspect-ratio']]: !!calculatedStyle.aspectRatio,
      })}
      role='progressbar'
      style={{
        ...style,
        ...calculatedStyle,
        margin,
      }}
    />
  )
}
