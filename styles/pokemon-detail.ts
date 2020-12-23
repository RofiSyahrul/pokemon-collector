import { createGlobalStyle, css } from 'styled-components'
import { getInverseBw } from 'goods-core'

interface PokemonDetailStyleProps {
  type: PokemonType
}

const PokemonDetailStyle = createGlobalStyle<PokemonDetailStyleProps>`
  ${({ theme, type }) => {
    const { colors } = theme
    if (!colors) return css``
    const bg = colors[type]
    const c = getInverseBw(bg)
    const cRgba =
      c === 'black' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'
    return css`
      #${type}-container {
        background-color: ${bg};
        color: ${c};
        h1 {
          font-size: 34px;
          font-weight: bold;
          line-height: 1;
          letter-spacing: -0.25px;
          word-break: break-word;
          color: ${c};
        }
        #catch-btn-top {
          background-color: ${cRgba};
          color: ${bg};
        }
        .pokemon-accordion-container.open button {
          background-color: ${bg};
        }
        .pokemon-accordion.open {
          border: 1px solid ${bg};
        }
        .pokemon-accordion:not(.empty) {
          color: ${c};
        }
        .scroll::-webkit-scrollbar-thumb {
          background-color: ${bg};
        }
      }
      #${type}-item-container {
        background-color: ${bg};
        color: ${c};
        &:first-child {
          border: 1px solid ${c};
        }
        span {
          color: ${c};
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0px;
        }
      }
      #pokemon-nickname {
        .text {
          word-break: break-word;
          overflow-wrap: break-word;
        }
      }
    `
  }}
`

export default PokemonDetailStyle
