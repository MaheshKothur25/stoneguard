import React from 'react';
import PropTypes from 'prop-types';
import EdiText from 'react-editext';
import FileUploader from 'react-firebase-file-uploader';
import { cms, cmsStorage } from '../../../config/firebase';

const AboutCMS = (props) => {
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
        About Page Content
      </h2>
      <h4 className="title is-4 bold underline">
        Hero Section
      </h4>
      <EdiText
        type="text"
        value={content.heroHeader.title}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'about-us/heroHeader/title')}
      />
      <br />
      <EdiText
        type="textarea"
        value={content.heroHeader.description}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'about-us/heroHeader/description')}
      />
      <br />
      <h4 className="title is-4 bold underline">
        First Section
      </h4>
      <EdiText
        type="text"
        value={content.firstSection.title}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'about-us/firstSection/title')}
      />
      <br />
      <EdiText
        type="textarea"
        value={content.firstSection.description}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'about-us/firstSection/description')}
      />
      <br />
      {/* eslint-disable-next-line */}
      <div className="cms-image-container">
        <a
          href={null}
          onClick={() => props.showModal(content.firstSection.sectionImageUrl, 'firstSection/sectionImageUrl')}
        >
          <img
            className="cms-img"
            src={content.firstSection.sectionImageUrl}
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
            filename="about-us_firstSection_sectionImageUrl"
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
        Map Section
      </h4>
      <EdiText
        type="text"
        value={content.mapSection.description}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'about-us/mapSection/description')}
      />
      <br />
      {/* eslint-disable-next-line */}
      <div className="cms-image-container">
        <a
          href={null}
          onClick={() => props.showModal(content.mapSection.mapImageUrl, 'mapSection/mapImageUrl')}
        >
          <img
            className="cms-img"
            src={content.mapSection.mapImageUrl}
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
            name="mapSection"
            filename="about-us_mapSection_mapImageUrl"
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
        Quote Slideshow Section
      </h4>
      {
        content.quotesSlides2 && content.quotesSlides2.map((slide, index) => (
          <span key={slide.imageUrl}>
            <h4 className="title is-4 bold">
              Slide #&nbsp;
              {index + 1}
            </h4>
            <EdiText
              type="text"
              value={slide.captionName}
              editButtonClassName="custom-edit-button"
              editButtonContent="&#9998;"
              onSave={value => onSave(value, `about-us/quotesSlides2/${index}/captionName`)}
            />
            <br />
            <EdiText
              type="text"
              value={slide.captionTitle}
              editButtonClassName="custom-edit-button"
              editButtonContent="&#9998;"
              onSave={value => onSave(value, `about-us/quotesSlides2/${index}/captionTitle`)}
            />
            <br />
            <EdiText
              type="text"
              value={slide.captionDescription}
              editButtonClassName="custom-edit-button"
              editButtonContent="&#9998;"
              onSave={value => onSave(value, `about-us/quotesSlides2/${index}/captionDescription`)}
            />
            <br />
            {/* eslint-disable-next-line */}
            <div className="cms-image-container">
              <a
                href={null}
                onClick={() => props.showModal(slide.imageUrl, `quotesSlides2/${index}/imageUrl`)}
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
                  name={`about-us_quotesSlides2_${index}_imageUrl`}
                  filename={`about-us_quotesSlides2_${index}_imageUrl`}
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
    </div>
  );
};

AboutCMS.propTypes = {
  showModal: PropTypes.func.isRequired,
  handleUploadStart: PropTypes.func.isRequired,
  handleUploadError: PropTypes.func.isRequired,
  handleUploadSuccess: PropTypes.func.isRequired,
  handleProgress: PropTypes.func.isRequired,
  content: PropTypes.shape({
    firstSection: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      sectionImageUrl: PropTypes.string,
    }),
    heroHeader: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
    mapSection: PropTypes.shape({
      description: PropTypes.string,
      mapImageUrl: PropTypes.string,
    }),
    quotesSlides2: PropTypes.array,
  }),
};

AboutCMS.defaultProps = {
  content: {},
};

export default AboutCMS;
