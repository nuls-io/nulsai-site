import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

const Title = styled.div`
  font-size: 100px;
  line-height: 110px;
  white-space: pre;
  margin-bottom: 70px;
  white-space: pre-wrap;

  @media screen and (max-width: 600px) {
    font-size: 48px;
    line-height: 52px;
  }
`

const BlackBgTitle: React.FC<PropsWithChildren> = ({ children }) => {
  return <Title className="black-bg-title">{children}</Title>
}

export default BlackBgTitle
