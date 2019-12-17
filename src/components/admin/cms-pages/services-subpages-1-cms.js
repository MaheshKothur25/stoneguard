import React from 'react';
import PropTypes from 'prop-types';
import EdiText from 'react-editext';
import FileUploader from 'react-firebase-file-uploader';
import { cms, cmsStorage } from '../../../config/firebase';

const ServicesSubpages1Cms = (props) => {
  const onSave = (val, node) => {
    cms.once('value', () => {
      const updates = {};
      updates[`${node}`] = val;
      cms.update(updates);
    });
  };
  const hideSection = (node) => {
    cms.once('value', () => {
      const updates = {};
      updates[`${node}/hidden`] = true;
      cms.update(updates);
    })
  };
  const showSection = (node) => {
    cms.once('value', () => {
      const updates = {};
      updates[`${node}/hidden`] = false;
      cms.update(updates);
    })
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
        Services SubPage 1 Content
      </h2>
      <h4 className="title is-4 bold underline">
        Header Section
      </h4>
      <EdiText
        type="text"
        value={content.header}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'services-subpage-1/header')}
      />
      <br />
      <EdiText
        type="textarea"
        value={content.description}
        editButtonClassName="custom-edit-button"
        editButtonContent="&#9998;"
        onSave={value => onSave(value, 'services-subpage-1/description')}
      />
      <br />
      <br />
      {
        content.columns && content.columns.map((column, colIndex) => (
          column && column.map((slide, index) => {
            return (
              <span key={slide.imageUrl}>
                <h4 className="title is-4 bold underline">
                  Row {colIndex + 1} {slide.hidden && '- HIDDEN'}
                </h4>
                {
                  slide.hidden &&
                    <button type="button" className="button is-primary" onClick={() => showSection(`services-subpage-1/columns/${colIndex}/${index}`)}>
                      Show This Section
                    </button>
                }
                {
                  slide.hidden === 'undefined' || !slide.hidden &&
                    <button type="button" className="button is-info" onClick={() => hideSection(`services-subpage-1/columns/${colIndex}/${index}`)}>
                      Hide This Section
                    </button>
                }
                <br />
                <br />
                <EdiText
                  type="text"
                  value={slide.captionTitle}
                  editButtonClassName="custom-edit-button"
                  editButtonContent="&#9998;"
                  onSave={value => onSave(value, `services-subpage-1/columns/${colIndex}/${index}/captionTitle`)}
                />
                <br />
                <EdiText
                  type="text"
                  value={slide.captionDescription}
                  editButtonClassName="custom-edit-button"
                  editButtonContent="&#9998;"
                  onSave={value => onSave(value, `services-subpage-1/columns/${colIndex}/${index}/captionDescription`)}
                />
                <br />
                <EdiText
                  type="text"
                  value={slide.captionLinkTitle}
                  editButtonClassName="custom-edit-button"
                  editButtonContent="&#9998;"
                  onSave={value => onSave(value, `services-subpage-1/columns/${colIndex}/${index}/captionLinkTitle`)}
                />
                <br />
                <EdiText
                  type="text"
                  value={slide.captionLinkHref}
                  editButtonClassName="custom-edit-button"
                  editButtonContent="&#9998;"
                  onSave={value => onSave(value, `services-subpage-1/columns/${colIndex}/${index}/captionLinkHref`)}
                />
                <br />
                    {/* eslint-disable-next-line */}
                    <div className="cms-image-container">
                  <a
                    href={null}
                    onClick={() => props.showModal(slide.imageUrl, `columns/${colIndex}/${index}/imageUrl`)}
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
                      name={`services-subpage-1_columns_${colIndex}_${index}_imageUrl`}
                      filename={`services-subpage-1_columns_${colIndex}_${index}_imageUrl`}
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
            );
          })
        ))
      }
      <br />
      <br />
    </div>
  );
};

ServicesSubpages1Cms.propTypes = {
  showModal: PropTypes.func.isRequired,
  handleUploadStart: PropTypes.func.isRequired,
  handleUploadError: PropTypes.func.isRequired,
  handleUploadSuccess: PropTypes.func.isRequired,
  handleProgress: PropTypes.func.isRequired,
  content: PropTypes.shape({
    header: PropTypes.string,
    description: PropTypes.string,
    columns: PropTypes.array,
  }),
};

ServicesSubpages1Cms.defaultProps = {
  content: {},
};

export default ServicesSubpages1Cms;
