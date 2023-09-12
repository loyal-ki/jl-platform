import {Federated} from '@callstack/repack/client';
import React from 'react';

import {useTheme} from '@app/context';

import {IDevFeaturesScreenRepack} from './dev-features-screen.props';

import {Placeholder} from '@components';

const JourneyLinguaFeatures = React.lazy(() =>
    Federated.importModule<IDevFeaturesScreenRepack>('journey-lingua-features', './App')
);

export const DevFeaturesScreen: React.FC = () => {
    const {theme} = useTheme();

    return (
        <React.Suspense fallback={<Placeholder theme={theme} label="JourneyLinguaFeatures" />}>
            <JourneyLinguaFeatures theme={theme} />
        </React.Suspense>
    );
};
