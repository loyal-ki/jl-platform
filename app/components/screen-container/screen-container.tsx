/* eslint-disable react/destructuring-assignment */
import {useHeaderHeight} from '@react-navigation/elements';
import React from 'react';
import {StatusBar, View} from 'react-native';

import {useTheme} from '@app/context';
import {isIOS} from '@app/utils';

import {Spacing12, Spacing16} from '../alias';
import {KeyboardAvoidingScrollViewStickyFooter} from '../keyboard-avoiding-scrollview-sticky-footer';
import {SimpleSafeAreaView} from '../safe-area';

import {isNonScrolling, offsets, presets} from './screen.presets';
import {ScreenProps} from './screen.props';

const ScreenWithoutScrolling = (props: ScreenProps) => {
    const preset = presets.fixed;
    const headerHeight = useHeaderHeight();
    const style = props.style || {};
    const {theme} = useTheme();
    const isDark = theme.type === 'dark';

    const backgroundStyle = props.backgroundColor
        ? {
              backgroundColor: props.backgroundColor,
          }
        : {};
    return (
        <SimpleSafeAreaView
            style={[
                preset.outer,
                {
                    backgroundColor: isDark ? theme.primary : theme.background,
                },
                backgroundStyle,
            ]}
            edges={props.unsafe ? ['bottom'] : ['top', 'bottom']}
            bottomInsetIfZero={Spacing16}>
            <KeyboardAvoidingScrollViewStickyFooter
                scrollEnabled={false}
                StickyFooter={props.StickyFooter}
                keyboardVerticalOffset={
                    props.keyboardVerticalOffset ??
                    0 + headerHeight + offsets[props.keyboardOffset || 'none']
                }
                bottomInsetIfKeyboardShown={Spacing12}>
                <StatusBar
                    barStyle={
                        props.statusBar || theme.type === 'dark' ? 'light-content' : 'dark-content'
                    }
                />

                <View
                    style={[
                        preset.inner,
                        {
                            backgroundColor: theme.background,
                        },
                        style,
                        isIOS ? {overflow: 'hidden'} : {},
                    ]}>
                    {props.children}
                </View>
            </KeyboardAvoidingScrollViewStickyFooter>
        </SimpleSafeAreaView>
    );
};

const ScreenWithScrolling = (props: ScreenProps) => {
    const headerHeight = useHeaderHeight();

    const preset = presets.scroll;
    const style = props.style || {};
    const {theme} = useTheme();
    const isDark = theme.type === 'dark';
    const backgroundStyle = props.backgroundColor
        ? {
              backgroundColor: props.backgroundColor,
          }
        : {};

    const scrollViewHeight = React.useRef(null);

    const [scrollEnabled, setScrollEnabled] = React.useState(true);

    const updateScrollState = () => {
        if (props.preset === 'fixed') {
            if (scrollEnabled) setScrollEnabled(false);

            if (!scrollEnabled) setScrollEnabled(true);
        } else if (!scrollEnabled) {
            setScrollEnabled(true);
        }
    };

    if (scrollViewHeight.current !== null) updateScrollState();

    return (
        <SimpleSafeAreaView
            style={[
                preset.outer,
                {
                    backgroundColor: isDark ? theme.primary : theme.background,
                },
                backgroundStyle,
            ]}
            edges={props.unsafe ? ['bottom'] : ['top', 'bottom']}
            bottomInsetIfZero={Spacing16}>
            <KeyboardAvoidingScrollViewStickyFooter
                scrollEnabled
                StickyFooter={props.StickyFooter}
                keyboardVerticalOffset={
                    props.keyboardVerticalOffset ??
                    0 + headerHeight + offsets[props.keyboardOffset || 'none']
                }
                bottomInsetIfKeyboardShown={Spacing12}>
                <StatusBar barStyle={props.statusBar || 'light-content'} />
                <View
                    style={[
                        preset.inner,
                        {
                            backgroundColor: isDark ? theme.primary : theme.background,
                        },
                        backgroundStyle,
                        style,
                    ]}>
                    {props.children}
                </View>
            </KeyboardAvoidingScrollViewStickyFooter>
        </SimpleSafeAreaView>
    );
};

export const ScreenContainer = (props: ScreenProps) => {
    if (isNonScrolling(props.preset)) {
        return <ScreenWithoutScrolling {...props} />;
    }
    return <ScreenWithScrolling {...props} />;
};
