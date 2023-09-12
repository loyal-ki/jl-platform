import fs from 'fs';

const pack = JSON.parse(fs.readFileSync('./package.json').toString());

export const dependencies = pack.dependencies;

export const sharedDeps = Object.entries(dependencies)
    .map(([key, requiredVersion]) => {
        return {[key]: {singleton: true, eager: true, requiredVersion}};
    })
    .reduce(function (result, item) {
        var key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
    }, {});

export const babelLoaderIncludes = [
    /node_modules(.*[/\\])+react\//,
    /node_modules(.*[/\\])+react-native/,
    /node_modules(.*[/\\])+@react-native/,
    /node_modules(.*[/\\])+react-freeze/,
    /node_modules(.*[/\\])+realm/,
    /node_modules(.*[/\\])+@realm/,
    /node_modules(.*[/\\])+react-native-reanimated/,
    /node_modules(.*[/\\])+@react-navigation/,
    /node_modules(.*[/\\])+@react-native-community/,
    /node_modules(.*[/\\])+@expo/,
    /node_modules(.*[/\\])+pretty-format/,
    /node_modules(.*[/\\])+metro/,
    /node_modules(.*[/\\])+abort-controller/,
    /node_modules(.*[/\\])+@callstack\/repack/,
    /node_modules(.*[/\\])+react-native-svg/,
];
