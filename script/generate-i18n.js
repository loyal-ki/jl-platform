/* eslint-disable no-console */

const fs = require('fs');
// import en from '../assets/i18n/en.json' assert {type: 'json'};
const en = require('../assets/i18n/en.json');

function generateKeysFromJSON(json, parentKey = '') {
    const result = {};

    for (var i in json) {
        var keys = i.split('.');
        keys.reduce(function (r, e, j) {
            return (
                r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 == j ? i : {}) : [])
            );
        }, result);
    }

    return result;
}

const keys = generateKeysFromJSON(en);

const filePath = 'app/localization/localization.keys.ts';

const fileContent = `export const AppLocalizationKeys = ${JSON.stringify(keys, null, 2)}`;

fs.writeFile(filePath, fileContent, 'utf8', error => {
    if (error) {
        console.error('Error saving keys to file:', error);
    } else {
        console.log('Keys saved to file:', filePath);
    }
});
