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
const siteSettingsCollection = collection(db, "siteSettings");
const auth = getAuth(app);

let uid = null;

async function userSignOut() {
    await signOut(auth);
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
            document.getElementById("back-arrow").addEventListener("click", () => {
                window.location.href = "../index.html";
            });

            const ownerDoc = await getDoc(doc(siteSettingsCollection, 'owner'));
            const ownerUID = ownerDoc.data().uid;
            if (uid !== ownerUID) {
                alert("You are not authorized to access this page. Only the owner can access the puzzle editor.");
                window.location.href = "../index.html";
                return;
            }
            const puzzleDocs = await getDocs(puzzleCollection);
            const numPuzzle = puzzleDocs.size;
            //console.log(`Number of puzzles: ${numPuzzle}`);

            const puzzleForm = document.getElementById("puzzle-form");
            puzzleForm.elements["puzzle-id"].value = numPuzzle + 1;

            let puzzleDocsArray = Array.from(puzzleDocs.docs);
            puzzleDocsArray.sort((a, b) => b.data().id - a.data().id);

            var latest = new Date(puzzleDocsArray[0].data().date.seconds*1000 + puzzleDocsArray[0].data().date.nanoseconds/1000000 + 86400000); // add one day to the latest date

            var day = ("0" + latest.getDate()).slice(-2);
            var month = ("0" + (latest.getMonth() + 1)).slice(-2);

            var tmr = latest.getFullYear()+"-"+(month)+"-"+(day);
            
            puzzleForm.elements["date"].value = new Date() > latest ? `${new Date().getFullYear()}-${(new Date().getMonth()).toString().padStart(2, '0')}-${(new Date().getDate()).toString().padStart(2, '0')}` : tmr;

            const randomID = generateID();
            document.getElementById("puzzle-id").innerText = `${randomID}`;

            puzzleForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                if (puzzleForm.checkValidity()) {
                    const puzzleId = puzzleForm.elements["puzzle-id"].value;
                    const name = puzzleForm.elements["name"].value;
                    const text = puzzleForm.elements["puzzle-desc"].value;
                    const date = new Date(puzzleForm.elements["date"].valueAsDate.setHours(0, 0, 0, 0));
                    const imageUrl = puzzleForm.elements["img"].value;
                    const answer = puzzleForm.elements["answer"].value;

                    const newPuzzleData = {
                        id: parseInt(puzzleId),
                        name: name,
                        text: text,
                        date: date,
                        img: imageUrl,
                        answer_hashed: await SHA256(answer),
                    }
                                        
                    await setDoc(doc(puzzleCollection, randomID), newPuzzleData);
                    alert(`Puzzle created successfully with ID ${randomID}!`);
                    puzzleForm.reset();
                    location.reload();
                }
            })
        }
        else {
            alert("Please verify your email before accessing the editor.");
        }

        document.getElementById("sign-out-link").addEventListener("click", userSignOut);
    }
    else {
        alert("You are not signed in. Please sign in to access the editor.");
        window.location.href = "../index.html";
    }
});

function generateID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 20; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}