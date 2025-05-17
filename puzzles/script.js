import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

let currPuzzle = null;

function ordinal(i) {
    if (i == 1) { return "1st" }
    else if (i == 2) { return "2nd" }
    else if (i == 3) { return "3rd" }
    else if (i < 20) { return i + "th"}
    else if (i % 10 == 1) { return i + "st" }
    else if (i % 10 == 2) { return i + "nd" }
    else if (i % 10 == 3) { return i + "rd" }
    else { return i + "th" }
}

function loadPuzzle(e) {
    currPuzzle = e.target.id;
    puzzleList.forEach((doc) => {
        if (doc.id == e.target.id) {
            let data = doc.data();
            let puzzleName = data.name;
            let puzzleImg = data.img;
            let puzzleText = data.text;
            let puzzleId = doc.id;

            let date = new Date(data.date.seconds * 1000 + data.date.nanoseconds / 1000000);

            let year = date.getFullYear();
            let month = months[date.getMonth()];
            let day = date.getDate();

            document.getElementById("overlay").style.display = "block";
            document.getElementById("popup-dialog").style.display = "block";

            document.getElementById("puzzle-name").innerHTML = puzzleName;
            document.getElementById("puzzle-img").src = puzzleImg;
            document.getElementById("puzzle-text").innerHTML = puzzleText;
            document.getElementById("puzzle-answer").value = "";
            document.getElementById("puzzle-answer").disabled = false;
            document.getElementById("submit-answer").disabled = false;
            document.getElementById("popup-dialog").style.backgroundColor = "#1a1a1a";
            document.getElementById("puzzle-date").innerHTML = `${month} ${ordinal(day)}, ${year} | #${data.id}`;

            if (localStorage.getItem("puzzle-" + doc.id) == "solved") {
                document.getElementById("puzzle-answer").value = localStorage.getItem("answer-" + doc.id);
                document.getElementById("puzzle-answer").disabled = true;
                document.getElementById("submit-answer").disabled = true;
                document.getElementById("popup-dialog").style.backgroundColor = "#4caf50";
                document.getElementById(puzzleId).classList.add("solved");
            }
        };
    });
};

async function SHA256(message) {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
}

async function correct(answer, doc) {
    const hashed = await SHA256(answer);
    // console.log("Hashed: " + hashed + " Answer: " + doc.data().answer_hashed);
    if (hashed === doc.data().answer_hashed) {
        return true;
    }
    else {
        return false;
    }
}

async function checkAnswer() {
    if (currPuzzle) {
        let answer = document.getElementById("puzzle-answer").value;
        for (const doc of puzzleList.docs) {
            if (doc.id == currPuzzle) {
                const isCorrect = await correct(answer, doc);
                if (isCorrect) {
                    const puzzleId = doc.id;
                    localStorage.setItem("puzzle-" + currPuzzle, "solved");
                    localStorage.setItem("answer-" + currPuzzle, answer);
                    document.getElementById("popup-dialog").style.backgroundColor = "#4caf50";
                    document.getElementById("puzzle-answer").disabled = true;
                    document.getElementById(puzzleId).classList.add("solved");
                    document.getElementById("submit-answer").disabled = true;
                    solvedPuzzles++;
                    document.getElementById("solved-count").innerHTML = `Solved: ${solvedPuzzles} / ${puzzleList.size}`;
                    new Audio("correct.mp3").play();
                }
                else {
                    new Audio("wrong.mp3").play();
                }
            };
        };
    };
};

function closePopup() {
    currPuzzle = null;
    document.getElementById("overlay").style.display = "none";
    document.getElementById("popup-dialog").style.display = "none";
};

