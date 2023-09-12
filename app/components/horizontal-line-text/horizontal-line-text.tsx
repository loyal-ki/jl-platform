import React, {FC, useMemo} from 'react';
import {StyleProp, Text, TextStyle, View, ViewStyle} from 'react-native';

import {Line} from './line';
import {getHorizontalLineStyleSheet} from './styles';

interface Props {
    theme: Theme;
    text: string;
    lineStyle?: ViewStyle;
    textStyle?: TextStyle;
}

export const LineWithText: FC<Props> = ({theme, text, textStyle, lineStyle}) => {
    const styles = getHorizontalLineStyleSheet(theme);

    const combinedStyleLine = useMemo(() => {
        const res: StyleProp<ViewStyle> = [styles.line, lineStyle];

        return res;
    }, [styles, lineStyle]);

    const combinedStyleText = useMemo(() => {
        const res: StyleProp<ViewStyle> = [styles.text, textStyle];

        return res;
    }, [styles, textStyle]);

    return (
        <View style={styles.container}>
            <Line theme={theme} styleLine={combinedStyleLine} />
            <Text style={combinedStyleText}>{text}</Text>
            <Line theme={theme} styleLine={combinedStyleLine} />
        </View>
    );
};
