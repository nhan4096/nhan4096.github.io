let currentObjective = 0;
const debugMode = false;
let deviationScore = 0;

function textToTerminal(text) {
    const terminalContent = document.getElementById('terminal-content');
    if (text.startsWith('[function]')) {
        const functionCall = text.replace('[function]', '');
        eval(functionCall);
        return;
    }
    if (text.startsWith('[ovw]')) {
        const terminalContentChildren = terminalContent.children;
        terminalContentChildren[terminalContentChildren.length - 1].innerHTML = '';
        text = text.replace('[ovw]', '');
    }
    const newLine = document.createElement('div');
    newLine.innerHTML = text;
    terminalContent.appendChild(newLine);
}

function textToFinal(text) {
    const terminalContent = document.getElementById('final-overlay-text');
    if (text.startsWith('[function]')) {
        const functionCall = text.replace('[function]', '');
        eval(functionCall);
        return;
    }
    if (text.startsWith('[ovw]')) {
        const terminalContentChildren = terminalContent.children;
        terminalContentChildren[terminalContentChildren.length - 1].innerHTML = '';
        text = text.replace('[ovw]', '');
    }
    if (text.startsWith('[clr]')) {
        $('#final-overlay-text').html('');
        text = text.replace('[clr]', '');
    }
    const newLine = document.createElement('div');
    newLine.innerHTML = text;
    terminalContent.appendChild(newLine);
}

function playSequence(sequence, delays, onComplete) {
    sequence.forEach((text, index) => {
        const delay = delays.slice(0, index + 1).reduce((a, b) => a + b, 0);
        setTimeout(() => {
            textToTerminal(text);
            if (index == sequence.length - 1) {
                onComplete();
            }
        }, debugMode ? 0 : delay);
    });
}

function startSequence() {
    updateObjective(0);
    fetch('data.json').then(response => response.json()).then(data => {
        const sequence = data.startSequence.text;
        const delays = data.startSequence.delays;
        playSequence(sequence, delays, () => {updateObjective(1)});
    });
}

function afterFirstSequence() {
    fetch('data.json').then(response => response.json()).then(data => {
        const sequence = data.afterFirstSequence.text;
        const delays = data.afterFirstSequence.delays;
        playSequence(sequence, delays, () => {});
    });
}

function afterSecondSequence() {
    fetch('data.json').then(response => response.json()).then(data => {
        const sequence = data.afterSecondSequence.text;
        const delays = data.afterSecondSequence.delays;
        playSequence(sequence, delays, () => {});
    });
}

function afterCodeSequence() {
    fetch('data.json').then(response => response.json()).then(data => {
        const sequence = data.afterCodeSequence.text;
        const delays = data.afterCodeSequence.delays;
        playSequence(sequence, delays, () => {});
    });
}

function afterCommitSequence() {
    fetch('data.json').then(response => response.json()).then(data => {
        const sequence = data.afterCommitSequence.text;
        const delays = data.afterCommitSequence.delays;
        playSequence(sequence, delays, () => {});
    });
}

function afterFilterSequence() {
    fetch('data.json').then(response => response.json()).then(data => {
        const sequence = data.afterFilterSequence.text;
        const delays = data.afterFilterSequence.delays;
        playSequence(sequence, delays, () => {});
    });
}

function afterAuditSequence() {
    fetch('data.json').then(response => response.json()).then(data => {
        const sequence = data.afterAuditSequence.text;
        const delays = data.afterAuditSequence.delays;
        playSequence(sequence, delays, () => {});
    });
}

function finalPlaySequence() {
    fetch('data.json').then(response => response.json()).then(data => {
        const sequence = data.finalSequence.text;
        const delays = data.finalSequence.delays;
        sequence.forEach((text, index) => {
            const delay = delays.slice(0, index + 1).reduce((a, b) => a + b, 0);
            setTimeout(() => {
                textToFinal(text);
                if (index == sequence.length - 1) {
                    onComplete();
                }
            }, debugMode ? 0 : delay);
        });
    });
}

function updateObjective(id) {
    if (id != 0) { new Audio('objective-notification.mp3').play(); }
    fetch('data.json').then(response => response.json()).then(data => {
        const objective = data.objectives[id];
        $('#objective').html(objective);
    });
    currentObjective = id;
}

function completeObjective(callback) {
    console.log(currentObjective)
    updateObjective(currentObjective+1);
    callback();
}

function closePopup() {
    $('.vignette').hide();
    $('#popup-container').hide();
}

function openPopup(id, callback) {
    $('#popup-container').show();
    $('.vignette').show();
    const popupContainerChildren = document.getElementById('popup-container').children
    for (let i=0; i<popupContainerChildren.length; i++) {
        popupContainerChildren[i].style.display = 'none';
        if (i == id) {
            popupContainerChildren[i].style.display = 'block';
        }
    }
    callback();
}

