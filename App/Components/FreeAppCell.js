import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import RatingsControl from './RatingsControl'
import FetchState from '../Constants/FetchState'

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 86;
  padding-top: 8px;
  padding-bottom: 8px;
`

const Index = styled.Text`
  font-size: 20;
  color: grey;
  padding-left: 18;
  padding-right: 16;
`

const AppImage = styled.Image`
  height: 70;
  width: 70;
  padding-top: 2;
  padding-bottom: 2;
  border-radius: ${(props) => props.index % 2 === 1 ? 20 : 35};
`

const InfoWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  padding-left: 10;
  justify-content: flex-start;
`

const Title = styled.Text`
  font-size: 14;
  align-self: flex-start;
`

const Category = styled.Text`
  padding-top: 8;
  padding-bottom: 8;
  color: grey;
  font-size: 14;
`

const RatingsWrapper = styled.View`
  flex-direction: row;
  opacity: ${(props) => props.visible ? 1 : 0}
`

const RatingsCount = styled.Text`
  padding-left: 8;
  font-size: 14;
  color: grey
`

class FreeAppCell extends PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
  }

  render() {
    const { item, index } = this.props
    const { img, name, category } = item
    return (
      <Wrapper>
        <Index>
          {index + 1}
        </Index>
        <AppImage
          index={index + 1}
          source={{ uri: img }}
        />
        <InfoWrapper>
          <Title
            numberOfLines={2}
          >
            {name}
          </Title>
          <Category>
            {category}
          </Category>
          <RatingsWrapper visible={item.fetchState === FetchState.SUCCESS}>
            <RatingsControl ratings={item.averageUserRating} />
            <RatingsCount>
              {`(${item.userRatingCount})`}
            </RatingsCount>
          </RatingsWrapper>
        </InfoWrapper>
      </Wrapper>
    )
  }
}

export default FreeAppCell
