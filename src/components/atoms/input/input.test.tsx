import { fireEvent, render, screen } from '@testing-library/react'
import { Input } from './input'

describe('Input', () => {
  it('Should render with placeholder', async () => {
    render(<Input placeholder="escribir algo..." type="text"></Input>)
    const input = screen.getByPlaceholderText('escribir algo...')
    expect(input).toBeInTheDocument()
  })

  it('Should trigger the onChange callback', async () => {
    const onChange = jest.fn()
    render(<Input placeholder="Registro panel" type="text" onChange={onChange} />)
    const input = screen.getByPlaceholderText('Registro panel')
    fireEvent(input, new CustomEvent('eventValue', { detail: '123' }))
    expect(onChange).toBeCalledWith('123')
    expect(onChange).toBeCalledTimes(1)
  })
})
