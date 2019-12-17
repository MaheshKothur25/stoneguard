import {
  quickbaseRef,
  buyRef,
  contactRef,
} from '../config/firebase';
import {
  FETCH_FEATURED_PRODUCTS,
  FETCH_ALL_PRODUCTS,
  FETCH_PRODUCTS_FOR_SALE,
  FETCH_PRODUCTS_SOLD,
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
import arrNoDupe from '../utils/arrNoDupes';

export function fetchFeaturedProducts(numberProducts) {
  const featuredProducts = [];
  return (dispatch) => {
    quickbaseRef.orderByChild('updated_at').limitToLast(numberProducts).on('value', (snapshot) => {
      snapshot.forEach((data) => {
        featuredProducts.push(data.val());
      });
      dispatch({
        type: FETCH_FEATURED_PRODUCTS,
        featuredProducts,
      });
    });
  };
}

export function fetchAllProducts() {
  const orderedProducts = [];
  const makers = [];
  return (dispatch) => {
    quickbaseRef.orderByChild('updated_at').on('value', (snapshot) => {
      orderedProducts.length = 0;
      snapshot.forEach((data) => {
        orderedProducts.push(data.val());
        makers.push(data.val().manufacturer);
      });
      dispatch({
        type: FETCH_ALL_PRODUCTS,
        allProducts: orderedProducts.reverse(),
        allManufacturers: arrNoDupe(makers),
      });
    });
  };
}

export function fetchProductsForSale() {
  const orderedProducts = [];
  return (dispatch) => {
    quickbaseRef.orderByChild('updated_at').on('value', (snapshot) => {
      orderedProducts.length = 0;
      snapshot.forEach((data) => {
        if (data.val().status === 'for_sale') {
          orderedProducts.push(data.val());
        }
      });
      dispatch({
        type: FETCH_PRODUCTS_FOR_SALE,
        allProductsForSale: orderedProducts.reverse(),
      });
    });
  };
}

export function fetchSoldProducts() {
  const orderedProducts = [];
  return (dispatch) => {
    quickbaseRef.orderByChild('updated_at').on('value', (snapshot) => {
      orderedProducts.length = 0;
      snapshot.forEach((data) => {
        if (data.val().status === 'sold') {
          orderedProducts.push(data.val());
        }
      });
      dispatch({
        type: FETCH_PRODUCTS_SOLD,
        allSoldProducts: orderedProducts.reverse(),
      });
    });
  };
}

export function fetchCurrentProduct(productId) {
  let currentProduct;
  return (dispatch) => {
    quickbaseRef.orderByChild('id').equalTo(`${productId}`).on('value', (snapshot) => {
      snapshot.forEach((data) => {
        currentProduct = data.val();
      });
      dispatch({
        type: SET_CURRENT_PRODUCT,
        currentProduct,
      });
    });
  };
}

export function setSimilarProducts(products) {
  return (dispatch) => {
    dispatch({
      type: SET_SIMILAR_PRODUCTS,
      products,
    });
  };
}

export function fetchProductsFromMaker(maker) {
  const products = [];
  return (dispatch) => {
    quickbaseRef.orderByChild('manufacturer').equalTo(`${maker}`).on('value', (snapshot) => {
      snapshot.forEach((data) => {
        products.push(data.val());
      });
      dispatch({
        type: FETCH_PRODUCTS_FROM_MAKER,
        products,
      });
    });
  };
}


// PDP actions
export function setCurrentProduct(product) {
  return (dispatch) => {
    dispatch({
      type: SET_CURRENT_PRODUCT,
      currentProduct: product,
    });
  };
}

export function clearCurrentProduct() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_CURRENT_PRODUCT,
    });
  };
}


// search actions
export function setSearchResults(results) {
  return (dispatch) => {
    dispatch({
      type: SET_SEARCH_RESULTS,
      searchResults: results,
    });
  };
}

export function clearActiveSearch() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_ACTIVE_SEARCH,
    });
  };
}

// admin actions
export function setDbType(dbType) {
  return (dispatch) => {
    dispatch({
      type: SET_DB_TYPE,
      dbType,
    });
  };
}

export function fetchBuyRequests() {
  const requests = [];
  const newRequests = [];
  return (dispatch) => {
    buyRef.orderByChild('time_sent').once('value', (snapshot) => {
      snapshot.forEach((data) => {
        requests.push(data.val());
        if (!data.val().archived && !data.val().favorite) {
          newRequests.push(data.val());
        }
      });
      requests.reverse();
      dispatch({
        type: FETCH_BUY_REQUESTS,
        buyRequests: requests,
        newRequestsLength: newRequests.length,
      });
    });
  };
}

export function fetchContactRequests() {
  const requests = [];
  const newRequests = [];
  return (dispatch) => {
    contactRef.orderByChild('time_sent').once('value', (snapshot) => {
      snapshot.forEach((data) => {
        requests.push(data.val());
        if (!data.val().archived && !data.val().favorite) {
          newRequests.push(data.val());
        }
      });
      requests.reverse();
      dispatch({
        type: FETCH_CONTACT_REQUESTS,
        contactRequests: requests,
        newContactRequestsLength: newRequests.length,
      });
    });
  };
}
