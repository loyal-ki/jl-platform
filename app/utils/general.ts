import _, {PropertyPath} from 'lodash';
import ReactNativeHapticFeedback, {HapticFeedbackTypes} from 'react-native-haptic-feedback';

export type EmptyFn = () => void;
// eslint-disable-next-line no-void
export const emptyFn = () => void 0;
export const emptyComponent = () => null;

let zIndex = 2000;
// eslint-disable-next-line no-plusplus
export const getNextZIndex = () => ++zIndex;

export function hapticFeedback(method: HapticFeedbackTypes = HapticFeedbackTypes.impactLight) {
    ReactNativeHapticFeedback.trigger(method, {
        enableVibrateFallback: false,
        ignoreAndroidSystemSettings: false,
    });
}

export enum PromiseStatus {
    fulfilled = 'fulfilled',
    rejected = 'rejected',
}

// This allows us to handle errors from independent promises separately and not be interrupted by a failed promise.
Promise.allSettled =
    Promise.allSettled ||
    (<T>(promises: Array<Promise<T>>) =>
        Promise.all(
            promises.map(p =>
                p
                    .then(value => ({
                        status: PromiseStatus.fulfilled,
                        value,
                    }))
                    .catch(reason => ({
                        status: PromiseStatus.rejected,
                        reason,
                    }))
            )
        ));

export const safeGet = (object: unknown, path: PropertyPath, defaultValue: unknown): any => {
    const value = _.get(object, path);
    return _.defaultTo(value, defaultValue);
};
