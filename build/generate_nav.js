const async = require('async');
const request = require('request');
const fs = require('fs');

const baseURL = "https://raw.githubusercontent.com/Pratilipi/pratilipi/master/src/main/java/com/pratilipi/data/curated/navigation.";

async.eachSeries([
    'bn',
    // 'en',
    'gu',
    'hi',
    'kn',
    'ml',
    'mr',
    'ta',
    'te'
], function(eachLanguage, nextLanguage) {
    var lineReader = require('readline').createInterface({
        input: request.get(baseURL + eachLanguage)
    });

    const navigationJSON = {
        sections: []
    };

    let currentSection = {
        title: '',
        categories: []
    }
    lineReader.on('line', function(line) {
        const trimmedLine = line.trim();

        if (trimmedLine.length === 0) {
            // push the current section in list
            navigationJSON.sections.push(currentSection);
            currentSection = {
                title: '',
                categories: []
            }
            return;
        }

        if (trimmedLine.length > 0 && trimmedLine[0] !== '/') {
            console.log(line);
            console.log('Its a title');

            currentSection.title = trimmedLine;
            return;
        }

        if (trimmedLine.length > 0 && trimmedLine[0] === '/') {

            const firstPart = trimmedLine.split('Analytics#categoryName::')[0].trim();
            const secondPart = trimmedLine.split('Analytics#categoryName::')[1].trim();

            const categoryUrl = firstPart.split('  ').filter(item => item !== '')[0].trim().split(' ')[0];
            const title = firstPart.substring(getPosition(firstPart, ' ', 1)).trim();

            const analyticsCategoryName = secondPart.split('App#imageName')[0].trim();
            const imageFileName = secondPart.substring(secondPart.indexOf('App#imageName::'), getPosition(secondPart, 'App#', 2)).trim().split('App#imageName::')[1];
            const pratilipiListData = JSON.parse(secondPart.substring(getPosition(secondPart, 'App#', 2)).split('::')[1]);

            function getPosition(str, pat, n) {
                var L = str.length,
                    i = -1;
                while (n-- && i++ < L) {
                    i = str.indexOf(pat, i);
                    if (i < 0) break;
                }
                return i;
            }

            const categoryObj = {
                categoryUrl,
                title,
                analyticsCategoryName,
                imageFileName,
                pratilipiListData
            }

            currentSection.categories.push(categoryObj);
        }

    }).on('close', () => {
        navigationJSON.sections.push(currentSection);
        console.log(JSON.stringify(navigationJSON, null, 4));
        fs.writeFile('./build/categories/navigation-' + eachLanguage + '.json', JSON.stringify(navigationJSON, null, 4), function(errorInWritingFile) {
            if (errorInWritingFile) {
                console.log(errorInWritingFile);
            } else {
                nextLanguage();
            }
        });
    });;
});
