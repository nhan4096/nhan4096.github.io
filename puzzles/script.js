import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, updateDoc, getDoc, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

function ordinal(i) {
    const j = i % 10, k = i % 100;
    if (k >= 11 && k <= 13) {
        return i + "th";
    }
    if (j == 1) {
        return i + "st";
    }
    if (j == 2) {
        return i + "nd";
    }
    if (j == 3) {
        return i + "rd";
    }
    return i + "th";
}
let currPuzzle = null;

async function loadPuzzle(elementOrID) {
    try {
        currPuzzle = elementOrID.target.id;
    }
    catch {
        currPuzzle = elementOrID;
    }
    Array.prototype.slice.call(document.getElementById("popup-dialog").children).forEach((child) => {
        if (child.id != "puzzle-info" && child.id != "close-popup") {
            child.style.display = "none";
        }
        else {
            child.style.display = "block";
        }
    });
    for (let i=0; i<arrayPuzzleList.length; i++) {
        let docu = arrayPuzzleList[i];
        if (docu.id == currPuzzle) {
            let data = docu.data();
            let puzzleName = data.name;
            let puzzleImg = data.img;
            let puzzleText = data.text;
            let puzzleId = docu.id;

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

            const userDoc = userDocCache || await getDoc(doc(db, "userlist", uid));
            //console.log(userDoc);
            const hasSolved = Object.values(userDoc.data().puzzlesSolved).some(obj => obj.id === docu.id);
            //console.log(hasSolved, puzzleName);

            if (hasSolved) {
                let answer = Object.values(userDoc.data().puzzlesSolved).find(obj => obj.id === docu.id).answer;
                document.getElementById("puzzle-answer").value = answer;
                document.getElementById("puzzle-answer").disabled = true;
                document.getElementById("submit-answer").disabled = true;
                document.getElementById("popup-dialog").style.backgroundColor = "#4caf50";
                //document.getElementById(puzzleId).classList.add("solved");
            }
        };
    };
}

async function getPuzzleObject() {
    try {
        let obj = {};
        //console.log(uid)
        const userDoc = userDocCache || await getDoc(doc(db, "userlist", uid));
        puzzleList.forEach(e => {
            if (Object.values(userDoc.data().puzzlesSolved).some(obj => obj.id === e.id)) {
                obj[e.id] = {
                    id: e.id,
                    answer: Object.values(userDoc.data().puzzlesSolved).find(obj => obj.id === e.id).answer,
                }
            }
        });
        return obj;

    }
    catch (error) {
        //console.log("Error getting puzzle object:", error);
        return {};
    }
}

