import { createGlobalStyle, css } from 'styled-components'
import { hexToRgba } from 'goods-core'

const AppStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  #__next {
    width: 100%;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  * {
    margin: 0;
    padding: 0;
  }

  body,
  * {
    color: inherit;
    font-family: ${props => props.theme.fontBase};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  p {
    margin: 0;
    color: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    margin: 0px;
    width: 100%;
    padding: 0px auto;
    background: ${props => props.theme.colors?.white10};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 0;
    height: 0;
  }
  input:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }
  input[type='button' i],
  input[type='submit' i],
  input[type='reset' i],
  input[type='file' i]::-webkit-file-upload-button,
  button {
    padding: 0;
  }
  input {
    -webkit-appearance: none;
    background-color: white;
    -webkit-rtl-ordering: logical;
    cursor: text;
    padding: 0;
    border: none;
  }

  .scroll::-webkit-scrollbar-track {
    width: 6px;
    border-radius: 3px;
    background-color: ${props => props.theme.colors?.white30};
  }
  .scroll::-webkit-scrollbar {
    width: 6px;
  }
  .scroll::-webkit-scrollbar-thumb {
    width: 6px;
    height: 20%;
    border-radius: 3px;
    background-color: ${props => props.theme.colors?.green50};
  }

  *:focus {
    outline: none;
    filter: none !important;
  }

  @keyframes zoom-in {
    from {
      opacity: 0;
      transform: scale(0.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes zoom-out {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.5);
    }
  }

  @keyframes pokeball {
    from {
      transform: rotate(10deg)
    }
    to {
      transform: rotate(-10deg)
    }
  }

  .pokemon-img-box img {
    border-radius: 50%;
  }

  .pokemon-name {
    border-radius: 0px 8px 8px 0px;
  }

  .pokemon-img {
    transition: transform 400ms ease-in;
    &.visible {
      transform: none;
    }
    &.not-visible {
      transform: scale(0.7);
    }
    &.catching {
      animation: pokeball 300ms ease-in infinite
    }
  }


  ${({ theme }) => {
    const { radius, colors } = theme
    const { black40, green50, black20 } = colors || {}
    return css`
      @media (hover: hover) {
        .pokemon-card img {
          filter: grayscale(100%);
        }
        .pokemon-card:hover {
          img {
            filter: none;
            transform: scale(1.1);
          }
        }
        a.pokemon-card {
          .pokemon-img-box {
            border: 1px solid rgba(0, 0, 0, 0.96);
          }
          .total-my-pokemons {
            background-color: ${black40};
          }
        }
        a.pokemon-card:hover {
          .pokemon-name {
            color: ${green50};
          }
          .pokemon-img-box {
            border-color: ${green50};
          }
          .total-my-pokemons {
            background-color: ${green50};
          }
        }
      }

      #error-page-container {
        height: calc(100vh - 80px);
        width: 100%;
        display: grid;
        grid-template-rows: repeat(2, max-content);
        gap: 12px;
        justify-content: center;
        justify-items: center;
        align-content: center;
        align-items: center;
        position: relative;
        padding-left: 16px;
        padding-right: 16px;
        h1,
        h2 {
          font-family: ${theme.fontBase};
          text-align: center;
          font-weight: bold;
        }
        h1 {
          font-size: 10rem;
          span {
            content: url(${IMAGE_FALLBACK});
            height: 8rem;
          }
        }
        h2 {
          font-size: 2.5rem;
        }
      }

      .attribute-title {
        font-size: 2rem;
        color: ${black20};
        margin-bottom: 4px;
      }

      .about-item-value {
        font-size: 2.5rem;
        color: ${hexToRgba(black40, 0.9)};
      }

      #pokemon-accordion-group {
        button {
          flex: unset;
        }
        .pokemon-accordion {
          background-color: white;
          transition: max-height padding 0.6s ease;
          padding-left: 8px;
          color: black;
          &.open {
            max-height: calc(100vh - 400px);
            padding: 8px;
            overflow: auto;
          }
        }
      }

      a.navigation {
        position: relative;
        width: 40px;
        height: 40px;
      }

      a.github-link {
        border-radius: 50%;
        img {
          border-radius: 50%;
        }
      }

      a.active {
        cursor: default;
      }

      a.my-pokemons-link {
        margin-left: 16px;
      }

      a.my-pokemons-link.active {
        border-bottom: 1px solid ${green50};
      }

      span.pokemon-name.nickname {
        max-width: calc(100% - 75px);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        overflow: hidden;
        word-break: break-word;
        overflow-wrap: break-word;
      }

      @media (max-width: 767.95px) {
        a.navigation {
          width: 32px;
          height: 32px;
        }
        a.my-pokemons-link {
          margin-left: 8px;
        }
        #error-page-container {
          height: calc(100vh - 64px);
        }
      }

      @media (min-width: 481px) and (max-width: 1080.95px) {
        .about-ability-box {
          grid-column: 1 / span 2;
        }
      }

      @media (min-width: 481px) and (max-width: 767.95px) {
        span.pokemon-name.nickname {
          line-clamp: 2;
          -webkit-line-clamp: 2;
        }
      }

      @media (max-width: 480.95px) {
        #error-page-container h1 {
          font-size: 8rem;
          span {
            height: 5rem;
          }
        }
        .attribute-title {
          font-size: 1.5rem;
        }
        .about-item-value {
          font-size: 2rem;
        }
      }

      @media (max-width: 1080.95px) {
        .pokemon-card:nth-child(even) {
          flex-direction: row-reverse;
          border-radius: ${radius('l', 'full', 'full', 'l')};
          .pokemon-text-box,
          .pokemon-name {
            border-radius: ${radius('l', '0', '0', 'l')};
          }
          .pokemon-name {
            text-align: right;
            &.nickname {
              position: absolute;
              right: 0px;
              padding-right: 8px;
            }
          }
          .total-my-pokemons {
            right: unset;
            left: 0px;
            border-radius: ${radius('0', 'l')};
          }
          .remove-btn {
            right: unset;
            left: 0px;
          }
        }
      }
    `
  }}
`

export default AppStyle
