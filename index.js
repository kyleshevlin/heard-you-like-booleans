/** @jsx jsx */
import { render } from 'react-dom'
import { jsx } from '@emotion/core'

function App() {
  return <h1 css={{ marginTop: 30 }}>Heard You Like Booleans</h1>
}

render(<App />, document.getElementById('app'))
