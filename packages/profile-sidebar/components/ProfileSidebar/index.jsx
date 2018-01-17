import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Button,
  Divider,
  QuestionIcon,
  IconArrowPopover,
} from '@bufferapp/components';
import {
  offWhite,
  mystic,
} from '@bufferapp/components/style/color';
import {
  borderWidth,
} from '@bufferapp/components/style/border';

import LoadingProfileListItem from '../LoadingProfileListItem';
import ProfileListItem from '../ProfileListItem';
import ProfileList from '../ProfileList';

const profileSidebarStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  maxHeight: '100vh',
  padding: '1rem',
  boxSizing: 'border-box',
  background: offWhite,
  borderRight: `${borderWidth} solid ${mystic}`,
};

const productTitleStyle = {
  marginRight: '0.25rem',
  letterSpacing: '-0.01rem',
};

const profileListStyle = {
  flexGrow: 1,
  overflowY: 'scroll',
};

const lockedAccountHeaderStyle = {
  margin: '1rem 0 0.5rem 0',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
};

const buttonDividerStyle = {
  marginBottom: '1rem',
};

const renderLockedHeader = translations => (
  <div style={lockedAccountHeaderStyle}>
    <Text size={'small'}>
      {translations.lockedList}
    </Text>
    <div style={{ position: 'absolute', marginLeft: '13rem' }}>
      <IconArrowPopover
        icon={<QuestionIcon />}
        position="above"
        shadow
        oneLine={false}
        width="320px"
        label={translations.lockedList}
      >
        <div style={{ padding: '.5rem .25rem' }}>
          {translations.lockedListTooltip}
        </div>
      </IconArrowPopover>
    </div>
  </div>
);

const productTitle = (
  <div>
    <span style={productTitleStyle}>
      <Text
        color={'curiousBlue'}
        weight={'bold'}
        size={'large'}
      >
        Publish
      </Text>
    </span>
    <Text
      size={'large'}
    >
      Free
    </Text>
    <Divider marginTop={'1rem'} />
  </div>
);

const renderLoadingProfiles = () => (
  <div>
    <LoadingProfileListItem />
    <LoadingProfileListItem offset="100ms" />
    <LoadingProfileListItem offset="200ms" />
    <LoadingProfileListItem offset="300ms" />
    <LoadingProfileListItem offset="400ms" />
  </div>
);

const ProfileSidebar = ({
  loading,
  selectedProfileId,
  profiles,
  lockedProfiles,
  translations,
  onProfileClick,
  onConnectSocialAccountClick,
}) =>
  <div style={profileSidebarStyle}>
    {productTitle}
    {loading && renderLoadingProfiles()}
    <div style={profileListStyle} data-hide-scrollbar>
      <ProfileList
        selectedProfileId={selectedProfileId}
        profiles={profiles}
        onProfileClick={onProfileClick}
      />
      {lockedProfiles.length > 0 && renderLockedHeader(translations) }
      {lockedProfiles.length > 0 && <Divider />}
      <ProfileList
        selectedProfileId={selectedProfileId}
        profiles={lockedProfiles}
        onProfileClick={onProfileClick}
      />
    </div>
    <div>
      <div style={buttonDividerStyle}>
        <Divider />
      </div>
      <Button
        secondary
        fillContainer
        onClick={() => { onConnectSocialAccountClick(); }}
      >
        {translations.connectButton}
      </Button>
    </div>
  </div>;

ProfileSidebar.propTypes = {
  loading: PropTypes.bool.isRequired,
  onProfileClick: ProfileList.propTypes.onProfileClick,
  onConnectSocialAccountClick: PropTypes.func.isRequired,
  selectedProfileId: ProfileList.propTypes.selectedProfileId,
  profiles: PropTypes.arrayOf(
    PropTypes.shape(ProfileListItem.propTypes),
  ),
  lockedProfiles: PropTypes.arrayOf(
    PropTypes.shape(ProfileListItem.propTypes),
  ),
  translations: PropTypes.shape({
    connectButton: PropTypes.string,
    lockedList: PropTypes.string,
    lockedListTooltip: PropTypes.string,
  }).isRequired,
};

ProfileSidebar.defaultProps = {
  onProfileClick: ProfileList.defaultProps.onProfileClick,
  selectedProfileId: ProfileList.defaultProps.selectedProfileId,
  profiles: [],
  lockedProfiles: [],
};

export default ProfileSidebar;
