/* eslint-disable no-param-reassign */
import {defaultTo} from 'lodash';
import isUndefined from 'lodash/isUndefined';
import React, {useEffect, useRef, useState, memo} from 'react';
import {TouchableOpacity, Animated, BackHandler, StyleSheet, View} from 'react-native';

import {animationDurationBase, overlayBackgroundColor, overlayZIndex} from './overlay.config';
import {OverlayProps} from './overlay.props';

const styles = StyleSheet.create({
    overlay: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },

    overlay_active: {
        position: 'absolute',
    },

    touchable: {
        flex: 1,
    },
});

const Overlay: React.FC<OverlayProps> = ({
    testID,
    children,
    style,
    zIndex,
    visible = false,
    duration,
    onPress,
    onRequestClose,
    backgroundColor,
}) => {
    const fadeAnim = useRef(new Animated.Value(0));
    const fadeInstance = useRef<Animated.CompositeAnimation | null>(null);
    const [localVisible, setLocalVisible] = useState(visible);

    duration = defaultTo(duration, animationDurationBase);
    backgroundColor = defaultTo(backgroundColor, overlayBackgroundColor);

    useEffect(() => {
        if (visible) {
            setLocalVisible(true);
        }
        fadeInstance.current = Animated.timing(fadeAnim.current, {
            toValue: visible ? 1 : 0,
            duration,
            useNativeDriver: true,
        });

        fadeInstance.current.start(({finished}) => {
            if (finished) {
                fadeInstance.current = null;
                if (!visible) {
                    setLocalVisible(false);
                }
            }
        });

        return () => {
            if (fadeInstance.current) {
                fadeInstance.current.stop();
                fadeInstance.current = null;
            }
        };
    }, [visible, duration]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (typeof onRequestClose === 'function' && visible) {
                return onRequestClose();
            }

            return false;
        });

        return () => backHandler.remove();
    }, [visible, onRequestClose]);

    if (!localVisible) {
        return <View />;
    }

    return (
        <Animated.View
            testID={testID}
            style={[
                styles.overlay,
                localVisible ? styles.overlay_active : null,
                {
                    opacity: fadeAnim.current,
                    backgroundColor,
                    zIndex: !isUndefined(zIndex) ? zIndex : overlayZIndex,
                },
            ]}>
            <TouchableOpacity style={[styles.touchable, style]} activeOpacity={1} onPress={onPress}>
                {children}
            </TouchableOpacity>
        </Animated.View>
    );
};

export default memo(Overlay);
