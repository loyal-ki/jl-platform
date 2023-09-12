import React, {FC, useMemo} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

import {getLineStyleSheet} from './styles';

interface Props {
    theme: Theme;
    styleLine?: ViewStyle | StyleProp<ViewStyle>;
}

export const Line: FC<Props> = ({theme, styleLine}) => {
    const styles = getLineStyleSheet(theme);

    const combinedStyleLine = useMemo(() => {
        const res: StyleProp<ViewStyle> = [styles.lineStyles, styleLine];

        return res;
    }, [styles, styleLine]);

    return <View style={combinedStyleLine} />;
};
