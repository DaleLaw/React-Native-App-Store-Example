import React, { PureComponent } from 'react'
import styled from 'styled-components/native'
import { Icon, StyleProvider, getTheme } from 'native-base'

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

const InnerWrapper = styled.View`
  flex-direction: column;
  align-items: center;
`

const MyIcon = styled(Icon)`
  font-size: 150;
  color: grey;
`

const MyText = styled.Text`
  margin-top: 30;
  font-size: 28;
  color: grey;
`

const NoResultPlaceholder = () => (
  <StyleProvider style={getTheme({ iconFamily: 'FontAwesome' })}>
    <Wrapper>
      <InnerWrapper>
        <MyIcon name='thumbs-o-down' />
        <MyText>No results found</MyText>
      </InnerWrapper>
    </Wrapper>
  </StyleProvider>
)

export default NoResultPlaceholder
