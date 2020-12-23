import { memo } from 'react'
import { Box, Image } from 'goods-core'

interface LoadingProps {
  noContainer?: boolean
}

const Loading = memo<LoadingProps>(({ noContainer }) => {
  const node = (
    <Image
      src={IMAGE_FALLBACK}
      s='128px'
      objectFit='contain'
      animation='globe 800ms ease-in infinite'
    />
  )

  if (noContainer) return node

  return (
    <Box
      w
      h={{ xs: 'calc(100vh - 64px)', lg: 'calc(100vh - 80px)' }}
      fAlign='center'
      fJustify='center'
      as='main'
    >
      {node}
    </Box>
  )
})

export default Loading
