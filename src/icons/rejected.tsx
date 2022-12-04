import type { FC, SVGProps } from 'react'

import clsx from 'clsx'

const RejectedIcon: FC<SVGProps<SVGSVGElement>> = ({ className, ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 48 48'
      width={32}
      height={32}
      className={clsx('transition-transform', className)}
      {...props}
    >
      <g>
        <rect fill='none' opacity='0' width='48' height='48' />
        <circle cx='24' cy='24' r='17' fill='currentcolor' />
        <path
          d='M31.42,31.42a1.49,1.49,0,0,1-2.12,0l-4.24-4.24a1.51,1.51,0,0,0-2.12,0L18.7,31.42a1.5,1.5,0,0,1-2.12-2.12l4.24-4.24a1.51,1.51,0,0,0,0-2.12L16.58,18.7a1.5,1.5,0,0,1,2.12-2.12l4.24,4.24a1.51,1.51,0,0,0,2.12,0l4.24-4.24a1.5,1.5,0,0,1,2.12,2.12l-4.24,4.24a1.51,1.51,0,0,0,0,2.12l4.24,4.24A1.49,1.49,0,0,1,31.42,31.42Z'
          stroke='transparent'
        />
      </g>
    </svg>
  )
}

export default RejectedIcon
