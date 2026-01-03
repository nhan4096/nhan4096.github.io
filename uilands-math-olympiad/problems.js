import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyBg9k32zMoR61PsbnVqquy_UMdIOeG2jhM",
    authDomain: "uilands-math-olympiad-nhan4096.firebaseapp.com",
    projectId: "uilands-math-olympiad-nhan4096",
    storageBucket: "uilands-math-olympiad-nhan4096.firebasestorage.app",
    messagingSenderId: "121067891522",
    appId: "1:121067891522:web:8b341476960c12bff5b6db",
    measurementId: "G-E25CB98KW8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getProblems(db) {
    const problemsCol = collection(db, 'problems');
    const problemSnapshot = await getDocs(problemsCol);
    const problemList = problemSnapshot.docs.map(doc => doc.data());
    return problemList;
}

async function SHA256(message) {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
}

getProblems(db).then(problems => {
    const params = new URLSearchParams(document.location.search);
    const id = parseInt(params.get('id'));
    const problem = problems[id-1];

    document.getElementById('problem-id').innerText = `Problem ${id}: ${problem.name}`;
    document.getElementById('problem-diff').innerText = `Difficulty: ${problem.diff}`;
    document.getElementById('problem-container').innerHTML = problem.desc.replaceAll('\n', '<br>');
    MathJax.typesetPromise();

    if (localStorage.getItem(`problem-${id}-solved`) === 'true') {
        document.getElementById('answer-input').disabled = true;
        document.getElementById('submit-button').disabled = true;
        document.getElementById('answer-input').value = localStorage.getItem(`problem-${id}-answer`);
        document.getElementById('problem-contain').style.backgroundColor = '#4acf50';
    }

    document.getElementById('answer-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const userAnswer = document.getElementById('answer-input').value.trim();
        const hash = await SHA256(userAnswer);
        if (hash === problem.sol) {
            localStorage.setItem(`problem-${id}-solved`, 'true');
            localStorage.setItem(`problem-${id}-answer`, userAnswer);
            document.getElementById('answer-input').disabled = true;
            document.getElementById('submit-button').disabled = true;
            document.getElementById('problem-contain').style.backgroundColor = '#4acf50';
            new Audio("correct.mp3").play();
        }
        else {
            new Audio("wrong.mp3").play();
        }
    });
});