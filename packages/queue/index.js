import { connect } from 'react-redux';
import { actions as profileSidebarActions } from '@bufferapp/publish-profile-sidebar';
import { actions } from './reducer';
import QueuedPosts from './components/QueuedPosts';

const formatPostLists = (posts) => {
  const orderedPosts = Object.values(posts).sort((a, b) => a.due_at - b.due_at);
  let lastHeader = null;
  return orderedPosts.reduce((acc, post, index) => {
    if (lastHeader !== post.day) {
      lastHeader = post.day;
      acc.push({ queueItemType: 'header', text: post.day, id: `header-${index}` });
    }
    acc.push({ queueItemType: 'post', index, ...post });
    return acc;
  }, []);
};

// default export = container
export default connect(
  (state, ownProps) => {
    const profileId = ownProps.profileId;
    const currentProfile = state.queue.byProfileId[profileId];
    const paused =
      (state.profileSidebar.profiles.filter(p => p.id === profileId && p.paused).length) > 0;
    if (currentProfile) {
      return {
        loading: currentProfile.loading,
        loadingMore: currentProfile.loadingMore,
        moreToLoad: currentProfile.moreToLoad,
        page: currentProfile.page,
        postLists: formatPostLists(currentProfile.posts),
        total: currentProfile.total,
        enabledApplicationModes: state.queue.enabledApplicationModes,
        showComposer: state.queue.showComposer,
        environment: state.environment.environment,
        editMode: state.queue.editMode,
        editingPostId: state.queue.editingPostId,
        showCalendar: currentProfile.showCalendar,
        paused,
      };
    }
    return {};
  },
  (dispatch, ownProps) => ({
    onEditClick: (post) => {
      dispatch(actions.handleEditClick({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onDeleteClick: (post) => {
      dispatch(actions.handleDeleteClick({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onDeleteConfirmClick: (post) => {
      dispatch(actions.handleDeleteConfirmClick({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onCancelConfirmClick: (post) => {
      dispatch(actions.handleCancelConfirmClick({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onRequeueClick: (post) => {
      dispatch(actions.handleRequeue({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onShareNowClick: (post) => {
      dispatch(actions.handleShareNowClick({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onImageClick: (post) => {
      dispatch(actions.handleImageClick({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onImageClose: (post) => {
      dispatch(actions.handleImageClose({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onImageClickNext: (post) => {
      dispatch(actions.handleImageClickNext({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onImageClickPrev: (post) => {
      dispatch(actions.handleImageClickPrev({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onDropPost: ({ dragIndex, hoverIndex, keyboardDirection, commit }) => {
      dispatch(actions.onDropPost({
        dragIndex,
        hoverIndex,
        keyboardDirection,
        commit,
        profileId: ownProps.profileId,
      }));
    },
    onUnpauseClick: () => {
      dispatch(profileSidebarActions.onUnpauseClick({ profileId: ownProps.profileId }));
    },
    onComposerPlaceholderClick: () => {
      dispatch(actions.handleComposerPlaceholderClick());
    },
    onComposerCreateSuccess: () => {
      dispatch(actions.handleComposerCreateSuccess());
    },
    onCalendarToggleClick: () => {
      dispatch(actions.handleCalendarToggle({ profileId: ownProps.profileId }));
    }
  }),
)(QueuedPosts);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
/*
a consumer of a package should be able to use the package in the following way:
import Example, { actions, actionTypes, middleware, reducer } from '@bufferapp/publish-example';
*/
