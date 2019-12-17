import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDmuHf8oG-hwJagP346VIM0GjxF5s5YQ1s',
  authDomain: 'stoneguard-equipment.firebaseapp.com',
  databaseURL: 'https://stoneguard-equipment.firebaseio.com',
  projectId: 'stoneguard-equipment',
  storageBucket: 'stoneguard-equipment.appspot.com',
  messagingSenderId: '1024699113230',
  appId: '1:1024699113230:web:9dd1d46884a686bc',
};


firebase.initializeApp(firebaseConfig);

// auth ref
export const firebaseAuth = firebase.auth();

// database refs
export const databaseRef = firebase.database().ref();
const inventoryRef = databaseRef.child('inventory_data');
const requestsRef = databaseRef.child('requests_data');
const siteRef = databaseRef.child('site_data');
export const cms = siteRef.child('cms');
export const highestProductId = inventoryRef.child('highest_product_id');
const activeProductsRef = inventoryRef.child('active_products');
const inactiveProductsRef = inventoryRef.child('inactive_products');

// product db refs
export const forSaleRef = activeProductsRef.child('for_sale');
export const soldRef = activeProductsRef.child('sold');
export const sourcedRef = inactiveProductsRef.child('sourced_products');
export const quickbaseRef = inventoryRef.child('quickbase_import');

// requests db refs
export const buyRef = requestsRef.child('buy_requests');
export const contactRef = requestsRef.child('contact_requests');

// cms db refs
export const homePageRef = cms.child('home');
export const servicesPageRef = cms.child('services');
export const aboutPageRef = cms.child('about-us');
export const servicesSubpage1Ref = cms.child('services-subpage-1');
export const servicesSubpage2Ref = cms.child('services-subpage-2');
export const servicesSubpage3Ref = cms.child('services-subpage-3');
export const servicesSubpage4Ref = cms.child('services-subpage-4');

// storage refs
const storageRef = firebase.storage().ref();
const siteStorage = storageRef.child('site_data');
const inventoryStorage = storageRef.child('inventory_data');
const activeProductsStorage = inventoryStorage.child('active_products');
// const inactiveProductsStorage = inventoryStorage.child('inactive_products');
export const forSaleStorage = activeProductsStorage.child('for_sale');
export const cmsStorage = siteStorage.child('cms');
