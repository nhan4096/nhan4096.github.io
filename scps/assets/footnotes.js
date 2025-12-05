const footnotes = document.querySelectorAll('.footnote');
const footnoteTexts = document.querySelectorAll('.footnote-idx');

for (let i=0; i<footnotes.length; i++) {
    const f = footnotes[i];
    f.innerHTML = `<a class='accent-color' href=${`#fn${i+1}`} id=${`ref${i+1}`}>${i+1}</a>`;
    const ft = footnoteTexts[i];
    ft.innerText = `${i+1}.`;
    ft.href = `#ref${i+1}`;
    ft.id = `fn${i+1}`;
}