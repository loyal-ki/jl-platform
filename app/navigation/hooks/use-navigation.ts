import {useNavigation as useUntypedNavigation, NavigationProp} from '@react-navigation/native';

import {ModalsParamList, ScreensParamList, StacksParamList} from '@navigation/enums';

export type NavigationParamList = StacksParamList & ScreensParamList & ModalsParamList;

export const useNavigation = () => useUntypedNavigation<NavigationProp<NavigationParamList>>();
