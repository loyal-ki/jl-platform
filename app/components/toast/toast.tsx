/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import React, {useEffect, useState, useImperativeHandle, forwardRef, memo} from 'react';
import {Text, View, TouchableWithoutFeedback, StyleSheet} from 'react-native';

import {useTheme} from '@app/context';
import {makeStyleSheetFromTheme} from '@app/utils';
import {Icon, IconNameEnum} from '@components/icon';
import Circular from '@components/loading/loading-circular';
import Spinner from '@components/loading/loading-spinner';
import Popup from '@components/popup/popup';

import {
    toastBackgroundColor,
    toastBorderRadius,
    toastFontSize,
    toastIconColor,
    toastIconPadding,
    toastIconSize,
    toastInnerMinHeight,
    toastInnerPaddingHorizontal,
    toastInnerPaddingVertical,
    toastInnerWidth,
    toastLineHeight,
    toastMaxWidth,
    toastPositionBottomDistance,
    toastPositionTopDistance,
    toastTextBorderRadius,
    toastTextColor,
    toastTextMarginTop,
    toastTextMinWidth,
    toastTextPaddingHorizontal,
    toastTextPaddingVertical,
} from './toast.configs';

import type {ToastProps, ToastMethods} from './toast.props';
import type {ViewStyle, StyleProp} from 'react-native';

export const getToastStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        toast: {
            // backgroundColor: '#f30', // to test ui
            flex: 1,
            width: '100%',
            alignItems: 'center',
            paddingTop: toastPositionTopDistance,
            paddingBottom: toastPositionBottomDistance,
        },

        inner: {
            backgroundColor: toastBackgroundColor,
            borderRadius: toastBorderRadius,
            paddingHorizontal: toastInnerPaddingHorizontal,
            paddingVertical: toastInnerPaddingVertical,
            maxWidth: toastMaxWidth,
            minHeight: toastInnerMinHeight,
            width: toastInnerWidth,
            justifyContent: 'center',
        },

        inner_type_text: {
            borderRadius: toastTextBorderRadius,
            lineHeight: toastLineHeight,
            paddingHorizontal: toastTextPaddingHorizontal,
            paddingVertical: toastTextPaddingVertical,
            minWidth: toastTextMinWidth,
            minHeight: 0,
            width: 'auto',
        },

        icon: {
            alignItems: 'center',
            padding: toastIconPadding,
        },

        text: {
            fontSize: toastFontSize,
            color: toastTextColor,
            textAlign: 'center',
            marginTop: toastTextMarginTop,
        },

        text_top_0: {
            marginBottom: toastTextMarginTop,
        },
    })
);

const Toast = forwardRef<ToastMethods, ToastProps>(
    (
        {
            type,
            position = 'middle',
            message,
            overlay = false,
            forbidPress = false,
            closeOnPress = false,
            closeOnPressOverlay = false,
            loadingType = 'spinner',
            duration = 2000,
            icon,
            ...resetProps
        },
        ref
    ) => {
        const {theme} = useTheme();
        const styles = getToastStyleSheet(theme);
        const [show, setShow] = useState(false);
        const [msg, setMsg] = useState(message);

        if (closeOnPress) {
            forbidPress = false;
        }

        const onPressOverlay = () => {
            if (closeOnPressOverlay) {
                setShow(false);
            }
        };

        const onPressContent = () => {
            if (closeOnPress) {
                setShow(false);
            }
        };

        useEffect(() => {
            setShow(true);

            let timer: ReturnType<typeof setTimeout>;

            if (duration !== 0) {
                timer = setTimeout(() => {
                    setShow(false);
                }, duration);
            }

            return () => {
                clearTimeout(timer);
            };
        }, [duration]);

        useImperativeHandle(
            ref,
            () => ({
                close: () => {
                    setShow(false);
                },
                setMessage: s => {
                    setMsg(s);
                },
            }),
            []
        );

        const toastStyles: StyleProp<ViewStyle> = [
            styles.toast,
            {
                justifyContent:
                    position === 'top'
                        ? 'flex-start'
                        : position === 'bottom'
                        ? 'flex-end'
                        : 'center',
            },
        ];

        return (
            <Popup {...resetProps} visible={show} overlay={overlay} onPressOverlay={onPressOverlay}>
                <TouchableWithoutFeedback onPress={onPressContent}>
                    <View
                        style={toastStyles}
                        pointerEvents={forbidPress ? undefined : 'box-none'}
                        collapsable={false}>
                        <View
                            style={[styles.inner, type === 'text' ? styles.inner_type_text : null]}>
                            {type !== 'text' ? (
                                <View style={styles.icon}>
                                    {type === 'loading' ? (
                                        loadingType === 'circular' ? (
                                            <Circular color={toastIconColor} size={toastIconSize} />
                                        ) : (
                                            <Spinner color={toastIconColor} size={toastIconSize} />
                                        )
                                    ) : null}

                                    {type === 'success' ? (
                                        <Icon
                                            name={IconNameEnum.DoneIcon}
                                            color={toastIconColor}
                                            size={toastIconSize}
                                        />
                                    ) : null}

                                    {type === 'fail' ? (
                                        <Icon
                                            name={IconNameEnum.CrossSquareIcon}
                                            color={toastIconColor}
                                            size={toastIconSize}
                                        />
                                    ) : null}

                                    {type === 'icon' ? icon : null}
                                </View>
                            ) : null}

                            <Text style={[styles.text, type === 'text' ? styles.text_top_0 : null]}>
                                {msg}
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Popup>
        );
    }
);

Toast.displayName = 'Toast';
export default memo(Toast);
