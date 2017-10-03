import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Orientation from 'react-native-orientation'
import { StatusBar, Keyboard, FlatList, View, ScrollView } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Container, Content, Text } from 'native-base'
import AppSearchBar from '../Components/AppSearchBar'
import { makeSelectFilteredFreeApps, makeSelectFreeAppsFetchState, makeSelectCurrentPage } from '../Redux/selectors/FreeAppsSelectors'
import { makeSelectFilteredRecommendations, makeSelectRecommendationsFetchState } from '../Redux/selectors/RecommendationsSelectors'
import { initAppList, loadNextPage, search } from '../Redux/actions'

export class MainPage extends Component {
  static propTypes = {
    initAppList: PropTypes.func.isRequired,
    loadNextPage: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    freeApps: PropTypes.array.isRequired,
    recommendations: PropTypes.array.isRequired,
  }

  state = {
    loadingNextPage: false,
  }

  componentDidMount() {
    this.props.initAppList()
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.currentPage !== prevProps.currentPage) {
      this.setState({
        loadingNextPage: false,
      })
    }
  }

  onSubmit = (text) => {
    this.props.search(text)
    Keyboard.dismiss()
  }

  onScrollVerticalList = ({ nativeEvent }) => {
    const { loadingNextPage } = this.state
    if (this.isCloseToBottom(nativeEvent) && !loadingNextPage) {
      this.setState({
        loadingNextPage: true,
      })
      this.props.loadNextPage()
    }
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
  };

  keyExtractor = (item, index) => index;

  renderRecommendation = ({ item, index }) => {
    return <View style={{ width: 200 }}><Text>Item(R)</Text></View>
  }

  renderFreeApp = ({ item, index }) => {
    const { recommendations } = this.props
    if (index === 0) {
      return (<FlatList
        data={recommendations}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderRecommendation}
        horizontal
      />)
    }
    return <View style={{ height: 200 }}><Text>Item(F){index}</Text></View>
  }

  render() {
    const { freeApps } = this.props
    const listItems = ['First Row Is Recommendations'].concat(freeApps)
    return (
      <Container>
        <AppSearchBar onSubmit={this.onSubmit} />
        <FlatList
          onScroll={this.onScrollVerticalList}
          scrollEventThrottle={400}
          data={listItems}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderFreeApp}
        />
      </Container>
    )
  }
}
export const mapStateToProps = createStructuredSelector({
  freeApps: makeSelectFilteredFreeApps(),
  freeAppListFetchState: makeSelectFreeAppsFetchState(),
  recommendations: makeSelectFilteredRecommendations(),
  recommendationsFetchState: makeSelectRecommendationsFetchState(),
  currentPage: makeSelectCurrentPage(),
})

export const mapDispatchToProps = (dispatch) => ({
  dispatch,
  initAppList: () => dispatch(initAppList()),
  loadNextPage: () => dispatch(loadNextPage()),
  search: () => dispatch(search()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
