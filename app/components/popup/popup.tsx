/* eslint-disable no-param-reassign */
import {defaultTo} from 'lodash';
import React, {useEffect, useRef, useCallback, memo} from 'react';
import {Animated, BackHandler, Easing, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useTheme} from '@app/context';
import {usePersistFn} from '@app/hooks';
import {emptyFn, getNextZIndex, makeStyleSheetFromTheme} from '@app/utils';
import {Overlay} from '@components/overlay';

import {getPosition, getTransform} from './helper';
import {useStateUpdate} from './hooks/useStateUpdate';
import {animationDurationBase} from './popup.config';
import {getBorderRadius, popupBackgroundColor, PopupPositionMap} from './style';

import type {PopupProps, State} from './popup.props';
import type {ViewStyle, StyleProp} from 'react-native';

export const getPopupStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        popup: {
            position: 'relative',
            backgroundColor: popupBackgroundColor,
            overflow: 'hidden',
            height: 0,
        },
        popup_active: {
            position: 'absolute',
            height: 'auto',
        },
    })
);

const Popup: React.FC<PopupProps> = ({
    children,
    style,
    visible = false,
    overlay = true,
    duration,
    closeOnPressOverlay = true,
    position = 'center',
    round = false,
    safeAreaInsetBottom = false,
    lazyRender = true,
    destroyOnClosed = false,
    onPressOverlay: onPressOverlayFn,
    onOpen: onOpenFn,
    onOpened: onOpenedFn,
    onClose: onCloseFn,
    onClosed: onClosedFn,
    onRequestClose,
}) => {
    const insets = useSafeAreaInsets();
    const onPressOverlayPersistFn = usePersistFn(onPressOverlayFn ?? emptyFn);
    const onOpenPersistFn = usePersistFn(onOpenFn ?? emptyFn);
    const onOpenedPersistFn = usePersistFn(onOpenedFn ?? emptyFn);
    const onClosePersistFn = usePersistFn(onCloseFn ?? emptyFn);
    const onClosedPersistFn = usePersistFn(onClosedFn ?? emptyFn);
    const {theme} = useTheme();
    const styles = getPopupStyleSheet(theme);

    duration = defaultTo(duration, animationDurationBase);

    const [state, setState] = useStateUpdate<State>({
        visible,
        overlayVisible: visible,
        zIndex: getNextZIndex(),
        lazyRender,
    });
    const MountedRef = useRef(false);

    const fadeAnim = useRef(new Animated.Value(getPosition(visible, position))).current;
    const fadeInstance = useRef<Animated.CompositeAnimation | null>(null);

    const onPressOverlay = useCallback(() => {
        if (closeOnPressOverlay) {
            onPressOverlayPersistFn();
        }
    }, [closeOnPressOverlay, onPressOverlayPersistFn]);

    useEffect(() => {
        if (visible) {
            setState({
                visible,
                zIndex: getNextZIndex(),
                lazyRender: false,
            });
        }

        setState({
            overlayVisible: visible,
        });

        if (MountedRef.current) {
            fadeAnim.setValue(getPosition(!visible, position));

            if (visible) {
                onOpenPersistFn();
            } else {
                onClosePersistFn();
            }

            fadeInstance.current = Animated.timing(fadeAnim, {
                toValue: getPosition(visible, position),
                duration,
                useNativeDriver: true,
                easing: visible
                    ? Easing.bezier(0.075, 0.82, 0.165, 1.0)
                    : Easing.bezier(0.55, 0.055, 0.675, 0.19),
            });

            fadeInstance.current.start(({finished}) => {
                if (finished) {
                    fadeInstance.current = null;
                    if (!visible) {
                        setState({visible, lazyRender: destroyOnClosed});
                        onClosedPersistFn();
                    } else {
                        onOpenedPersistFn();
                    }
                }
            });
        }

        return () => {
            // 停止动画
            if (fadeInstance.current) {
                fadeInstance.current.stop();
                fadeInstance.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        destroyOnClosed,
        duration,
        fadeAnim,
        position,
        onClosedPersistFn,
        onClosePersistFn,
        onOpenedPersistFn,
        onOpenPersistFn,
        visible,
    ]);

    useEffect(() => {
        MountedRef.current = true;
    }, []);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (typeof onRequestClose === 'function' && visible) {
                return onRequestClose();
            }

            return false;
        });

        return () => backHandler.remove();
    }, [onRequestClose, visible]);

    const popupStyles: StyleProp<ViewStyle> = [
        styles.popup,
        getBorderRadius(position, round),
        {
            paddingBottom: state.visible && safeAreaInsetBottom ? insets.bottom : 0,
            zIndex: state.zIndex,
        },
        style,
        state.visible
            ? [styles.popup_active, getTransform(position, fadeAnim), PopupPositionMap[position]]
            : null,
    ];

    if (state.lazyRender) {
        return null;
    }

    return (
        <>
            {overlay ? (
                <Overlay
                    visible={state.overlayVisible}
                    zIndex={state.zIndex}
                    duration={duration}
                    onPress={onPressOverlay}
                />
            ) : null}

            <Animated.View
                style={popupStyles}
                pointerEvents={position !== 'center' ? undefined : 'box-none'}>
                {children}
            </Animated.View>
        </>
    );
};

export default memo(Popup);
