const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');

const generateEquation = () => {
    let number1 = Math.trunc(Math.random() * 9) + 1;
    let number2 = Math.trunc(Math.random() * 9) + 1;

    let answer = number1 + number2;

    let allAnswers = [answer];

    while (allAnswers.length < 3) {
        const newAnswer = Math.trunc(Math.random() * 9) + 1;
        if (!allAnswers.includes(newAnswer)) {
            allAnswers.push(newAnswer);
        }
    }

    let switchAnswers = [];

    document.querySelector('.number1').innerHTML = number1;
    document.querySelector('.number2').innerHTML = number2;
    document.querySelector('.result').innerHTML = '?';

    switchAnswers = allAnswers.sort(() => Math.random() - 0.5);

    option1.innerHTML = switchAnswers[0];
    option2.innerHTML = switchAnswers[1];
    option3.innerHTML = switchAnswers[2];

    document.querySelector('.equation').style.backgroundColor = 'white';
    document.getElementById('happyKidImage').classList.remove('active');
    

    return answer;
};

export default generateEquation;
