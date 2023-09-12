import _ from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {
    LayoutAnimation,
    Platform,
    View,
    Keyboard,
    EmitterSubscription,
    KeyboardEvent,
    LayoutChangeEvent,
    LayoutRectangle,
    Animated,
} from 'react-native';

import {useMemoizedCallback} from '@app/hooks';
import {AppCommonStyles} from '@app/utils';
import {BlankSpacer, Spacing0} from '@components/alias';

import {IKeyboardAvoidingScrollViewStickyFooterProps} from './keyboard-avoiding-scrollview-sticky-footer.props';

export const KeyboardAvoidingScrollViewStickyFooter: React.FC<
    IKeyboardAvoidingScrollViewStickyFooterProps
> = ({
    keyboardVerticalOffset = 0,
    StickyFooter,
    children,
    bottomInsetIfKeyboardShown,
    scrollEnabled = false,
    onScroll,
}: IKeyboardAvoidingScrollViewStickyFooterProps) => {
    const initialFrameHeightRef = useRef<number | null>(null);
    const frameRef = useRef<LayoutRectangle | null>(null);
    const [bottom, setBottom] = useState(0);
    const keyboardEvent = useRef<KeyboardEvent | null>(null);
    const relativeKeyboardHeight = useMemoizedCallback(
        (keyboardFrame: any | undefined) => {
            const frame = frameRef.current;
            if (_.isNil(frame) || _.isNil(keyboardFrame)) {
                return 0;
            }
            const keyboardY = keyboardFrame.screenY - keyboardVerticalOffset;
            // Calculate the displacement needed for the view such that it
            // no longer overlaps with the keyboard
            return Math.max(frame.y + frame.height - keyboardY, 0);
        },
        [keyboardVerticalOffset]
    );
    const bottomToSetRef = useRef(0);
    const updateBottomIfNecesarry = useMemoizedCallback(() => {
        if (_.isNil(keyboardEvent.current)) {
            setBottom(0);
            return;
        }
        const {duration, easing, endCoordinates} = keyboardEvent.current;
        const height = relativeKeyboardHeight(endCoordinates);
        if (bottomToSetRef.current === height) {
            return;
        }
        bottomToSetRef.current = height;
        if (bottom === height) {
            return;
        }
        if (duration && easing) {
            LayoutAnimation.configureNext({
                // We have to pass the duration equal to minimal accepted duration defined here: RCTLayoutAnimation.m
                duration: duration > 10 ? duration : 10,
                update: {
                    duration: duration > 10 ? duration : 10,
                    type: LayoutAnimation.Types[easing] || 'keyboard',
                },
            });
        }
        setBottom(height);
    }, [bottom, relativeKeyboardHeight]);
    const onKeyboardChange = useMemoizedCallback(
        (event: KeyboardEvent) => {
            if (
                !_.isNil(keyboardEvent.current) &&
                _.isEqual(event.endCoordinates, keyboardEvent.current.endCoordinates)
            ) {
                return;
            }
            keyboardEvent.current = event;
            updateBottomIfNecesarry();
        },
        [updateBottomIfNecesarry]
    );
    useEffect(() => {
        let keyboardSubscriptions: EmitterSubscription[] | undefined;
        if (Platform.OS === 'ios') {
            keyboardSubscriptions = [
                Keyboard.addListener('keyboardWillChangeFrame', onKeyboardChange),
            ];
        } else {
            keyboardSubscriptions = [
                Keyboard.addListener('keyboardDidHide', onKeyboardChange),
                Keyboard.addListener('keyboardDidShow', onKeyboardChange),
            ];
        }
        return () => {
            keyboardSubscriptions?.forEach(subscription => {
                subscription.remove();
            });
        };
    }, [onKeyboardChange]);
    const onLayout = (event: LayoutChangeEvent) => {
        frameRef.current = event.nativeEvent.layout;
        if (_.isNil(initialFrameHeightRef.current)) {
            initialFrameHeightRef.current = frameRef.current.height;
        }
        updateBottomIfNecesarry();
    };
    return (
        <View style={AppCommonStyles.root} onLayout={onLayout}>
            <Animated.ScrollView
                onScroll={onScroll}
                scrollEnabled={scrollEnabled}
                automaticallyAdjustContentInsets={false}
                keyboardDismissMode="interactive"
                keyboardShouldPersistTaps="handled">
                {children}
            </Animated.ScrollView>
            <View style={{marginBottom: Platform.OS === 'ios' ? bottom : Spacing0}}>
                {StickyFooter && StickyFooter}
                {Platform.OS === 'ios' && (
                    <BlankSpacer height={bottom > 0 ? bottomInsetIfKeyboardShown : 0} />
                )}
            </View>
        </View>
    );
};
