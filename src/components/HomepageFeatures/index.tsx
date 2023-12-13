import React from 'react'
import Link from '@docusaurus/Link'
import styled from 'styled-components'

import img1 from '../../images/thum_01_L.png'
import img2 from '../../images/thum_02_L.png'
import img3 from '../../images/thum_03_L.png'
import img4 from '../../images/thum_04_L.png'
import img5 from '../../images/thum_05_L.png'
import img6 from '../../images/thum_06_L.png'

import View from '../View'
import style from '@site/src/consts/style'
import FormBgImg from '../FormBgImg'

import Translate, { translate } from '@docusaurus/Translate'

type FeatureType = {
  title: JSX.Element
  imgSrc: string
  description: JSX.Element
  to: string
}

const StyledSection = styled.section`
  ${style.setMediaWidth('lg')}
`

const StyledGrid = styled(View)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 60px 0;
  gap: 40px;

  @media ${style.media.tablet} {
    grid-template-columns: 1fr;
  }
`

const StyledImgBox = styled(View)`
  align-items: center;
  padding-bottom: 20px;
`

const featureList: FeatureType[] = [
  {
    title: <Translate>Klaytn Overview</Translate>,
    imgSrc: img1,
    description: <Translate>Want to know about Klaytn?</Translate>,
    to: '/docs/learn',
  },
  {
    title: <Translate>Getting Started</Translate>,
    imgSrc: img2,
    description: <Translate>Want to start building on Klaytn?</Translate>,
    to: '/docs/build',
  },
  {
    title: <Translate>Node Operators</Translate>,
    imgSrc: img3,
    description: <Translate>Instructions on running Klaytn's nodes</Translate>,
    to: '/docs/nodes',
  },
  {
    title: <Translate>API references</Translate>,
    imgSrc: img4,
    description: <Translate>APIs and libraries</Translate>,
    to: '/docs/references',
  },
  {
    title: <Translate>Klaytn Developer Hub</Translate>,
    imgSrc: img5,
    description: <Translate>Klaytn's Developer portal</Translate>,
    to: 'https://developer.klaytn.foundation',
  },
  {
    title: <Translate>Klaytn Developer Forum</Translate>,
    imgSrc: img6,
    description: <Translate>Got a question? Visit our forum!</Translate>,
    to: 'https://forum.klaytn.foundation',
  },
]

function Feature({ imgSrc, title, description, to }: FeatureType) {
  return (
    <View>
      <Link to={to}>
        <StyledImgBox>
          <FormBgImg src={imgSrc} style={{ width: '100%', height: 150 }} />
        </StyledImgBox>
        <View style={{ alignItems: 'center' }}>
          <h3>{title}</h3>
          <p style={{ textAlign: 'center' }}> {description}</p>
        </View>
      </Link>
    </View>
  )
}

export default function HomepageFeatures() {
  return (
    <StyledSection>
      <StyledGrid>
        {featureList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </StyledGrid>
    </StyledSection>
  )
}
