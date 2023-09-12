import React, {useMemo} from 'react';
import {useIntl} from 'react-intl';
import {Text, TouchableOpacity, View} from 'react-native';

import {
    BlankSpacer,
    CodeInputContainer,
    KeyboardNumberPad,
    ScreenContainer,
    Spacing16,
    Spacing24,
} from '@app/components';
import {AppLocalizationKeys} from '@app/localization/localization.keys';

import {getStyleSheet} from './otp-screen.styles';
import {IOtpState} from './otp-screen.types';
import {CODE_LENGTH, useOtpViewModel} from './otp-screen.view-model';

export const PinCodeScreen: React.FC<IOtpState> = ({id}) => {
    const intl = useIntl();
    const viewModel = useOtpViewModel();
    const styles = getStyleSheet(viewModel.theme);
    const {formatMessage} = intl;

    const StickyFooter = useMemo(() => {
        return (
            <KeyboardNumberPad
                theme={viewModel.theme}
                onInsert={viewModel.onInsertOtp}
                onDelete={viewModel.onDeleteOtp}
            />
        );
    }, [viewModel.onDeleteOtp, viewModel.onInsertOtp, viewModel.theme]);

    return (
        <ScreenContainer preset="fixed" StickyFooter={StickyFooter}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.timer}>{viewModel.resendTime}</Text>
                    <BlankSpacer height={Spacing16} />
                    <View>
                        <Text style={styles.labelEmail}>
                            {formatMessage({
                                id: AppLocalizationKeys.otp.enter_the_verification_code,
                            })}{' '}
                            <Text style={styles.email}>{viewModel.state.email}</Text>
                        </Text>
                    </View>

                    <BlankSpacer height={Spacing24} />

                    <CodeInputContainer
                        theme={viewModel.theme}
                        value={viewModel.state.otp}
                        length={CODE_LENGTH}
                    />
                    <BlankSpacer height={Spacing24} />
                    <View style={styles.row}>
                        <Text style={styles.receive}>
                            {formatMessage({id: AppLocalizationKeys.otp.did_not_receive_label})}
                        </Text>
                        <TouchableOpacity onPress={viewModel.restartCountdown}>
                            <Text style={styles.resend}>
                                {formatMessage({id: AppLocalizationKeys.otp.resend_label})}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScreenContainer>
    );
};
