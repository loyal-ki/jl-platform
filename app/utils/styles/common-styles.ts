import {StyleSheet} from 'react-native';

export const AppCommonStyles = StyleSheet.create({
    root: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    flex1: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    centerText: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
    emptyStyle: {},
});
