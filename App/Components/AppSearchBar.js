import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { Header, Item, Input, Icon } from 'native-base'

const MHeader = styled(Header)`
  background: whitesmoke;
`

class AppSearchBar extends PureComponent {
  static propTypes = {
    onSearchTextChange: PropTypes.func.isRequired,
  }

  onChangeText = (text) => {
    this.props.onSearchTextChange(text)
  }

  render() {
    return (
      <MHeader searchBar rounded>
        <Item>
          <Icon name='ios-search' />
          <Input
            placeholder='Search'
            returnKeyType={'search'}
            returnKeyLabel={'search'}
            onChangeText={this.onChangeText}
          />
        </Item>
      </MHeader>
    )
  }
}

export default AppSearchBar
