import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import styled from 'styled-components'

import bannerImg from '../images/banner.png'

import { View } from '../components'
import HomepageFeatures from '../components/HomepageFeatures'

import Translate, { translate } from '@docusaurus/Translate'

const StyledHeaderBox = styled(View)`
  background-image: url(${bannerImg});
  padding: 60px 0;
  align-items: center;
`

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  const title = siteConfig.title
  const tagline = siteConfig.tagline
  return (
    <StyledHeaderBox>
      <h1 style={{ color: 'white' }}>
        <Translate values={{ title: title }}>{'{title}'}</Translate>
      </h1>
      <p style={{ color: 'white' }}>
        <Translate values={{ tagline: tagline }}>{'{tagline}'}</Translate>
      </p>
    </StyledHeaderBox>
  )
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Welcome to the Klaytn Docs"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  )
}
