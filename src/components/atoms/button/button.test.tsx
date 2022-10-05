import { fireEvent, render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('should display inner text', async () => {
    render(<Button size="medium">Hazme click</Button>)
    const buttonFound = await screen.findByText('Hazme click')
    expect(buttonFound).toBeDefined()
    expect(buttonFound).toHaveTextContent('Hazme click')
  })

  it('should trigger the click', async () => {
    const onClick = jest.fn()
    render(
      <Button size="medium" onClick={onClick}>
        Hazme click
      </Button>
    )
    const buttonFound = await screen.findByText('Hazme click')
    expect(onClick).toBeCalledTimes(0)
    fireEvent(buttonFound, new CustomEvent('clickbutton', { detail: '' }))
    expect(onClick).toHaveBeenCalled()
  })
})
