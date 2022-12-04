import type { FC, SVGProps } from 'react'

import clsx from 'clsx'

const NoteIcon: FC<SVGProps<SVGSVGElement>> = ({ className, ...props }) => {
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
        <path fill='none' d='M0 0H32V32H0z' />
        <path
          d='M24.667 4.667c.368 0 .666.298.666.666v17.334c0 .368-.298.666-.666.666H7.333c-.368 0-.666-.298-.666-.666V5.333c0-.368.298-.666.666-.666h17.334m0-2H7.333c-1.472 0-2.666 1.194-2.666 2.666v17.334c0 1.472 1.194 2.666 2.666 2.666h17.334c1.472 0 2.666-1.194 2.666-2.666V5.333c0-1.472-1.194-2.666-2.666-2.666z'
          fill='currentcolor'
        />
        <rect
          width='8.667'
          height='2'
          x='8.667'
          y='8'
          rx='1'
          fill='currentcolor'
        />
        <rect
          width='3.333'
          height='2'
          x='20'
          y='8'
          rx='1'
          fill='currentcolor'
        />
        <rect
          width='14.667'
          height='2'
          x='8.667'
          y='14'
          rx='1'
          fill='currentcolor'
        />
        <rect
          width='14.667'
          height='2'
          x='8.667'
          y='18'
          rx='1'
          fill='currentcolor'
        />
      </g>
    </svg>
  )
}

export default NoteIcon
