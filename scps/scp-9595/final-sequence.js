const finalSequence = document.querySelectorAll('.final-sequence');
const flen = finalSequence.length;

for (let i = 0; i < flen; i++) {
    finalSequence[i].style = `opacity: ${1-i/flen}; font-size: ${1-i/flen}em; text-align: center;`;
}