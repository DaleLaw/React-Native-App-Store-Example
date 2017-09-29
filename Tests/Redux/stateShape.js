export const stateShape = {
  app: {
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
        },
      },
      currentPage: 0,
      pages: {
        1: {
          ids: ['id', 'id2'],
          fetchState: 'NOT_FETCHED', // either be 'NOT_FETCHED', 'IN_PROGRESS', 'SUCCESS', 'ERROR'
          error: '',
        },
      },
    },

    noNetwork: false,
  },
}
