import React from 'react';
import Cropper from 'react-cropper';
import {
  homePageRef,
  aboutPageRef,
  servicesPageRef,
  servicesSubpage1Ref,
  servicesSubpage2Ref,
  servicesSubpage3Ref,
  servicesSubpage4Ref,
  cms,
  firebaseAuth,
  cmsStorage,
} from '../../config/firebase';
import GuestLayout from '../globals/guest-layout';
import AdminHeader from './admin-header';
import Loader from '../loader/loader';
import Login from '../login/login';
import HomeCMS from './cms-pages/home-cms';
import AboutCMS from './cms-pages/about-cms';
import ServicesCMS from "./cms-pages/services-cms";

import 'cropperjs/dist/cropper.css';
import ServicesSubpages1Cms from "./cms-pages/services-subpages-1-cms";
import ServicesSubpages2Cms from "./cms-pages/services-subpages-2-cms";
import ServicesSubpages3Cms from "./cms-pages/services-subpages-3-cms";
import ServicesSubpages4Cms from "./cms-pages/services-subpages-4-cms";

class CMS extends React.Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.state = {
      authenticated: false,
      loadingHome: false,
      contentHome: null,
      loadingAbout: false,
      contentAbout: null,
      loadingServices: false,
      contentServices: null,
      loadingServices1: false,
      contentServicesSub1: null,
      loadingServices2: false,
      contentServicesSub2: null,
      loadingServices3: false,
      contentServicesSub3: null,
      loadingServices4: false,
      contentServicesSub4: null,
      activeTab: 'home',
      showModal: false,
      modalImage: '',
      activeImageKey: null,
      progress: 0,
      isUploading: false,
    };
  }

  componentDidMount() {
    firebaseAuth.onAuthStateChanged((authenticated) => {
      this.setState({ authenticated });
    });
    this.setState({
      loadingHome: true,
      loadingAbout: true,
      loadingServices: true,
    });
    homePageRef.on('value', (snapshot) => {
      this.setState({ contentHome: snapshot.val(), loadingHome: false });
    });
    aboutPageRef.on('value', (snapshot) => {
      this.setState({ contentAbout: snapshot.val(), loadingAbout: false });
    });
    servicesPageRef.on('value', (snapshot) => {
      this.setState({ contentServices: snapshot.val(), loadingServices: false });
    });
    servicesSubpage1Ref.on('value', (snapshot) => {
      this.setState({ contentServicesSub1: snapshot.val(), loadingServices1: false });
    });
    servicesSubpage2Ref.on('value', (snapshot) => {
      this.setState({ contentServicesSub2: snapshot.val(), loadingServices2: false });
    });
    servicesSubpage3Ref.on('value', (snapshot) => {
      this.setState({ contentServicesSub3: snapshot.val(), loadingServices3: false });
    });
    servicesSubpage4Ref.on('value', (snapshot) => {
      this.setState({ contentServicesSub4: snapshot.val(), loadingServices4: false });
    });
  }

  componentWillUnmount() {
    homePageRef.off();
    aboutPageRef.off();
    servicesPageRef.off();
    servicesSubpage1Ref.off();
    servicesSubpage2Ref.off();
    servicesSubpage3Ref.off();
    servicesSubpage4Ref.off();
  }

  showModal = (imageUrl, imageKey) => {
    this.setState({
      showModal: true,
      modalImage: imageUrl,
      activeImageKey: imageKey,
    });
  };

  hideModal = () => {
    this.setState({
      showModal: false,
      modalImage: '',
      activeImageKey: null,
    });
  };

  setActiveTab = (tab) => {
    this.setState({ activeTab: tab });
  };

  uploadToStorage = async () => {
    const { activeImageKey, activeTab } = this.state;

    const filenameAppendix = Math.random().toString(36).substring(2);
    // const filename = `${activeImageKey}-${filenameAppendix}`;
    const findForwardSlash = '/';
    const reFS = new RegExp(findForwardSlash, 'g');
    let fileRef = activeImageKey;
    fileRef = fileRef.replace(reFS, '_');
    const finalFileName = `${fileRef.split('.')[0]}-${filenameAppendix}`;

    const find = '_';
    const re = new RegExp(find, 'g');
    let imageRef = activeImageKey;
    imageRef = imageRef.replace(re, '/');
    const finalImageRef = imageRef.split('.')[0];

    const imgUrl = this.cropper.getCroppedCanvas().toDataURL('image/jpeg', 0.7);
    const blob = await fetch(imgUrl).then(r => r.blob());

    let pageRef;
    if (activeTab === 'servicesSub1') {
      pageRef = servicesSubpage1Ref;
    } else if (activeTab === 'servicesSub2') {
      pageRef = servicesSubpage2Ref;
    } else if (activeTab === 'servicesSub3') {
      pageRef = servicesSubpage3Ref;
    } else if (activeTab === 'servicesSub4') {
      pageRef = servicesSubpage4Ref;
    } else if (activeTab === 'services') {
      pageRef = servicesPageRef;
    } else if (activeTab === 'home') {
      pageRef = homePageRef;
    } else if (activeTab === 'about') {
      pageRef = aboutPageRef;
    } else {
      pageRef = `${activeTab}PageRef`;
    }

    cmsStorage.child(finalFileName).put(blob).then((snapshot) => {
      snapshot
        .ref
        .getDownloadURL()
        .then((url) => {
          const updates = {};
          updates[`${finalImageRef}`] = url;
          pageRef.update(updates);
        });
    });
    this.hideModal();
  };

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    console.log('upload error', error);
  };

  handleUploadSuccess = (filename) => {
    const find = '_';
    const re = new RegExp(find, 'g');
    let imageRef = filename;
    imageRef = imageRef.replace(re, '/');
    const finalImageRef = imageRef.split('.')[0];

    this.setState({ progress: 100, isUploading: false });
    cmsStorage
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        const updates = {};
        updates[`${finalImageRef}`] = url;
        cms.update(updates);
      });
  };

  render() {
    const {
      authenticated,
      activeTab,
      loadingHome,
      contentHome,
      loadingAbout,
      contentAbout,
      loadingServices,
      contentServices,
      loadingServices1,
      contentServicesSub1,
      loadingServices2,
      contentServicesSub2,
      loadingServices3,
      contentServicesSub3,
      loadingServices4,
      contentServicesSub4,
      showModal,
      modalImage,
      progress,
      isUploading,
    } = this.state;

    if (!authenticated) {
      return <Login />;
    }
    if (loadingHome) {
      return <Loader />;
    }
    if (loadingAbout) {
      return <Loader />;
    }
    if (loadingServices) {
      return <Loader />;
    }
    if (loadingServices1) {
      return <Loader />;
    }
    if (loadingServices2) {
      return <Loader />;
    }
    if (loadingServices3) {
      return <Loader />;
    }
    if (loadingServices4) {
      return <Loader />;
    }

    return (
      <GuestLayout hideFooter>
        <AdminHeader />
        <div className="cms-container">
          {
            isUploading
            && (
              <div className="progress-container">
                <progress className="progress is-primary is-medium" value={progress} max="100">
                  {progress}
                  %
                </progress>
              </div>
            )
          }
          {/* Crop Image Modal */}
          <div className={`modal ${showModal ? ' is-active' : ''}`}>
            <div className="modal-background" />
            <div className="modal-content" style={{ top: '10%' }}>
              <div className="columns">
                <div className="column">
                  <h3 className="title is-3">Original</h3>
                  <Cropper
                    style={{ height: 400, width: '100%' }}
                    preview=".img-preview"
                    src={modalImage}
                    // aspectRatio={16 / 9}
                    ref={(cropper) => { this.cropper = cropper; }}
                  />
                </div>
                <div className="column">
                  <div>
                    <h3 className="title is-3">Preview</h3>
                    <div className="img-preview" style={{ width: '100%', float: 'left', height: 300 }} />
                  </div>
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <div className="field is-grouped">
                    <p className="control">
                      <button type="button" className="button is-primary" onClick={this.uploadToStorage}>
                        Crop Image
                      </button>
                    </p>
                    <p className="control">
                      <button type="button" className="button" onClick={this.hideModal}>
                        Cancel
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button type="button" className="modal-close is-large" aria-label="close" onClick={this.hideModal} />
          </div>

          <aside className="menu cms-menu">
            <p className="menu-label">
              HOME
            </p>
            <ul className="menu-list">
              <li>
                <a
                  href={null}
                  onClick={() => this.setActiveTab('home')}
                  className={`${activeTab === 'home' ? 'is-active' : ''}`}
                >
                  Home Page
                </a>
              </li>
            </ul>
            <p className="menu-label">
              ABOUT
            </p>
            <ul className="menu-list">
              <li>
                <a
                  href={null}
                  onClick={() => this.setActiveTab('about')}
                  className={`${activeTab === 'about' ? 'is-active' : ''}`}
                >
                  About Us Page
                </a>
              </li>
            </ul>
            <p className="menu-label">
              SERVICES
            </p>
            <ul className="menu-list">
              <li>
                <a
                  href={null}
                  onClick={() => this.setActiveTab('services')}
                  className={`${activeTab === 'services' ? 'is-active' : ''}`}
                >
                  Services Page
                </a>
              </li>
            </ul>
            <p className="menu-label">
              SERVICES SUB PAGES
            </p>
            <ul className="menu-list">
              <li>
                <a
                  href={null}
                  onClick={() => this.setActiveTab('servicesSub1')}
                  className={`${activeTab === 'servicesSub1' ? 'is-active' : ''}`}
                >
                  Services Sub Page 1
                </a>
              </li>
            </ul>
            <ul className="menu-list">
              <li>
                <a
                  href={null}
                  onClick={() => this.setActiveTab('servicesSub2')}
                  className={`${activeTab === 'servicesSub2' ? 'is-active' : ''}`}
                >
                  Services Sub Page 2
                </a>
              </li>
            </ul>
            <ul className="menu-list">
              <li>
                <a
                  href={null}
                  onClick={() => this.setActiveTab('servicesSub3')}
                  className={`${activeTab === 'servicesSub3' ? 'is-active' : ''}`}
                >
                  Services Sub Page 3
                </a>
              </li>
            </ul>
            <ul className="menu-list">
              <li>
                <a
                  href={null}
                  onClick={() => this.setActiveTab('servicesSub4')}
                  className={`${activeTab === 'servicesSub4' ? 'is-active' : ''}`}
                >
                  Services Sub Page 4
                </a>
              </li>
            </ul>
          </aside>
          <div className="cms-content">
            {
              !loadingHome && contentHome
              && (
                <span>
                  {activeTab === 'home'
                  && (
                    <HomeCMS
                      content={contentHome}
                      showModal={this.showModal}
                      handleUploadStart={this.handleUploadStart}
                      handleProgress={this.handleProgress}
                      handleUploadError={this.handleUploadError}
                      handleUploadSuccess={this.handleUploadSuccess}
                    />
                  )}
                </span>
              )
            }
            {
              (activeTab === 'about') && !loadingAbout && contentAbout
              && (
                <AboutCMS
                  content={contentAbout}
                  showModal={this.showModal}
                  handleUploadStart={this.handleUploadStart}
                  handleProgress={this.handleProgress}
                  handleUploadError={this.handleUploadError}
                  handleUploadSuccess={this.handleUploadSuccess}
                />
              )
            }
            {
              (activeTab === 'services') && !loadingServices && contentServices
              && (
                <ServicesCMS
                  content={contentServices}
                  showModal={this.showModal}
                  handleUploadStart={this.handleUploadStart}
                  handleProgress={this.handleProgress}
                  handleUploadError={this.handleUploadError}
                  handleUploadSuccess={this.handleUploadSuccess}
                />
              )
            }
            {
              (activeTab === 'servicesSub1') && !loadingServices1 && contentServicesSub1
              && (
                <ServicesSubpages1Cms
                  content={contentServicesSub1}
                  showModal={this.showModal}
                  handleUploadStart={this.handleUploadStart}
                  handleProgress={this.handleProgress}
                  handleUploadError={this.handleUploadError}
                  handleUploadSuccess={this.handleUploadSuccess}
                />
              )
            }
            {
              (activeTab === 'servicesSub2') && !loadingServices2 && contentServicesSub2
              && (
                <ServicesSubpages2Cms
                  content={contentServicesSub2}
                  showModal={this.showModal}
                  handleUploadStart={this.handleUploadStart}
                  handleProgress={this.handleProgress}
                  handleUploadError={this.handleUploadError}
                  handleUploadSuccess={this.handleUploadSuccess}
                />
              )
            }
            {
              (activeTab === 'servicesSub3') && !loadingServices3 && contentServicesSub3
              && (
                <ServicesSubpages3Cms
                  content={contentServicesSub3}
                  showModal={this.showModal}
                  handleUploadStart={this.handleUploadStart}
                  handleProgress={this.handleProgress}
                  handleUploadError={this.handleUploadError}
                  handleUploadSuccess={this.handleUploadSuccess}
                />
              )
            }
            {
              (activeTab === 'servicesSub4') && !loadingServices4 && contentServicesSub4
              && (
                <ServicesSubpages4Cms
                  content={contentServicesSub4}
                  showModal={this.showModal}
                  handleUploadStart={this.handleUploadStart}
                  handleProgress={this.handleProgress}
                  handleUploadError={this.handleUploadError}
                  handleUploadSuccess={this.handleUploadSuccess}
                />
              )
            }
          </div>
        </div>
      </GuestLayout>
    );
  }
}

export default CMS;
