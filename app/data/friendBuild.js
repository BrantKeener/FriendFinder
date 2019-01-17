
let answerArray = [];

buildABud = () => {
    let tempArray = [];
    while(tempArray.length < 10) {
        let number = Math.floor(Math.random() * 5 + 1);
        tempArray.push(number);
    };
    answerArray.push(tempArray);
};

sendToAnswer = () => {
    while(answerArray.length < 10) {
        buildABud();
        };
    console.log(answerArray);
};

sendToAnswer();