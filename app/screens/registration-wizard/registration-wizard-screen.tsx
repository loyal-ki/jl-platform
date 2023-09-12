import React, {useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import {StyleSheet, View} from 'react-native';

import {IconNameEnum, ScreenContainer, WizardSteps} from '@app/components';
import {RegistrationWizardStepType} from '@app/constants';
import {useTheme} from '@app/context';
import {useBackPressCallback, useMemoizedCallback} from '@app/hooks';
import {AppLocalizationKeys} from '@app/localization/localization.keys';
import {AppCommonStyles} from '@app/utils';

import {ConfirmationScreen} from './confirmation/information-screen';
import {InformationScreen} from './information/information-screen';
import {LevelScreen} from './level/level-screen';
import {OccupationScreen} from './occupation/occupation-screen';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {},
    wizardStep: {
        flexDirection: 'row',
    },
});

export const RegistrationWizardScreen: React.FC = () => {
    const {theme} = useTheme();
    const intl = useIntl();
    const {formatMessage} = intl;

    const [activeStep, setActiveStep] = useState(RegistrationWizardStepType.Information);

    const data = useMemo(() => {
        return [
            {
                iconName: IconNameEnum.Information,
                theme,
                title: formatMessage({
                    id: AppLocalizationKeys.register_information.step_information_label,
                }),
            },
            {
                iconName: IconNameEnum.Occupation,
                theme,
                title: formatMessage({
                    id: AppLocalizationKeys.register_information.step_occupation_label,
                }),
            },
            {
                iconName: IconNameEnum.Level,
                theme,
                title: formatMessage({
                    id: AppLocalizationKeys.register_information.step_current_level_label,
                }),
            },
            {
                iconName: IconNameEnum.Confirmation,
                theme,
                title: formatMessage({
                    id: AppLocalizationKeys.register_information.step_confirmation_label,
                }),
            },
        ];
    }, [formatMessage, theme]);

    const showNextStep = useMemoizedCallback(() => {
        setActiveStep(currentStep => {
            return currentStep + 1;
        });
    }, []);
    const showPreviousStep = useMemoizedCallback(() => {
        setActiveStep(currentStep => {
            return currentStep - 1;
        });
    }, []);

    const onBackPress = useMemoizedCallback(() => {
        if (activeStep === RegistrationWizardStepType.Information) {
            return false;
        }
        showPreviousStep();
        return true;
    }, [activeStep, showPreviousStep]);

    useBackPressCallback(onBackPress);

    return (
        <ScreenContainer preset="fixed" style={styles.screen}>
            <View style={styles.container}>
                <View>
                    <View style={styles.wizardStep}>
                        <WizardSteps data={data} current={activeStep} theme={theme} maxSteps={4} />
                    </View>
                </View>
                <View style={AppCommonStyles.flex1}>
                    {activeStep === RegistrationWizardStepType.Information && (
                        <InformationScreen onNextStepInfo={showNextStep} />
                    )}
                    {activeStep === RegistrationWizardStepType.Occupation && (
                        <OccupationScreen onNextStepInfo={showNextStep} />
                    )}
                    {activeStep === RegistrationWizardStepType.CurrentLevel && (
                        <LevelScreen onNextStepInfo={showNextStep} />
                    )}
                    {activeStep === RegistrationWizardStepType.Confirmation && (
                        <ConfirmationScreen />
                    )}
                </View>
            </View>
        </ScreenContainer>
    );
};
