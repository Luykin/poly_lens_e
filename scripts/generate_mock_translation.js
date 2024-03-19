const fs = require('fs');
const inputFile = './workspaces/angular-app/src/assets/i18n/en.json';
const outputFileKlingon =
  './workspaces/angular-app/src/assets/i18n/mock-klingon.json';
const outputFileBlargon7 =
  './workspaces/angular-app/src/assets/i18n/mock-blargon7.json';
const outputFileUid = './workspaces/angular-app/src/assets/i18n/mock-uid.json';

let mockUid = 0;

function changeValue(obj, language) {
  if (typeof obj === 'object') {
    for (const keys in obj) {
      if (typeof obj[keys] === 'object') {
        changeValue(obj[keys], language);
      } else {
        // where the translation really happens
        if ('mock-klingon' === language) {
          obj[keys] = '‡ ' + obj[keys] + 'tðk ‡';
        }

        if ('mock-blargon7' === language) {
          obj[keys] = obj[keys].replace(/\S/g, '¤');
        }

        if ('mock-uid' === language) {
          obj[keys] = mockUid++;
        }
      }
    }
  }
  return obj;
}

const english = fs.readFileSync(inputFile).toString();
let translation_en;

// generate klingon translation
translation_en = JSON.parse(english);
changeValue(translation_en, 'mock-klingon');
fs.writeFileSync(outputFileKlingon, JSON.stringify(translation_en, null, 2));
console.log(`Created mock translation ${outputFileKlingon} from ${inputFile}`);

// generate blargon7 translation
translation_en = JSON.parse(english);
changeValue(translation_en, 'mock-blargon7');
fs.writeFileSync(outputFileBlargon7, JSON.stringify(translation_en, null, 2));
console.log(`Created mock translation ${outputFileBlargon7} from ${inputFile}`);

// generate uid translation
translation_en = JSON.parse(english);
changeValue(translation_en, 'mock-uid');
fs.writeFileSync(outputFileUid, JSON.stringify(translation_en, null, 2));
console.log(`Created mock translation ${outputFileUid} from ${inputFile}`);
