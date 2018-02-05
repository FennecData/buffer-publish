import React from 'react';
import PropTypes from 'prop-types';

import {
  Input,
  LoadingAnimation,
  Button,
} from '@bufferapp/components';
import {
  EmptyState,
  PostDragLayer,
  BufferLoading,
} from '@bufferapp/publish-shared-components';

import ComposerPopover from '../ComposerPopover';
import QueueItems from '../QueueItems';
import QueuePausedBar from '../QueuePausedBar';
import MiniCalendar from  '../MiniCalendar';

const composerStyle = {
  marginBottom: '1.5rem',
  flexGrow: '1',
  marginRight: '1.5rem',
};

const topBarContainerStyle = {
  display: 'flex',
}

const loadingContainerStyle = {
  width: '100%',
  height: '100%',
  textAlign: 'center',
  paddingTop: '5rem',
};

const QueuedPosts = ({
  total,
  loading,
  postLists,
  onComposerPlaceholderClick,
  onComposerCreateSuccess,
  onCancelConfirmClick,
  onRequeueClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  onDropPost,
  showComposer,
  showCalendar,
  editMode,
  paused,
  onUnpauseClick,
  onCalendarToggleClick,
}) => {
  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <BufferLoading size={64} />
      </div>
    );
  }

  return (
    <div>
      <PostDragLayer />
      <div style={topBarContainerStyle}>
        <div style={composerStyle}>
          {showComposer && !editMode &&
            <ComposerPopover
              onSave={onComposerCreateSuccess}
              transparentOverlay
              preserveComposerStateOnClose
            />
          }
          <Input
            placeholder={'What would you like to share?'}
            onFocus={onComposerPlaceholderClick}
          />
        </div>
        <Button secondary onClick={onCalendarToggleClick}>
          {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
        </Button>
        {showCalendar && <MiniCalendar />}
      </div>
      {!!paused && <QueuePausedBar handleClickUnpause={onUnpauseClick} />}
      {total < 1 &&
        <EmptyState
          title="It looks like you haven't got any posts in your queue!"
          subtitle="Click the box above to add a post to your queue :)"
          heroImg="https://s3.amazonaws.com/buffer-publish/images/fresh-queue%402x.png"
          heroImgSize={{ width: '229px', height: '196px' }}
        />
      }
      {showComposer && editMode &&
        <ComposerPopover onSave={onComposerCreateSuccess} />
      }
      <QueueItems
        items={postLists}
        onCancelConfirmClick={onCancelConfirmClick}
        onRequeueClick={onRequeueClick}
        onDeleteClick={onDeleteClick}
        onDeleteConfirmClick={onDeleteConfirmClick}
        onEditClick={onEditClick}
        onShareNowClick={onShareNowClick}
        onImageClick={onImageClick}
        onImageClickNext={onImageClickNext}
        onImageClickPrev={onImageClickPrev}
        onImageClose={onImageClose}
        onDropPost={onDropPost}
        draggable={!paused}
      />
    </div>
  );
};

QueuedPosts.propTypes = {
  loading: PropTypes.bool,
  moreToLoad: PropTypes.bool, // eslint-disable-line
  page: PropTypes.number, // eslint-disable-line
  postLists: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
    }),
  ).isRequired,
  total: PropTypes.number,
  onComposerPlaceholderClick: PropTypes.func.isRequired,
  onComposerCreateSuccess: PropTypes.func.isRequired,
  onCancelConfirmClick: PropTypes.func.isRequired,
  onRequeueClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onDeleteConfirmClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onShareNowClick: PropTypes.func.isRequired,
  onImageClick: PropTypes.func,
  onImageClickNext: PropTypes.func,
  onImageClickPrev: PropTypes.func,
  onImageClose: PropTypes.func,
  onDropPost: PropTypes.func.isRequired,
  showComposer: PropTypes.bool,
  editMode: PropTypes.bool,
  paused: PropTypes.bool,
  onUnpauseClick: PropTypes.func.isRequired,
  showCalendar: PropTypes.bool,
  onCalendarToggleClick: PropTypes.func.isRequired,
};

QueuedPosts.defaultProps = {
  loading: true,
  moreToLoad: false,
  page: 1,
  postLists: [],
  showComposer: false,
  total: 0,
  enabledApplicationModes: [],
  editMode: false,
  paused: false,
  showCalendar: false,
};

export default QueuedPosts;
