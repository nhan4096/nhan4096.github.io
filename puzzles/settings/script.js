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

            const usernameDoc = await getDoc(doc(usernamelistCollection, uid));
            const bio = usernameDoc.data().bio || "";

            document.getElementById("username").innerHTML = `Username: ${escapeHTML(user.displayName)}`;
            document.getElementById("bio").innerHTML = `Bio: ${escapeHTML(bio || "[No bio set.]")}`;
            document.getElementById("email").innerHTML = `Email: ${user.email}`;
            document.getElementById("uid").innerHTML = `UID: ${user.uid}`;
            document.getElementById("created-at").innerHTML = `Created at: ${new Date(user.metadata.creationTime).toLocaleString()}`;

            document.getElementById("edit-username").addEventListener("click", async () => {
                const newUsername = prompt("Enter your new username:");
                if (newUsername) {
                    try {
                        await updateProfile(user, { displayName: newUsername });
                        await updateDoc(doc(userlistCollection, uid), { username: newUsername });
                        await updateDoc(doc(usernamelistCollection, uid), { username: newUsername });
                        document.getElementById("username").innerHTML = `Username: ${newUsername}`;
                        location.reload();
                    } catch (error) {
                        console.error("Error updating username:", error);
                        alert(`Error (${error.code}) updating username. Please try again.`);
                    }
                }
            });

            document.getElementById("edit-bio").addEventListener("click", async () => {
                const newBio = prompt("Enter your new bio (or leave blank to remove):");
                try {
                    await updateDoc(doc(usernamelistCollection, uid), { bio: newBio || "" });
                    document.getElementById("bio").innerHTML = `Bio: ${escapeHTML(newBio || "[No bio set.]")}`;
                    alert("Bio updated successfully.");
                } catch (error) {
                    console.error("Error updating bio:", error);
                    alert(`Error (${error.code}) updating bio. Please try again.`);
                }
            });

            document.getElementById("edit-email").addEventListener("click", async () => {
                const newEmail = prompt("Enter your new email address:");
                if (!newEmail) return;

                try {
                    const password = prompt("Please enter your password to confirm the change:");
                    if (!password) return;
                
                    const credential = EmailAuthProvider.credential(user.email, password);
                    await reauthenticateWithCredential(user, credential);
                
                    await verifyBeforeUpdateEmail(user, newEmail);
                    alert(`A verification email has been sent to your new address (${newEmail}). Please verify it before continuing.`);
                
                    await updateDoc(doc(userlistCollection, uid), { email: newEmail });
                    document.getElementById("email").innerHTML = `Email: ${newEmail} <i class="fas fa-edit edit-btn" id="edit-email"></i>`;
                    alert("Email updated successfully. Signing out to apply changes, sign in when you have verified your new email.");
                    await userSignOut();
                }
                catch (error) {
                    console.error("Error updating email:", error);
                    switch (error.code) {
                        case 'auth/email-already-in-use':
                            alert("This email is already in use. Please use another.");
                            break;
                        case 'auth/invalid-email':
                            alert("Invalid email format.");
                            break;
                        case 'auth/requires-recent-login':
                            alert("Please sign in again to change your email.");
                            break;
                        case 'auth/user-mismatch':
                            alert("Reauthentication failed. Please try again.");
                            break;
                        default:
                            alert(`Error (${error.code}): ${error.message}`);
                    }
                }
            });
            document.getElementById("delete-account").addEventListener("click", async () => {
                const confirmDelete = prompt("Are you sure you want to delete your account? Type the phrase \"UI shat his pants at school on November 1st, 2024.\" with the correct capitalization in the box below to confirm. ");
                if (confirmDelete == "UI shat his pants at school on November 1st, 2024.") {
                    try {
                        const password = prompt("Please enter your password to confirm the change:");
                        if (!password) return;
                        
                        const credential = EmailAuthProvider.credential(user.email, password);
                        await reauthenticateWithCredential(user, credential);

                        await deleteDoc(doc(db, 'userlist', user.uid));
                        await deleteDoc(doc(db, 'usernamelist', user.uid));

                        deleteUser(user);
                    } catch (error) {
                        console.error("Error deleting account:", error);
                        alert(`Error (${error.code}) deleting account. Please try again.`);
                    }
                }
            });

            document.getElementById("reset-puzzles").addEventListener('click', async () => {
                const confirmReset = prompt("Are you sure you want to reset your solved puzzles? Type the phrase \"UI shat his pants at school on November 1st, 2024.\" with the correct capitalization in the box below to confirm. ");
                if (confirmReset == 'UI shat his pants at school on November 1st, 2024.') {
                    await updateDoc(doc(userlistCollection, uid), { numPuzzlesSolved: 0, puzzlesSolved: {} });
                    await updateDoc(doc(usernamelistCollection, uid), { puzzlesSolved: 0, puzzlesSolvedArray: [] });
                    alert("Solved puzzles resetted. Refreshing to apply changes.");
                    location.reload();
                }
            });
        }
        else {
            alert("Your email address is not verified. Please verify your email to access your settings.");
            window.location.href = "../index.html";
        }

        document.getElementById("sign-out-link").addEventListener("click", userSignOut);
    }
    else {
        alert("You are not signed in. Please sign in to access your settings.");
        window.location.href = "../index.html";
    }
});