async function getPuzzleArray() {
    try {
        let arr = [];
        const userDoc = userDocCache || await getDoc(doc(db, "userlist", uid));
        puzzleList.forEach(e => {
            if (Object.values(userDoc.data().puzzlesSolved).some(obj => obj.id === e.id)) {
                arr.push(e.data().id);
            }
        });
        return arr;
    }
    catch (error) {
        //console.log("Error getting puzzle array:", error);
        return [];
    }
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
        let answer = document.getElementById("puzzle-answer").value.trim();
        for (const docu of puzzleList) {
            if (docu.id == currPuzzle) {
                const isCorrect = await correct(answer, docu);
                if (isCorrect) {
                    const puzzleId = docu.id;
                    document.getElementById("popup-dialog").style.backgroundColor = "#4caf50";
                    document.getElementById("puzzle-answer").disabled = true;
                    document.getElementById(puzzleId).classList.add("solved");
                    document.getElementById("submit-answer").disabled = true;
                    solvedPuzzles++;
                    document.getElementById("solved-count").innerHTML = `Solved: ${solvedPuzzles} / ${puzzleList.length} (${(solvedPuzzles / puzzleList.length * 100).toFixed(2)}%, ${scheduledCount} scheduled)`;

                    const userRef = doc(db, "userlist", uid);

                    let newPuzzleObject = await getPuzzleObject();
                    newPuzzleObject[puzzleId] = {
                        id: puzzleId,
                        answer: answer,
                    };

                    await updateDoc(userRef, {
                        'numPuzzlesSolved': solvedPuzzles,
                        'puzzlesSolved': newPuzzleObject,
                    }).then(async () => {userDocCache = await getDoc(doc(db, "userlist", uid))});

                    await updateDoc(doc(usernamelistCollection, uid), { puzzlesSolved: solvedPuzzles, puzzlesSolvedArray: await getPuzzleArray() });

                    new Audio("correct.mp3").play();
                }
                else {
                    new Audio("wrong.mp3").play();
                }
                const submitBtn = document.getElementById("submit-answer");

                if (!submitBtn.disabled) {
                    submitBtn.disabled = true;

                    let countdown = 60;
                    const originalText = submitBtn.innerText;
                    submitBtn.innerText = `Check (${countdown})`;

                    const interval = setInterval(() => {
                        countdown--;
                        if (countdown > 0) {
                            submitBtn.innerText = `Check (${countdown})`;
                        }
                        else {
                            clearInterval(interval);
                            clearInterval(disableInterval);
                            submitBtn.disabled = false;
                            submitBtn.innerText = originalText;
                        }
                    }, 1000);

                    const disableInterval = setInterval(() => {
                        if (countdown > 0) submitBtn.disabled = true;
                    }, 10);
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
    storageBucket: "puzzles-nhan4096.appspot.com",
    messagingSenderId: "872131400607",
    appId: "1:872131400607:web:57067afa49ba1d50cd23aa"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
enableIndexedDbPersistence(db).catch((err) => {
    if (err.code == 'failed-precondition') {
        console.log("Persistence failed: Multiple tabs open.");
    } else if (err.code == 'unimplemented') {
        console.log("Persistence not available: Browser doesn't support IndexedDB.");
    }
})
const puzzleCollection = collection(db, "puzzles");
const userlistCollection = collection(db, "userlist");
const usernamelistCollection = collection(db, "usernamelist");
const puzzleHTML = document.getElementById("puzzle-list");
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const auth = getAuth(app);
var solvedPuzzles = 0;

var puzzleList = await getDocs(puzzleCollection);
let scheduledCount = puzzleList.size;
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

puzzleList = puzzleList.docs.filter(doc => {
    const puzzleDate = doc.data().date.toDate();
    //console.log(puzzleDate);
    const puzzleMidnight = new Date(puzzleDate.getFullYear(), puzzleDate.getMonth(), puzzleDate.getDate());
    return puzzleMidnight <= today;
});

scheduledCount -= puzzleList.length;
var arrayPuzzleList = Array.from(puzzleList);
var tabCount = Math.ceil(arrayPuzzleList.length/4);
var tabs = [];
var userDocCache = null;

async function loadPuzzleTabs() {
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
}

loadPuzzleTabs()
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
        tabButton.onclick = () => loadTab(i);
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
    tabInput.onchange = () => loadTab(parseInt(tabInput.value)-1);
    tabContainer.appendChild(formItem);
}

redrawTabs();

async function loadTab(i) {
    puzzleHTML.innerHTML = "";
    document.getElementById("tab-" + selectedTab).classList.remove("selected");
    selectedTab = i;
    redrawTabs();
    document.getElementById("tab-" + i).classList.add("selected");
    //console.log(uid)
    const userDoc = userDocCache || (uid ? await getDoc(doc(db, "userlist", uid)) : null);
    userDocCache = userDoc;
    for (const docu of tabs[i]) {
        let data = docu.data();
        let puzzleItem = document.createElement("div");
        let date = new Date(data.date.seconds * 1000 + data.date.nanoseconds / 1000000);
        let year = date.getFullYear();
        let month = months[date.getMonth()];
        let day = date.getDate();

        const maxLength = 22;
        const nameShortened = data.name.length <= maxLength ? data.name : (data.name.slice(0, maxLength-3) + "...")

        puzzleItem.className = "puzzle";
        puzzleItem.id = docu.id;
        puzzleItem.innerHTML = `
            <h2 class="center bold no-margin" id="${docu.id}">${nameShortened}</h2>
            <p class="no-margin italics">${month} ${ordinal(day)}, ${year} | #${data.id}</p>
            <div class="img-container">
                <img class="img-puzzle" src="${data.img}" alt="${data.name}" id="${docu.id}">
            </div>
        `;
        if (uid) {
            //console.log(uid, userDoc.data().puzzlesSolved);
            if (Object.values(userDoc.data().puzzlesSolved).some(obj => obj.id === docu.id)) {
                puzzleItem.classList.add("solved");
            }
        }
        puzzleHTML.appendChild(puzzleItem);
        puzzleItem.onclick = loadPuzzle;
    };
}

function signUpPopup() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("popup-dialog").style.display = "block";

    Array.prototype.slice.call(document.getElementById("popup-dialog").children).forEach((child) => {
        if (child.id != "sign-up" && child.id != "close-popup") {
            child.style.display = "none";
        }
        else {
            child.style.display = "block";
        }
    });
}

function logInPopup() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("popup-dialog").style.display = "block";
    Array.prototype.slice.call(document.getElementById("popup-dialog").children).forEach((child) => {
        if (child.id != "log-in" && child.id != "close-popup") {
            child.style.display = "none";
        }
        else {
            child.style.display = "block";
        }
    });
}

async function signUp(e) {
    e.preventDefault();
    const signUpForm = document.getElementById("sign-up-form");
    const signUpErrors = document.getElementById("sign-up-error");

    //console.log(signUpForm.checkValidity());

    if (signUpForm.checkValidity()) {
        const username = signUpForm.username.value;
        const email = signUpForm.email.value;
        const password = signUpForm.password.value;

        const users = await getDocs(usernamelistCollection);
        const userExists = users.docs.some(doc => doc.data().username === username);
        //console.log(userExists)
        if (userExists) {
            signUpErrors.innerHTML = "Username already exists. Please choose a different username.";
            return;
        }
        //console.log(username);

        //console.log(`Signing up with email: ${email} and password: ${password}`);

        closePopup();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: username});
            alert(`Welcome, ${username}! Please check your email (${email}) in order to complete email verification.`);

            uid = user.uid;

            await setDoc(doc(userlistCollection, user.uid), {
                username: username,
                email: email,
                numPuzzlesSolved: solvedPuzzles,
                puzzlesSolved: await getPuzzleObject(),
                dateJoined: new Date(),
            });
            await setDoc(doc(usernamelistCollection, user.uid), { username: username, bio: "", puzzlesSolved: 0, puzzlesSolvedArray: [], createDate: new Date() });

            sendEmailVerification(user);

            signUpForm.reset();
            //await signOut(auth);
        }
        catch (error) {
            signUpPopup();
            console.error("Error signing up:", error);
            if (error.code === 'auth/email-already-in-use') {
                signUpErrors.innerHTML = "This email is already in use. Please try a different email.";
            }
            else if (error.code === 'auth/invalid-email') {
                signUpErrors.innerHTML = "The email address is not valid. Please enter a valid email.";
            }
            else if (error.code === 'auth/weak-password') {
                signUpErrors.innerHTML = "The password is too weak. Please choose a stronger password.";
            }
            else {
                signUpErrors.innerHTML = `An error (${error.code}) occurred while signing up. Please try again later.`;
            }
        }
    }
    else {
        signUpForm.reportValidity();
    }
}

