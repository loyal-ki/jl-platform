import {ComponentType} from 'react';

export interface IDevFeaturesScreenProps {
    theme: Theme;
}

export interface IDevFeaturesScreenRepack {
    default: ComponentType<IDevFeaturesScreenProps>;
}
