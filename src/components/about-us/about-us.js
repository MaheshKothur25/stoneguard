import React from 'react';
import { aboutPageRef } from '../../config/firebase';
import GuestLayout from '../globals/guest-layout';
import SlideShow from '../slideshow/slideshow';
import Loader from '../loader/loader';
import Map from '../../resources/img/map.png';
import LabTechs from '../../resources/img/about-us/lab-techs.jpg';

class AboutUs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      content: null,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    aboutPageRef.on('value', (snapshot) => {
      this.setState({ content: snapshot.val(), loading: false });
    });
  }

  componentWillUnmount() {
    aboutPageRef.off();
  }

  render() {
    const { content, loading } = this.state;
    if (loading) {
      return <Loader />;
    }
    return (
      <GuestLayout>
        {
          !loading && content
          && (
            <div>
              <div className="top-img-container">
                <div className="top-img-about" />
                <div className="tile is-ancestor hero-tile-box-about is-hidden-mobile">
                  <div className="about-us-strike-1" />
                  <div className="tile is-parent">
                    <div className="tile is-child box hero-child-box">
                      <h2 className="title is-2">
                        {content.heroHeader.title}
                      </h2>
                      <p>
                        {content.heroHeader.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <section className="main-section is-hidden-tablet">
                <div className="about-us-strike-1" />
                <div className="container about-mobile p-l-lg p-r-lg background-white-title-brown">
                  <h2 className="title is-2">
                    {content.heroHeader.title}
                  </h2>
                  <h4 className="title is-4">
                    {content.heroHeader.description}
                  </h4>
                </div>
              </section>
              <section id="our-vision-section" className="sub-section background-white">
                <div className="container p-l-xxl p-r-xxl p-b-lg">
                  <div className="about-us-strike-2" />
                  <h2 className="title is-2 our-vision-subtitle">
                    {content.firstSection.title}
                  </h2>
                  <h4 className="title is-4 our-vision-subtitle">
                    {content.firstSection.description}
                  </h4>
                </div>
                <div className="container p-l-lg p-r-lg">
                  <img alt="Lab Techs" src={LabTechs} />
                </div>
              </section>
              <section id="map-section" className="sub-section background-warm-grey" style={{ padding: 0 }}>
                <div className="columns">
                  <div className="column" style={{ padding: '0 0.75rem 0.3rem' }}>
                    <a
                      href="https://goo.gl/maps/DG6mu3Syx55pxmhc7"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img alt="map" src={Map} />
                    </a>
                  </div>
                  <div className="column vertical-center" style={{ padding: '2rem' }}>
                    <h4 className="title is-4">
                      {content.mapSection.description}
                    </h4>
                  </div>
                </div>
              </section>
              <section className="last-section-services background-warm-grey-light">
                <div className="page-container">
                  <SlideShow slides={content.quotesSlides2} pictureOnLeft isQuote roundedImage />
                </div>
              </section>
            </div>
          )
        }
      </GuestLayout>
    );
  }
}

export default AboutUs;