async function logIn(e) {
    e.preventDefault();
    const logInForm = document.getElementById("log-in-form");
    const logInErrors = document.getElementById("log-in-error");

    if (logInForm.checkValidity()) {
        try {
            const email = logInForm.email.value;
            const password = logInForm.password.value;

            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;
            if (!user.emailVerified) {
                logInErrors.innerHTML = "Please verify your email before logging in.";
                await signOut(auth);
                return;
            }
            closePopup();
        }
        catch (error) {
            console.log(error);
            if (error.code === 'auth/user-not-found') {
                logInErrors.innerHTML = "No user found with this email. Please check your email or sign up.";
            }
            else if (error.code === 'auth/invalid-email') {
                logInErrors.innerHTML = "The email address is not valid. Please enter a valid email.";
            }
            else if (error.code === 'auth/invalid-credential') {
                logInErrors.innerHTML = "The credentials provided are invalid. Please check your email and password.";
            }
            else {
                const email = logInForm.email.value;
                const password = logInForm.password.value;
                console.log(auth, email, password);
                logInErrors.innerHTML = `An error (${error.code}) occurred while logging in. Please try again later.`;
            }
        }
    }
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

async function userSignOut() {
    await signOut(auth);
}

var uid = null;

document.getElementById("solved-count").innerHTML = `Solved: ${solvedPuzzles} / ${puzzleList.length} (${scheduledCount} scheduled)`;
document.getElementById("close-popup").onclick = closePopup;
document.getElementById("submit-answer").onclick = checkAnswer;

function setLocation(href) {
    window.location.href = href;
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        uid = user.uid;
        //console.log("User is signed in:", user);
        if (user.emailVerified) {
            let userDoc = await getDoc(doc(db, "userlist", uid));
            solvedPuzzles = userDoc.data().numPuzzlesSolved || 0;
            document.getElementById("solved-count").innerHTML = `Solved: ${solvedPuzzles} / ${puzzleList.length} (${(solvedPuzzles / puzzleList.length * 100).toFixed(2)}%, ${scheduledCount} scheduled)`;
            document.getElementById("signed-in-line").innerHTML = `<i class="fas fa-edit edit-btn" id="editor-icon"></i> <i class="fa-solid fa-ranking-star" id="leaderboard-icon"></i> <i class="fa-solid fa-gear" id="settings-icon"></i> Welcome, <a href="users/index.html?user=${user.uid}">${escapeHTML(user.displayName)}</a>. <a href="#" id="sign-out-link">Sign out</a>`;
            const userRef = doc(db, "userlist", user.uid);
            await updateDoc(userRef, {
                'puzzlesSolved': await getPuzzleObject(),
                'numPuzzlesSolved': solvedPuzzles,
            });
            await updateDoc(doc(usernamelistCollection, user.uid), { puzzlesSolved: solvedPuzzles, createDate: user.metadata.creationTime, puzzlesSolvedArray: await getPuzzleArray() });
            document.getElementById("settings-icon").onclick = () => {setLocation("settings/index.html")};
            document.getElementById("leaderboard-icon").onclick = () => {setLocation("leaderboard/index.html")};
            document.getElementById("editor-icon").onclick = () => {setLocation("editor/index.html")};

            const params = new URLSearchParams(window.location.search);
            const idParam = params.get('id');
            if (idParam) {
                await loadTab(0);
                await loadPuzzle(idParam);

                const url = new URL(window.location.href);
                url.search = '';
                window.history.replaceState({}, '', url.toString());
            }
            else {
                await loadTab(selectedTab);
            }
        }
        else {
            document.getElementById("signed-in-line").innerHTML = `Your account is not verified! Please check your email (${escapeHTML(user.email)}) for a verification link. Check your spam folder as well. Sign out in order to log in once your account is verified. <a id="resend-verify" href="#">Resend</a> <a href="#" id="sign-out-link">Sign out</a>`;
            document.getElementById("resend-verify").onclick = async () => {await sendEmailVerification(user)};
        }
        await loadTab(selectedTab);
        document.getElementById("puzzles-container").style.display = "block";
        document.getElementById("overlay-not-logged-in").style.display = "none";
        document.getElementById("sign-out-link").onclick = userSignOut;
        userDocCache = await getDoc(doc(db, "userlist", uid));
    }
    else {
        uid = null;
        //console.log("No user signed in");
        document.getElementById("signed-in-line").innerHTML = '<a href="#" id="sign-up-link">Sign up</a> / <a href="#" id="log-in-link">Log in</a>';
        document.getElementById("sign-up-link").onclick = signUpPopup;
        document.getElementById("sign-up-link-2").onclick = signUpPopup;
        document.getElementById("sign-up-form").onclick = signUp;

        document.getElementById("log-in-link").onclick = logInPopup;
        document.getElementById("log-in-link-2").onclick = logInPopup;
        document.getElementById("log-in-form").onclick = logIn;

        document.getElementById("puzzles-container").style.display = "none";
        document.getElementById("overlay-not-logged-in").style.display = "block";
        await loadTab(selectedTab);
    }
});
