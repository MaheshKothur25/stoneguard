import React from 'react';
import ReduxServer from '@pawjs/redux/server';
import reduxThunk from 'redux-thunk';
// import cors from 'cors';
import ProductReducers from './reducers/product-reducers';
import AppInitialState from './reducers/initialState';
import ReactPWAIcon from './resources/img/sgc-icon.ico';

const FIREBASE_VERSION = '5.11.1';

// const corsOptions = {
//   origin: '*',
//   preflightContinue: true,
//   optionsSuccessStatus: 200,
// };
// TODO: add the correct GA codes and uncomment

export default class Server {
  constructor({ addPlugin }) {
    const reduxServer = new ReduxServer({ addPlugin });
    reduxServer.setReducers(ProductReducers);
    reduxServer.addMiddleware(reduxThunk);
    addPlugin(reduxServer);
  }

  // eslint-disable-next-line
  apply(serverHandler) {
    serverHandler.hooks.beforeHtmlRender.tapPromise('DSNPreCache', async (Application) => {
      const { htmlProps: { head } } = Application;
      head.push(<link key="dns-precache-demo-cdn" rel="preconnect" href="https://demo-cdn.reactpwa.com" />);
      // head.push(<link key="dns-precache-google-analytics" rel="preconnect" href="https://www.google-analytics.com" />);
      // head.push(<link key="dns-precache-googletagmanager" rel="preconnect" href="https://www.googletagmanager.com" />);
      head.push(<meta key="meta-theme-color" name="theme-color" content="#209cee" />);
    });

    serverHandler.hooks.beforeHtmlRender.tapPromise('AddFavIcon', async (Application) => {
      const { htmlProps: { head } } = Application;
      head.push(<link key="favicon" rel="shortcut icon" type="image/png" href={ReactPWAIcon} />);
      return true;
    });

    serverHandler.hooks.beforeHtmlRender.tapPromise('FAIcons', async (Application) => {
      const { htmlProps: { head } } = Application;
      head.push(<script key="fa-icons" defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js" />);
      return true;
    });

    // serverHandler.hooks.beforeHtmlRender.tapPromise('AddGoogleTracking', async (Application) => {
    //   Application.htmlProps.footer.push(<script async key="googleanalyticslink" src="https://www.googletagmanager.com/gtag/js?id=UA-108804791-2" />);
    //   Application.htmlProps.footer.push(<script
    //     key="googleanalyticsscript"
    //     // eslint-disable-next-line
    //     dangerouslySetInnerHTML={{
    //       __html: `window.dataLayer = window.dataLayer || [];
    //         function gtag(){dataLayer.push(arguments);}
    //         gtag('js', new Date());
    //         gtag('config', 'UA-108804791-2');`,
    //     }}
    //   />);
    // });

    serverHandler.hooks.beforeHtmlRender.tapPromise('Firebase', async (Application) => {
      Application.htmlProps.footer.push(
        <script
          key="firebase"
          src={`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase.js`}
        />,
        <script
          key="firebase-app"
          src={`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app.js`}
        />,
        <script
          key="firebase-auth"
          src={`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-auth.js`}
        />,
        <script
          key="firebase-database"
          src={`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-database.js`}
        />,
        <script
          key="firebase-firestore"
          src={`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore.js`}
        />,
        <script
          key="firebase-storage"
          src={`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-storage.js`}
        />,
        <script
          key="firebase-messaging"
          src={`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-messaging.js`}
        />,
        <script
          key="firebase-functions"
          src={`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-functions.js`}
        />,
      );
      Application.htmlProps.footer.push(<script
        key="firebase config"
        // eslint-disable-next-line
        dangerouslySetInnerHTML={{
          __html: `var config = {
            apiKey: "AIzaSyDmuHf8oG-hwJagP346VIM0GjxF5s5YQ1s",
            authDomain: "stoneguard-equipment.firebaseapp.com",
            databaseURL: "https://stoneguard-equipment.firebaseio.com",
            projectId: "stoneguard-equipment",
            storageBucket: "stoneguard-equipment.appspot.com",
            messagingSenderId: "1024699113230"
          };
          firebase.initializeApp(config);`,
        }}
      />);
    });

    serverHandler
      .hooks
      .reduxInitialState
      .tapPromise('AppInitialState', async ({ getInitialState, setInitialState }) => {
        const initialState = Object.assign({}, getInitialState(), AppInitialState);
        setInitialState(initialState);
      });
  }
}
