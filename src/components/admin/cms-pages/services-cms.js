import React from 'react';
import PropTypes from 'prop-types';
import EdiText from 'react-editext';
import FileUploader from 'react-firebase-file-uploader';
import { cms, cmsStorage } from '../../../config/firebase';

const ServicesCMS = (props) => {
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
        Services Page Content
      </h2>
      <h4 className="title is-4 bold underline">
        Hero Section
      </h4>
      <EdiText
        type="text"
        value={content.heroHeader.title}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'services/heroHeader/title')}
      />
      <br />
      <EdiText
        type="textarea"
        value={content.heroHeader.description}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'services/heroHeader/description')}
      />
      <br />
      <br />
      <h4 className="title is-4 bold underline">
        First Section
      </h4>
      <EdiText
        type="text"
        value={content.firstSection.title}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'services/firstSection/title')}
      />
      <br />
      <EdiText
        type="textarea"
        value={content.firstSection.description}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'services/firstSection/description')}
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
            filename="services_firstSection_sectionImageUrl"
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
        Slideshow Section
      </h4>
      {
        content.tradingSlides && content.tradingSlides.map((slide, index) => (
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
              onSave={value => onSave(value, `services/tradingSlides/${index}/captionTitle`)}
            />
            <br />
            <EdiText
              type="text"
              value={slide.captionDescription}
              editButtonClassName="custom-edit-button"
              editButtonContent="&#9998;"
              onSave={value => onSave(value, `services/tradingSlides/${index}/captionDescription`)}
            />
            <br />
            <EdiText
              type="text"
              value={slide.captionLinkTitle}
              editButtonClassName="custom-edit-button"
              editButtonContent="&#9998;"
              onSave={value => onSave(value, `services/tradingSlides/${index}/captionLinkTitle`)}
            />
            <br />
            <EdiText
              type="text"
              value={slide.captionLinkHref}
              editButtonClassName="custom-edit-button"
              editButtonContent="&#9998;"
              onSave={value => onSave(value, `services/tradingSlides/${index}/captionLinkHref`)}
            />
            <br />
            {/* eslint-disable-next-line */}
            <div className="cms-image-container">
              <a
                href={null}
                onClick={() => props.showModal(slide.imageUrl, `tradingSlides/${index}/imageUrl`)}
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
                  name={`services_tradingSlides_${index}_imageUrl`}
                  filename={`services_tradingSlides_${index}_imageUrl`}
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
      <br />
      <h4 className="title is-4 bold underline">
        Third Section
      </h4>
      <EdiText
        type="text"
        value={content.thirdSection.title}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'services/thirdSection/title')}
      />
      <br />
      <EdiText
        type="textarea"
        value={content.thirdSection.description}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'services/thirdSection/description')}
      />
      <br />
      {/* eslint-disable-next-line */}
      <div className="cms-image-container">
        <a
          href={null}
          onClick={() => props.showModal(content.thirdSection.sectionImageUrl, 'thirdSection/sectionImageUrl')}
        >
          <img
            className="cms-img"
            src={content.thirdSection.sectionImageUrl}
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
            filename="services_thirdSection_sectionImageUrl"
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
        Fourth Section
      </h4>
      <h5 className="title is-5 underline">
        Column 1
      </h5>
      <EdiText
        type="text"
        value={content.fourthSection.column1Header}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'services/fourthSection/column1Header')}
      />
      <br />
      <EdiText
        type="textarea"
        value={content.fourthSection.column1Text}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'services/fourthSection/column1Text')}
      />
      <br />
      <EdiText
        type="textarea"
        value={content.fourthSection.column1Href}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'services/fourthSection/column1Href')}
      />
      <br />
      <EdiText
        type="textarea"
        value={content.fourthSection.column1LinkTitle}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'services/fourthSection/column1LinkTitleZ')}
      />
      <br />
      <br />
      <h5 className="title is-5 underline">
        Column 2
      </h5>
      <EdiText
        type="text"
        value={content.fourthSection.column2Header}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'services/fourthSection/column2Header')}
      />
      <br />
      <EdiText
        type="textarea"
        value={content.fourthSection.column2Text}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'services/fourthSection/column2Text')}
      />
      <br />
      <EdiText
        type="textarea"
        value={content.fourthSection.column2Href}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'services/fourthSection/column2Href')}
      />
      <br />
      <EdiText
        type="textarea"
        value={content.fourthSection.column2LinkTitle}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'services/fourthSection/column2LinkTitleZ')}
      />
      <br />
      <br />
      <h5 className="title is-5 underline">
        Column 3
      </h5>
      <EdiText
        type="text"
        value={content.fourthSection.column3Header}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'services/fourthSection/column3Header')}
      />
      <br />
      <EdiText
        type="textarea"
        value={content.fourthSection.column3Text}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'services/fourthSection/column3Text')}
      />
      <br />
      <EdiText
        type="textarea"
        value={content.fourthSection.column3Href}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'services/fourthSection/column3Href')}
      />
      <br />
      <EdiText
        type="textarea"
        value={content.fourthSection.column3LinkTitle}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'services/fourthSection/column3LinkTitleZ')}
      />
      <br />
      <br />
      <h5 className="title is-5 underline">
        Column 4
      </h5>
      <EdiText
        type="text"
        value={content.fourthSection.column4Header}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'services/fourthSection/column4Header')}
      />
      <br />
      <EdiText
        type="textarea"
        value={content.fourthSection.column4Text}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'services/fourthSection/column4Text')}
      />
      <br />
      <EdiText
        type="textarea"
        value={content.fourthSection.column4Href}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'services/fourthSection/column4Href')}
      />
      <br />
      <EdiText
        type="textarea"
        value={content.fourthSection.column4LinkTitle}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'services/fourthSection/column4LinkTitleZ')}
      />
      <br />
      <br />
    </div>
  );
};

ServicesCMS.propTypes = {
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
    tradingSlides: PropTypes.array,
  }),
};

ServicesCMS.defaultProps = {
  content: {},
};

export default ServicesCMS;
