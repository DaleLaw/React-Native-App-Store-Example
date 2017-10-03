import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Keyboard, FlatList } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Container } from 'native-base'
import AppSearchBar from '../Components/AppSearchBar'
import RecommendationCell from '../Components/RecommendationCell'
import FreeAppCell from '../Components/FreeAppCell'
import { makeSelectSearchKeyword } from '../Redux/selectors/SearchSelectors'
import { makeSelectFilteredFreeApps, makeSelectFreeAppsFetchState, makeSelectCurrentPage } from '../Redux/selectors/FreeAppsSelectors'
import { makeSelectFilteredRecommendations, makeSelectRecommendationsFetchState } from '../Redux/selectors/RecommendationsSelectors'
import { initAppList, loadNextPage, search } from '../Redux/actions'

const RecommendationListWrapper = styled.View`
  padding-top: 12;
  padding-left: 8;
  padding-right: 8;
`

const RecommendationText = styled.Text`
  font-size: 20;
  padding-left: 8;
  padding-bottom: 12;
`

const Separator = styled.View`
  height: 2;
  width: 100%;
  backgroundColor: whitesmoke;
`

const Wrapper = styled(Container)`
  background: white;
`

export class MainPage extends Component {
  static propTypes = {
    initAppList: PropTypes.func.isRequired,
    loadNextPage: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    freeApps: PropTypes.array.isRequired,
    recommendations: PropTypes.array.isRequired,
    keyword: PropTypes.string.isRequired,
  }

  state = {
    loadingNextPage: false,
  }

  componentDidMount() {
    this.props.initAppList()
  }

  onSubmit = (text) => {
    this.props.search(text)
    Keyboard.dismiss()
  }

  onContentSizeChange = () => {
    this.setState({
      loadingNextPage: false,
    })
  }

  onScrollVerticalList = ({ nativeEvent }) => {
    const { currentPage, keyword } = this.props
    const isSearching = keyword !== ''
    if (this.isCloseToBottom(nativeEvent) && !isSearching && !this.state.loadingNextPage && currentPage < 10) {
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

  renderRecommendation = ({ item, index }) => (
    <RecommendationCell item={item} index={index} />
  )

  renderRecommendationsList = () => (
    <RecommendationListWrapper>
      <RecommendationText>
        Recommendations
      </RecommendationText>
      <FlatList
        data={this.props.recommendations}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderRecommendation}
        horizontal
      />
    </RecommendationListWrapper>
  )

  renderWholeList = ({ item, index }) => {
    if (index === 0) {
      return this.renderRecommendationsList()
    }
    return <FreeAppCell item={item} index={index - 1} />
  }

  renderSeparator = () => <Separator />

  render() {
    const { freeApps } = this.props
    const listItems = ['First Row Is Recommendations'].concat(freeApps)
    return (
      <Wrapper>
        <AppSearchBar onSubmit={this.onSubmit} />
        <FlatList
          onScroll={this.onScrollVerticalList}
          onContentSizeChange={this.onContentSizeChange}
          scrollEventThrottle={2000}
          data={listItems}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderWholeList}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </Wrapper>
    )
  }
}
export const mapStateToProps = createStructuredSelector({
  freeApps: makeSelectFilteredFreeApps(),
  freeAppListFetchState: makeSelectFreeAppsFetchState(),
  recommendations: makeSelectFilteredRecommendations(),
  recommendationsFetchState: makeSelectRecommendationsFetchState(),
  currentPage: makeSelectCurrentPage(),
  keyword: makeSelectSearchKeyword(),
})

export const mapDispatchToProps = (dispatch) => ({
  dispatch,
  initAppList: () => dispatch(initAppList()),
  loadNextPage: () => dispatch(loadNextPage()),
  search: (text) => dispatch(search(text)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
