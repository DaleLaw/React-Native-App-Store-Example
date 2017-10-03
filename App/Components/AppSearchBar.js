import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Header, Item, Input, Icon } from 'native-base'


class AppSearchBar extends Component {
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
      <Header searchBar rounded>
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
      </Header>
    )
  }
}

export default AppSearchBar
