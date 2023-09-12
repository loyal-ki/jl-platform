import {StyleSheet} from 'react-native';

import {typography} from '@app/utils';
import {changeOpacity, makeStyleSheetFromTheme} from '@app/utils/theme';
import {Spacing16, Spacing8} from '@components/alias';

export const getWizardStepsStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        /// STEP-ITEM
        stepWrap: {
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexShrink: 0,
        },
        stepIconWrap: {
            height: 24,
            width: 24,
            borderRadius: 24 / 2,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.primary,
            position: 'relative',
            zIndex: 10,
        },
        line: {
            position: 'absolute',
            top: 12,
            height: 2,
            borderRadius: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.primary,
        },
        stepText: {...typography.text12Bold, color: 'grey'},
        stepTitle: {...typography.text12SemiBold, color: theme.text},
        statusContainer: {
            borderRadius: 12,
            paddingVertical: 2,
            paddingHorizontal: 4,
            backgroundColor: changeOpacity(theme.primary, 0.08),
        },
        stepStatus: {
            ...typography.text10Bold,
            textAlign: 'center',
        },

        /// WIZARD-STEPS
        outWrap: {
            paddingVertical: Spacing8,
            paddingHorizontal: Spacing16,
        },
        stepsBox: {
            alignItems: 'flex-start',
            flexDirection: 'row',
            position: 'relative',
        },
    })
);
