import fetch from 'universal-fetch';
import skeleton from '../components/skeleton';
import FeaturesImage from '../resources/img/stoneguard-logo.png';
import CSSGlobalLocalImage from '../resources/img/seo/css-global-local.png';
import SkeletonImage from '../resources/img/seo/skeleton-loading.png';
import ImageOptimizationImage from '../resources/img/seo/image-optimization.png';

export default [
  {
    path: '/',
    exact: true,
    component: () => import('../containers/home/home-container'),
    // TODO: get this from firebase
    seo: {
      title: 'Stoneguard Equipment | Home',
      description: 'SGC Equipment is your semiconductor FAB solutions provider.',
      image: FeaturesImage,
    },
  },
  {
    path: '/home',
    exact: true,
    component: () => import('../containers/home/home-container'),
    // TODO: get this from firebase
    seo: {
      title: 'Stoneguard Equipment | Home',
      description: 'SGC Equipment is your semiconductor FAB solutions provider.',
      image: FeaturesImage,
    },
  },
  {
    path: '/services',
    exact: true,
    component: () => import('../components/services/services'),
    seo: {
      title: 'Stoneguard Equipment | Services',
      description: 'SGC Equipment is your semiconductor FAB solutions provider.',
      image: CSSGlobalLocalImage,
    },
  },
  {
    path: '/services/:service_id',
    exact: true,
    component: () => import('../containers/services-subpages/services-subpage-container'),
    seo: {
      title: 'Stoneguard Equipment | Services',
      description: 'SGC Equipment is your semiconductor FAB solutions provider.',
      image: CSSGlobalLocalImage,
    },
  },
  {
    path: '/equipment',
    exact: true,
    component: () => import('../containers/equipment/equipment-container'),
    seo: {
      title: 'Stoneguard Equipment | Equipment',
      description: 'SGC Equipment is your semiconductor FAB solutions provider.',
      image: CSSGlobalLocalImage,
    },
  },
  {
    path: '/advanced-search',
    exact: true,
    component: () => import('../containers/maker-lookup/maker-lookup-container'),
    seo: {
      title: 'Stoneguard Equipment | Search',
      description: 'SGC Equipment is your semiconductor FAB solutions provider.',
      image: CSSGlobalLocalImage,
    },
  },
  {
    path: '/about-us',
    exact: true,
    component: () => import('../components/about-us/about-us'),
    seo: {
      title: 'Stoneguard Equipment | About Us',
      description: 'SGC Equipment is your semiconductor FAB solutions provider.',
    },
  },
  {
    path: '/contact-us',
    exact: true,
    component: () => import('../components/contact/contact-container'),
    seo: {
      title: 'Stoneguard Equipment | Contact Us',
      description: 'SGC Equipment is your semiconductor FAB solutions provider.',
    },
  },
  {
    path: '/product/:product_id',
    exact: false,
    component: () => import('../containers/product/product-container'),
    seo: {
      title: 'Stoneguard Equipment | Product',
      description: 'SGC Equipment is your semiconductor FAB solutions provider.',
    },
  },
  {
    path: '/admin',
    exact: true,
    component: () => import('../containers/admin/admin-container'),
    seo: {
      title: 'Stoneguard Equipment | Admin',
      description: 'SGC Equipment is your semiconductor FAB solutions provider.',
      image: CSSGlobalLocalImage,
    },
  },
  {
    path: '/buy-requests',
    exact: true,
    component: () => import('../containers/admin/buy-request-container'),
    seo: {
      title: 'Stoneguard Equipment | Admin',
      description: 'SGC Equipment is your semiconductor FAB solutions provider.',
      image: CSSGlobalLocalImage,
    },
  },
  {
    path: '/contact-requests',
    exact: true,
    component: () => import('../containers/admin/contact-request-container'),
    seo: {
      title: 'Stoneguard Equipment | Admin',
      description: 'SGC Equipment is your semiconductor FAB solutions provider.',
      image: CSSGlobalLocalImage,
    },
  },
  {
    path: '/cms',
    exact: true,
    component: () => import('../components/admin/cms'),
    seo: {
      title: 'Stoneguard Equipment | Admin',
      description: 'SGC Equipment is your semiconductor FAB solutions provider.',
      image: CSSGlobalLocalImage,
    },
  },
  // components from master
  {
    path: '/skeleton-loading',
    exact: true,
    loadData: async () => new Promise((r) => {
      setTimeout(() => {
        fetch('https://www.atyantik.com/wp-json/wp/v2/posts/?per_page=4&_fields[]=title&_fields[]=excerpt&_fields[]=jetpack_featured_media_url')
          .then(res => res.json())
          .then(res => r(res));
      }, 1000);
    }),
    component: () => import('../components/skeleton-loading'),
    skeleton,
    seo: {
      title: 'Skeleton Loading | ReactPWA Demo',
      description: 'Tired of adding ugly loaders? Do not let your users get confused, give them the best user experience of what is getting loaded. Use Skeleton Loading',
      image: SkeletonImage,
    },
  },
  {
    path: '/image-optimization',
    exact: true,
    component: () => import('../components/image-optmization'),
    seo: {
      title: 'Image Optimization | ReactPWA Demo',
      description: 'Serve optimize images automatically with Lazy loading and WebP support with fallback to JPG/PNG of original image.',
      image: ImageOptimizationImage,
    },
  },
  {
    path: '/global-local-css',
    exact: true,
    component: () => import('../components/global-local-css'),
    seo: {
      title: 'CSS - Globally & Locally | ReactPWA Demo',
      description: 'Sometimes we use global css classes like pad-10 but sometimes we need to write class names within modules that do not conflict with other modules, that is where local css comes into the picture',
      image: CSSGlobalLocalImage,
    },
  },
];
