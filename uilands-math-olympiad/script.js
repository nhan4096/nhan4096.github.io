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

getProblems(db).then(problems => {
    let i = 1;
    problems.forEach(problem => {
        const problemTr = document.createElement('tr');
        const numberTd = document.createElement('td');
        numberTd.textContent = i;
        const nameTd = document.createElement('td');
        nameTd.innerHTML = `<a href='problems.html?id=${i}'>${problem.name}</a>`;
        const diffTd = document.createElement('td');
        diffTd.innerHTML = problem.diff;
        const solvedTd = document.createElement('td');
        localStorage.getItem(`problem-${i}-solved`) === 'true' ? solvedTd.innerHTML = 'Yes, cheater.' : solvedTd.innerHTML = 'No, dumbass.';
        problemTr.appendChild(numberTd);
        problemTr.appendChild(nameTd);
        problemTr.appendChild(diffTd);
        problemTr.appendChild(solvedTd);
        document.getElementById('problem-table').appendChild(problemTr);
        i++;

        MathJax.typesetPromise([problemTr]);
    });
    document.getElementById('count-problems').innerText = i-1;
})