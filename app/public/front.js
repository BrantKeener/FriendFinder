
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
        clearModal();
        toggleModal();
        break;
        case('modal show-modal'):
        clearModal();
        toggleModal();
        break;
        case('modal show-modal modal-center'):
        toggleModal();
        break;
    };
});

// Modal needs to be cleard after use so that data does not overlap
const clearModal = () => {
    let modalContent = document.getElementById('modal-content');
    while(modalContent.firstChild) {
        modalContent.removeChild(modalContent.firstChild);
    }
}

// This is used to allow our modal to open and close. In addition, this popluates the modal with the appropriate dialog or images.
toggleModal = (display, friend) => {
    const modal = document.querySelector('.modal');
    const modalContent = document.getElementById('modal-content');
    modal.classList.toggle('show-modal');
    if(display === 'missingData') {
        const closeButton = document.createElement('span');
        const title = document.createElement('h1');
        const p = document.createElement('p');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '&times';
        title.className = 'modal-title';
        title.textContent = 'Missing Data!';
        p.textContent = 'You have forgotten to enter either Name or Photo.'
        modalContent.appendChild(closeButton);
        modalContent.appendChild(title);
        modalContent.appendChild(p);
    } else if (display === 'friend') {
        let favoriteArray = [];
        const closeButton = document.createElement('span');
        const title = document.createElement('h1');
        const image = document.createElement('img');
        const list = document.createElement('ul');
        const modalContent = document.querySelector('#modal-content');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '&times';
        title.className = 'modal-title';
        favoriteThings(friend.scores, favoriteArray);
        title.textContent = friend.name;
        image.src = friend.photo;
        image.style.maxWidth = '600px';
        image.style.maxHeight = '600px';
        modalContent.appendChild(closeButton);
        modalContent.appendChild(title);
        modalContent.appendChild(image);
        modalContent.appendChild(list)
        favoriteArray.map(element => {
            const listItem = document.createElement('li');
            listItem.className = 'friend-like-list';
            list.appendChild(listItem);
            listItem.textContent = element;
        });
        document.querySelector('.modal-title').style = 'text-align: center';
    };
};

// Monitor for the submit button click
jsonSubmit = () => {
    
    // Variable to house how many questions are in our quiz
    const questionNumber = 10;
    let answerArray = [];
    let name = document.getElementsByName('name')[0].value;
    let photo = document.getElementsByName('pic')[0].value;
// Make sure that neither the photo nor the name are blank.
    if(name !== '' && photo !== '') {
        if(name.trim() !== '' && photo.trim() !== '') {
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

// An errorHandler for our post request
const handleErrors = (response) => {
    if(!response.ok) {
        throw (response.statusText);
    };
    return response;
};

// A get request to recover our stored JSON data using fetch
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

// The apiRequest using fetch
const apiPOSTRequest = (data) => {
    const url = '/api/friends';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => handleErrors(response)
    // ).then(response => console.log('Success:', JSON.stringify(response))
    ).catch(error => console.error('Error:', error));
};

// Compares the answers from our JSON data to the users input data, and sends the closest match to our modal
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
    };
    if(lengthCheck === 0) {
        toggleModal('friend', data[mostCompatible]);
    };
};

// This will find your friend's favorite things for posting
const favoriteThings = (scores, faves) => {
    const allBlurbsArray = [
        'Enjoys rock climbing',
        'Enjoys playing video games',
        'Likes nights out on the town',
        'Likes nights in',
        'An avid traveler',
        'Hangs out with creative people',
        'Enjoys working out',
        'Looks are important',
        'Prefers tea to coffee',
        'Hangs out with large groups'
    ];
    // Build a sorted array in descending order.
    const sortedScores = scores.map(score => score);
    sortedScores.sort((a, b) => {return b - a});
    // Evaluate the first 3 items in the sorted array
    for(let i = 0; i < 3; i++) {
        let index = scores.indexOf(sortedScores[i]);
        faves.push(allBlurbsArray[index]);
        scores.splice([index], 1);
        allBlurbsArray.splice([index], 1);
    };
};