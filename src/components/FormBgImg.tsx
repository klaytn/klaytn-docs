import React, { ReactElement } from 'react'
import styled from 'styled-components'

type FormBgImgProps = {
  src: string
  size?: number
  style?: React.CSSProperties
}

const getFormBgImgSize = ({ size }: { size?: number }): string =>
  size ? `${size}px` : '100%'

const StyledFormBgImg = styled.div<FormBgImgProps>`
  display: inline-block;
  background-image: url(${(props): string => props.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: ${getFormBgImgSize};
  width: ${getFormBgImgSize};
  min-width: ${({ size }): string => `${size}px` || ''};
`

const FormBgImg = (props: FormBgImgProps): ReactElement => {
  return <StyledFormBgImg {...props} />
}

export default FormBgImg
