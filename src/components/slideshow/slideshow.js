import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from '../../utils/classNames';

class SlideShow extends React.Component {
  constructor() {
    super();
    this.state = { activeIndex: 0 };
  }

  componentDidMount() {
    /* eslint-disable */
    // const slidesLength = this.props.slides.length - 1;
    // this.slidesInterval = setInterval(function() {
    //   this.jumpToSlide(this.state.activeIndex < slidesLength ? this.state.activeIndex + 1 : 0);
    // }.bind(this), 9000);
  }

  componentWillUnmount() {
    clearInterval(this.slidesInterval);
  }

  jumpToSlide(index) {
    this.setState({ activeIndex: index });
  }

  render() {
    const {
      pictureOnLeft, isQuote, roundedImage, slides, isDark, smallHeader, smallText, subPage,
    } = this.props;
    const { activeIndex } = this.state;
    return (
      <div className={`slideshow ${pictureOnLeft ? 'slideshow-left' : 'slideshow-right'} ${isQuote ? 'slideshow-quote' : 'slideshow-text'}`}>
        <div className="slideshow-slides">
          {
            slides.map((slide, index) => (
              // eslint-disable-next-line
              <div key={index} className={classNames({ active: index === activeIndex, inactive: index !== activeIndex })}>
                <div className="slide-container">
                  {
                    (isQuote)
                      ? (
                        <div className="columns quote-columns">
                          <div className="column quote-left-box">
                            <img
                              src={slide.imageUrl}
                              alt={slide.captionTitle ? slide.captionTitle : null}
                              className={`quote-img ${roundedImage ? 'rounded-img' : ''}`}
                            />
                            <h3 className={`quote-name ${isDark ? 'white-text': ''}`}>
                              {slide.captionName ? slide.captionName : null}
                            </h3>
                            <p className={`${isDark ? 'white-text': ''}`}>
                              {slide.captionTitle ? slide.captionTitle : null}
                            </p>
                          </div>
                          <div className={`column quote-right-box ${isDark ? 'white-text': ''}`}>
                            <span className="quote-quotes quote-right">&ldquo;</span>
                            {
                              slide.captionDescription
                              && (
                                <h5 className="full-quote">
                                  {slide.captionDescription}
                                  <span className="quote-quotes quote-left">&rdquo;</span>
                                </h5>
                              )
                            }
                          </div>
                        </div>
                      ) : (
                        <div className={`columns is-centered is-vcentered is-variable is-5 ${pictureOnLeft ? 'reverse-row-order' : ''}`}>
                          <div className="column">
                            {
                              smallHeader
                              && (
                                <h4 className="title is-4">
                                  {slide.smallHeader}
                                </h4>
                              )
                            }
                            {
                              smallText
                                ? (
                                  <span>
                                    <p className={subPage ? "subPageTitle" : "bold"}>
                                      {slide.captionTitle ? slide.captionTitle : null}
                                    </p>
                                    <p>
                                      {slide.captionName ? slide.captionName : null}
                                    </p>
                                    <p style={{marginBottom: '2rem'}}>
                                      {slide.captionDescription ? slide.captionDescription : null}
                                    </p>
                                  </span>
                                ) : (
                                  <span>
                                    <h2 className="title is-2">
                                      {slide.captionTitle ? slide.captionTitle : null}
                                    </h2>
                                    <h5 className="title is-5 has-text-weight-bold">
                                      {slide.captionName ? slide.captionName : null}
                                    </h5>
                                    <h5 className="title is-5" style={{marginBottom: '2rem'}}>
                                      {slide.captionDescription ? slide.captionDescription : null}
                                    </h5>
                                  </span>
                                )
                            }
                            {
                              slide.captionLinkTitle
                                ? (
                                  <span>
                                    <Link
                                      to={slide.captionLinkHref ? slide.captionLinkHref : null}
                                      className={`button is-rounded ${isDark ? 'is-outlined' +
                                        ' transparent-bg-button' : 'is-primary'}`}
                                    >
                                      {slide.captionLinkTitle ? slide.captionLinkTitle : null}
                                    </Link>
                                  </span>
                                ) : <span />
                            }
                          </div>
                          <div className="column has-text-centered">
                            <img
                              src={slide.imageUrl}
                              alt={slide.captionTitle ? slide.captionTitle : null}
                              className={`slide-img ${roundedImage ? 'rounded-img' : ''}`}
                            />
                          </div>
                        </div>
                      )
                  }
                </div>
              </div>
            ))
          }
        </div>
        {
          (slides.length > 1)
            ? (
              <ul className={`slideshow-dots ${isQuote ? 'slideshow-dots-quote' : ''}`}>
                {
                  slides.map((slide, index) => (
                    // eslint-disable-next-line
                    <li key={index} className={(index === activeIndex) ? 'active' : ''}>
                      {/* eslint-disable-next-line */}
                      <a className={`${isDark ? 'dark' : 'light'}`} href={null} onClick={() => this.jumpToSlide(index)}>{index + 1}</a>
                    </li>
                  ))
                }
              </ul>
            ) : <span />
        }
      </div>
    );
  }
}

SlideShow.propTypes = {
  pictureOnLeft: PropTypes.bool,
  isDark: PropTypes.bool,
  isQuote: PropTypes.bool,
  smallHeader: PropTypes.bool,
  roundedImage: PropTypes.bool,
  smallText: PropTypes.bool,
  subPage: PropTypes.bool,
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string,
      captionQuoterName: PropTypes.string,
      captionTitle: PropTypes.string,
      captionDescription: PropTypes.string,
      captionLinkHref: PropTypes.string,
      captionLinkTitle: PropTypes.string,
    }),
  ).isRequired,
};

SlideShow.defaultProps = {
  pictureOnLeft: false,
  isDark: false,
  isQuote: false,
  smallHeader: false,
  roundedImage: false,
  smallText: false,
  subPage: false,
};

export default SlideShow;