function createDocumentationData() {
    $('#data-div').html('');
    fetch('data.json').then(response => response.json()).then(data => {
        const documentation = sortObject(data.documentation);
        for (const name in documentation) {
            const spanElement = document.createElement('span');
            spanElement.innerHTML = `<span class='bold'>${name}</span>. ${documentation[name]} <br>`;
            $('#data-div').append(spanElement);
        }
    });
}

function createCodeInterface() {
    $('#code-editor').html('');
    const newSpan = document.createElement('span');
    newSpan.innerHTML = 'Flag lines that contain Z or Brainrot Group insignia by clicking on the checkbox next to the line. <br>';
    newSpan.classList.add('bold')
    $('#code-editor').append(newSpan);
    fetch('data.json').then(response => response.json()).then(data => {
        const code = data.code;
        let i = 1;
        for (const name in code) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = `checkbox-${i}`;
            const span = document.createElement('span');
            span.innerHTML = `${i} ${code[name].replace('[f]', '')} <br>`;
            $('#code-editor').append(checkbox);
            $('#code-editor').append(span);
            i++;
        }
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.innerHTML = 'Check flagged lines';
        $('#code-editor').append(submitButton);
    });
}

function sortObject(o) {
    var sorted = {},
    key, a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
}

function createHandbook() {
    $('#handbook').html('');
    const spanTitle = document.createElement('span');
    spanTitle.innerHTML = 'Note that every variant (word conjugations, plurals) of suspicious words should still be replaced as if it was the original form, e.g. fixed should still be replaced with improve. <br>';
    spanTitle.classList.add('bold');
    $('#handbook').append(spanTitle);
    fetch('data.json').then(response => response.json()).then(data => {
        const handbook = sortObject(data.keywordReplacements);
        for (const name in handbook) {
            const span = document.createElement('span');
            span.innerHTML = `<span class='bold red'>${name}</span>. replace with <span class='bold'>${handbook[name]}</span> <br>`
            $('#handbook').append(span);
        }
    });
}

function createCommitHistory() {
    $('#history').html('');
    const spanTitle = document.createElement('span');
    spanTitle.innerHTML = 'Click on a commit name to edit it.';
    spanTitle.classList.add('bold');
    const resetButton = document.createElement('button');
    resetButton.innerHTML = 'Reset commit changes.'
    resetButton.onclick = () => {createCommitHistory()};
    $('#history').append(spanTitle);
    $('#history').append(resetButton);
    $('#history').append(document.createElement('br'));
    fetch('data.json').then(response => response.json()).then(data => {
        const commitHistory = data.commitHistory;
        for (let i=0; i<commitHistory.length; i++) {
            const textarea = document.createElement('textarea');
            textarea.innerHTML = `${commitHistory[i]}`;
            textarea.id = `commit-${i}`;
            $('#history').append(textarea);
        }
    });
    const submitButton = document.createElement('button');
    submitButton.innerHTML = 'Check answers';
    submitButton.type = 'submit';
    $('#history').append(submitButton);
}

function createForumInterface() {
    $('#forums').html('');
    const spanTitle = document.createElement('span');
    spanTitle.innerHTML = 'Input keywords seperated by commas into both fields. Messages that are both flagged as Brainrot-leaning and Xitray-leaning are assumed to be Xitray-leaning. Messages that aren\'t flagged by any filter is assumed to be Xitray-leaning. Filters are not case-sensitive. Below are a list of sample messages with their authors and their alignment to Brainrot, Xitray or Neutral. Block Brainrot-leaning messages and keep Xitray and Neutral-leaning messages.';
    spanTitle.classList.add('bold');

    const allowedWords = document.createElement('input');
    allowedWords.name = 'allowed';
    allowedWords.id = 'allowed-textarea';
    const allowedLabel = document.createElement('label');
    allowedLabel.innerHTML = 'Allowed words: '
    allowedLabel.for = 'allowed';

    const bannedWords = document.createElement('input');
    bannedWords.name = 'banned';
    bannedWords.id = 'banned-textarea';
    const bannedLabel = document.createElement('label');
    bannedLabel.innerHTML = 'Banned words: '
    allowedLabel.for = 'banned';

    $('#forums').append(spanTitle);
    $('#forums').append(document.createElement('br'));
    $('#forums').append(allowedLabel);
    $('#forums').append(allowedWords);
    $('#forums').append(document.createElement('br'));
    $('#forums').append(bannedLabel);
    $('#forums').append(bannedWords);

    fetch('data.json').then(response => response.json()).then(data => {
        const forumMessages = data.forumMessages;
        for (let i=0; i<forumMessages.length; i++) {
            const message = forumMessages[i];
            const newDiv = document.createElement('div');
            newDiv.classList.add('double-outline-div');
            newDiv.id = `message-${i}`;
            const authorLine = document.createElement('span');
            authorLine.classList.add('italics');
            authorLine.innerHTML = message.author;
            const contentLine = document.createElement('span');
            contentLine.innerHTML = message.content;
            const alignmentLine = document.createElement('span');
            alignmentLine.innerHTML = `Alignment: ${message.alignment}`;
            alignmentLine.classList.add('bold');
            if (message.alignment == 'Brainrot') { alignmentLine.classList.add('red'); }
            if (message.alignment == 'Neutral') { alignmentLine.classList.add('yellow'); }
            newDiv.appendChild(authorLine);
            newDiv.appendChild(document.createElement('br'));
            newDiv.appendChild(contentLine);
            newDiv.appendChild(document.createElement('br'));
            newDiv.appendChild(alignmentLine);
            $('#forums').append(newDiv);
            $('#forums').append(document.createElement('br'));
        }

        const submitButton = document.createElement('button');
        submitButton.innerHTML = 'Check filter';
        submitButton.type = 'submit';

        $('#forums').append(submitButton);
    });

}

