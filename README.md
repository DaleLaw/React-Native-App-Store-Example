## React Native App Store exmaple
This repository is demo of using React Native to build an App Store like layout

# Screenshot
![Screenshot](https://github.com/DaleLaw/React-Native-App-Store-Example/blob/master/screenshot.png)

# App Features
- Get Top Free apps and recomendations from App Store
- Max of Horizontal list and Vertical list in same layout
- Lazy loading image and app ratings
- Filtering list by search bar

# Getting Started
```Shell
# install dependencies
yarn

# start react native packaging server
yarn start

# launch the app in simulator
react-native run-ios
# Or
react-native run-android
```

# App Design

The whole app's application states can be represented by the following state shape:

## Application State Shape
````javascript
{
  search: {
    keyword: 'keywords',
  },

  recommendations: {
    all: {
      id: {
        img: 'http://example.com/1.jpg',
        name: 'An Awesome App',
        category: 'Games',
      },
    },
    ids: ['id', 'id2'],
    fetchState: 'NOT_FETCHED', // either be 'NOT_FETCHED', 'IN_PROGRESS', 'SUCCESS', 'ERROR'
    error: '',
  },

  freeApps: {
    all: {
      id: {
        img: 'http://example.com/1.jpg',
        name: 'An Awesome App',
        category: 'Games',
        averageUserRating: 4.5,
        userRatingCount: 63,
        fetchState: 'NOT_FETCHED', // either be 'NOT_FETCHED', 'IN_PROGRESS', 'SUCCESS', 'ERROR'
        error: '',
      },
    },
    currentPage: 0,
    ids: [],
    fetchState: 'NOT_FETCHED', // either be 'NOT_FETCHED', 'IN_PROGRESS', 'SUCCESS', 'ERROR'
    error: '',
  },
}

````

# Used Libraries
In this app, I used  
[Ignite](https://github.com/infinitered/ignite-ir-boilerplate) as boilerplate,  
[Redux](https://github.com/reactjs/redux) for state management,  
[Redux-saga](https://github.com/redux-saga/redux-saga) for side effect(async actions such as network call) handling,  
[NativeBase](https://github.com/GeekyAnts/NativeBase) for some UI components,  
[styled-components](https://github.com/styled-components/styled-components) for component styles management