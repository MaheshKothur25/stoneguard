import FeaturesImage from '../resources/img/stoneguard-logo.png';

export default [
  {
    path: '/',
    exact: true,
    component: () => import('../components/home/home'),
    seo: {
      title: 'Stoneguard Equipment',
      description: 'SGC Equipment is your semiconductor FAB solutions provider.',
      image: FeaturesImage,
    },
  },
];
