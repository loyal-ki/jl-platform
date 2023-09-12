import {PLAYER_STATES} from 'react-native-youtube-iframe';

export const Init = 'VideoLearningDetails/Init';
export const SetPlaying = 'VideoLearningDetails/SetPlaying';
export const SetVideoReady = 'VideoLearningDetails/SetVideoReady';
export const SetMaxDuration = 'VideoLearningDetails/SetMaxDuration';
export const SetSubtitles = 'VideoLearningDetails/SetSubtitles';
export const SetVideoState = 'VideoLearningDetails/SetVideoState';
export const SetCurrentSubtitleIndex = 'VideoLearningDetails/SetCurrentSubtitleIndex';
export const SetCurrentTimeVideo = 'VideoLearningDetails/SetCurrentTimeVideo';
export const SetStartVideo = 'VideoLearningDetails/SetStartVideo';

export interface IVideoLearningDetailsState {
    videoReady: boolean;
    isPlaying: boolean;
    maxDuration: number;
    subtitles: any[];
    videoState: PLAYER_STATES;
    currentSubtitleIndex: number;
    currentTimeVideo: number;
}

export const VideoLearningDetailsAction = {
    init: Init,
    setPlaying: SetPlaying,
    setVideoReady: SetVideoReady,
    setMaxDuration: SetMaxDuration,
    setSubtitles: SetSubtitles,
    setVideoState: SetVideoState,
    setCurrentSubtitleIndex: SetCurrentSubtitleIndex,
    setCurrentTimeVideo: SetCurrentTimeVideo,
    setStartVideo: SetStartVideo,
};
