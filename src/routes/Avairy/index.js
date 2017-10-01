import {injectReducer} from '../../store/reducers'

export default(store) => ({
  path: '/',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Avairy = require('./containers/AvairyContainer').default
      const reducer = require('./modules/AvairyModule').default

      /*  Add the reducer to the store on key 'avairy'  */
      injectReducer(store, {
        key: 'avairy',
        reducer
      })

      /*  Return getComponent   */
      cb(null, Avairy)

      /* Webpack named bundle   */
    }, 'avairy')
  }
})
