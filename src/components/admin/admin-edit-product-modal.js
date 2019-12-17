import React from 'react';
import EdiText from 'react-editext';
import PropTypes from 'prop-types';
import { databaseRef, forSaleRef } from '../../config/firebase';

const AdminEditProductModal = (props) => {
  const { currentProduct, fetchProducts } = props;
  const productNodes = Object.keys(currentProduct);
  const tagArr = [];
  let taggedTag = [];
  let manuName;

  const onSave = (val, productId, dataKey, manuBool) => {
    const dateRightNow = new Date().toISOString();

    forSaleRef.orderByChild('id').equalTo(productId).once('value', (snapshot) => {
      snapshot.forEach((data) => {
        const updates = {};
        if (manuBool) {
          const slugVal = val.toLowerCase();
          updates[`inventory_data/active_products/for_sale/${data.key}/manufacturer/name/`] = val;
          updates[`inventory_data/active_products/for_sale/${data.key}/manufacturer/slug/`] = slugVal.replace(/ /g, '-');
        } else {
          updates[`inventory_data/active_products/for_sale/${data.key}/${dataKey}`] = val;
        }
        updates[`inventory_data/active_products/for_sale/${data.key}/updated_at`] = dateRightNow;
        databaseRef.update(updates);
        fetchProducts();
      });
    });
  };

  return (
    <div style={{ overflow: 'visible', marginBottom: '10rem' }}>
      <h3 className="title is-3">Edit Product</h3>
      {
        currentProduct && productNodes.map((dataNode) => {
          if (dataNode === 'tags') {
            if (currentProduct[dataNode].length > 0) {
              tagArr.push(currentProduct[dataNode].split(','));
              tagArr[0].map(tag => taggedTag.push(<span key={tag} className="tag is-primary is-medium">{tag}</span>));
            } else {
              taggedTag = <span className="tag is-danger is-medium">No Tags</span>;
            }
          }
          const nodesToShowArr = ['asset_number', 'inventory_status', 'make_and_model', 'quantity', 'serial_number', 'description', 'tags'];
          if (nodesToShowArr.indexOf(dataNode) >= 0) {
            return (
              <article className="message" key={dataNode}>
                <div className="message-body">
                  <div className="level">
                    <div className="level-left">
                      <strong className="dataNode-header">
                        {dataNode.replace(/_/g, ' ')}
                        :&nbsp;
                      </strong>
                      <EdiText
                        type={dataNode === 'description' ? 'textarea' : 'text'}
                        value={currentProduct[dataNode]}
                        editButtonClassName="custom-edit-button"
                        editButtonContent="&#9998;"
                        onSave={value => onSave(value, currentProduct.id, dataNode, false)}
                      />
                    </div>
                    {
                      dataNode === 'tags' ? (
                        <div className="level-right">
                          <em>(Seperate with commas)</em>
                        </div>
                      ) : <span />
                    }
                  </div>
                </div>
              </article>
            );
          }
          if (dataNode === 'manufacturer') {
            const manuNodes = Object.keys(currentProduct[dataNode]);
            // console.log('manuNodes', manuNodes);
            // console.log('manuNodes', currentProduct[dataNode]);
            manuNodes.map((node) => {
              if (node === 'name') {
                manuName = currentProduct[dataNode][node];
              }
              return manuName;
            });
            return (
              <article className="message" key={manuName || 'manuKey'}>
                <div className="message-body">
                  <div className="level">
                    <div className="level-left">
                      <strong className="dataNode-header">
                        Manufacturer:&nbsp;
                      </strong>
                      <EdiText
                        type="text"
                        value={manuName}
                        editButtonClassName="custom-edit-button"
                        editButtonContent="&#9998;"
                        onSave={value => onSave(value, currentProduct.id, manuName, true)}
                      />
                    </div>
                  </div>
                </div>
              </article>
            );
          }
          return null;
        })
      }
    </div>
  );
};

AdminEditProductModal.propTypes = {
  currentProduct: PropTypes.shape({

  }).isRequired,
  fetchProducts: PropTypes.func.isRequired,
};

export default AdminEditProductModal;
