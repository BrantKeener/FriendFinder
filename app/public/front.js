
    // TODO add AJAX call for API below: blog.garstasio.com/you-dont-need-jquery/ajax

// Document interaction hadnled via event delegation.

document.addEventListener('click', (event) => {
    if(event.target.id === 'quiz_submit') {
        event.preventDefault();
    };
    let idOrClass = undefined;
    if(event.target.id === undefined || event.target.id === '') {
        idOrClass = event.target.className;
    } else {
        idOrClass = event.target.id;
    };
    switch(idOrClass) {
        case('quiz_submit'):
        jsonSubmit();
        break;
        case('close-button'):
        toggleModal();
        break;
        case('modal show-modal'):
        toggleModal();
        break;
    };
});

// This is used to allow our modal to open and close
toggleModal = (display, friend) => {
    const modal = document.querySelector('.modal');
    modal.classList.toggle('show-modal');
    if(display === 'missingData') {
        document.querySelector('#modal-title').textContent = 'Missing Data!';
        let p = document.createElement('p');
        p.textContent = 'You have forgotten to enter either Name or Photo.'
        document.querySelector('#modal-content').appendChild(p);
    } else if (display === 'friend') {
        document.querySelector('#modal-title').textContent = friend.name;
        let image = document.createElement('img');
        image.src = friend.photo;
        document.querySelector('#modal-content').appendChild(image);
    };
};

// Monitor for the submit button click
jsonSubmit = () => {
    
    // Variable to house how many questions are in our quiz
    const questionNumber = 10;
    let answerArray = [];
    let name = document.getElementsByName('name')[0].value;
    let photo = document.getElementsByName('pic')[0].value;

    if(name !== '' || photo !== '') {
        if(name.trim() !== '' || photo.trim() !== '') {
            // Fill answerArray with data from our quiz responses
            for(let i = 1; i <= questionNumber; i++) {
                let questionValue = document.getElementById(`quest${i}`).value;
                answerArray.push(questionValue);
            }

            // Build the newFriend object to send to the API
            let newFriend = {
                'name': name.trim(),
                'photo': photo.trim(),
                'scores': answerArray
            }
            apiGetRequest(newFriend);
            apiPOSTRequest(newFriend);
        } else {
            toggleModal('missingData');
        };                 
    } else {
        toggleModal('missingData');
    };
};

const handleErrors = (response) => {
    if(!response.ok) {
        throw (response.statusText);
    };
    return response;
};

const apiGetRequest = (user) => {
    fetch('/api/friends')
        .then((res) => {
            return res.json();
        })
        .then((response) => {
            answerCompare(response, user);
            return;
        });
};

const apiPOSTRequest = (data) => {
    const url = '/api/friends';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => handleErrors(response)
    ).then(response => console.log('Success:', JSON.stringify(response))
    ).catch(error => console.error('Error:', error));
};

const answerCompare = (data, user) => {
    userScores = user.scores;
    const userName = user.name.toLowerCase();
    const length = Object.keys(data).length
    let sortedCompareArray = [];
    let unsortedCompareArray = [];
    let lengthCheck = length;
    let mostCompatible = 0;
    for(let i = 0; i < length; i++) {
        lengthCheck --;
        let oneCompareArray = [];
        let dataName = data[i].name.toLowerCase();
        if(userName !== dataName) {
            for(let x = 0; x < userScores.length; x++) {
                let sum = parseInt(userScores[x], 10) - parseInt(data[i].scores[x], 10);
                if(sum < 0) {
                    sum *= -1;
                };
                oneCompareArray.push(sum);
            };
            let arraySum = oneCompareArray.reduce((accumulator, currentValue) => accumulator + currentValue);
            sortedCompareArray.push(arraySum);
            unsortedCompareArray.push(arraySum);
        };
        sortedCompareArray.sort((a, b) => {return a - b});
        mostCompatible = unsortedCompareArray.indexOf(sortedCompareArray[0]);
        console.log(lengthCheck);
    };
    if(lengthCheck === 0) {
        toggleModal('friend', data[mostCompatible]);
    };
};