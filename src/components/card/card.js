import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NoImg from '../../resources/img/no-image.png';

const Card = (props) => {
  const { card, setProduct, inquireButton } = props;
  const productImages = [];
  const tags = [];
  let status;
  const selectProduct = () => {
    setProduct();
    props.history.push(`/product/${card.id}`);
  };
  if (Object.getOwnPropertyDescriptor(card, 'images')) {
    const arrKeys = Object.keys(card.images);
    const arrImages = arrKeys.map(k => card.images[k]);
    productImages.push(
      // eslint-disable-next-line
      <img
        key={arrImages[0].image.url}
        className="img-search-table"
        src={arrImages[0].image.url}
        alt="Product"
        onClick={selectProduct}
      />,
    );
  }
  if (card.tags) {
    const tagsArr = card.tags.split(', ');
    tagsArr.map((tag, index) => (
      // eslint-disable-next-line
      tags.push(<p key={index} className="tag is-rounded is-product-tag">{tag}</p>)
    ));
  }
  const created = new Date(card.created_at);
  const updated = new Date(card.updated_at);
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  if (Date.parse(oneMonthAgo) < Date.parse(created)) {
    status = (
      <p className="tag is-rounded pdp-status-tag">
        NEW
      </p>
    );
  } else if (Date.parse(oneMonthAgo) < Date.parse(updated)) {
    status = (
      <p className="tag is-rounded pdp-status-tag">
        UPDATED
      </p>
    );
  } else if (card.status === 'for_sale') {
    status = (
      <p className="tag is-rounded pdp-status-tag">
        AVAILABLE
      </p>
    );
  } else {
    status = (
      <p className="tag is-rounded pdp-status-tag">
        OUT OF STOCK
      </p>
    );
  }

  return (
    <div className="card-container">
      <div className="card">
        <div className="card-image">
          {
            status
            && (
              <span className="tag is-warning status-tag">
                {status}
              </span>
            )
          }
          {
            card.images
              ? (
                productImages
              ) : (
                // eslint-disable-next-line
                <img
                  src={NoImg}
                  className="img-search-table"
                  alt="Product"
                  onClick={selectProduct}
                />
              )
          }
        </div>
        <div className="card-content">
          <div className="columns is-gapless is-mobile">
            <div className="column">
              <p className="product-manufacturer">
                {card.manufacturer || null}
              </p>
            </div>
            <div className="column">
              <p className="product-asset-number has-text-grey-light">
                {card.asset_number || null}
              </p>
            </div>
          </div>
          <div className="media">
            <div className="media-content card-media-container">
              <h4 className="title is-4 card-title">
                {card.make_and_model || null}
              </h4>
              {/* tags */}
              <div className="card-product-tags">
                {tags}
              </div>
            </div>
          </div>
          {
            inquireButton
            && (
              <div className="content text-centered">
                <a
                  href={null}
                  className="button is-rounded is-primary"
                  onClick={selectProduct}
                >
                  Inquire
                </a>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string,
    images: PropTypes.object,
    statusTag: PropTypes.string,
    manufacturer: PropTypes.string,
    asset_number: PropTypes.string,
    make_and_model: PropTypes.string,
    tags: PropTypes.string,
    status: PropTypes.string,
    updated_at: PropTypes.string,
    created_at: PropTypes.string,
  }).isRequired,
  setProduct: PropTypes.func,
  inquireButton: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

Card.defaultProps = {
  setProduct: () => {},
  inquireButton: true,
};

export default withRouter(Card);
