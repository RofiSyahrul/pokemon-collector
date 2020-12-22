import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { Box, BoxProps } from 'goods-core'

interface AttributesProps {
  data: string[]
  bgItem?: BoxProps['bg']
  cItem?: BoxProps['c']
}

const Attributes = memo<AttributesProps>(
  ({ data, bgItem = 'green50', cItem = 'white' }) => {
    return (
      <Box w fDir='row' fWrap='wrap'>
        {data.map((item, index) => (
          <Box
            key={`${item}-${index}`}
            w='fit-content'
            h='fit-content'
            p='xxs'
            bTopLeftRad='l'
            bBotRightRad='l'
            bg={bgItem}
            c={cItem}
            mr='xxxs'
            mb='xxxs'
            b='1px solid'
            bC='black30'
          >
            {item}
          </Box>
        ))}
      </Box>
    )
  },
  isEqual
)

export default Attributes
