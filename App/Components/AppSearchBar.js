import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { Header, Item, Input, Icon } from 'native-base'

const MHeader = styled(Header)`
  background: whitesmoke;
`

class AppSearchBar extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    text: '',
  }

  onChangeText = (text) => {
    this.setState({
      text,
    })
  }

  onSubmitEditing = () => {
    this.props.onSubmit(this.state.text)
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
            onSubmitEditing={this.onSubmitEditing}
          />
        </Item>
      </MHeader>
    )
  }
}

export default AppSearchBar
