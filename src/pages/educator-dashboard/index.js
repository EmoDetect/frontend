import firebase from "firebase/app"
import "firebase/auth"

import "initApp"
import "auth"
import db from "database"

window.addEventListener('scroll', function () {
    let header = document.querySelector('header');
    let windowPosition = window.scrollY > 0;
    header.classList.toggle('scrolling-active', windowPosition);
});

const logoutButton = document.getElementById('nav-logout');

logoutButton.addEventListener('click', () => {
    console.log('try to logout...');
    firebase.auth().signOut();
    window.location.href = '/src/pages/login/login.html';
});

const allKidsEmotions = {};

// let data1 = document.getElementById('data1');
// let data2 = document.getElementById('data2');

// let joy = document.getElementById('joy');
// let anger = document.getElementById('anger');

emotionsRange = {
    VERY_UNLIKELY: 1,
    UNLIKELY: 2,
    POSSIBLE: 3,
    LIKELY: 4,
    VERY_LIKELY: 5
};

emotionsNames = {
    VERY_UNLIKELY: 'Very Unlikely',
    UNLIKELY: 'Unlikely',
    POSSIBLE: 'Possible',
    LIKELY: 'Likely',
    VERY_LIKELY: 'Very Likely'
};

emotionsMap = {
    1: ['joy-range', 'joyLikelihood'],
    2: ['sorrow-range', 'sorrowLikelihood'],
    3: ['surprise-range', 'surpriseLikelihood'],
    4: ['anger-range', 'angerLikelihood']
};

const articleContainer = document.querySelector('.statistics-container');

const getKids = async () => {
    const snapshot = await db.collection('kidEmotions').get();

    let res = snapshot.docs.map((doc) => doc);
    let i = 0;
    res.forEach((element) => {
        i = i + 1;
        articleContainer.insertAdjacentHTML(
            'beforeend',
            `<article>
                <img src="data:image/png;base64,${element.data().emotions[0].base64Img
            }" alt="" />
                <div id="data">

                    <div class="emotion-row">
                        <span class="emotion-label">Joy</span>
                        <div id="joy${i}" class="emotion-range">
                            <div id="joy-range1${i}" class="squares"></div>
                            <div id="joy-range2${i}" class="squares"></div>
                            <div id="joy-range3${i}" class="squares"></div>
                            <div id="joy-range4${i}" class="squares"></div>
                            <div id="joy-range5${i}" class="squares"></div>
                        </div>   
                        <span id="emotion-value1${i}" class="emotion-value">Very...</span>
                    </div>

                    <div class="emotion-row">
                        <span class="emotion-label">Sorrow</span>
                        <div id="sorrow${i}" class="emotion-range">
                            <div id="sorrow-range1${i}" class="squares"></div>
                            <div id="sorrow-range2${i}" class="squares"></div>
                            <div id="sorrow-range3${i}" class="squares"></div>
                            <div id="sorrow-range4${i}" class="squares"></div>
                            <div id="sorrow-range5${i}" class="squares"></div>
                        </div>   
                        <span id="emotion-value2${i}" class="emotion-value">Very...</span>
                    </div>

                    <div class="emotion-row">
                        <span class="emotion-label">Surprise</span>
                        <div id="surprise${i}" class="emotion-range">
                            <div id="surprise-range1${i}" class="squares"></div>
                            <div id="surprise-range2${i}" class="squares"></div>
                            <div id="surprise-range3${i}" class="squares"></div>
                            <div id="surprise-range4${i}" class="squares"></div>
                            <div id="surprise-range5${i}" class="squares"></div>
                        </div>   
                        <span id="emotion-value3${i}" class="emotion-value">Very...</span>
                    </div>

                    <div class="emotion-row">
                        <span class="emotion-label">Anger</span>
                        <div id="anger${i}" class="emotion-range">
                            <div id="anger-range1${i}" class="squares"></div>
                            <div id="anger-range2${i}" class="squares"></div>
                            <div id="anger-range3${i}" class="squares"></div>
                            <div id="anger-range4${i}" class="squares"></div>
                            <div id="anger-range5${i}" class="squares"></div>
                        </div>   
                        <span id="emotion-value4${i}" class="emotion-value">Very...</span>
                    </div>

                    <div class="conf-container">
                        <span>Confidence</span>
                        <div class="progress progress-moved">
                            <div id="progress-bar${i}" class="progress-bar"></div>
                            <div id="bar${i}" class="loader${i}" ></div>
                        </div>
                    </div>
                </div>
            </article>`
        );

        let confidenceValue = element.data().emotions[0].detectionConfidence;
        confidenceValue = confidenceValue * 100;
        confidenceValue = parseInt(confidenceValue);
        console.log(confidenceValue);

        let confidencePercent = confidenceValue + '%';

        const root = document.documentElement;
        root.style.setProperty('--confidence-percent' + i, confidencePercent);
        root.style.setProperty('--confidence-value' + i, confidenceValue);

        let cop = i;
        setTimeout(() => {
            let bar = document.getElementById('bar' + cop);

            const root = document.documentElement;

            const confidence = root.style.getPropertyValue(
                '--confidence-percent' + cop
            );
            //console.log(confidence);

            let loaderToRemove = 'loader' + cop;
            let finishToAdd = 'finish' + cop;
            console.log('Remove: ', loaderToRemove);
            console.log('Add: ', finishToAdd);

            bar.classList.add(finishToAdd);
            bar.classList.remove(loaderToRemove);

            bar.innerHTML = confidence;

            let stopToAdd = 'stop' + cop;

            document
                .getElementById('progress-bar' + cop)
                .classList.add(stopToAdd);
        }, 4000);
    });

    return res;
};

getKids().then((res) => {
    setTimeout(() => {
        document
            .getElementById('statistics-section')
            .classList.add('show-statistics-container');
        document
            .getElementById('overview-section')
            .classList.add('show-overview-container');

        document.querySelector('.loader').style.display = 'none';
    }, 620);

    let childNb = 0;
    res.forEach((element) => {
        childNb = childNb + 1;

        for (let i = 1; i <= 4; i++) {
            let string = emotionsMap[i][1];

            range = emotionsRange[element.data().emotions[0][string]];

            for (let j = 1; j <= range; j++) {
                let idSquare = emotionsMap[i][0];
                idSquare = idSquare + JSON.stringify(j);
                idSquare = idSquare + JSON.stringify(childNb);

                document.getElementById(idSquare).classList.add('active');

                let idEmotionValue = 'emotion-value';
                idEmotionValue = idEmotionValue + JSON.stringify(i);
                idEmotionValue = idEmotionValue + JSON.stringify(childNb);

                document.getElementById(idEmotionValue).innerHTML =
                    emotionsNames[element.data().emotions[0][string]];
            }
        }
    });
});
