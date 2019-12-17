import React from 'react';
import { servicesPageRef } from '../../config/firebase';
import GuestLayout from '../globals/guest-layout';
import Loader from '../loader/loader';
import WeSellToolsImg from '../../resources/img/services/heidelsberg.jpg';
import Technician from '../../resources/img/services/technician.jpg';
import GoldBall from '../../resources/img/services/gold-ball.jpg';
import IntelLogo from '../../resources/img/intel-logo.png';
import NXPLogo from '../../resources/img/nxp-logo.png';
import SlideShow from "../slideshow/slideshow";

class Services extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      content: null,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    servicesPageRef.on('value', (snapshot) => {
      this.setState({ content: snapshot.val(), loading: false });
    });
  }

  componentWillUnmount() {
    servicesPageRef.off();
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
                <div className="top-img-services" />
                <div className="tile is-ancestor hero-tile-box is-hidden-mobile">
                  <div className="services-strike-1" />
                  <div className="tile is-parent">
                    <div className="tile is-child box hero-child-box">
                      <h2 className="title is-2">
                        {content.heroHeader.title}
                      </h2>
                      <h5 className="title is-5">
                        {content.heroHeader.description}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              <section className="main-section is-hidden-tablet">
                <div className="services-strike-1" />
                <div className="container our-strive-mobile p-l-lg p-r-lg background-white-title-brown">
                  <h2 className="title is-2">
                    {content.heroHeader.title}
                  </h2>
                  <h4 className="title is-4">
                    {content.heroHeader.description}
                  </h4>
                </div>
              </section>
              <section id="sell-tools-section" className="sub-section background-warm-grey-light">
                <div className="page-container">
                  <div className="columns">
                    <div className="column">
                      <img alt="We Sell Tools" src={WeSellToolsImg} />
                      <div className="services-strike-2" />
                    </div>
                    <div className="column" style={{ alignSelf: 'flex-end' }}>
                      <h2 className="title is-2">
                        {content.firstSection.title}
                      </h2>
                      <h5 className="title is-5">
                        {content.firstSection.description}
                      </h5>
                    </div>
                  </div>
                </div>
              </section>
              <section id="find-tools-section" className="sub-section background-white">
                <div className="page-container">
                  <SlideShow slides={content.tradingSlides} smallText />
                </div>
                {/* <div className="container text-centered services-second-container
                 page-container">
                  <div className="services-find-tools">
                    <h3 className="title is-2">
                      {content.secondSection.title}
                    </h3>
                    <h5 className="title is-5">
                      {content.secondSection.description}
                    </h5>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <img alt="thing 1" src={content.secondSection.column1Image} />
                      <h5 className="title is-5 three-col-img-txt">
                        {content.secondSection.column1Text}
                      </h5>
                    </div>
                    <div className="column">
                      <img alt="thing 2" src={content.secondSection.column2Image} />
                      <h5 className="title is-5 three-col-img-txt">
                        {content.secondSection.column2Text}
                      </h5>
                    </div>
                    <div className="column">
                      <img alt="thing 3" src={content.secondSection.column3Image} />
                      <h5 className="title is-5 three-col-img-txt">
                        {content.secondSection.column3Text}
                      </h5>
                    </div>
                  </div>
                </div> */}
              </section>
              <section className="sub-section background-dark-grey-blue section-padding-bottom last-section-services">
                <div className="page-container">
                  <div className="columns is-vcentered reverse-row-order">
                    <div className="column">
                      <img alt="We Repair Tools" src={Technician} />
                      <div className="services-strike-3" />
                    </div>
                    <div className="column">
                      <h2 className="title is-2">
                        {content.thirdSection.title}
                      </h2>
                      <h4 className="title is-4">
                        {content.thirdSection.description}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="container services-second-container page-container">
                  {/* <div className="services-find-tools">
                    <h3 className="title is-3 text-centered">
                      <span className="diamond" />
                      {content.thirdSection.subtitle}
                      <span className="diamond" />
                    </h3>
                  </div> */}
                  <div className="columns services-column-group p-l-xl-mob p-r-xl-mob">
                    <div className="column">
                      <h4 className="title is-4 three-col-img-txt">
                        {content.fourthSection.column1Header}
                      </h4>
                      <p className="three-col-img-txt">
                        {content.fourthSection.column1Text}
                      </p>
                      <a
                        href={content.fourthSection.column1Href ? content.fourthSection.column1Href : null}
                        className="button is-rounded is-outlined transparent-bg-button"
                      >
                        {content.fourthSection.column1LinkTitle}
                      </a>
                    </div>
                    <div className="column">
                      <h4 className="title is-4 three-col-img-txt">
                        {content.fourthSection.column2Header}
                      </h4>
                      <p className="three-col-img-txt">
                        {content.fourthSection.column2Text}
                      </p>
                      <a
                        href={content.fourthSection.column2Href ? content.fourthSection.column2Href : null}
                        className="button is-rounded is-outlined transparent-bg-button"
                      >
                        {content.fourthSection.column2LinkTitle}
                      </a>
                    </div>
                  </div>
                  <div className="columns services-column-group p-l-xl-mob p-r-xl-mob">
                    <div className="column">
                      <h4 className="title is-4 three-col-img-txt">
                        {content.fourthSection.column3Header}
                      </h4>
                      <p className="three-col-img-txt">
                        {content.fourthSection.column3Text}
                      </p>
                      <a
                        href={content.fourthSection.column3Href ? content.fourthSection.column3Href : null}
                        className="button is-rounded is-outlined transparent-bg-button"
                      >
                        {content.fourthSection.column3LinkTitle}
                      </a>
                    </div>
                    <div className="column">
                      <h4 className="title is-4 three-col-img-txt">
                        {content.fourthSection.column4Header}
                      </h4>
                      <p className="three-col-img-txt">
                        {content.fourthSection.column4Text}
                      </p>
                      <a
                        href={content.fourthSection.column4Href ? content.fourthSection.column4Href : null}
                        className="button is-rounded is-outlined transparent-bg-button"
                      >
                        {content.fourthSection.column4LinkTitle}
                      </a>
                    </div>
                  </div>
                </div>
              </section>
              {/* <section id="additional-services" className="sub-section
               background-white-title-brown">
                <div className="page-container">
                  <div className="columns is-vcentered reverse-row-order">
                    <div className="column">
                      <h2 className="title is-2">
                        {content.fourthSection.title}
                      </h2>
                      <h5 className="title is-4">
                        {content.fourthSection.description}
                      </h5>
                    </div>
                    <div className="column">
                      <img alt="Additional Services" src={GoldBall} />
                      <div className="services-strike-4" />
                    </div>
                  </div>
                </div>
              </section>
              <section className="sub-section background-warm-grey-light section-padding-bottom last-section-services">
                <div className="page-container">
                  <h3 className="title is-2 text-centered">
                    {content.fifthSection.title}
                  </h3>
                </div>
                <br />
                <div className="container text-centered p-l-md p-r-md">
                  <div className="columns is-centered">
                    <div className="column has-text-centered is-2">
                      <img alt="intel" src={IntelLogo} style={{ maxWidth: '115px' }} />
                      <p className="three-col-img-txt">
                        {content.fifthSection.column1Text}
                      </p>
                    </div>
                    <div className="column has-text-centered is-2">
                      <img alt="nxp semiconductors" src={NXPLogo} style={{ maxWidth: '152px' }} />
                      <p className="three-col-img-txt">
                        {content.fifthSection.column2Text}
                      </p>
                    </div>
                  </div>
                </div>
              </section> */}
            </div>
          )
        }
      </GuestLayout>
    );
  }
}

export default Services;
