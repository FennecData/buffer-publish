import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bufferPublishComposer as Composer } from '@bufferapp/composer';

// TODO: move this component to container directory since it's connected
const ComposerWrapper = (props) => (
  <div>
    <Composer {...props} />
  </div>
);

ComposerWrapper.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    s3_upload_signature: PropTypes.shape({}).isRequired,
    uses_24h_time: PropTypes.bool.isRequired,
    week_starts_monday: PropTypes.bool.isRequired,
    profile_groups: PropTypes.PropTypes.array,
    is_free_user: PropTypes.bool.isRequired,
    skip_empty_text_alert: PropTypes.bool.isRequired,
    is_business_user: PropTypes.bool.isRequired,
    imageDimensionsKey: PropTypes.string.isRequired,
  }).isRequired,
  profiles: PropTypes.arrayOf(PropTypes.object),
  enabledApplicationModes: PropTypes.arrayOf(PropTypes.string),
  onSave: PropTypes.func.isRequired,
  preserveStateOnClose: PropTypes.bool.isRequired,
  environment: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  post: PropTypes.shape({}),
  csrfToken: PropTypes.string,
};

ComposerWrapper.defaultProps = {
  profiles: [],
  enabledApplicationModes: [],
  csrfToken: '1234', // dummy string for now since MC requires csrfToken
  post: {},
};

export default connect(
  (state) => {
    if (state.appSidebar && state.profileSidebar) {
      const selectedProfileId = state.profileSidebar.selectedProfileId;
      const postId = state.queue.editingPostId;
      return ({
        userData: state.appSidebar.user,
        profiles: state.profileSidebar.profiles,
        enabledApplicationModes: state.enabledApplicationModes,
        environment: state.environment.environment,
        editMode: state.queue.editMode,
        post: state.queue.byProfileId[selectedProfileId].posts[postId],
      });
    }
    return {};
  },
)(ComposerWrapper);
