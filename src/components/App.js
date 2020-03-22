/** @jsx jsx */
import React from 'react'
import { css, jsx, Global } from '@emotion/core'
import { bs } from '../shevy'
import { getBooleanTable } from '../utils'

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

  return options.replace(/\s/g, '').split(',')
}

export default function App() {
  const [options, setOptions] = React.useState('')
  const parsedOptions = parseOptions(options)
  const table = getBooleanTable(parsedOptions.length)

  const mappedRows = table.map(row => {
    return parsedOptions.reduce((acc, option, idx) => {
      acc[option] = row[idx]
      return acc
    }, {})
  })

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

          [mq('600px')]: {
            width: '80%',
          },

          [mq('900px')]: {
            width: '70%',
          },

          [mq('1200px')]: {
            width: '60%',
          },
        }}
      >
        <h1 css={{ marginTop: bs(2), marginBottom: bs(2) }}>
          Heard You Like Booleans
        </h1>
        <div css={{ textAlign: 'center' }}>
          <p css={{ fontStyle: 'italic' }}>
            Type the booleans you have, separated by commas to see all the
            possible combinations
          </p>
          <label
            css={{
              display: 'block',
              fontSize: '1.5rem',
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
        <pre
          css={{
            backgroundColor: COLORS.white,
            fontSize: '1.5rem',
            padding: bs(),
            marginBottom: bs(2),
          }}
        >
          <code css={{ color: COLORS.black }}>
            {JSON.stringify(mappedRows, null, 2)}
          </code>
        </pre>

        <footer
          css={{
            fontSize: '1.25rem',
            textAlign: 'center',
            marginBottom: bs(4),
          }}
        >
          Built on stream with{' '}
          <a href="https://twitter.com/kyleshevlin">Kyle Shevlin</a>. Code at{' '}
          <a href="https://github.com/kyleshevlin/heard-you-like-booleans">
            https://github.com/kyleshevlin/heard-you-like-booleans
          </a>
        </footer>
      </div>
    </>
  )
}
