import type { FC, SVGProps } from 'react'

import clsx from 'clsx'

const ApprovedIcon: FC<SVGProps<SVGSVGElement>> = ({ className, ...props }) => {
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
      <g fill='none'>
        <rect opacity='0' width='48' height='48' />
        <circle cx='24' cy='24' r='17' fill='currentcolor' />
        <path
          d='M35.26,18.7,22.52,31.43a1.19,1.19,0,0,1-.49.32,1.62,1.62,0,0,1-.5.11.82.82,0,0,1-.27,0,.39.39,0,0,1-.18,0,.29.29,0,0,1-.14,0,1.34,1.34,0,0,1-.24-.12.56.56,0,0,1-.16-.12l0,0-.1-.08-7.57-6.34A1.5,1.5,0,0,1,12.66,23l.08-.1a1.5,1.5,0,0,1,2-.08l5.45,4.58a1.55,1.55,0,0,0,.24.19,1.49,1.49,0,0,0,1.88-.19l10.8-10.79a1.49,1.49,0,0,1,2.12,0A1.51,1.51,0,0,1,35.26,18.7Z'
          fill='var(--secondary-path-color, var(--color-neutral-dim))'
        />
      </g>
    </svg>
  )
}

export default ApprovedIcon
