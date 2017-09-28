import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Orientation from 'react-native-orientation'
import { StatusBar } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #efeff4;
  padding-top: ${`${StatusBar.currentHeight || 20}px`};
`

export class MainPage extends Component {
  static propTypes = {
  }

  componentDidMount() {
    Orientation.lockToLandscape()
  }


  render() {
    return (
      <Wrapper>
      </Wrapper>
    )
  }
}

export const mapStateToProps = createStructuredSelector({
})

export const mapDispatchToProps = (dispatch) => ({
  dispatch,
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
