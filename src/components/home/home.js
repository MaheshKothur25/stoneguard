import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { homePageRef } from '../../config/firebase';
import Loader from '../loader/loader';
import SlideShow from '../slideshow/slideshow';
import Search from '../search/search';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      content: null,
    };
  }

  componentWillMount() {
    const {
      fetchAllProducts,
    } = this.props;
    fetchAllProducts();
  }

  componentDidMount() {
    this.setState({ loading: true });
    homePageRef.on('value', (snapshot) => {
      this.setState({ content: snapshot.val(), loading: false });
    });
    console.log('path', this.props.location);
  }

  componentWillUnmount() {
    homePageRef.off();
  }

  render() {
    const {
      allProducts,
      setSearchResults,
    } = this.props;
    const { content, loading } = this.state;

    if (loading) {
      return <Loader />;
    }
    return (
      <div>
        {
          !loading && content
          && (
            <div>
              <div className="top-img-container">
                <div className="top-img-home" />
              </div>
              <Search haystack={allProducts} searchSubmit={setSearchResults} sendToEquipmentPage />
              <section className="main-section m-t-lg">
                <div className="page-container">
                  <div className="columns is-vcentered is-variable is-5">
                    <div className="column">
                      <div className="home-strike" />
                      <img alt="About Us" src={content.aboutSection.sectionImageUrl} />
                    </div>
                    <div className="column">
                      <h2 className="title is-2 dark-blue-text">
                        {content.aboutSection.title}
                      </h2>
                      <h5 className="title is-5">
                        {content.aboutSection.description}
                      </h5>
                      <Link to={content.aboutSection.linkTo} className="button is-primary is-rounded">
                        {content.aboutSection.buttonText}
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
              <section className="sub-section home-sub-section m-t-lg background-gunmetal">
                <div className="page-container">
                  <SlideShow slides={content.servicesSlides} smallHeader isDark />
                </div>
              </section>
              <section className="sub-section home-sub-section background-warm-grey-light">
                <div className="page-container">
                  <SlideShow slides={content.partnershipSlides} pictureOnLeft />
                </div>
              </section>
              <section className="background-brown trusted-by-section last-section-services">
                <div className="page-container">
                  {/*<SlideShow*/}
                  {/*  slides={content.quoteSlides}*/}
                  {/*  pictureOnLeft*/}
                  {/*  isDark*/}
                  {/*  isQuote*/}
                  {/*  roundedImage*/}
                  {/*/>*/}
                  <h2 className="title is-2 white-text text-centered trusted-by-header">
                    Trusted By
                  </h2>
                  <div className="columns">
                    <div className="column">
                      <img alt="Infineon" src={content.trustedBySection[0].imageUrl} />
                    </div>
                    <div className="column">
                      <img alt="Micron" src={content.trustedBySection[1].imageUrl} />
                    </div>
                    <div className="column">
                      <img alt="Maxim Integrated" src={content.trustedBySection[2].imageUrl} />
                    </div>
                    <div className="column">
                      <img alt="TowerJazz" src={content.trustedBySection[3].imageUrl} />
                    </div>
                    <div className="column">
                      <img alt="Microchip" src={content.trustedBySection[4].imageUrl} />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )
        }
      </div>
    );
  }
}

Home.propTypes = {
  allProducts: PropTypes.arrayOf(PropTypes.shape),
  fetchAllProducts: PropTypes.func,
  setSearchResults: PropTypes.func,

};

Home.defaultProps = {
  allProducts: [{}],
  fetchAllProducts: () => {},
  setSearchResults: () => {},
};

export default Home;
