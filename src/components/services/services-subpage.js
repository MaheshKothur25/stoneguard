import React from 'react';
import {
  servicesSubpage1Ref, servicesSubpage2Ref, servicesSubpage3Ref, servicesSubpage4Ref,
} from '../../config/firebase';
import Loader from '../loader/loader';
import SlideShow from "../slideshow/slideshow";
import PropTypes from "prop-types";

class ServicesSubpage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      content: null,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const {match} = this.props;
    const serviceId = match.params.service_id;
    if (serviceId === '1') {
      servicesSubpage1Ref.on('value', (snapshot) => {
        this.setState({ content: snapshot.val(), loading: false });
      });
    } else if (serviceId === '2') {
      servicesSubpage2Ref.on('value', (snapshot) => {
        this.setState({ content: snapshot.val(), loading: false });
      });
    } else if (serviceId === '3') {
      servicesSubpage3Ref.on('value', (snapshot) => {
        this.setState({ content: snapshot.val(), loading: false });
      });
    } else if (serviceId === '4') {
      servicesSubpage4Ref.on('value', (snapshot) => {
        this.setState({ content: snapshot.val(), loading: false });
      });
    }
  }

  componentWillUnmount() {
    servicesSubpage1Ref.off();
    servicesSubpage2Ref.off();
    servicesSubpage3Ref.off();
    servicesSubpage4Ref.off();
  }

  render() {
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
                <div className="top-img-services-subpage" />
              </div>
              <section id="sell-tools-section" className="sub-section background-white">
                <div className="page-container">
                  <div className="sub-container">
                    <h2 className="title is-2 warm-grey-text text-centered">
                      {content.header}
                    </h2>
                    <h5 className="title is-5 text-centered">
                      {content.description}
                    </h5>
                  </div>
                </div>
              </section>
              {
                !content.columns[0][0].hidden &&
                  <section className="sub-section background-warm-grey-light">
                    <div className="page-container">
                      <SlideShow slides={content.columns[0]} smallText subPage />
                    </div>
                  </section>
              }
              {
                !content.columns[1][0].hidden &&
                  <section className="sub-section home-sub-section background-white">
                    <div className="page-container">
                      <SlideShow slides={content.columns[1]} smallText subPage pictureOnLeft />
                    </div>
                  </section>
              }
              {
                !content.columns[2][0].hidden &&
                  <section className="sub-section background-warm-grey-light">
                    <div className="page-container">
                      <SlideShow slides={content.columns[2]} smallText subPage />
                    </div>
                  </section>
              }
              {
                !content.columns[3][0].hidden &&
                  <section className="sub-section home-sub-section background-white">
                    <div className="page-container">
                      <SlideShow slides={content.columns[3]} smallText subPage pictureOnLeft />
                    </div>
                  </section>
              }
            </div>
          )
        }
      </div>
    );
  }
}

ServicesSubpage.propsTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

export default ServicesSubpage;
