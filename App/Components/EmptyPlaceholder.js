import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { Icon, StyleProvider, getTheme } from 'native-base'

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
`

const InnerWrapper = styled.View`
  margin-top: 60;
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

const EmptyPlaceholder = (props) => (
  <StyleProvider style={getTheme({ iconFamily: 'FontAwesome' })}>
    <Wrapper>
      <InnerWrapper>
        <MyIcon name='thumbs-o-down' />
        <MyText>{props.text}</MyText>
      </InnerWrapper>
    </Wrapper>
  </StyleProvider>
)
EmptyPlaceholder.propTypes = {
  text: PropTypes.string,
}
EmptyPlaceholder.defaultProps = {
  text: '',
}

export default EmptyPlaceholder
