import { FC } from 'react'
import fromReactToWebComponentProps from '../../../utils/ds-utils'

export const Typography: FC<PichinchaTypographyHTMLAttributes> = (
  props: PichinchaTypographyHTMLAttributes
) => {
  const propsToPass = fromReactToWebComponentProps(props)
  return <pichincha-typography {...propsToPass}></pichincha-typography>
}
