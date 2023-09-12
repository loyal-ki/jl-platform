import {logInfo} from '@app/utils';
import LocalDatabase from '@database/local_database';

let alreadyInitialized = false;

export const initialize = async (): Promise<boolean> => {
    if (!alreadyInitialized) {
        alreadyInitialized = true;
        const result = await Promise.all([LocalDatabase.init()]);
        const values = result.filter(x => !x);
        if (values.length === 0) {
            logInfo('[LAUNCHER] Successful initialization !!!');
            return alreadyInitialized;
        }
    }

    return false;
};
