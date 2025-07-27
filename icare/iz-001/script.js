let documentSettings = {
    title: "IZ-001: Introduction",
    securityLevel: 0
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

function commonDocumentBehavior() {
    for (key in gameSave) {
        if (localStorage.getItem(key) !== null) {
            gameSave[key] = JSON.parse(localStorage.getItem(key));
        }
        else {
            localStorage.setItem(key, JSON.stringify(gameSave[key]));
        }
    }
    document.title = documentSettings.title;
    document.getElementById("title").innerText = documentSettings.title;
    if (gameSave.securityLevel < documentSettings.securityLevel) {
        alert("You are not authorized to view this document. This documment is classified as " + securityLevelNames[documentSettings.securityLevel][0] + ".");
        window.close();
        return;
    }
    document.getElementById("content").style.display = "block";

    document.getElementById("security-level").innerText = `L${documentSettings.securityLevel} (${securityLevelNames[documentSettings.securityLevel][0]})`;
    document.getElementById("security-level").style.color = securityLevelNames[documentSettings.securityLevel][1];
}

function tick() {
    commonDocumentBehavior();
}

setInterval(tick, 200);

document.getElementById("passcode-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const passcode = document.getElementById("passcode").value;
    const passcodeHash = await SHA256(passcode);
    if (passcodeHash === "1a5845aa07abed421eefb84f9ded3a8c8ae4edbcd0a76483b324ca108bc82368") {
        if (gameSave.securityLevel < 1) {
            localStorage.setItem("securityLevel", JSON.stringify("1"));
            alert("Access granted. Security level upgraded to Restricted.");
        }
    }
    else {
        alert("Access denied. Incorrect passcode.");
    }

    document.getElementById("passcode").value = "";
})