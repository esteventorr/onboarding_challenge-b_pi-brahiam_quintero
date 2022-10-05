import { FC, useEffect, useRef } from 'react'
import fromReactToWebComponentProps from '../../../utils/ds-utils'

export const Button: FC<PichinchaButtonHTMLAttributes> = ({ onClick, ...rest }) => {
  const propsToPass = fromReactToWebComponentProps(rest)

  const buttonRef = useRef<HTMLPichinchaButtonElement>()

  const handleOnClick = () => {
    console.log('click')
    onClick?.()
  }

  useEffect(() => {
    const buttonNode = buttonRef.current

    buttonNode?.addEventListener('clickbutton', handleOnClick)

    return () => {
      buttonNode?.removeEventListener('clickbutton', handleOnClick)
    }
  }, [buttonRef])

  return <pichincha-button role="button" ref={buttonRef} {...propsToPass}></pichincha-button>
}
