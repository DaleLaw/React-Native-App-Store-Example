import { StackNavigator } from 'react-navigation'
import MainPage from '../Containers/MainPage'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  MainPage: { screen: MainPage },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'MainPage',
  navigationOptions: {
    headerStyle: styles.header,
  },
})

export default PrimaryNav
