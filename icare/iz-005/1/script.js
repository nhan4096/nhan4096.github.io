var documentSettings = {}

fetch("/icare/data.json").then((res) => res.json()).then((data) => {
    let documentPath = new URL(document.URL).pathname.replace('/icare/', '').replace('/index.html', '');
    if (documentPath[documentPath.length - 1] == '/') {
        documentPath = documentPath.substring(0, documentPath.length - 1);
    }
    documentSettings = data[documentPath];

    setInterval(tick, 200);
});

const creditsCode = `<!DOCTYPE html>
<html>
  <head>
    <title>Credits</title>
    <link rel="stylesheet" href="/assets/data/styles.css">
    <script src="/assets/data/mobile.js"></script>
    <style>
      body {
        margin-left: 10px;
      }
      a { margin: 0px }
      .home-link {
        margin-top: 10px;
      }
    </style>
  </head>
  <body>
    <a href="/" class="home-link">← back to homepage</a>
    
    <h1>Credits</h1>

    <p><strong>Project:</strong> ███████.github.io</p>

    <h2>Contributors</h2>
    <ul>
      <li><strong>██</strong> &ndash; Creator</li>
      <li><strong>S-762 &amp; S-575</strong> &ndash; ???</li>
      <li><strong>fgyjhretge4 &lpar;Noobey&rpar;</strong> &ndash; Tester</li>
    </ul>

    <h2>Inspirations</h2>
    <ul>
      <li><a href="//neal.fun/" target="_blank">neal.fun</a></li>
      <li>█████████ <a href="█████████████████████████" target="_blank">███████████████████</a> ARG</li>
      <li><a href="//www.youtube.com/@█████████/" target="_blank">█████████</a> ARG</li>
    </ul>

    <h2>Special Thanks</h2>
    <ul>
      <li>GitHub</li>
      <li>██████</li>
      <li>my <a href="/html/microwave/" target="_blank">microwave</a></li>
    </ul>

    <br>
    <h6>&lowast; most of the contributors are my friends</h6>
  </body>
</html>`

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

window.onload = () => {
    let codeSplit = creditsCode.split('\n');
    for (let i=0; i<codeSplit.length; i++) {
        const newText = document.createElement("td");
        newText.innerText = codeSplit[i];
        newText.classList.add("keep-whitespace");
        newText.classList.add("code-line");
        
        const newLineNum = document.createElement("td");
        newLineNum.innerText = i+1;
        newLineNum.classList.add("num");
        
        const newTR = document.createElement("tr");
        newTR.appendChild(newLineNum);
        newTR.appendChild(newText);
        document.getElementById("code").appendChild(newTR);
    }
}