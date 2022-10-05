import { fireEvent, render, screen } from '@testing-library/react'
import App from './app'

describe('App component', () => {
  test('Should render the password and username input', () => {
    render(<App />)

    const usernameElement = screen.getByPlaceholderText('Nombre de usuario')
    expect(usernameElement).toBeInTheDocument()

    const passwordElement = screen.getByPlaceholderText('Password')
    expect(passwordElement).toBeInTheDocument()
  })

  test('should execute an alert when clicked the button', async () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation()

    render(<App />)

    const buttonElement = screen.getByRole('button', { name: 'Enviar' })
    expect(buttonElement).toBeInTheDocument()

    fireEvent(buttonElement, new CustomEvent('clickbutton', { detail: '' }))

    expect(mockAlert).toBeCalledTimes(1)
  })
})
