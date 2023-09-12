import {defaultTo} from 'lodash';
import React, {useMemo} from 'react';
import {useIntl} from 'react-intl';
import {Dimensions, Text, View} from 'react-native';

import {RegistrationStatusType} from '@app/constants';
import {changeOpacity, formatSize} from '@app/utils';
import {BlankSpacer, Spacing12, Spacing4} from '@components/alias';
import {Icon} from '@components/icon';

import {StepItemProps} from './wizard-steps.props';
import {getWizardStepsStyleSheet} from './wizard-steps.style';

import {AppLocalizationKeys} from '@localization/localization.keys';

const windowWidth = Dimensions.get('window').width;

export const StepItem: React.FC<StepItemProps> = ({
    theme,
    iconName,
    maxSteps,
    status,
    index,
    title,
}) => {
    const maxStepsDefault = defaultTo(maxSteps, 4);
    const intl = useIntl();
    const {formatMessage} = intl;

    const styles = getWizardStepsStyleSheet(theme);
    const stepWidth = windowWidth / maxStepsDefault;
    const isLast = index === maxStepsDefault - 1;

    const colorMap = useMemo(() => {
        let iconColor = theme.grey;
        let iconBackgroundColor = changeOpacity(theme.primary, 0.08);
        let textColor = 'grey';
        let textTitleColor = 'grey';
        let lineColor = 'grey';
        switch (status) {
            case RegistrationStatusType.Completed: {
                iconColor = theme.white;
                iconBackgroundColor = theme.primary;
                textColor = theme.primary;
                textTitleColor = theme.text;
                lineColor = theme.primary;
                break;
            }
            case RegistrationStatusType.InProgress: {
                iconColor = theme.primary;
                iconBackgroundColor = changeOpacity(theme.primary, 0.08);
                textColor = theme.primary;
                textTitleColor = theme.text;
                lineColor = 'grey';
                break;
            }
            case RegistrationStatusType.Pending: {
                iconColor = 'grey';
                iconBackgroundColor = changeOpacity(theme.primary, 0.08);
                textColor = 'grey';
                textTitleColor = 'grey';
                lineColor = 'grey';
                break;
            }
            default: {
                break;
            }
        }

        return {iconColor, lineColor, iconBackgroundColor, textColor, textTitleColor};
    }, [status, theme.grey, theme.primary, theme.text, theme.white]);

    const statusLabelId = useMemo(() => {
        let labelId = '';
        switch (status) {
            case RegistrationStatusType.Completed: {
                labelId = AppLocalizationKeys.register_information.step_completed_label;
                break;
            }
            case RegistrationStatusType.InProgress: {
                labelId = AppLocalizationKeys.register_information.step_in_progress_label;
                break;
            }
            case RegistrationStatusType.Pending: {
                labelId = AppLocalizationKeys.register_information.step_pending_label;
                break;
            }
            default: {
                labelId = AppLocalizationKeys.register_information.step_pending_label;
                break;
            }
        }

        return labelId;
    }, [status]);

    return (
        <View style={[styles.stepWrap, {width: stepWidth}]}>
            <View
                style={[
                    styles.line,
                    {backgroundColor: colorMap.lineColor},
                    isLast ? {width: 0, left: 0} : {width: '50%', left: stepWidth / 4 + Spacing12},
                ]}
            />

            <View style={[styles.stepIconWrap, {backgroundColor: colorMap.iconBackgroundColor}]}>
                <Icon name={iconName} size={formatSize(16)} color={colorMap.iconColor} />
            </View>

            <BlankSpacer height={Spacing4} />

            <View>
                <Text style={styles.stepText}>
                    {formatMessage({id: AppLocalizationKeys.register_information.step_label})}{' '}
                    {index + 1}
                </Text>

                <BlankSpacer height={Spacing4} />

                <Text style={[styles.stepTitle, {color: colorMap.textTitleColor}]}>{title}</Text>

                <BlankSpacer height={Spacing4} />

                <View style={styles.statusContainer}>
                    <Text style={[styles.stepStatus, {color: colorMap.textColor}]}>
                        {formatMessage({id: statusLabelId})}
                    </Text>
                </View>
            </View>
        </View>
    );
};
