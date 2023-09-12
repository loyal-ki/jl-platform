import {AppRegistry, Platform} from 'react-native';
import {ScriptManager, Script, Federated} from '@callstack/repack/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import {App} from './app/app';
import {Root} from './app/root';

import {name as appName} from './app.json';

const resolveURL = Federated.createURLResolver({
    containers: {
        'journey-lingua-features': 'http://localhost:8082/[name][ext]',
    },
});

ScriptManager.shared.setStorage(AsyncStorage);
ScriptManager.shared.addResolver(async (scriptId, caller) => {
    let url;
    if (caller === 'main') {
        url = Script.getDevServerURL(scriptId);
    } else {
        url = resolveURL(scriptId, caller);
    }

    if (!url) {
        return undefined;
    }

    return {
        url,
        cache: false, // For development
        query: {
            platform: Platform.OS,
        },
    };
});

AppRegistry.registerComponent(appName, () => Root);
