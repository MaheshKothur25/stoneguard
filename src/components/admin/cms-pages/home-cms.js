import React from 'react';
import PropTypes from 'prop-types';
import EdiText from 'react-editext';
import FileUploader from 'react-firebase-file-uploader';
import { cms, cmsStorage } from '../../../config/firebase';

const HomeCMS = (props) => {
  const onSave = (val, node) => {
    cms.once('value', () => {
      const updates = {};
      updates[`${node}`] = val;
      cms.update(updates);
    });
  };
  const {
    content,
    handleUploadStart,
    handleProgress,
    handleUploadError,
    handleUploadSuccess,
  } = props;
  return (
    <div className="home-page-cms p-b-lg">
      <h2 className="title is-2">
        Home Page Content
      </h2>
      <h4 className="title is-4 bold underline">
        First Section
      </h4>
      <EdiText
        type="text"
        value={content.aboutSection.title}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'home/aboutSection/title')}
      />
      <br />
      <EdiText
        type="textarea"
        value={content.aboutSection.description}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'home/aboutSection/description')}
      />
      <br />
      <EdiText
        type="textarea"
        value={content.aboutSection.buttonText}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'home/aboutSection/buttonText')}
      />
      <br />
      <EdiText
        type="textarea"
        value={content.aboutSection.linkTo}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'home/aboutSection/linkTo')}
      />
      <br />
      {/* eslint-disable-next-line */}
      <div className="cms-image-container">
        <a
          href={null}
          onClick={() => props.showModal(content.aboutSection.sectionImageUrl, 'aboutSection/sectionImageUrl')}
        >
          <img
            className="cms-img"
            src={content.aboutSection.sectionImageUrl}
            alt="cms"
          />
        </a>
      </div>
      <br />
      {/* eslint-disable-next-line */}
      <label className="button is-info">
        Replace Image&nbsp;
        <span className="icon is-small" style={{ margin: '0' }}>
          <i className="far fa-images" />
        </span>
        <span>
          <FileUploader
            hidden
            accept="image/*"
            name="test"
            filename="home_aboutSection_sectionImageUrl"
            storageRef={cmsStorage}
            onUploadStart={handleUploadStart}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
            onProgress={handleProgress}
          />
        </span>
      </label>
      <br />
      <br />
      <h4 className="title is-4 bold underline">
        First Slideshow Section
      </h4>
      {
        content.servicesSlides && content.servicesSlides.map((slide, index) => (
          <span key={slide.imageUrl}>
            <h4 className="title is-4 bold">
              Slide #&nbsp;
              {index + 1}
            </h4>
            <EdiText
              type="text"
              value={slide.smallHeader}
              editButtonClassName="custom-edit-button"
              editButtonContent="&#9998;"
              onSave={value => onSave(value, `home/servicesSlides/${index}/smallHeader`)}
            />
            <br />
            <EdiText
              type="text"
              value={slide.captionTitle}
              editButtonClassName="custom-edit-button"
              editButtonContent="&#9998;"
              onSave={value => onSave(value, `home/servicesSlides/${index}/captionTitle`)}
            />
            <br />
            <EdiText
              type="text"
              value={slide.captionDescription}
              editButtonClassName="custom-edit-button"
              editButtonContent="&#9998;"
              onSave={value => onSave(value, `home/servicesSlides/${index}/captionDescription`)}
            />
            <br />
            <EdiText
              type="text"
              value={slide.captionLinkTitle}
              editButtonClassName="custom-edit-button"
              editButtonContent="&#9998;"
              onSave={value => onSave(value, `home/servicesSlides/${index}/captionLinkTitle`)}
            />
            <br />
            <EdiText
              type="text"
              value={slide.captionLinkHref}
              editButtonClassName="custom-edit-button"
              editButtonContent="&#9998;"
              onSave={value => onSave(value, `home/servicesSlides/${index}/captionLinkHref`)}
            />
            <br />
            {/* eslint-disable-next-line */}
            <div className="cms-image-container">
              <a
                href={null}
                onClick={() => props.showModal(slide.imageUrl, `servicesSlides/${index}/imageUrl`)}
              >
                <img
                  className="cms-img"
                  src={slide.imageUrl}
                  alt="cms"
                />
              </a>
            </div>
            <br />
            {/* eslint-disable-next-line */}
            <label className="button is-info">
              Replace Image&nbsp;
              <span className="icon is-small" style={{ margin: '0' }}>
                <i className="far fa-images" />
              </span>
              <span>
                <FileUploader
                  hidden
                  accept="image/*"
                  name={`home_servicesSlides_${index}_imageUrl`}
                  filename={`home_servicesSlides_${index}_imageUrl`}
                  storageRef={cmsStorage}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                />
              </span>
            </label>
            <br />
            <br />
          </span>
        ))
      }
      <br />
      <h4 className="title is-4 bold underline">
        Second Slideshow Section
      </h4>
      {
        content.partnershipSlides && content.partnershipSlides.map((slide, index) => (
          <span key={slide.imageUrl}>
            <h4 className="title is-4 bold">
              Slide #&nbsp;
              {index + 1}
            </h4>
            <EdiText
              type="text"
              value={slide.captionTitle}
              editButtonClassName="custom-edit-button"
              editButtonContent="&#9998;"
              onSave={value => onSave(value, `home/partnershipSlides/${index}/captionTitle`)}
            />
            <br />
            <EdiText
              type="text"
              value={slide.captionDescription}
              editButtonClassName="custom-edit-button"
              editButtonContent="&#9998;"
              onSave={value => onSave(value, `home/partnershipSlides/${index}/captionDescription`)}
            />
            <br />
            {/* eslint-disable-next-line */}
            <div className="cms-image-container">
              <a
                href={null}
                onClick={() => props.showModal(slide.imageUrl, `partnershipSlides/${index}/imageUrl`)}
              >
                <img
                  className="cms-img"
                  src={slide.imageUrl}
                  alt="cms"
                />
              </a>
            </div>
            <br />
            {/* eslint-disable-next-line */}
            <label className="button is-info">
              Replace Image&nbsp;
              <span className="icon is-small" style={{ margin: '0' }}>
                <i className="far fa-images" />
              </span>
              <span>
                <FileUploader
                  hidden
                  accept="image/*"
                  name={`home_partnershipSlides_${index}_imageUrl`}
                  filename={`home_partnershipSlides_${index}_imageUrl`}
                  storageRef={cmsStorage}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                />
              </span>
            </label>
            <br />
            <br />
          </span>
        ))
      }
      <br />
      <h4 className="title is-4 bold underline">
        Trusted By Section
      </h4>
      {
        content.trustedBySection && content.trustedBySection.map((image, index) => {
          const indexToUse = index + 1;
          return (
            <span key={image.imageUrl}>
            <h4 className="title is-4 bold">
              Image #&nbsp;
              {index + 1}
            </h4>
              {/* eslint-disable-next-line */}
              <div className="cms-image-container">
              <a
                href={null}
                onClick={() => props.showModal(image.imageUrl, `trustedBySection/${index}/imageUrl`)}
              >
                <img
                  className="cms-img"
                  src={image.imageUrl}
                  alt="cms"
                />
              </a>
            </div>
            <br />
              {/* eslint-disable-next-line */}
              <label className="button is-info">
              Replace Image&nbsp;
                <span className="icon is-small" style={{ margin: '0' }}>
                <i className="far fa-images" />
              </span>
              <span>
                <FileUploader
                  hidden
                  accept="image/*"
                  name={`home_trustedBySection_image${index + 1}`}
                  filename={`home_trustedBySection_image${index + 1}`}
                  storageRef={cmsStorage}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                />
              </span>
            </label>
            <br />
            <br />
          </span>
          )
        })
      }
    </div>
  );
};

HomeCMS.propTypes = {
  showModal: PropTypes.func.isRequired,
  handleUploadStart: PropTypes.func.isRequired,
  handleUploadError: PropTypes.func.isRequired,
  handleUploadSuccess: PropTypes.func.isRequired,
  handleProgress: PropTypes.func.isRequired,
  content: PropTypes.shape({
    aboutSection: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      buttonText: PropTypes.string,
      sectionImageUrl: PropTypes.string,
    }),
    servicesSlides: PropTypes.array,
    partnershipSlides: PropTypes.array,
    quoteSlides: PropTypes.array,
  }),
};

HomeCMS.defaultProps = {
  content: {},
};

export default HomeCMS;
