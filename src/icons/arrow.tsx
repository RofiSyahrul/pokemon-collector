import type { FC, SVGProps } from 'react'

import clsx from 'clsx'

const ArrowIcon: FC<SVGProps<SVGSVGElement>> = ({ className, ...props }) => {
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
          d='M27.333 16c0 .552-.447 1-1 1H10.5c-.55.004-.996.45-1 1 .01.251.115.49.293.667l5.074 5.073c.385.39.385 1.017 0 1.407-.19.184-.443.287-.707.286-.265.006-.52-.098-.707-.286l-8.486-8.44c-.187-.186-.292-.438-.292-.7 0-.263.105-.515.292-.7.093-.09.201-.162.32-.214-.119.052-.227.124-.32.214l8.486-8.5c.25-.268.625-.378.98-.288.354.091.63.368.72.722.091.354-.019.73-.286.979l-5.074 5.073c-.285.286-.37.716-.216 1.09.155.373.519.617.923.617h15.84c.548.007.99.452.993 1z'
          fill='currentcolor'
        />
      </g>
    </svg>
  )
}

export default ArrowIcon
