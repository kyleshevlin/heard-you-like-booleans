/** @jsx jsx */
import React from 'react'
import { css, jsx, Global } from '@emotion/core'
import shevy, { bs } from '../shevy'
import { copyValueToClipboard, getBooleanTable } from '../utils'

const BREAKPOINTS = {
  alpha: '600px',
  bravo: '900px',
  charlie: '1200px',
}

const COLORS = {
  black: '#25283D',
  plum: '#8F3985',
  white: '#E8E9EB',
}

const createMediaQuery = breakpoint => `@media (min-width: ${breakpoint})`
const mq = createMediaQuery

const parseOptions = options => {
  if (!options.length) {
    return []
  }

  return options
    .replace(/\s/g, '')
    .split(',')
    .filter(str => str !== '')
}

const getInitialOptions = () => {
  if (typeof URLSearchParams === 'undefined') {
    return ''
  }

  const params = new URLSearchParams(document.location.search.substring(1))
  return params.get('options') || ''
}

export default function App() {
  const [options, setOptions] = React.useState(getInitialOptions)
  const parsedOptions = parseOptions(options)
  const table = getBooleanTable(parsedOptions.length)

  const mappedRows = table.map(row => {
    return parsedOptions.reduce((acc, option, idx) => {
      acc[option] = row[idx]
      return acc
    }, {})
  })

  const stringifiedRows = JSON.stringify(mappedRows, null, 2)

  React.useEffect(() => {
    history.replaceState({}, '', `?options=${options}`)
  }, [options])

  return (
    <>
      <Global
        styles={css`
          *,
          *:after,
          *:before {
            box-sizing: inherit;
          }

          html {
            box-sizing: border-box;
            font-family: sans-serif;
            font-size: 125%;
            line-height: ${shevy.baseLineHeight};

            ${mq(BREAKPOINTS.alpha)} {
              font-size: 150%;
            }
          }

          body {
            background-color: ${COLORS.plum};
            color: ${COLORS.white};
            padding: 0;
            margin: 0;
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            text-align: center;
          }

          a {
            color: ${COLORS.black};
          }
        `}
      />
      <div
        css={{
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '90%',

          [mq(BREAKPOINTS.alpha)]: {
            width: '80%',
          },

          [mq(BREAKPOINTS.bravo)]: {
            width: '70%',
          },

          [mq(BREAKPOINTS.charlie)]: {
            width: '60%',
          },
        }}
      >
        <h1 css={{ marginTop: bs(2), marginBottom: bs(2) }}>
          Heard You Like Booleans
        </h1>
        <div css={{ textAlign: 'center', marginBottom: bs(2) }}>
          <p css={{ fontStyle: 'italic' }}>
            Type the booleans you have, separated by commas to see all the
            possible combinations
          </p>
          <label
            css={{
              display: 'block',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: bs(0.5),
            }}
            htmlFor="options"
          >
            Options
          </label>
          <input
            css={{
              backgroundColor: 'transparent',
              border: `2px solid ${COLORS.white}`,
              borderRadius: 4,
              color: COLORS.white,
              display: 'block',
              fontSize: '1.25rem',
              padding: `${bs(0.5)} ${bs(0.5)}`,
              textAlign: 'center',
              width: '100%',

              '&:focus': {
                outlineColor: COLORS.white,
              },
            }}
            id="options"
            onChange={e => {
              setOptions(e.target.value)
            }}
            type="text"
            value={options}
          />
        </div>
        {mappedRows.length ? (
          <div>{mappedRows.length} boolean combinations</div>
        ) : null}
        <pre
          css={{
            backgroundColor: COLORS.white,
            fontSize: '1.25rem',
            padding: bs(),
            marginBottom: bs(2),
            position: 'relative',
          }}
        >
          <div
            css={{
              position: 'absolute',
              top: bs(0.5),
              right: bs(0.5),
            }}
          >
            <button
              css={{ marginRight: 5 }}
              disabled={!mappedRows.length}
              onClick={() => copyValueToClipboard(stringifiedRows)}
            >
              Copy Result to Clipboard
            </button>
            <button
              disabled={!mappedRows.length}
              onClick={() => copyValueToClipboard(window.location.href)}
            >
              Copy URL to Clipboard
            </button>
          </div>
          <code css={{ color: COLORS.black }}>{stringifiedRows}</code>
        </pre>

        <footer
          css={{
            textAlign: 'center',
            marginBottom: bs(4),
          }}
        >
          Built on <a href="https://twitch.tv/kyleshevlin">stream</a> with{' '}
          <a href="https://twitter.com/kyleshevlin">Kyle Shevlin</a>. Code at{' '}
          <a href="https://github.com/kyleshevlin/heard-you-like-booleans">
            https://github.com/kyleshevlin/heard-you-like-booleans
          </a>
        </footer>
      </div>
    </>
  )
}
