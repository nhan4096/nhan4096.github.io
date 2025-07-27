function tick() {
    for (key in gameSave) {
        if (localStorage.getItem(key) !== null) {
            gameSave[key] = JSON.parse(localStorage.getItem(key));
        }
        else {
            localStorage.setItem(key, JSON.stringify(gameSave[key]));
        }
    }
    document.getElementById("security-level").innerText = `L${gameSave.securityLevel} (${securityLevelNames[gameSave.securityLevel][0]})`;
    document.getElementById("security-level").style.color = securityLevelNames[gameSave.securityLevel][1];
}

setInterval(tick, 200);