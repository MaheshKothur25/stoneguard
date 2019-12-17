import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FileUploader from 'react-firebase-file-uploader';
import Cropper from 'react-cropper';
import Papa from 'papaparse';
import Login from '../login/login';
import Pagination from '../pagination/pagination';
import Loader from '../loader/loader';
import Search from '../search/search';
import {
  firebaseAuth,
  databaseRef,
  forSaleStorage,
  quickbaseRef,
} from '../../config/firebase';

import 'cropperjs/dist/cropper.css';

const PAGE_LIMIT = 5;

class AdminWrapper extends React.Component {
  constructor() {
    super();
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showLoadingModal = this.showLoadingModal.bind(this);
    this.hideLoadingModal = this.hideLoadingModal.bind(this);
    this.handleChangeDBType = this.handleChangeDBType.bind(this);
    this.updateData = this.updateData.bind(this);

    this.state = {
      authenticated: false,
      isUploading: false,
      progress: 0,
      currentProducts: [],
      currentPage: null,
      totalPages: null,
      showModal: false,
      showLoadingModal: false,
      activeProduct: null,
      activeImageKey: null,
      modalImage: '',
      totalProducts: 0,
      csvFile: undefined,
    };
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    const {
      fetchAllProducts,
      fetchProductsForSale,
      fetchSoldProducts,
      clearActiveSearch,
    } = this.props;

    clearActiveSearch();
    fetchAllProducts();
    fetchProductsForSale();
    fetchSoldProducts();
  }

  componentDidMount() {
    firebaseAuth.onAuthStateChanged((authenticated) => {
      this.setState({ authenticated });
    });
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    const { currentPage } = this.state;

    const offset = (currentPage - 1) * PAGE_LIMIT;

    // if (currentProducts.length === 0) {
    //   console.log('currentProds', currentProducts);
    //   let currentProductsNew;
    //   let totalProductsNew;
    //   let totalPagesNew;
    //
    //   console.log('newProps.dbType 1', newProps.dbType);
    //   if (newProps.dbType === 'for_sale') {
    //     currentProductsNew = newProps.allProductsForSale.slice(0, PAGE_LIMIT);
    //     totalProductsNew = newProps.allProductsForSale.length;
    //     totalPagesNew = Math.ceil(totalProductsNew / PAGE_LIMIT);
    //   } else if (newProps.dbType === 'sold') {
    //     currentProductsNew = newProps.allSoldProducts.slice(0, PAGE_LIMIT);
    //     totalProductsNew = newProps.allSoldProducts.length;
    //     totalPagesNew = Math.ceil(totalProductsNew / PAGE_LIMIT);
    //   }
    //   // eslint-disable-next-line
    //   this.setState({
    //     currentProducts: currentProductsNew,
    //     totalProducts: totalProductsNew,
    //     totalPages: totalPagesNew,
    //   });
    //   console.log('currentProds 2', currentProductsNew);
    // }

    if (oldProps.dbType !== newProps.dbType) {
      let currentProductsNew;
      let totalProductsNew;
      let totalPagesNew;

      if (newProps.dbType === 'for_sale') {
        currentProductsNew = newProps.allProductsForSale.slice(0, PAGE_LIMIT);
        totalProductsNew = newProps.allProductsForSale.length;
        totalPagesNew = Math.ceil(totalProductsNew / PAGE_LIMIT);
      } else if (newProps.dbType === 'sold') {
        currentProductsNew = newProps.allSoldProducts.slice(0, PAGE_LIMIT);
        totalProductsNew = newProps.allSoldProducts.length;
        totalPagesNew = Math.ceil(totalProductsNew / PAGE_LIMIT);
      }
      // eslint-disable-next-line
      this.setState({
        currentProducts: currentProductsNew,
        totalProducts: totalProductsNew,
        totalPages: totalPagesNew,
      });
    }

    if (oldProps.allProductsForSale !== newProps.allProductsForSale) {
      const newProductsForSale = newProps.allProductsForSale;
      const currentProductsNew = newProductsForSale.slice(offset, offset + PAGE_LIMIT);
      const totalProductsNew = newProductsForSale.length;
      const totalPagesNew = Math.ceil(totalProductsNew / PAGE_LIMIT);
      // eslint-disable-next-line
      this.setState({
        currentProducts: currentProductsNew,
        totalProducts: totalProductsNew,
        totalPages: totalPagesNew,
      });
    }

    if (oldProps.allSoldProducts !== newProps.allSoldProducts && newProps.dbType === 'sold') {
      const newProducts = newProps.allSoldProducts;
      const currentProductsNew = newProducts.slice(offset, offset + PAGE_LIMIT);
      const totalProductsNew = newProducts.length;
      const totalPagesNew = Math.ceil(totalProductsNew / PAGE_LIMIT);
      // eslint-disable-next-line
      this.setState({
        currentProducts: currentProductsNew,
        totalProducts: totalProductsNew,
        totalPages: totalPagesNew,
      });
    }
  }

