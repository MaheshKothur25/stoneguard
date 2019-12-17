import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { ReactBnbGallery } from 'react-bnb-gallery';
import Card from '../card/card';
import InquireForm from '../inquire/inquire';
import shuffleArray from '../../utils/shuffleArray';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NoImg from '../../resources/img/no-image.png';

class ProductPage extends React.Component {
  constructor() {
    super();
    this.toggleGallery = this.toggleGallery.bind(this);
    this.state = {
      similarProducts: [],
      galleryOpened: false,
    };
  }

  componentWillMount() {
    window.scrollTo(0, 0);

    const {
      fetchCurrentProduct,
      fetchAllProducts,
      allProducts,
      match,
    } = this.props;
    const productId = match.params.product_id;

    fetchCurrentProduct(productId);

    if (allProducts.length === 0) {
      fetchAllProducts();
    }
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;

    if (oldProps.similarProducts !== newProps.similarProducts) {
      // eslint-disable-next-line
      this.setState({
        similarProducts: newProps.similarProducts,
      });
    }
  }

  componentWillUnmount() {
    const { clearCurrentProduct } = this.props;
    clearCurrentProduct();
  }

  toggleGallery = () => {
    this.setState(prevState => ({
      galleryOpened: !prevState.galleryOpened,
    }));
  };