const firebaseConfig = {
    apiKey: "AIzaSyBRjSYN7VcAnYFXbLZEvtIfWGRaHY7R3ZI",
    authDomain: "puzzles-nhan4096.firebaseapp.com",
    projectId: "puzzles-nhan4096",
    storageBucket: "puzzles-nhan4096.firebasestorage.app",
    messagingSenderId: "872131400607",
    appId: "1:872131400607:web:57067afa49ba1d50cd23aa"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const puzzleCollection = collection(db, "puzzles");
let puzzleList = await getDocs(puzzleCollection);
const puzzleHTML = document.getElementById("puzzle-list");
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var solvedPuzzles = 0;

let arrayPuzzleList = Array.from(puzzleList.docs);
let tabCount = Math.ceil(arrayPuzzleList.length/4);
let tabs = [];

arrayPuzzleList.sort((a, b) => {
    let dataa = a.data();
    let datab = b.data();
    return dataa.id < datab.id ? 1 : dataa.id > datab.id ? -1 : 0;
});

for (let i = 0; i < tabCount; i++) {
    let start = i * 4;
    let end = start + 4;
    tabs[i] = arrayPuzzleList.slice(start, Math.min(end, arrayPuzzleList.length));
}

console.log(tabs)

var selectedTab = 0;

function redrawTabs() {
    const tabContainer = document.getElementById("tabs");
    tabContainer.innerHTML = "";
    const maxTabsToShow = 5;
    const lastTab = tabCount - 1;

    function addTabButton(i) {
        const tabButton = document.createElement("button");
        tabButton.className = "tab-btn";
        tabButton.id = "tab-" + i;
        if (i == selectedTab) {tabButton.classList.add("selected");}
        tabButton.textContent = i + 1;
        tabButton.addEventListener("click", () => loadTab(i));
        tabContainer.appendChild(tabButton);
    }

    function addEllipsis() {
        const ellipsis = document.createElement("span");
        ellipsis.className = "ellipsis";
        ellipsis.textContent = "...";
        tabContainer.appendChild(ellipsis);
    }

    if (tabCount <= maxTabsToShow) {
        for (let i = 0; i < tabCount; i++) {addTabButton(i);}
    }
    else {
        addTabButton(0);
        if (selectedTab > 2) {addEllipsis();}
        for (let i = selectedTab - 1; i <= selectedTab + 1; i++) {
            if (i > 0 && i < lastTab) {addTabButton(i);}
        }
        if (selectedTab < tabCount - 3) {addEllipsis();}

        addTabButton(lastTab);
    }

    const formItem = document.createElement("form");
    const tabInput = document.createElement("input");
    tabInput.type = "number";
    formItem.appendChild(tabInput);
    tabInput.placeholder = "Go to tab";
    formItem.className = "form-item";
    tabInput.className = "tab-input";
    tabInput.min = 1;
    tabInput.max = tabCount;
    tabInput.addEventListener("change", () => loadTab(parseInt(tabInput.value)-1));
    tabContainer.appendChild(formItem);
}

redrawTabs();

arrayPuzzleList.forEach((doc) => {
    if (localStorage.getItem("puzzle-" + doc.id) == "solved") {
        solvedPuzzles++;
    }
});

function loadTab(i) {
    puzzleHTML.innerHTML = "";
    document.getElementById("tab-" + selectedTab).classList.remove("selected");
    selectedTab = i;
    redrawTabs();
    document.getElementById("tab-" + i).classList.add("selected");
    tabs[i].forEach((doc) => {
        let data = doc.data();
        let puzzleItem = document.createElement("div");
        let date = new Date(data.date.seconds * 1000 + data.date.nanoseconds / 1000000);
        let year = date.getFullYear();
        let month = months[date.getMonth()];
        let day = date.getDate();

        puzzleItem.className = "puzzle";
        puzzleItem.id = doc.id;
        puzzleItem.innerHTML = `
            <h2 class="center bold no-margin" id="${doc.id}">${data.name}</h2>
            <p class="no-margin italics">${month} ${ordinal(day)}, ${year} | #${data.id}</p>
            <div class="img-container">
                <img class="img-puzzle" src="${data.img}" alt="${data.name}" id="${doc.id}">
            </div>
        `;
        if (localStorage.getItem("puzzle-" + doc.id) == "solved") {
            puzzleItem.classList.add("solved");
        }
        puzzleHTML.appendChild(puzzleItem);
        puzzleItem.addEventListener("click", loadPuzzle);
    });
}

console.log(tabs);

loadTab(0);

document.getElementById("solved-count").innerHTML = `Solved: ${solvedPuzzles} / ${puzzleList.size}`;
document.getElementById("close-popup").addEventListener("click", closePopup);
document.getElementById("submit-answer").addEventListener("click", checkAnswer);