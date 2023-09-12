import {debounce} from 'lodash';
import React, {
    useState,
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef,
    useMemo,
    useCallback,
} from 'react';
import {
    GestureResponderEvent,
    LayoutChangeEvent,
    NativeSyntheticEvent,
    StyleProp,
    StyleSheet,
    TargetedEvent,
    Text,
    TextInput,
    TextInputFocusEventData,
    TextInputProps,
    TextStyle,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
    Pressable,
} from 'react-native';
import Animated, {useAnimatedStyle, withTiming, Easing} from 'react-native-reanimated';

import {formatSize, typography} from '@app/utils';
import {Icon, IconNameEnum} from '@components/icon';
import {changeOpacity, makeStyleSheetFromTheme} from '@utils/theme';

import {useTogglePasswordVisibility} from './hooks/use-toggle-password-visibility';
import {getLabelPositions, onExecution} from './utils';

const DEFAULT_INPUT_HEIGHT = 56;
const BORDER_DEFAULT_WIDTH = 1;
const BORDER_FOCUSED_WIDTH = 2;

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            width: '100%',
        },
        errorContainer: {
            flexDirection: 'row',
            borderColor: 'transparent',
            borderWidth: 1,
        },
        errorIcon: {
            color: theme.error,
            marginRight: 3,
            top: 3,
        },
        errorText: {
            color: theme.error,
            fontSize: 12,
            lineHeight: 16,
            paddingVertical: 5,
        },
        input: {
            backgroundColor: 'transparent',
            borderWidth: 0,
            flex: 1,
            paddingHorizontal: 0,
            paddingTop: 0,
            paddingBottom: 0,
        },
        label: {
            position: 'absolute',
            color: changeOpacity(theme.text, 0.64),
            left: 16,
            fontSize: 16,
            zIndex: 10,
            maxWidth: 315,
        },
        readOnly: {
            backgroundColor: changeOpacity('#FFFFFF', 0.16),
        },
        smallLabel: {
            ...typography.text14Bold,
        },
        textInput: {
            flexDirection: 'row',
            fontSize: 16,
            paddingTop: 12,
            paddingBottom: 12,
            paddingHorizontal: 16,
            color: theme.text,
            borderColor: changeOpacity(theme.text, 0.16),
            borderRadius: 4,
            borderWidth: BORDER_DEFAULT_WIDTH,
            backgroundColor: theme.background,
        },
        passwordIconStyle: {alignItems: 'center', justifyContent: 'center'},
    })
);

export type FloatingInputRef = {
    blur: () => void;
    focus: () => void;
    isFocused: () => boolean;
};

type FloatingInputProps = TextInputProps & {
    containerStyle?: ViewStyle;
    editable?: boolean;
    endAdornment?: React.ReactNode;
    iconRightName?: IconNameEnum;
    error?: string;
    errorIcon?: string;
    isKeyboardInput?: boolean;
    label: string;
    labelTextStyle?: TextStyle;
    multiline?: boolean;
    onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
    onFocus?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
    onLayout?: (e: LayoutChangeEvent) => void;
    onPress?: (e: GestureResponderEvent) => void;
    placeholder?: string;
    showErrorIcon?: boolean;
    testID?: string;
    textInputStyle?: TextStyle;
    theme: Theme;
    value?: string;
    isPassword?: boolean;
};

