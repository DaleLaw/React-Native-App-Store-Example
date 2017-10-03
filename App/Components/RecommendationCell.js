import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

const Wrapper = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100;
  padding-left: 10;
  padding-right: 10;
  padding-bottom: 16;
`

const AppImage = styled.Image`
  height: 80;
  width: 80;
  border-radius: 20;
`

const Title = styled.Text`
  padding-top: 8;
  padding-bottom: 4;
  font-size: 14;
`

const Category = styled.Text`
  color: grey;
  font-size: 14;
`

class RecommendationCell extends PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
  }

  render() {
    const { img, name, category } = this.props.item
    return (
      <Wrapper>
        <AppImage
          source={{ uri: img }}
        />
        <Title
          numberOfLines={2}
        >
          {name}
        </Title>
        <Category>
          {category}
        </Category>
      </Wrapper>
    )
  }
}

export default RecommendationCell