  renderProductSection() {
    const {
      currentProduct,
      allProducts,
      similarProducts,
      setSimilarProducts,
    } = this.props;
    const { galleryOpened } = this.state;
    const tags = [];
    const productImages = [];
    const galleryImages = [];
    const similarArr = [];
    let status;

    if ((Object.keys(currentProduct).length !== 0 && currentProduct.constructor === Object)
      && allProducts.length > 0) {
      if (Object.getOwnPropertyDescriptor(currentProduct, 'images')) {
        const arrKeys = Object.keys(currentProduct.images);
        // eslint-disable-next-line
        arrKeys.map((k, index) => {
          galleryImages.push({ number: index + 1, photo: currentProduct.images[k].image.url });
          productImages.push(
            // eslint-disable-next-line
            <div key={currentProduct.images[k].image.url} className="img-product-page" onClick={this.toggleGallery}>
              <img
                src={currentProduct.images[k].image.url}
                alt="product"
              />
            </div>,
          );
        });
      } else {
        productImages.push(
          <div key="no-image">
            <img src={NoImg} style={{ maxWidth: '300px' }} alt="product placeholder" />
          </div>,
        );
      }

      if (currentProduct.tags) {
        let count = 0;
        const tagsArr = currentProduct.tags.split(', ');
        const products = shuffleArray(allProducts);
        // eslint-disable-next-line
        tagsArr.map((tag, index) => {
          if (count < 4) {
            // eslint-disable-next-line
            products.filter((record) => {
              if (record.tags.includes(tag) && record.id !== currentProduct.id) {
                if (count < 3) {
                  similarArr.push(record);
                }
                count += 1;
              }
            });
          }
          (
            // eslint-disable-next-line
            tags.push(<p key={index} className="tag is-rounded is-product-tag">{tag}</p>)
          );
        });
        if (similarProducts.length === 0) {
          setSimilarProducts(similarArr);
        }
      }

      if (currentProduct.status === 'for_sale') {
        status = (
          <p className="tag is-rounded pdp-status-tag">
            AVAILABLE
          </p>
        );
      } else if (currentProduct.status === 'sold') {
        status = (
          <p className="tag is-rounded pdp-status-tag">
            SOLD
          </p>
        );
      }

      return (
        <div className="page-container">
          <div className="columns">
            <div className="column">
              <Carousel showArrows dynamicHeight infiniteLoop>
                {productImages}
              </Carousel>
              <ReactBnbGallery
                show={galleryOpened}
                photos={galleryImages}
                onClose={this.toggleGallery}
                backgroundColor="#575757"
                showThumbnails={false}
              />
            </div>
            <div className="column">
              {/* manufacturer and asset number */}
              <div className="columns is-mobile">
                <div className="column">
                  <p className="pdp-manufacturer">
                    {currentProduct.manufacturer}
                  </p>
                </div>
                <div className="column">
                  <p className="pdp-asset-number">
                    {currentProduct.asset_number}
                  </p>
                </div>
              </div>
              {/* product name */}
              <h3 className="title is-3 pdp-product-name">
                {currentProduct.make_and_model}
              </h3>
              {/* tags */}
              <div className="pdp-product-tags">
                {tags}
              </div>
              {/* description */}
              {
                currentProduct.description
                && (
                  <p className="pdp-description">
                    {currentProduct.description}
                  </p>
                )
              }
              {/* serial number / status */}
              <div className="columns is-hidden-mobile">
                <div className="column">
                  <p className="pdp-serial-title">
                    Serial Number:
                  </p>
                </div>
                <div className="column">
                  <p className="pdp-serial-number">
                    {currentProduct.serial_number || 'N/A'}
                  </p>
                </div>
                <div className="column">
                  {status}
                </div>
              </div>
              <div className="columns is-mobile is-hidden-tablet">
                <div className="column">
                  <p className="pdp-serial-title">
                    Serial Number:
                  </p>
                </div>
                <div className="column">
                  <p className="pdp-serial-number">
                    {currentProduct.serial_number || 'N/A'}
                  </p>
                </div>
              </div>
              <div className="columns is-hidden-tablet">
                <div className="column">
                  {status}
                </div>
              </div>
              <div className="pure-container" data-effect="pure-effect-slideAlong">
                <input type="checkbox" id="pure-toggle-top" className="pure-toggle" data-toggle="top" />
                <label
                  id="pdp-inquire-button"
                  className="pdp-inquire-button button is-rounded is-primary pure-toggle-label"
                  htmlFor="pure-toggle-top"
                  data-toggle-label="top"
                >
                  Inquire
                </label>

                <div className="pure-drawer" data-position="top">
                  <label
                    className="pure-toggle-label"
                    htmlFor="pure-toggle-top"
                    data-toggle-label="top"
                    style={{ minHeight: '3rem', alignItems: 'flex-start' }}
                  >
                    <span className="pure-toggle-icon" />
                  </label>
                  <InquireForm product={currentProduct} />
                </div>
                <label className="pure-overlay" htmlFor="pure-toggle-top" data-overlay="top" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <span />;
  }

  renderRelatedProductCards() {
    const { similarProducts } = this.state;

    if (similarProducts) {
      const columns1 = [];
      similarProducts.map(product => (
        columns1.push(
          <div key={product.id} className="column is-one-third">
            <Card card={product} inquireButton={false} />
          </div>,
        )
      ));

      return (
        <div className="page-container">
          <h5 className="title is-5 has-text-weight-semibold">
            Items Similar to This
          </h5>
          <div className="columns">
            {columns1}
          </div>
        </div>
      );
    }
    return <span />;
  }

  render() {
    const { currentProduct, similarProducts } = this.props;
    return (
      <div>
        <div className="page-container">
          <div className="breadcrumb pdp-breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li><Link to="/equipment">Search</Link></li>
              <li className="is-active breadcrumb-current">{currentProduct.make_and_model}</li>
            </ul>
          </div>
        </div>
        <section className="pdp-section">
          {
            currentProduct
            && this.renderProductSection()
          }
        </section>
        <section className="related-section">
          {
            similarProducts.length > 0
            && this.renderRelatedProductCards()
          }
        </section>
      </div>
    );
  }
}

ProductPage.propTypes = {
  currentProduct: PropTypes.shape({
    id: PropTypes.string,
    images: PropTypes.object,
    manufacturer: PropTypes.string,
    asset_number: PropTypes.string,
    make_and_model: PropTypes.string,
    serial_number: PropTypes.string,
    status: PropTypes.string,
    tags: PropTypes.string,
    description: PropTypes.string,
  }),
  allProducts: PropTypes.arrayOf(PropTypes.shape),
  similarProducts: PropTypes.arrayOf(PropTypes.shape),
  fetchAllProducts: PropTypes.func,
  fetchCurrentProduct: PropTypes.func,
  clearCurrentProduct: PropTypes.func,
  setSimilarProducts: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

ProductPage.defaultProps = {
  currentProduct: {},
  allProducts: [{}],
  similarProducts: [{}],
  fetchAllProducts: () => {},
  fetchCurrentProduct: () => {},
  clearCurrentProduct: () => {},
  setSimilarProducts: () => {},
};

export default ProductPage;
