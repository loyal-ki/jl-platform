import React, {FC, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {AppCommonStyles} from '@app/utils';
import {BlankSpacer, Spacing16} from '@components/alias';
import {Progress} from '@components/progress';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing16,
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
    },
});

type Props = {
    label: string;
    theme: Theme;
};

const kDefaultPercentage = 10;

export const Placeholder: FC<Props> = ({label, theme}) => {
    const interval = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const [running, setRunning] = useState(true);
    const [progress, setProgress] = useState(kDefaultPercentage);

    useEffect(() => {
        if (running) {
            interval.current = setInterval(() => {
                setProgress(prev => prev + 1);
            }, 150);
        } else {
            clearInterval(interval.current);
        }

        return () => {
            clearInterval(interval.current);
        };
    }, [running]);

    useEffect(() => {
        if (progress === 90) {
            setRunning(false);
            clearInterval(interval.current);
        }
    }, [progress]);

    return (
        <SafeAreaView style={AppCommonStyles.root}>
            <View style={styles.container}>
                <Text style={styles.text}>Loading {label} mini app!</Text>
                <BlankSpacer height={Spacing16} />
                <View style={{width: '86%'}}>
                    <Progress
                        percentage={progress}
                        showPivot={false}
                        strokeWidth={8}
                        square
                        animated
                        color={theme.primary}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};