function createAuditLog() {
    $('#audit').html('');

    const spanTitle = document.createElement('span');
    spanTitle.innerHTML = 'Click on an audit log to redact it. <br>';
    spanTitle.classList.add('bold');
    $('#audit').append(spanTitle);

    fetch('data.json').then(response => response.json()).then(data => {
        const auditLog = data.auditLog;
        for (let i=0; i<auditLog.length; i++) {
            const log = auditLog[i];
            const time = log.time;
            const content = log.content;
            const auditSpan = document.createElement('span');
            auditSpan.innerHTML = `[${time}] ${content} <br>`;
            auditSpan.id = `audit-${i}`;
            auditSpan.classList.add('audit-log');
            auditSpan.addEventListener('click', (e) => {
                if ($(`#${e.target.id}`).hasClass('strikethrough red')) {
                    $(`#${e.target.id}`).removeClass('strikethrough red');
                }
                else {
                    $(`#${e.target.id}`).addClass('strikethrough red');
                }
            });
            $('#audit').append(auditSpan);
        }

        const checkButton = document.createElement('button');
        checkButton.innerHTML = 'Check redactions';
        $('#audit').append(checkButton)
        checkButton.addEventListener('click', (e) => {
            fetch('data.json').then(response => response.json()).then(data => {
                const auditLog = data.auditLog;
                for (let i=0; i<auditLog.length; i++) {
                    const redacted = $(`#audit-${i}`).hasClass('strikethrough red');
                    if (redacted !== auditLog[i].flag && !debugMode) {
                        deviationScore += 10;
                        alert("That's not right. T6 has been notified due to your disrespect towards higher authorities.");
                        return;
                    }
                }
                alert("Good.");
                completeObjective(afterAuditSequence);
            })
        })
    })
}

function submitPR() {
    $('.final-overlay').show();
    $('.final-overlay-text').removeClass('hidden-imp');
    $('#final-overlay-text').removeClass('hidden-imp');
    $('body').css('margin', '0');
    alert('Congratulations. There are (no) more missions.');
    finalPlaySequence()
}

let countClosed = 0
$(document).ready(() => {
    $('#close-button').click(() => {
        deviationScore += 20 * (countClosed + 1);
        alert('No. What are you doing? T6 has been notified of this action.');
        countClosed++;
    });
    startSequence();
});

$("#github-bio-editor").submit((e) => {
    e.preventDefault();
    let inputArray = [];
    for (let i=1; i <= 9; i++) {
        inputArray.push($(`[name='input-${i}']`).val().trim().toLowerCase());
    }
    fetch('data.json').then(response => response.json()).then(async data => {
        const answers = data.githubBioAnswers;
        for (let i=1; i <= 9; i++) {
            const thisAnswer = answers[i-1];
            if (await inputArray[i-1] != thisAnswer && !debugMode) {
                deviationScore += 10;
                alert("That's not right. T6 has been notified due to your disrespect towards higher authorities.");
                return;
            }
        }
        alert("Great. Next step is to copy Z's website.");
        completeObjective(afterSecondSequence);
    })
});

$('#code-editor-form').submit((e) => {
    e.preventDefault();
    fetch('data.json').then(response => response.json()).then(data => {
        const code = data.code;
        const codeLength = code.length;
        for (let i=0; i < codeLength; i++) {
            let isOn = $(`[name='checkbox-${i+1}']`).is(':checked');
            if (isOn !== code[i].startsWith('[f]') && !debugMode) {
                deviationScore += 10;
                alert("That's not right. T6 has been notified due to your disrespect towards higher authorities.");
                return;
            }
        }
        alert("Great. Next step is to scrub our commit history.")
        completeObjective(afterCodeSequence);
    });
})

