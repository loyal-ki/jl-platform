import {PLAYER_STATES} from 'react-native-youtube-iframe';
import {createReducer} from 'typesafe-actions';

import {
    VideoLearningDetailsActionType,
    videoLearningDetailsActions,
} from './video-learning-details-screen.actions';
import {IVideoLearningDetailsState} from './video-learning-details-screen.types';

export const initialState: IVideoLearningDetailsState = {
    videoReady: false,
    isPlaying: true,
    maxDuration: 1,
    subtitles: [],
    videoState: PLAYER_STATES.UNSTARTED,
    currentSubtitleIndex: -1,
    currentTimeVideo: 0,
};
export const videoLearningDetailsReducer = createReducer<
    IVideoLearningDetailsState,
    VideoLearningDetailsActionType
>(initialState)
    .handleAction(videoLearningDetailsActions.init, (state, action) => {
        return {
            ...state,
        };
    })
    .handleAction(videoLearningDetailsActions.setStartVideo, (state, action) => {
        return {
            ...state,
            videoReady: action.payload.ready,
            maxDuration: action.payload.duration,
        };
    })
    .handleAction(videoLearningDetailsActions.setSubtitles, (state, action) => {
        return {
            ...state,
            subtitles: action.payload.subtitles,
        };
    })
    .handleAction(videoLearningDetailsActions.setCurrentSubtitleIndex, (state, action) => {
        return {
            ...state,
            currentSubtitleIndex: action.payload.currentIndex,
            isPlaying: true,
        };
    })
    .handleAction(videoLearningDetailsActions.setPlaying, (state, action) => {
        return {
            ...state,
            isPlaying: action.payload.isPlaying,
        };
    })
    .handleAction(videoLearningDetailsActions.setCurrentTimeVideo, (state, action) => {
        return {
            ...state,
            currentTimeVideo: action.payload.currentTime,
        };
    })
    .handleAction(videoLearningDetailsActions.setMaxDuration, (state, action) => {
        return {
            ...state,
            maxDuration: action.payload.duration,
        };
    })
    .handleAction(videoLearningDetailsActions.setVideoState, (state, action) => {
        return {
            ...state,
            videoState: action.payload.videoState,
        };
    })
    .handleAction(videoLearningDetailsActions.setVideoReady, (state, action) => {
        return {
            ...state,
            videoReady: action.payload.ready,
        };
    });
