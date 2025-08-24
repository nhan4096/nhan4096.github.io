let buttons = document.querySelectorAll('.sub-button');
let buttonsContainer = document.getElementById('buttons');
let width = buttonsContainer.offsetWidth;
let selected = -1;

for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.width = width / Math.min(buttons.length, 5) + 'px';
    buttons[i].addEventListener('click', function (e) {
        if (selected !== -1) {
            buttons[selected].classList.remove('selected');
        }
        selected = i;
        buttons[i].classList.add('selected')

        for (let j = -1; j < buttons.length; j++) {
            document.getElementById(`text-${j}`).hidden = true;
        }
        document.getElementById(`text-${i}`).hidden = false;
    })
}