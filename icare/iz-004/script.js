let documentSettings = {
    title: "IZ-004: The 7 Interface Open Source Investigation",
    securityLevel: 1
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

async function SHA256(message) {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
}

setInterval(tick, 200);

document.getElementById("answer-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const answer = e.target.elements["answer"].value.trim().toLowerCase();
    const answerHash = await SHA256(answer);
    if (answerHash === "f59b12d173a531652a31c6d5981dc59a42a39d3ce817afdce3d9dc0deb4dea9a") {
        if (gameSave.securityLevel < 2) {
            alert("Cross-reference check passed. Security level increased to L2.");
            localStorage.setItem("securityLevel", JSON.stringify("2"));
            gameSave.securityLevel = 2;
        }
    }
    else {
        alert("Cross-reference check failed. Please ensure you have the correct answer.");
        return;
    }
});