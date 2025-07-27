let documentSettings = {
    title: "Pre-IZ-003 Examination",
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

setInterval(tick, 200);

document.getElementById("exam-form").onsubmit = function (e) {
    e.preventDefault();
    for (let i = 0; i < 5; i++) {
        let answer = e.target["q" + (i+1)].value;
        if (answer == "i") {
            alert("Wrong.");
            return;
        }
    }
    alert("You are now authorized to access the IZ-003 document.");
    localStorage.setItem("examPassed", JSON.stringify(true));
    gameSave.examPassed = true;
}