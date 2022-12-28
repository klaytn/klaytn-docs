import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import styled from 'styled-components'

import bannerImg from '../images/banner.png'

import { View } from '../components'
import HomepageFeatures from '../components/HomepageFeatures'

const StyledHeaderBox = styled(View)`
  background-image: url(${bannerImg});
  padding: 60px 0;
  align-items: center;
`

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <StyledHeaderBox>
      <h1 style={{ color: 'white' }}>{siteConfig.title}</h1>
      <p style={{ color: 'white' }}>{siteConfig.tagline}</p>
    </StyledHeaderBox>
  )
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  )
}
