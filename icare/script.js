let foundTypoFlag = true;

async function SHA256(message) {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
}

document.addEventListener("DOMContentLoaded", async () => {
    setInterval(tick, 200);
    setTimeout(async () => {
        const params = new URLSearchParams(window.location.search);
        const capsizeCount = params.get('capsizeCount');
        const hashedCount = await SHA256(capsizeCount);

        if (hashedCount === '812b26930957d5e7d2132ddafd679f71d9372ace2f9309c17db91a4b986529d8') {
            if (gameSave.securityLevel < 3) {
                alert("Access granted. Security level upgraded to L3.");
                localStorage.setItem('securityLevel', JSON.stringify(3));
            }
        }
        else if (capsizeCount !== null) {
            alert("Access denied.");
        }
        const url = new URL(window.location.href);
        url.search = '';
        window.history.replaceState({}, '', url.toString());
    }, 1000);
});

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

    for (let i = 1; i <= 13 && foundTypoFlag; i++) {
        if (!gameSave.foundTypos.includes(i)) {
            foundTypoFlag = false;
            break;
        }
    }

    if (foundTypoFlag) {
        document.getElementById('iz-006-link').hidden = false;
        document.getElementById('logfile').hidden = false;
    }
}