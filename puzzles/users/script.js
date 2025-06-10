import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBRjSYN7VcAnYFXbLZEvtIfWGRaHY7R3ZI",
    authDomain: "puzzles-nhan4096.firebaseapp.com",
    projectId: "puzzles-nhan4096",
    storageBucket: "puzzles-nhan4096.appspot.com",
    messagingSenderId: "872131400607",
    appId: "1:872131400607:web:57067afa49ba1d50cd23aa"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const puzzleCollection = collection(db, "puzzles");
const userlistCollection = collection(db, "userlist");
const usernamelistCollection = collection(db, "usernamelist");
const puzzleHTML = document.getElementById("puzzle-list");
const auth = getAuth(app);

const params = new URLSearchParams(window.location.search);
const userParam = params.get('user');

if (!userParam) {
    document.body.innerHTML = '<h1 class="big-text center no-margin bold">404</h1><p class="center no-margin">User not specified.</p>';
    throw new Error("Missing 'user' parameter");
}

async function userSignOut() {
    await signOut(auth)
}

function escapeHTML(str) {
    return str.replace(/[&<>"'/]/g, function (match) {
        return {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
          '/': '&#x2F;'
        }[match];
    });
}

var puzzleList = await getDocs(puzzleCollection);
puzzleList = puzzleList.docs.filter(doc => doc.data().date.toDate() <= new Date());
const numPuzzles = puzzleList.length;
onAuthStateChanged(auth, async (user) => {
    if (user) {
        if (user.emailVerified) {
            document.getElementById("signed-in-line").innerHTML = `<i class="fa fa-arrow-left" aria-hidden="true" id="back-arrow"></i> Welcome, ${escapeHTML(user.displayName)}. <a href="#" id="sign-out-link">Sign out</a>`;
            let accountData = await getDoc(doc(usernamelistCollection, userParam));

            if (accountData.exists()) {
                document.getElementById("username").innerText = `${accountData.data().username} (${accountData.id})`;
                document.getElementById("create-date").innerHTML = `Created on: ${new Date(accountData.data().createDate).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}`;
                document.getElementById("bio").innerText = accountData.data().bio || "[No bio available.]";
                document.getElementById("solved-puzzles").innerText = `Solved Puzzles: ${accountData.data().puzzlesSolved || 0} / ${numPuzzles} (${((accountData.data().puzzlesSolved || 0) / numPuzzles * 100).toFixed(2)}%)`;
            }
            else {
                document.getElementById("username").innerText = "User not found";
                document.getElementById("bio").innerText = "No bio available.";
            }

            document.getElementById("back-arrow").addEventListener("click", () => {
                window.location.href = "../index.html";
            });

            let puzzleList = await getDocs(puzzleCollection);
            let arrayPuzzleList = Array.from(puzzleList.docs);

            arrayPuzzleList.sort((a, b) => {
                let dataa = a.data();
                let datab = b.data();
                return dataa.id < datab.id ? 1 : dataa.id > datab.id ? -1 : 0;
            });

            const solvedGrid = document.getElementById("solved-grid");
            for (let i=0; i<numPuzzles; i++) {
                let newDiv = document.createElement("div");
                newDiv.className = "grid-item";
                newDiv.id = `grid-puzzle-${i+1}`;
                newDiv.style.width = `${screen.width/12}px`;
                newDiv.style.height = `${screen.width/12}px`;
                newDiv.innerHTML = `<p class="no-margin grid-text">${i+1}</p>`;

                newDiv.addEventListener("click", () => {
                    window.location.href = `../index.html?id=${arrayPuzzleList[numPuzzles-i-1].id}`;
                });

                let tooltipText = document.createElement("p");
                tooltipText.className = "tooltip-text";
                tooltipText.id = `tooltip-text-${i+1}`;
                tooltipText.innerText = `${arrayPuzzleList[numPuzzles-i-1].data().name}`;

                newDiv.appendChild(tooltipText);
                solvedGrid.appendChild(newDiv);
            }

            const solvedPuzzlesArray = accountData.data().puzzlesSolvedArray || [];
            // console.log(solvedPuzzlesArray);
            for (let i=0; i<solvedPuzzlesArray.length; i++) {
                let puzzleIndex = solvedPuzzlesArray[i];
                document.getElementById(`tooltip-text-${puzzleIndex}`).classList.add("solved");
                document.getElementById(`grid-puzzle-${puzzleIndex}`).classList.add("solved");
            }
        }
        else {
            alert("Please verify your email address to view users.");
            window.location.href = "../index.html";
        }
        document.getElementById("sign-out-link").addEventListener("click", userSignOut);
    }
    else {
        uid = null;
        alert("You are not logged in. Please log in to view users.");
        window.location.href = "../index.html";
    }
});