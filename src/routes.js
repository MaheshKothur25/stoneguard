import GuestRoutes from './pages/guest';
import AuthRoutes from './pages/auth';
import HomeScreen from './pages/home';
import Logo192 from './resources/img/192x192_logo.png';
import Logo512 from './resources/img/512x512_logo.png';

export default class Routes {
  // eslint-disable-next-line
  apply(routeHandler) {
    routeHandler.setPwaSchema({
      name: 'Stoneguard Equipment',
      short_name: 'SGC',
      icons: [
        {
          src: Logo192,
          sizes: "192x192"
        },
        {
          src: Logo512,
          sizes: "512x512"
        }
      ]
    });
    routeHandler.setDefaultSeoSchema({
      title: 'Stoneguard Equipment',
      description: 'SGC Equipment is your semiconductor FAB solutions provider.',
      // keywords: [],
      image: 'https://stoneguard-equipment.firebaseapp.com/images/b9cd50612fe546bef010858f8bbe1372.png',
      site_name: 'Stoneguard Equipment',
      // twitter: {
      //   site: '',
      //   creator: '',
      // },
      // facebook: {
      //   admins: [],
      // },
      type: 'product', // article/product/music/video
    });

    const routes = [
      ...GuestRoutes,
      ...AuthRoutes,
      ...HomeScreen,
    ];

    routeHandler.hooks.initRoutes.tapPromise('AppRoutes', async () => {
      routeHandler.addRoutes(routes);
    });
  }
}
