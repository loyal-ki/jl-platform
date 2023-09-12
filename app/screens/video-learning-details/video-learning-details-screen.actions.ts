import {ActionType, createAction} from 'typesafe-actions';

import {VideoLearningDetailsAction} from './video-learning-details-screen.types';

export const init = createAction(VideoLearningDetailsAction.init, state => ({state}))();

export const setPlaying = createAction(VideoLearningDetailsAction.setPlaying, isPlaying => ({
    isPlaying,
}))();

export const setMaxDuration = createAction(VideoLearningDetailsAction.setMaxDuration, duration => ({
    duration,
}))();

export const setSubtitles = createAction(VideoLearningDetailsAction.setSubtitles, subtitles => ({
    subtitles,
}))();

export const setVideoState = createAction(VideoLearningDetailsAction.setVideoState, videoState => ({
    videoState,
}))();

export const setVideoReady = createAction(VideoLearningDetailsAction.setVideoReady, ready => ({
    ready,
}))();

export const setCurrentSubtitleIndex = createAction(
    VideoLearningDetailsAction.setCurrentSubtitleIndex,
    currentIndex => ({currentIndex})
)();

export const setCurrentTimeVideo = createAction(
    VideoLearningDetailsAction.setCurrentTimeVideo,
    currentTime => ({currentTime})
)();

export const setStartVideo = createAction(
    VideoLearningDetailsAction.setStartVideo,
    (duration, ready) => ({duration, ready})
)();

export const videoLearningDetailsActions = {
    init,
    setPlaying,
    setVideoReady,
    setMaxDuration,
    setSubtitles,
    setVideoState,
    setStartVideo,
    setCurrentSubtitleIndex,
    setCurrentTimeVideo,
};

export type VideoLearningDetailsActionType = ActionType<typeof videoLearningDetailsActions>;
