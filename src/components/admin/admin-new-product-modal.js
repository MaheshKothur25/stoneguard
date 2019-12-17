import React from 'react';
import PropTypes from 'prop-types';
import FileUploader from 'react-firebase-file-uploader';
import {
  highestProductId,
  forSaleRef,
  forSaleStorage,
  soldRef,
  sourcedRef,
  databaseRef,
} from '../../config/firebase';
import Loader from '../loader/loader';

class AdminNewProductModal extends React.Component {
  constructor() {
    super();
    this.saveForm = this.saveForm.bind(this);
    this.showNewProductModal = this.showNewProductModal.bind(this);
    this.hideNewProductModal = this.hideNewProductModal.bind(this);

    this.state = {
      showNewProductModal: false,
      isUploading: false,
      progress: 0,
      assetNumber: '',
      description: '',
      inventoryStatus: 'for_sale',
      makeAndModel: '',
      manufacturer: '',
      quantity: '',
      serialNumber: '',
      tags: '',
      imageUrls: [],
      loading: false,
      success: false,
      error: false,
    };
  }

  showNewProductModal = () => {
    this.setState({
      showNewProductModal: true,
      loading: false,
      success: false,
      error: false,
    });
  };

  hideNewProductModal = () => {
    this.setState({ showNewProductModal: false });
  };

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    console.log('upload error', error);
  };

  handleUploadSuccess = (filename) => {
    const { imageUrls } = this.state;
    // const file = filename.split('.')[0];
    // const productId = parseInt(file.split('-')[0], 10);
    this.setState({ progress: 100, isUploading: false });
    forSaleStorage
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        imageUrls.push(url);
      });
  };

  saveForm = () => {
    this.setState({ loading: true });
    const dateRightNow = new Date().toISOString();
    let highestId;
    let dbRef;
    let refLength;
    let error;

    const { updateProps } = this.props;
    const {
      assetNumber,
      description,
      inventoryStatus,
      makeAndModel,
      manufacturer,
      quantity,
      serialNumber,
      tags,
      imageUrls,
    } = this.state;

    if (inventoryStatus === 'for_sale') {
      dbRef = forSaleRef;
    } else if (inventoryStatus === 'sold') {
      dbRef = soldRef;
    } else if (inventoryStatus === 'sourced') {
      dbRef = sourcedRef;
    }

    function pushImages(productId, dbReference) {
      forSaleRef.orderByChild('id').equalTo(productId).once('value', (snapshot) => {
        snapshot.forEach((data) => {
          imageUrls.map((url) => {
            const newPostKey = forSaleRef.child(`${data.key}/images`).push().key;
            const updates = {};
            const postData = {
              image: {
                url,
              },
            };
            if (dbReference === 'for_sale') {
              updates[`inventory_data/active_products/for_sale/${data.key}/images/${newPostKey}`] = postData;
            } else if (dbReference === 'sold') {
              updates[`inventory_data/active_products/sold/${data.key}/images/${newPostKey}`] = postData;
            } else if (dbReference === 'sourced') {
              updates[`inventory_data/inactive_products/sourced_products/${data.key}/images/${newPostKey}`] = postData;
            }
            return databaseRef.update(updates);
          });
        });
      });
    }

    // TODO: specific stuff for archived and manufacturer and featured
    function updateDb(highestIdNumber) {
      const productId = highestIdNumber + 1;
      dbRef.once('value', (snapshot) => {
        refLength = snapshot.numChildren();

        dbRef.child(refLength.toString()).set({
          id: productId,
          asset_number: assetNumber,
          description,
          inventory_status: inventoryStatus,
          make_and_model: makeAndModel,
          manufacturer,
          quantity,
          serial_number: serialNumber,
          tags,
          created_at: dateRightNow,
          updated_at: dateRightNow,
        }, (err) => {
          if (err) {
            // The write failed...
            error = err;
          } else {
            // Data saved successfully!
            highestProductId.set({
              highest_id: productId,
            });
            pushImages(productId, dbRef);
            updateProps();
          }
        });
      });
    }

    highestProductId.child('highest_id').once('value', (snapshot) => {
      highestId = parseInt(snapshot.val(), 10);
      updateDb(highestId);
    });

    if (error) {
      this.setState({ loading: false, success: false, error: true });
    } else {
      this.setState({ loading: false, success: true, error: false });
    }
  };

  render() {
    const {
      loading,
      error,
      success,
      showNewProductModal,
      isUploading,
      progress,
      assetNumber,
      imageUrls,
    } = this.state;
    const filenameAppendix = Math.random().toString(36).substring(2);

    return (
      <div>
        <button
          type="button"
          className="button is-medium is-primary"
          style={{ float: 'right', marginTop: '1.5rem' }}
          onClick={this.showNewProductModal}
        >
          <span className="icon is-medium">
            <i className="fas fa-plus" />
          </span>
          <span>Add New Product</span>
        </button>
        <div className={`modal ${showNewProductModal ? ' is-active' : ''}`}>
          <div className="modal-background" />
          <div className="modal-content" style={{ top: '3%' }}>
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
            {
              loading && (
                <div style={{ overflow: 'visible', marginBottom: '10rem' }}>
                  <h3 className="title is-3">Add New Product</h3>
                  <Loader />
                </div>
              )
            }
            {
              success && (
                <div style={{ overflow: 'visible', marginBottom: '10rem' }}>
                  <h3 className="title is-3">Product Added!</h3>
                </div>
              )
            }
            {
              error && (
                <div style={{ overflow: 'visible', marginBottom: '10rem' }}>
                  <h3 className="title is-3">Oops...there was an error. Please try again.</h3>
                </div>
              )
            }
            {
              (!error && !loading && !success) && (
                <div style={{ overflow: 'visible', marginBottom: '10rem' }}>
                  <h3 className="title is-3">Add New Product</h3>

                  <div className="field">
                    <label className="label">Asset Number</label>
                    <div className="control">
                      <input
                        className="input"
                        name="assetNumber"
                        type="text"
                        placeholder="Asset Number"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        name="description"
                        placeholder="Product Description"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Inventory Status</label>
                    <div className="select">
                      <select name="inventoryStatus" onChange={this.handleChange}>
                        <option value="for_sale">For Sale</option>
                        <option value="sold">Sold</option>
                        <option value="sourced">Sourced</option>
                      </select>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Make and Model</label>
                    <div className="control">
                      <input
                        className="input"
                        name="makeAndModel"
                        type="text"
                        placeholder="Make and Model"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Manufacturer</label>
                    <div className="control">
                      <input
                        className="input"
                        name="manufacturer"
                        type="text"
                        placeholder="Manufacturer"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Quantity</label>
                    <div className="control">
                      <input
                        className="input"
                        name="quantity"
                        type="text"
                        placeholder="Quantity"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Serial Number</label>
                    <div className="control">
                      <input
                        className="input"
                        name="serialNumber"
                        type="text"
                        placeholder="Serial Number"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">
                      Tags&nbsp;
                      <em style={{ fontWeight: '300' }}>(seperate with commas)</em>
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        name="tags"
                        type="text"
                        placeholder="Tags - Seperate with commas"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  {
                    assetNumber && (
                      <div className="field">
                        <label className="label">Images</label>
                        {/* eslint-disable-next-line */}
                        <label className="button is-info" style={{ marginBottom: '3rem' }}>
                          <span className="icon is-small">
                            <i className="far fa-images" />
                          </span>
                          <span>
                            Add Image
                            <FileUploader
                              hidden
                              accept="image/*"
                              name={assetNumber}
                              filename={`${assetNumber.replace(/\W/g, '')}-${filenameAppendix}`}
                              storageRef={forSaleStorage}
                              onUploadStart={this.handleUploadStart}
                              onUploadError={this.handleUploadError}
                              onUploadSuccess={this.handleUploadSuccess}
                              onProgress={this.handleProgress}
                            />
                          </span>
                        </label>
                      </div>
                    )
                  }

                  {
                    imageUrls && (
                      imageUrls.map(url => (
                        <figure key={url} className="image is-96x96">
                          <img
                            className="img-admin-table"
                            src={url}
                            alt="Product"
                          />
                        </figure>
                      ))
                    )
                  }

                  <div className="field">
                    <p className="control">
                      <button type="submit" className="button is-success" onClick={this.saveForm}>
                        Submit
                      </button>
                    </p>
                  </div>
                </div>
              )
            }
          </div>
          <button type="button" className="modal-close is-large" aria-label="close" onClick={this.hideNewProductModal} />
        </div>
      </div>
    );
  }
}

AdminNewProductModal.propTypes = {
  updateProps: PropTypes.func.isRequired,
};

export default AdminNewProductModal;