const FloatingInput = forwardRef<FloatingInputRef, FloatingInputProps>(
    (
        {
            containerStyle,
            editable = true,
            error,
            errorIcon = 'warning',
            endAdornment,
            iconRightName,
            isKeyboardInput = true,
            label = '',
            labelTextStyle,
            multiline,
            onBlur,
            onFocus,
            onLayout,
            onPress,
            placeholder,
            showErrorIcon = true,
            testID,
            textInputStyle,
            theme,
            value,
            isPassword = false,
            ...props
        }: FloatingInputProps,
        ref
    ) => {
        const {passwordVisibility, rightIcon, handlePasswordVisibility} =
            useTogglePasswordVisibility();
        const [focused, setIsFocused] = useState(false);
        const [focusedLabel, setIsFocusLabel] = useState<boolean | undefined>();
        const inputRef = useRef<TextInput>(null);
        const debouncedOnFocusTextInput = debounce(setIsFocusLabel, 500, {
            leading: true,
            trailing: false,
        });
        const styles = getStyleSheet(theme);

        const positions = useMemo(
            () => getLabelPositions(styles.textInput, styles.label, styles.smallLabel),
            [styles]
        );
        const size = useMemo(
            () => [styles.textInput.fontSize, styles.smallLabel.fontSize],
            [styles]
        );

        useImperativeHandle(
            ref,
            () => ({
                blur: () => inputRef.current?.blur(),
                focus: () => inputRef.current?.focus(),
                isFocused: () => inputRef.current?.isFocused() || false,
            }),
            [inputRef]
        );

        useEffect(() => {
            if (!focusedLabel && (value || props.defaultValue)) {
                debouncedOnFocusTextInput(true);
            }
        }, [value, props.defaultValue, focusedLabel, debouncedOnFocusTextInput]);

        const onTextInputBlur = useCallback(
            (e: NativeSyntheticEvent<TextInputFocusEventData>) =>
                onExecution(
                    e,
                    () => {
                        setIsFocusLabel(Boolean(value));
                        setIsFocused(false);
                    },
                    onBlur
                ),
            [onBlur, value]
        );

        const onTextInputFocus = useCallback(
            (e: NativeSyntheticEvent<TextInputFocusEventData>) =>
                onExecution(
                    e,
                    () => {
                        setIsFocusLabel(true);
                        setIsFocused(true);
                    },
                    onFocus
                ),
            [onFocus]
        );

        const onAnimatedTextPress = useCallback(() => {
            return focused ? null : inputRef?.current?.focus();
        }, [focused]);

        const shouldShowError = !focused && error;
        const onPressAction = !isKeyboardInput && editable && onPress ? onPress : undefined;

        const combinedContainerStyle = useMemo(() => {
            return [styles.container, containerStyle];
        }, [styles, containerStyle]);

        const combinedTextInputContainerStyle = useMemo(() => {
            const res: StyleProp<TextStyle> = [styles.textInput];
            if (!editable) {
                res.push(styles.readOnly);
            }
            res.push({
                borderWidth: focusedLabel ? BORDER_FOCUSED_WIDTH : BORDER_DEFAULT_WIDTH,
                height:
                    DEFAULT_INPUT_HEIGHT +
                    (focusedLabel ? BORDER_FOCUSED_WIDTH : BORDER_DEFAULT_WIDTH) * 2,
            });

            if (focused) {
                res.push({borderColor: theme.primary});
            } else if (shouldShowError) {
                res.push({borderColor: theme.error});
            }

            res.push(textInputStyle);

            if (multiline) {
                res.push({height: 100, textAlignVertical: 'top'});
            }

            return res;
        }, [
            styles,
            theme,
            shouldShowError,
            focused,
            textInputStyle,
            focusedLabel,
            multiline,
            editable,
        ]);

        const combinedTextInputStyle = useMemo(() => {
            const res: StyleProp<TextStyle> = [styles.textInput, styles.input, textInputStyle];

            if (multiline) {
                res.push({height: 80, textAlignVertical: 'top'});
            }

            return res;
        }, [styles, textInputStyle, multiline]);

        const textAnimatedTextStyle = useAnimatedStyle(() => {
            const inputText = placeholder || value || props.defaultValue;
            const index = inputText || focusedLabel ? 1 : 0;
            const toValue = positions[index];
            const toSize = size[index];

            // eslint-disable-next-line prefer-destructuring
            let color = styles.label.color;
            if (shouldShowError) {
                color = theme.error;
            } else if (focused) {
                color = theme.primary;
            }

            return {
                top: withTiming(toValue, {duration: 100, easing: Easing.linear}),
                fontSize: withTiming(toSize, {duration: 100, easing: Easing.linear}),
                backgroundColor: focusedLabel || inputText ? theme.background : 'transparent',
                paddingHorizontal: focusedLabel || inputText ? 4 : 0,
                color,
            };
        });

        return (
            <TouchableWithoutFeedback onPress={onPressAction} onLayout={onLayout}>
                <View style={combinedContainerStyle}>
                    <Animated.Text
                        onPress={onAnimatedTextPress}
                        style={[labelTextStyle, textAnimatedTextStyle, styles.smallLabel]}
                        suppressHighlighting
                        numberOfLines={1}>
                        {label}
                    </Animated.Text>
                    <View style={combinedTextInputContainerStyle}>
                        <TextInput
                            {...props}
                            secureTextEntry={passwordVisibility && isPassword}
                            editable={isKeyboardInput && editable}
                            style={combinedTextInputStyle}
                            placeholder={placeholder}
                            textContentType="oneTimeCode"
                            placeholderTextColor={styles.label.color}
                            multiline={multiline}
                            value={value}
                            pointerEvents={isKeyboardInput ? 'auto' : 'none'}
                            onFocus={onTextInputFocus}
                            onBlur={onTextInputBlur}
                            ref={inputRef}
                            underlineColorAndroid="transparent"
                            testID={testID}
                        />
                        {endAdornment}
                        {iconRightName && (
                            <View style={styles.passwordIconStyle}>
                                <Icon
                                    name={iconRightName}
                                    color={focusedLabel ? theme.primary : theme.textDisable}
                                    size={formatSize(24)}
                                />
                            </View>
                        )}
                        {isPassword && (
                            <View style={styles.passwordIconStyle}>
                                <Pressable onPress={handlePasswordVisibility}>
                                    <Icon
                                        name={rightIcon}
                                        size={formatSize(20)}
                                        color={focusedLabel ? theme.primary : theme.textDisable}
                                    />
                                </Pressable>
                            </View>
                        )}
                    </View>
                    {Boolean(error) && (
                        <View style={styles.errorContainer}>
                            {/* {showErrorIcon && errorIcon && (
                                <WarningCircle
                                    width={20}
                                    height={20}
                                    fill={theme.error}
                                    style={styles.errorIcon}
                                />
                            )} */}
                            <Text style={styles.errorText} testID={`${testID}.error`}>
                                {error}
                            </Text>
                        </View>
                    )}
                </View>
            </TouchableWithoutFeedback>
        );
    }
);

FloatingInput.displayName = 'FloatingInput';

export default FloatingInput;