  /*
  // in case we need to use this later
  onSave = (val, productId, dataKey) => {
    const dateRightNow = new Date().toISOString();

    forSaleRef.orderByChild('id').equalTo(productId).once('value', (snapshot) => {
      snapshot.forEach((data) => {
        const updates = {};
        updates[`inventory_data/active_products/for_sale/${data.key}/${dataKey}`] = val;
        updates[`inventory_data/active_products/for_sale/${data.key}/updated_at`] = dateRightNow;
        databaseRef.update(updates);
      });
    });
  }; */

  onPageChanged = (data) => {
    const {
      dbType,
      allProductsForSale,
      allSoldProducts,
    } = this.props;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    let newProducts;
    if (dbType === 'for_sale') {
      newProducts = allProductsForSale;
    } else if (dbType === 'sold') {
      newProducts = allSoldProducts;
    }
    const currentProducts = newProducts.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentProducts, totalPages });
  };

  showModal = (imageUrl, productId, imageKey) => {
    this.setState({
      showModal: true,
      modalImage: imageUrl,
      activeProduct: productId,
      activeImageKey: imageKey,
    });
  };

  hideModal = () => {
    this.setState({
      showModal: false,
      modalImage: '',
      activeProduct: null,
      activeImageKey: null,
    });
  };

  showLoadingModal = () => {
    this.setState({
      showLoadingModal: true,
    });
  };

  hideLoadingModal = () => {
    this.setState({ showLoadingModal: false });
  };

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    console.log('upload error', error);
  };

  handleUploadSuccess = (filename) => {
    const { fetchProductsForSale } = this.props;
    const file = filename.split('.')[0];
    const productId = parseInt(file.split('-')[0], 10);
    this.setState({ progress: 100, isUploading: false });
    forSaleStorage
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        console.log('url', url);
        console.log('productId', productId);
        quickbaseRef.orderByChild('id').equalTo(`${productId}`).once('value', (snapshot) => {
          console.log('snapshot', snapshot.val());
          snapshot.forEach((data) => {
            console.log('data', data);
            const newPostKey = quickbaseRef.child(`${data.key}/images`).push().key;
            const updates = {};
            const postData = {
              image: {
                url,
              },
            };
            updates[`inventory_data/quickbase_import/${data.key}/images/${newPostKey}`] = postData;
            databaseRef.update(updates);
            fetchProductsForSale();
          });
        });
      });
  };

  handleChangeDBType = (evt) => {
    const { setDbType } = this.props;
    setDbType(evt.target.value);
  };

  renderForSaleTable = (searchActive) => {
    const { searchResults } = this.props;
    const { currentProducts } = this.state;
    const rows = [];
    const filenameAppendix = Math.random().toString(36).substring(2);

    let arrayToMap = [];

    if (searchActive && searchResults) {
      arrayToMap = searchResults;
    } else if (!searchActive && currentProducts && currentProducts.length > 1) {
      arrayToMap = currentProducts;
    }

    if (arrayToMap.length > 0) {
      arrayToMap.map((product) => {
        const productImages = [];
        if (Object.getOwnPropertyDescriptor(product, 'images')) {
          const arrKeys = Object.keys(product.images);
          arrKeys.map((k) => {
            const img = product.images[k];
            productImages.push(
              <td>
                <figure key={img.image.url} className="image is-96x96">
                  {/* eslint-disable-next-line */}
                  <img
                    className="img-admin-table"
                    src={img.image.url}
                    alt="Product"
                    onClick={() => this.showModal(img.image.url, product.id, k)}
                  />
                </figure>
              </td>,
            );
            return null;
          });
        }
        return rows.push(
          <tr key={product.id}>
            <td>
              {product.asset_number}
            </td>
            <td>
              <Link to={`/product/${product.id}`}>
                {product.make_and_model}
              </Link>
            </td>
            <td>
              {product.serial_number}
            </td>
            <td>
              <table className="table">
                <tr>
                  {productImages}
                </tr>
              </table>
            </td>
            <td>
              {/* eslint-disable-next-line */}
              <label className="button is-info">
                <span className="icon is-small" style={{ margin: '0' }}>
                  <i className="far fa-images" />
                </span>
                <span>
                  <FileUploader
                    hidden
                    accept="image/*"
                    name={product.id}
                    filename={`${product.id}-${filenameAppendix}`}
                    storageRef={forSaleStorage}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                    multiple
                  />
                </span>
              </label>
            </td>
          </tr>,
        );
      });
    }

    return (
      <tbody>
        {rows}
      </tbody>
    );
  };

  uploadToStorage = async () => {
    const { activeImageKey, activeProduct } = this.state;

    const filenameAppendix = Math.random().toString(36).substring(2);
    const filename = `${activeProduct}-${filenameAppendix}`;

    const imgUrl = this.cropper.getCroppedCanvas().toDataURL('image/jpeg', 0.7);
    const blob = await fetch(imgUrl).then(r => r.blob());
    forSaleStorage.child(filename).put(blob).then((snapshot) => {
      snapshot
        .ref
        .getDownloadURL()
        .then((url) => {
          quickbaseRef.orderByChild('id').equalTo(`${activeProduct}`).once('value', (snap) => {
            snap.forEach((data) => {
              const newPostKey = quickbaseRef.child(`${data.key}/images`).push().key;
              const updates = {};
              const postData = {
                image: {
                  url,
                },
              };
              updates[`inventory_data/quickbase_import/${data.key}/images/${newPostKey}`] = postData;
              databaseRef.update(updates);
              quickbaseRef.child(`${data.key}/images/${activeImageKey}`).remove();
            });
          });
        });
    });
    this.hideModal();
  };

  deleteImage = () => {
    const { activeImageKey, activeProduct, modalImage } = this.state;
    const { fetchProductsForSale } = this.props;

    let fileName = modalImage.split('for_sale%2F');
    fileName = fileName[1].split('?');
    const finalFileName = fileName[0];
    console.log('fileName', finalFileName);

    // Create a reference to the file to delete
    const fileRef = forSaleStorage.child(`${finalFileName}`);

    // Delete the file
    fileRef.delete().then(() => {
    // File deleted successfully
      quickbaseRef.orderByChild('id').equalTo(`${activeProduct}`).once('value', (snapshot) => {
        snapshot.forEach((data) => {
          quickbaseRef.child(`${data.key}/images/${activeImageKey}`).remove();
          fetchProductsForSale();
        });
      });
    }).catch((error) => {
      // Uh-oh, an error occurred!
      console.log('err', error);
    });

    this.hideModal();
  };

  handleCSVChange = (event) => {
    this.setState({
      csvFile: event.target.files[0],
    });
  };

  importCSV = () => {
    this.showLoadingModal();
    const { csvFile } = this.state;
    Papa.parse(csvFile, {
      complete: this.updateData,
      header: true,
    });
  };

  updateData = (result) => {
    const dataArr = result.data;
    const updateArr = [];
    const alreadySeenArr = [];

    dataArr.forEach((element) => {
      if (!alreadySeenArr.includes(element['Equipment Title'])) {
        if (typeof element['Equipment Title'] !== 'undefined') {
          updateArr.push(
            {
              status: (element.Status.includes('In Stock') ? 'for_sale' : 'sold'),
              manufacturer: element.Manufacturer,
              make_and_model: element['Equipment Title'],
              asset_number: element['SGC INV #'] || element['Record ID#'],
              id: element['Record ID#'],
              serial_number: element['Serial Number'],
              tags: `${element.Type}${element['Sub Type'] ? `, ${element['Sub Type']}` : ''}`,
              created_at: element['Date Created'],
              updated_at: element['Date Modified'],
            },
          );
          alreadySeenArr.push(element['Equipment Title']);
        }
      }
    });
    console.log('updateArr', updateArr);

    // initial upload - keep this just in case
    // updateArr.map((element) => {
    //   this.updateFromCSV(null, {
    //     status: element.status,
    //     manufacturer: element.manufacturer,
    //     make_and_model: element.make_and_model,
    //     asset_number: element.asset_number,
    //     id: element.id,
    //     serial_number: element.serial_number,
    //     tags: element.tags,
    //     created_at: element.created_at,
    //     updated_at: element.updated_at,
    //   });
    // })
    this.updateFromCSV(updateArr);
  };

  updateFromCSV = (uploadedArr) => {
    const { allProducts } = this.props;

    const currentIds = [];
    allProducts.forEach((obj) => {
      currentIds.push(obj.make_and_model);
    });
    // Return all elements in A, unless in B
    const productsToAdd = uploadedArr.filter(obj => !currentIds.includes(obj.make_and_model));

    console.log('productsToAdd', productsToAdd);
    productsToAdd.map((addProduct) => {
      quickbaseRef.orderByChild('asset_number').equalTo(`${addProduct.asset_number}`).once('value', (snapshot) => {
        console.log('snap', snapshot.val());
        if (snapshot.val()) {
          snapshot.forEach((data) => {
            const updates = {};
            console.log('data.val().images', data.val().images);
            if (typeof data.val().images !== 'undefined') {
              // eslint-disable-next-line
              addProduct.images = data.val().images;
            }
            console.log('updateProduct', addProduct);
            if (typeof addProduct.id !== 'undefined') {
              updates[`inventory_data/quickbase_import/${addProduct.id}`] = addProduct;
              databaseRef.update(updates);
            }
          });
        } else {
          const updates = {};
          console.log('addProduct', addProduct);
          if (typeof addProduct.id !== 'undefined') {
            updates[`inventory_data/quickbase_import/${addProduct.id}`] = addProduct;
            databaseRef.update(updates);
          }
        }
        return null;
      }).then(() => this.hideLoadingModal());
      return null;
    });

    // initial import - keep this just in case
    // var newProduct = {};
    // newProduct[`inventory_data/quickbase_import/${val.id}`] = val;
    // databaseRef.update(newProduct).then(() => this.hideLoadingModal());

    this.hideLoadingModal();
  };

  /*
  // for after initial import
  addImages = () => {
    const { allProductsForSale } = this.props;
    allProductsForSale.map((product) => {
      forSaleRef.orderByChild('asset_number').equalTo(product.asset_number).once('value',
        (snapshot) => {
        snapshot.forEach((data) => {
          const updates = {};
          const images = data.val().images;
          if (images) {
            product.images = images;
          }
          updates[`inventory_data/quickbase_import/${product.id}`] = product;
          databaseRef.update(updates);
        });
      });
    })
  }; */

  render() {
    const {
      allProductsForSale,
      dbType,
      allProducts,
      searchResults,
      setSearchResults,
      activeSearch,
    } = this.props;

    const {
      authenticated,
      isUploading,
      progress,
      currentPage,
      totalPages,
      showModal,
      showLoadingModal,
      modalImage,
      totalProducts,
      csvFile,
    } = this.state;

    const prettyDbType = dbType.replace(/_/g, ' ');

    if (totalProducts === 0) return null;

    if (!authenticated) {
      return <Login />;
    }

    if (allProductsForSale.length === 0) {
      return <Loader />;
    }

    return (
      <div>
        <section className="admin-section">
          {
            isUploading
            && (
              <div className="progress-container">
                <progress className="progress is-primary is-medium" value={progress} max="100">
                  {progress}
                  %
                </progress>
              </div>
            )
          }

          {/* Crop Image Modal */}
          <div className={`modal ${showModal ? ' is-active' : ''}`}>
            <div className="modal-background" />
            <div className="modal-content" style={{ top: '10%' }}>
              <div className="columns">
                <div className="column">
                  <h3 className="title is-3">Original</h3>
                  <Cropper
                    style={{ height: 400, width: '100%' }}
                    preview=".img-preview"
                    src={modalImage}
                    // aspectRatio={16 / 9}
                    ref={(cropper) => { this.cropper = cropper; }}
                  />
                </div>
                <div className="column">
                  <div>
                    <h3 className="title is-3">Preview</h3>
                    <div className="img-preview" style={{ width: '100%', float: 'left', height: 300 }} />
                  </div>
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <div className="field is-grouped">
                    <p className="control">
                      <button type="button" className="button is-primary" onClick={this.uploadToStorage}>
                        Crop Image
                      </button>
                    </p>
                    <p className="control">
                      <button type="button" className="button" onClick={this.hideModal}>
                        Cancel
                      </button>
                    </p>
                    <p className="control">
                      <button
                        type="button"
                        className="button is-danger"
                        // eslilnt-disable-next-line
                        onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteImage(); }}
                      >
                        Delete Image
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button type="button" className="modal-close is-large" aria-label="close" onClick={this.hideModal} />
          </div>

          {/* Edit Product Modal */}
          <div className={`modal ${showLoadingModal ? 'is-active' : ''}`}>
            <div className="modal-background" />
            <div className="modal-content" style={{ top: '3%' }}>
              <Loader />
            </div>
          </div>

          <div className="top-admin-bg">
            <div className="top-admin-container">
              <br />
              <div style={{ float: 'left' }}>
                <div className="select is-large">
                  <select name="inventory_status" onChange={this.handleChangeDBType} value={dbType}>
                    <option value="for_sale">Products For Sale</option>
                    <option value="sold">Products Sold</option>
                  </select>
                </div>
                <br />
                <br />
                <h4 className="sub-title">
                  <span className="bold">{totalProducts}</span>
                  &nbsp;products&nbsp;
                  {prettyDbType}
                  .
                </h4>
              </div>

              <div style={{ float: 'right' }}>
                {/* <button type="button" className="button is-primary" onClick={this.addImages}>
                  Add Images
                </button> */}
                <label className="button is-info is-medium">
                  <span>
                    Upload QuickBase Inventory CSV File
                    <input
                      className="csv-input"
                      type="file"
                      ref={(input) => {
                        this.filesInput = input;
                      }}
                      name="file"
                      placeholder={null}
                      onChange={this.handleCSVChange}
                    />
                  </span>
                </label>
                <br />
                <br />
                {
                  csvFile
                  && (
                    <button
                      type="button"
                      className="button is-medium is-primary"
                      onClick={this.importCSV}
                    >
                      Upload now
                    </button>
                  )
                }
              </div>
            </div>
          </div>

          <Search haystack={allProducts} searchSubmit={setSearchResults} autocompleteDisabled />

          {
            activeSearch
            && (
              <h3 className="title is-3 top-admin-search-container">
                {searchResults.length}
                &nbsp;results found
              </h3>
            )
          }
          <table className="table is-striped is-fullwidth" style={{ position: 'relative', top: '2rem' }}>
            <thead className="table-header">
              <tr>
                <th>Asset #</th>
                <th>Make &amp; Model</th>
                <th>Serial #</th>
                <th>Images</th>
                <th>Add Image</th>
              </tr>
            </thead>
            {this.renderForSaleTable(activeSearch)}
          </table>

          {
            !activeSearch
            && (
              <div className="container p-l-md p-r-md">
                <div className="row d-flex flex-row py-5">
                  <div className="d-flex flex-row py-4 align-items-center">
                    <Pagination
                      totalPages={totalPages}
                      totalRecords={totalProducts}
                      pageLimit={PAGE_LIMIT}
                      pageNeighbors={1}
                      onPageChanged={this.onPageChanged}
                    />
                  </div>
                  {currentPage
                  && (
                    <div className="current-page d-inline-block h-100 pl-4 text-secondary pagination-list">
                      Page&nbsp;
                      <span className="font-weight-bold">{ currentPage }</span>
                      &nbsp;of&nbsp;
                      <span className="font-weight-bold">{ totalPages }</span>
                    </div>
                  )}
                </div>
              </div>
            )
          }
        </section>

      </div>
    );
  }
}

AdminWrapper.propTypes = {
  allProducts: PropTypes.arrayOf(PropTypes.shape),
  fetchAllProducts: PropTypes.func,
  allProductsForSale: PropTypes.arrayOf(PropTypes.shape),
  fetchProductsForSale: PropTypes.func,
  allSoldProducts: PropTypes.arrayOf(PropTypes.shape),
  fetchSoldProducts: PropTypes.func,
  setDbType: PropTypes.func,
  dbType: PropTypes.string.isRequired,
  setSearchResults: PropTypes.func,
  searchResults: PropTypes.arrayOf(PropTypes.shape),
  activeSearch: PropTypes.bool,
  clearActiveSearch: PropTypes.func,
};

AdminWrapper.defaultProps = {
  allProducts: [{}],
  fetchAllProducts: () => {},
  allProductsForSale: [{}],
  fetchProductsForSale: () => {},
  allSoldProducts: [{}],
  fetchSoldProducts: () => {},
  setDbType: () => {},
  setSearchResults: () => {},
  searchResults: [{}],
  activeSearch: false,
  clearActiveSearch: () => {},
};

export default AdminWrapper;
