/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const {getDefaultConfig} = require('metro-config');
const {mergeConfig} = require('@react-native/metro-config');

module.exports = (async () => {
    const {
        resolver: {sourceExts, assetExts},
    } = await mergeConfig(getDefaultConfig());
    return {
        transformer: {
            babelTransformerPath: require.resolve('react-native-svg-transformer'),
            getTransformOptions: async () => ({
                transform: {
                    experimentalImportSupport: false,
                    inlineRequires: true,
                },
            }),
        },
        resolver: {
            assetExts: assetExts.filter(ext => ext !== 'svg'),
            sourceExts: [...sourceExts, 'svg'],
        },
    };
})();
