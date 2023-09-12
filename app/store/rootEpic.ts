import {combineEpics, Epic} from 'redux-observable';

import localeEpic from './epics/locale/locale.epic';
import themeEpic from './epics/theme/theme.epic';

const epics: Epic[] = [...Object.values(themeEpic), ...Object.values(localeEpic)];

const rootEpic = combineEpics(...epics);
export default rootEpic;
