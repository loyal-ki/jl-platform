import {attachPropertiesToComponent} from '@app/utils';
import {
    Instance,
    loading,
    fail,
    resetDefaultOptions,
    setDefaultOptions,
    success,
} from './toast-instance';

export const Toast = attachPropertiesToComponent(Instance, {
    loading,
    success,
    fail,
    setDefaultOptions,
    resetDefaultOptions,
});
