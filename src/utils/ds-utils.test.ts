import fromReactToWebComponentProps from './ds-utils'

describe('fromReactToWebComponentProps', () => {
  it('should convert to web component props', () => {
    const props = fromReactToWebComponentProps({ hidePasswordText: '1' })

    expect(props).toEqual({ 'hide-password-text': '1' })
  })

  it('should not convert to web component props if the value is a fuction', () => {
    const props = fromReactToWebComponentProps({
      onChange: () => {}
    })

    expect(props).toEqual({})
  })
})
