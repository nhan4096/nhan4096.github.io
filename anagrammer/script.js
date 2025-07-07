let score = 0;
let totalAnagrams = 0;
let correctGuesses = [];
let roundComplete = false;
let startOfRound = true;

let endQuiz = null;
let startQuiz = null;

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function loadAnagrams(i) {
    roundComplete = false;
    startOfRound = true;
    $('#start-screen').hide();
    $('#game-screen').show();
    fetch(`${i}.json`).then(response => response.json()).then(data => {
        const allKeys = Object.keys(data);
        let ans = null;

        while (true) {
            const input = prompt(`Enter how long you want your quiz to be (max: ${allKeys.length}):`);
            if (input === null) {
                $('#game-screen').hide();
                $('#start-screen').show();
                return;
            }
            ans = parseInt(input);
            if (!isNaN(ans) && ans > 0 && ans <= allKeys.length) { break;};
            alert("Please enter a valid number within the allowed range.");
        }

        startQuiz = new Date();

        const shuffledKeys = shuffleArray(allKeys).slice(0, ans);
        const entries = shuffledKeys.map(key => [key, data[key]]);
        playGame(entries);
    });
}

function playGame(entries) {
    roundComplete = false;
    startOfRound = true;
    $('#anagram-word').removeClass('correct');
    $('#guesses').text('');
    $('#warning').text('');
    $('#user-input').val('').focus();
    $('#card-count').text(`Cards left: ${entries.length}`);
    correctGuesses = [];
    if (entries.length === 0) {
        endQuiz = new Date();
        $('#card-count').text('No more cards left!');
        $('#anagram-word').addClass('correct');
        return
    }
    const [alphagram, words] = entries.pop();
    totalAnagrams += words.length;
    $('#score').text(`Score: ${score} / ${totalAnagrams}`);
    $('#anagram-word').html(alphagram + ` <span class="small-text">(${words.length})</span>`);
    $('#user-input').val('').focus();
    $('#user-form').off('submit').on('submit', (e) => {
        e.preventDefault();
        const userInput = $('#user-input').val().trim().toUpperCase();
        if (userInput === '' && !startOfRound) {
            giveUp(words);
            roundComplete = true;
        }
        if (words.includes(userInput)) {
            if (!correctGuesses.includes(userInput)) {
                correctGuesses.push(userInput);
                score++;
                $('#guesses').append(`<span class="correct">${userInput}</span> `);
            }
            else {
                $('#warning').html(`You have already guessed <span class="correct">${userInput}</span>. Try another word!`);
                setTimeout(() => {
                    $('#warning').html('');
                }, 2000);
            }
        }
        else {
            $('#guesses').append(`<span class="incorrect">${userInput}</span> `);
        }
        startOfRound = false;
        $('#user-input').val('');
        $('#score').text(`Score: ${score} / ${totalAnagrams}`);

        if (correctGuesses.length === words.length) {
            roundComplete = true;
            correctGuesses = [];
            $('#anagram-word').addClass('correct');
        }
    })

    $('#user-input').off('keydown').on('keydown', (e) => {
        if (roundComplete && e.key === 'Enter') {
            playGame(entries);
        }
    });
}

function giveUp(words) {
    for (const word of words) {
        if (!correctGuesses.includes(word)) {
            $('#guesses').append(`<span class="missed">${word}</span> `);
        }
    }
}

function restartGame() {
    $('#game-screen').hide();
    $('#start-screen').show();
    $('#user-input').val('');
    $('#anagram-word').text('');
    $('#guesses').text('');
    $('#card-count').text('');
    score = 0;
    totalAnagrams = 0;
    correctGuesses = [];
    roundComplete = false;
    startOfRound = true;
    startQuiz = null;
    endQuiz = null;
}

$('#back-btn').click(() => {
    restartGame();
})

$('#user-input').on('input', function() {
    this.value = this.value.toUpperCase();
});

setInterval(() => {
    if (startQuiz) {
        const elapsedTime = ((endQuiz ? endQuiz : new Date()) - startQuiz) / 1000;
        $('#timer').text(`Time: ${elapsedTime} seconds`);
    }
    else {
        $('#timer').text('Time: 0 seconds');
    }
}, 50);