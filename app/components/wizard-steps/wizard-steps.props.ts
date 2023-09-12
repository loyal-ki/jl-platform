import {RegistrationStatusType} from '@app/constants';
import {IconNameEnum} from '@components/icon';

import type {ReactNode} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';

export interface StepItemProps {
    status?: RegistrationStatusType;
    index: number;
    theme: Theme;
    iconName: IconNameEnum;
    maxSteps?: number;
    title: string;
}

export interface WizardStepsProps {
    current: number;
    data?: Omit<StepItemProps, 'index'>[];
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
    theme: Theme;
    maxSteps: number;
}
