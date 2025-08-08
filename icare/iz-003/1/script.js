var documentSettings = {}

fetch("/icare/data.json").then((res) => res.json()).then((data) => {
    let documentPath = new URL(document.URL).pathname.replace('/icare/', '').replace('/index.html', '');
    if (documentPath[documentPath.length - 1] == '/') {
        documentPath = documentPath.substring(0, documentPath.length - 1);
    }
    documentSettings = data[documentPath];

    setInterval(tick, 200);
});

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
    if (!gameSave.examPassed) {
        alert("You must pass the exam to view this document.");
        window.close();
        return;
    }
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