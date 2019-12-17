import objectAssign from 'object-assign';
import {
  FETCH_FEATURED_PRODUCTS,
  FETCH_ALL_PRODUCTS,
  FETCH_PRODUCTS_FOR_SALE,
  FETCH_PRODUCTS_SOLD,
  FETCH_PRODUCTS_SOURCED,
  FETCH_PRODUCTS_FROM_MAKER,
  SET_CURRENT_PRODUCT,
  SET_SIMILAR_PRODUCTS,
  CLEAR_CURRENT_PRODUCT,
  SET_SEARCH_RESULTS,
  CLEAR_ACTIVE_SEARCH,
  SET_DB_TYPE,
  FETCH_BUY_REQUESTS,
  FETCH_CONTACT_REQUESTS,
} from '../constants/types';
import AppInitialState from './initialState';

export default function ProductReducers(state = AppInitialState, action) {
  let newState;
  switch (action.type) {
    case FETCH_FEATURED_PRODUCTS:
      newState = objectAssign({}, state);
      newState.featuredProducts = action.featuredProducts;
      newState.loading = false;
      return newState;
    case FETCH_ALL_PRODUCTS:
      newState = objectAssign({}, state);
      newState.allProducts = action.allProducts;
      newState.allManufacturers = action.allManufacturers.sort();
      newState.loading = false;
      return newState;
    case FETCH_PRODUCTS_FOR_SALE:
      newState = objectAssign({}, state);
      newState.allProductsForSale = action.allProductsForSale;
      newState.loading = false;
      return newState;
    case FETCH_PRODUCTS_SOLD:
      newState = objectAssign({}, state);
      newState.allSoldProducts = action.allSoldProducts;
      newState.loading = false;
      return newState;
    case FETCH_PRODUCTS_SOURCED:
      newState = objectAssign({}, state);
      newState.allSourcedProducts = action.allSourcedProducts;
      newState.loading = false;
      return newState;
    case FETCH_PRODUCTS_FROM_MAKER:
      newState = objectAssign({}, state);
      newState.makersProducts = action.products;
      return newState;

    // PDP reducers
    case SET_CURRENT_PRODUCT:
      newState = objectAssign({}, state);
      newState.currentProduct = action.currentProduct;
      return newState;
    case SET_SIMILAR_PRODUCTS:
      newState = objectAssign({}, state);
      newState.similarProducts = action.products;
      return newState;
    case CLEAR_CURRENT_PRODUCT:
      newState = objectAssign({}, state);
      newState.currentProduct = {};
      newState.similarProducts = [];
      return newState;

    // search reducers
    case SET_SEARCH_RESULTS:
      newState = objectAssign({}, state);
      newState.searchResults = action.searchResults;
      newState.activeSearch = true;
      return newState;
    case CLEAR_ACTIVE_SEARCH:
      newState = objectAssign({}, state);
      newState.searchResults = [];
      newState.activeSearch = false;
      return newState;

    // admin reducers
    case SET_DB_TYPE:
      newState = objectAssign({}, state);
      newState.dbType = action.dbType;
      return newState;
    case FETCH_BUY_REQUESTS:
      newState = objectAssign({}, state);
      newState.buyRequests = action.buyRequests;
      newState.newRequestsLength = action.newRequestsLength;
      return newState;
    case FETCH_CONTACT_REQUESTS:
      newState = objectAssign({}, state);
      newState.contactRequests = action.contactRequests;
      newState.newContactRequestsLength = action.newContactRequestsLength;
      return newState;
    default:
      return state;
  }
}
