import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { Icon, StyleProvider, getTheme } from 'native-base'

const Wrapper = styled.View`
  flex-direction: row;
`

const StarIcon = styled(Icon)`
  font-size: 12px;
  color: orange;
`

const RatingsControl = (props) => {
  const { ratings } = props
  return (
    <StyleProvider style={getTheme({ iconFamily: 'FontAwesome' })}>
      <Wrapper>
        {
          _.range(1, 6).map((i) => {
            let starType = 'star-o'
            if (i - 0.5 === ratings) {
              starType = 'star-half-o'
            } else if (i <= ratings) {
              starType = 'star'
            }
            return <StarIcon key={i} name={starType} />
          })
        }
      </Wrapper>
    </StyleProvider>
  )
}
RatingsControl.propTypes = {
  ratings: PropTypes.number,
}
RatingsControl.defaultProps = {
  ratings: 0,
}


export default RatingsControl
