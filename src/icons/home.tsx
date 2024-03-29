import type { FC, SVGProps } from 'react'

import clsx from 'clsx'

const HomeIcon: FC<SVGProps<SVGSVGElement>> = ({ className, ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 32 32'
      width={32}
      height={32}
      className={clsx('transition-transform', className)}
      {...props}
    >
      <g fill='none'>
        <path fillOpacity='0' d='M0 0H32V32H0z' />
        <path
          d='M29.333 17c0 .552-.447 1-1 1h-2.666c-.553 0-1 .448-1 1v6.667c0 .552-.448 1-1 1h-4c-.553 0-1-.448-1-1v-3.334c0-.552-.448-1-1-1h-3.334c-.552 0-1 .448-1 1v3.334c0 .552-.447 1-1 1h-4c-.552 0-1-.448-1-1V19c0-.552-.447-1-1-1H3.667c-.397-.016-.747-.265-.892-.635-.144-.37-.056-.79.225-1.072L15.327 5.627c.39-.39 1.023-.39 1.413 0l12.333 10.666c.176.193.269.447.26.707z'
          fill='currentcolor'
        />
      </g>
    </svg>
  )
}

export default HomeIcon
