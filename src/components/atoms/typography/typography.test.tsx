import { render, screen } from '@testing-library/react'
import { Typography } from './typography'

describe('Typography', () => {
  it('Should render with text', async () => {
    render(<Typography>Texto de prueba</Typography>)
    const input = screen.getByText('Texto de prueba')
    expect(input).toBeInTheDocument()
  })
})