$('#history-form').submit((e) => {
    e.preventDefault();
    fetch('data.json').then(response => response.json()).then(async data => {
        const commitAnswers = data.commitAnswers;
        for (let i=0; i<commitAnswers.length; i++) {
            let answer = $(`#commit-${i}`).val().toLowerCase().trim();
            if (answer !== commitAnswers[i] && !debugMode) {
                deviationScore += 10;
                alert("That's not right. T6 has been notified due to your disrespect towards higher authorities.");
                return;
            }
        }
        alert("Great.");
        completeObjective(afterCommitSequence);
    })
})

$('#forums-form').submit((e) => {
    e.preventDefault();
    const allowed = $('#allowed-textarea').val();
    const banned = $('#banned-textarea').val();
    fetch('data.json').then(response => response.json()).then(data => {
        const forumMessages = data.forumMessages;
        const allowedArray = allowed.split(',').map(s => s.trim().toLowerCase());
        const bannedArray = banned.split(',').map(s => s.trim().toLowerCase());
        if (debugMode) {
            alert("Another step towards total alignment. Proceed.");
            completeObjective(afterFilterSequence);
            return;
        }
        for (let i=0; i<forumMessages.length; i++) {
            const content = forumMessages[i].content;
            const alignment = forumMessages[i].alignment;
            const containAllowed = allowedArray.some(sub => content.toLowerCase().includes(sub));
            const containBanned = bannedArray.some(sub => content.toLowerCase().includes(sub));
            const finalVerdict = containAllowed ? true : (containBanned ? false : true);
            if (alignment == 'Brainrot' && finalVerdict) {
                deviationScore += 10;
                alert("That's not right. T6 has been notified due to your disrespect towards higher authorities.");
                return;
            }
            else if (alignment == 'Xitray' && !finalVerdict) {
                deviationScore += 10;
                alert("That's not right. T6 has been notified due to your disrespect towards higher authorities.");
                return;
            }
            else if (alignment == 'Neutral' && !finalVerdict) {
                deviationScore += 10;
                alert("That's not right. T6 has been notified due to your disrespect towards higher authorities.");
                return;
            }
        }
        alert("Another step towards total alignment. Proceed.");
        completeObjective(afterFilterSequence);
    });
})

setInterval(() => {
    const allowed = $('#allowed-textarea').val();
    const banned = $('#banned-textarea').val();

    if (allowed && banned) {
        const allowedArray = allowed.split(',').map(s => s.trim().toLowerCase());
        const bannedArray = banned.split(',').map(s => s.trim().toLowerCase());

        fetch('data.json').then(response => response.json()).then(data => {
            const forumMessages = data.forumMessages;
            for (let i = 0; i < forumMessages.length; i++) {
                const content = forumMessages[i].content;
                const containAllowed = allowedArray.some(sub => content.toLowerCase().includes(sub));
                const containBanned = bannedArray.some(sub => content.toLowerCase().includes(sub));
                if (containAllowed) {
                    $(`#message-${i}`).css('backgroundColor', 'rgba(0, 255, 0, 0.5)');
                } else if (containBanned) {
                    $(`#message-${i}`).css('backgroundColor', 'rgba(255, 0, 0, 0.5)');
                } else {
                    $(`#message-${i}`).css('backgroundColor', 'rgba(0, 255, 0, 0.5)');
                }
            }
        });
    }
}, 200);

setInterval(() => {
    $('#deviation').text(`Deviation Score: ${deviationScore}`);
    const normalized = deviationScore / 100;
    document.body.style.filter = `brightness(${1 - normalized}) grayscale(${normalized}) blur(${normalized*5}px)`;
    if (deviationScore >= 100) {
        alert('Your compliance has been minimal due to repeated deviation from the correct Truth as said by us, Xitray Team. Goodbye.')
        location.reload();
    }
}, 200)

setInterval(() => {
    const fanfare = $('#fanfare').val();
    if (!fanfare) { return; }
    $('#word-count').html(`Word count: ${fanfare.split(' ').length}`);
    if (fanfare.split(' ').length < 50) {
        $('#word-count').css('color', 'red');
        $('#submit-button').prop('disabled', true);
    }
    else {
        $('#word-count').css('color', 'green');
        $('#submit-button').prop('disabled', false);
    }
    fetch('data.json').then(response => response.json()).then(data => {
        const replacements = data.keywordReplacements;
        let fanfareReplaced = fanfare
        for (const [key, value] of Object.entries(replacements)) {
            if (key == 'I') {continue;} // disrupts too much
            fanfareReplaced = fanfareReplaced.toLowerCase().replace(key.toLowerCase(), value.toLowerCase());
        }
        $('#fanfare').val(fanfareReplaced);
    })
}, 1000)