import {SCHEMA_NAME} from '@app/constants';

import {PreferencesSchema} from './schema';

export const COMBINE_SCHEMA: {[key: string]: any} = {
    [SCHEMA_NAME.PREFERENCES]: PreferencesSchema.schema,
};
