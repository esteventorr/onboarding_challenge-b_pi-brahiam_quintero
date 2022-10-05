import { FC, useEffect, useRef } from 'react'
import fromReactToWebComponentProps from '../../../utils/ds-utils'

export const Input: FC<PichinchaInputHTMLAttributes> = ({ onChange, ...rest }) => {
  const propsToPass = fromReactToWebComponentProps(rest)
  const inputRef = useRef<HTMLPichinchaInputElement>()

  const handleOnChange = (event: CustomEvent) => {
    onChange?.(event.detail)
  }

  useEffect(() => {
    const currentRef = inputRef.current

    currentRef?.addEventListener('eventValue', handleOnChange)
    return () => {
      currentRef?.removeEventListener('eventValue', handleOnChange)
    }
  }, [inputRef])

  return <pichincha-input ref={inputRef} {...propsToPass}></pichincha-input>
}
