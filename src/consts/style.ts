import { css, FlattenSimpleInterpolation } from 'styled-components'

const DESKTOP_WIDE = 1920
const DESKTOP = 1440
const TABLET = 1024
const MOBILE = 480
const MINI = 320

const media = {
  overWideDesktop: `(min-width: ${DESKTOP_WIDE + 1}px)`,
  overDesktop: `(min-width: ${DESKTOP + 1}px)`,
  mini: `(max-width: ${MINI}px)`,
  mobile: `(max-width: ${MOBILE}px)`,
  tablet: `(max-width: ${TABLET}px)`,
}

const setMediaWidth = (type?: 'sm' | 'lg'): FlattenSimpleInterpolation => css`
  margin: 0 auto;
  width: ${type === 'lg' ? DESKTOP : type === 'sm' ? MOBILE : TABLET}px;
  max-width: 100%;
  @media ${media.tablet} {
    width: auto;
    margin: 0;
  }
`

const clickable = css`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`

const clickableShadow = css`
  cursor: pointer;
  :hover {
    box-shadow: 0px 0px 6px white;
  }
`

const ellipsis = css`
  display: block;
  overflow-x: hidden;
  text-overflow: ellipsis;
`

export default {
  TABLET,
  MOBILE,
  DESKTOP,
  DESKTOP_WIDE,
  setMediaWidth,
  media,
  clickable,
  clickableShadow,
  ellipsis,
}
