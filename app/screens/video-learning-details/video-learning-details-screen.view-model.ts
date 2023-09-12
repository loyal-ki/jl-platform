import {useFocusEffect} from '@react-navigation/native';
import {useEffect, useReducer, useRef} from 'react';
import {PLAYER_STATES, YoutubeIframeRef} from 'react-native-youtube-iframe';

import {useMemoizedCallback, useMount} from '@app/hooks';
import {videoItemData} from '@app/models/mocks';

import {videoLearningDetailsActions} from './video-learning-details-screen.actions';
import {initialState, videoLearningDetailsReducer} from './video-learning-details-screen.reducer';

export const useVideoLearningViewModel = () => {
    const [state, dispatch] = useReducer(videoLearningDetailsReducer, initialState);
    const youtubePlayerRef = useRef<YoutubeIframeRef | null>(null);

    const onInit = useMemoizedCallback(async () => {
        dispatch(videoLearningDetailsActions.setSubtitles(videoItemData.data.srt));
    }, []);

    useMount(onInit);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (state.videoState === PLAYER_STATES.PLAYING) {
                const currentTime = (await youtubePlayerRef.current?.getCurrentTime()) ?? 0;
                dispatch(videoLearningDetailsActions.setCurrentTimeVideo(currentTime));
                if (
                    state.currentSubtitleIndex + 1 < state.subtitles.length &&
                    currentTime >= state.subtitles[state.currentSubtitleIndex + 1].start
                ) {
                    dispatch(
                        videoLearningDetailsActions.setCurrentSubtitleIndex(
                            state.currentSubtitleIndex + 1
                        )
                    );
                }
            }
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, [state.currentSubtitleIndex, state.subtitles, state.subtitles.length, state.videoState]);

    const onReady = useMemoizedCallback(async () => {
        const duration = (await youtubePlayerRef.current?.getDuration()) ?? 0;
        dispatch(videoLearningDetailsActions.setStartVideo(duration, true));
    }, []);

    useFocusEffect(
        useMemoizedCallback(() => {
            return (): void => {
                dispatch(videoLearningDetailsActions.setPlaying(false));
            };
        }, [])
    );

    const onStateChange = useMemoizedCallback((videoStateData: PLAYER_STATES) => {
        dispatch(videoLearningDetailsActions.setVideoState(videoStateData));
    }, []);

    const onSubtitlePrevious = useMemoizedCallback(async () => {
        if (state.currentSubtitleIndex > -1) {
            const current = state.currentSubtitleIndex - 1;
            const startTime = state.subtitles[current]?.start;
            dispatch(videoLearningDetailsActions.setCurrentSubtitleIndex(current));
            await youtubePlayerRef.current?.seekTo(startTime, true);
        }
    }, [state.currentSubtitleIndex, state.subtitles]);

    const onSubtitleNext = useMemoizedCallback(async () => {
        const current = state.currentSubtitleIndex + 1;
        const startTime = state.subtitles[current]?.start;
        dispatch(videoLearningDetailsActions.setCurrentSubtitleIndex(current));
        await youtubePlayerRef.current?.seekTo(startTime, true);
    }, [state.currentSubtitleIndex, state.subtitles]);

    return {
        youtubePlayerRef,
        state,
        onReady,
        onStateChange,
        onSubtitleNext,
        onSubtitlePrevious,
    };
};
