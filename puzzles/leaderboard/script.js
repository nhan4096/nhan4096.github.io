import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, updateDoc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getAuth, updateEmail, updateProfile, onAuthStateChanged, signOut, sendEmailVerification, EmailAuthProvider, reauthenticateWithCredential, verifyBeforeUpdateEmail, deleteUser } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

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
const auth = getAuth(app);

let uid = null;

async function userSignOut() {
    await signOut(auth);
}

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

onAuthStateChanged(auth, async (user) => {
    if (user) {
        uid = user.uid;
        // console.log("User is signed in:", user);
        if (user.emailVerified) {
            document.getElementById("signed-in-line").innerHTML = `<i class="fa fa-arrow-left" aria-hidden="true" id="back-arrow"></i> Welcome, <a href="../users/index.html?user=${user.uid}">${escapeHTML(user.displayName)}</a>. <a href="#" id="sign-out-link">Sign out</a>`;
            const usernames = await getDocs(usernamelistCollection);
            let usernameArray = Array.from(usernames.docs);
            usernameArray.sort((a, b) => {
                return a.data().puzzlesSolved < b.data().puzzlesSolved;
            });
            console.log("Username array:", usernameArray);
            
            for (let i = 0; i < usernameArray.length; i++) {
                const userDoc = usernameArray[i];
                const userData = userDoc.data();
                const userRow = document.createElement("tr");
                userRow.innerHTML = `<tr><td class="rank italics">${ordinal(i + 1)}</td><td class="name"><a href="../users/index.html?user=${userDoc.id}">${userData.username}</a></td><td class="puzzles-solved">${userData.puzzlesSolved}</td></tr>`;
                leaderboard.appendChild(userRow);
            }

            document.getElementById("back-arrow").addEventListener("click", () => {
                window.location.href = "../index.html";
            });
        }
        else {
            alert("Please verify your email before accessing the leaderboard.");
        }

        document.getElementById("sign-out-link").addEventListener("click", userSignOut);
    }
    else {
        alert("You are not signed in. Please sign in to access the leaderboard.");
        window.location.href = "../index.html";
    }
});