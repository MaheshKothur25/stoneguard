import ReduxClient from '@pawjs/redux/client';
import reduxThunk from 'redux-thunk';
import ProductReducers from './reducers/product-reducers';
import AppInitialState from './reducers/initialState';
// import 'bulma/css/bulma.min.css';
import './resources/css/bulma/sgcstyles.scss';
import './resources/css/util.scss';
import './resources/css/global.css';

export default class Client {
  constructor({ addPlugin }) {
    const reduxClient = new ReduxClient({ addPlugin });
    reduxClient.setReducers(ProductReducers);
    // redux middleware
    reduxClient.addMiddleware(reduxThunk);
    addPlugin(reduxClient);
  }

  static googleTrack() {
    if (typeof window.gtag === 'function') {
      // TODO: change this when we get the correct google analytics code
      // window.gtag('config', 'UA-108804791-2', {
      //   page_path: window.location.pathname,
      // });
    }
  }

  // eslint-disable-next-line
  apply(clientHandler) {
    clientHandler
      .hooks
      .locationChange
      .tapPromise('ReloadGoogleTrack', async () => Client.googleTrack());
    clientHandler
      .hooks
      .reduxInitialState
      .tapPromise('ReduxInitialState', async ({ getInitialState, setInitialState }) => {
        const initialState = Object.assign({}, getInitialState(), AppInitialState);
        // You can also wait for something async to happen
        // await fetch("/api/counter/details") and add it to the initial state if needed
        setInitialState(initialState);
      });
  }
}
