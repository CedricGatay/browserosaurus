import { remote } from 'electron'
import React from 'react'
import { render, wait, waitForElement } from 'react-testing-library'
import App from './app.component'

const activities = [
  {
    appId: 'Firefox',
    primaryCommand: 'open "{URL}" -a Firefox',
    enabled: true,
    hotKey: 'f',
    name: 'Firefox',
  },
  {
    primaryCommand: 'echo "{URL}" | pbcopy',
    enabled: true,
    hotKey: 'space',
    name: 'Copy To Clipboard',
  },
]

describe('Picker App', () => {
  const props = {
    isVisible: true,
    url: 'https://will-stone.github.io/browserosaurus/',
  }

  it('renders the URL', () => {
    const { queryByText } = render(<App {...props} />)
    const url = queryByText(props.url)
    expect(url.innerHTML).toBe(props.url)
  })

  it('renders the loading spinner', async () => {
    const { container } = render(<App {...props} />)
    await waitForElement(() => container.querySelector('.bp3-spinner'))
  })

  it('renders the activities list', async () => {
    const { getAllByAltText } = render(<App {...props} />)
    const browserWindow = new remote.BrowserWindow()
    browserWindow.webContents.send('activities', activities)
    await wait(() => {
      const icons = getAllByAltText('activity')
      return expect(icons).toHaveLength(2)
    })
  })
})
