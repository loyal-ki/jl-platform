import React, {memo} from 'react';
import {View} from 'react-native';

import {RegistrationStatusType} from '@app/constants';

import {StepItem} from './step-item';
import {WizardStepsProps} from './wizard-steps.props';
import {getWizardStepsStyleSheet} from './wizard-steps.style';

const WizardSteps: React.FC<WizardStepsProps> = ({theme, data, style, current, maxSteps}) => {
    const styles = getWizardStepsStyleSheet(theme);

    const inner =
        data && data?.length > 0 ? (
            <View style={[styles.stepsBox, style]}>
                {data?.map((v, i) => {
                    let status = RegistrationStatusType.Pending;
                    if (current > i) {
                        status = RegistrationStatusType.Completed;
                    } else if (current === i) {
                        status = RegistrationStatusType.InProgress;
                    } else {
                        status = RegistrationStatusType.Pending;
                    }

                    // eslint-disable-next-line react/no-array-index-key
                    return <StepItem key={i} index={i} {...v} status={status} />;
                })}
            </View>
        ) : null;

    return <View style={styles.outWrap}>{inner}</View>;
};

export default memo(WizardSteps);
