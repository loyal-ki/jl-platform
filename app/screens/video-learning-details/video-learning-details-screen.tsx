/* eslint-disable @typescript-eslint/no-shadow */
import React, {useMemo} from 'react';
import {Dimensions, Text, View} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

import {
    BlankSpacer,
    ButtonIcon,
    IconNameEnum,
    Progress,
    ScreenContainer,
    Spacing8,
} from '@app/components';
import {useTheme} from '@app/context';
import {videoItemData} from '@app/models/mocks';
import {AppCommonStyles} from '@app/utils';

import {getVideoLearningStyleSheet} from './video-learning-details-screen.styles';
import {useVideoLearningViewModel} from './video-learning-details-screen.view-model';

const deviceWidth = Dimensions.get('window').width;
const heightAspectRatio = (deviceWidth * 9) / 16;

export const VideoLearningDetailsScreen: React.FC = () => {
    const {theme} = useTheme();

    const styles = getVideoLearningStyleSheet(theme);

    const {youtubePlayerRef, state, onStateChange, onReady, onSubtitleNext, onSubtitlePrevious} =
        useVideoLearningViewModel();

    const useOverlayStyle = useMemo(() => {
        return {width: deviceWidth, height: heightAspectRatio};
    }, []);

    return (
        <ScreenContainer preset="scroll" style={AppCommonStyles.root}>
            <View style={styles.container}>
                <View style={[styles.overlay, useOverlayStyle]} />

                <YoutubePlayer
                    ref={youtubePlayerRef}
                    height={heightAspectRatio}
                    width={deviceWidth}
                    play={state.isPlaying}
                    useLocalHTML
                    volume={100}
                    webViewProps={{
                        injectedJavaScript: `
                              var element = document.getElementsByClassName('container')[0];
                              element.style.position = 'unset';
                              true;
                            `,
                    }}
                    initialPlayerParams={{
                        loop: false,
                        controls: false,
                        preventFullScreen: true,
                        showClosedCaptions: false,
                        modestbranding: true,
                    }}
                    webViewStyle={{opacity: state.videoReady ? 0.99 : 0}}
                    videoId={videoItemData.data.youtubeID}
                    onChangeState={onStateChange}
                    onReady={onReady}
                />
                <View>
                    <Progress
                        percentage={(state.currentTimeVideo * 100) / state.maxDuration}
                        showPivot={false}
                        strokeWidth={8}
                        square
                        animated
                        color={theme.primary}
                    />
                    <Text style={{textAlign: 'center'}}>
                        {state.subtitles[state.currentSubtitleIndex]?.vi_translation || ''}
                    </Text>
                    <View style={AppCommonStyles.row}>
                        <ButtonIcon
                            theme={theme}
                            iconName={IconNameEnum.ArrowLeft}
                            onPress={onSubtitlePrevious}
                        />

                        <BlankSpacer width={Spacing8} />

                        <ButtonIcon
                            theme={theme}
                            iconName={IconNameEnum.ArrowRight}
                            onPress={onSubtitleNext}
                        />
                    </View>
                </View>
            </View>
        </ScreenContainer>
    );
};
