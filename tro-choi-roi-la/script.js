function square(n) {
    return n > 0 && Math.sqrt(n) % 1 === 0;
};

async function startGame() {
    $('#return-btn').hide()
    if (!$('#len').val() || !$('#max-count').val() || !$('#allow-negative') || !$('#wait-time').val()) {
        alert("Còn những tham số chưa được nhập vào!");
        return;
    }
    let allowedCommands = []
    for (let i=1; i<=9; i++) {
        allowedCommands.push($('#allow-' + i).is(":checked"))
    }
    s = ['', 0]
    while (Math.abs($('#len').val()-s[0].length) > $('#len').val()*0.2) {
        s = generateString($('#len').val(), $('#max-count').val(), $('#allow-negative').is(":checked"), allowedCommands);
    }
    // console.log(s[0], s[1], s[0].length)
    $('.start-div').hide();
    $('.game-div').show();
    for (let i=0; i<s[0].length; i++) {
        $('.command').text(s[0][i]);
        $('.command').css("color", "red");
        $('.command').animate(
            { color: jQuery.Color("#000000") },
            $('#wait-time').val() / 2,
            'linear'
        );
        await sleep($('#wait-time').val());
    }

    $('#final-count').prop("disabled", false)

    let countdown = $('#max-count').val() <= 5 ? 3 : ($('#max-count').val() <= 10 ? 6 : 9)

    for (let i=countdown; i>0; i--) {
        $('.command').text(i);
        await sleep(1000);
    }

    $('#status').show()

    let count = $('#final-count').val();
    if (Number(count) == s[1] && count != '') {
        new Audio('fart-achievement.mp3').play()
        $('#status').text("CHEATeR INSSPeCT ELEMENTTTTTTT");
    }
    else {
        new Audio('chicken-dance.mp3').play()
        $('#status').text("NGU BÒ ĐÁP ÁN ĐÚNG LÀ " + s[1] + " LẦN ỈA");
    }

    $('.command').text("Kết thúc");
    $('#return-btn').show();
}

function factorial(n) {
    if (n <= 8) {
        return [1, 1, 2, 6, 24, 120, 720, 5040, 40320][n]
    }
    let prod = 1
    for (let i=1; i<=n; i++) {
        prod *= i
    }
    return prod
}

function sigma(n) {
    let s = 0;
    for (let i=1; i<=Math.sqrt(n); i++) {
        if (n % i == 0) {
            s += i;
            if (n / i != i) {s += n / i;}
        }
    }
    return s
}

function returnHome() {
    $('.start-div').show();
    $('.game-div').hide();
    $('.command').text("");
    $('#final-count').prop("disabled", true);
    $('#status').hide();
    $('#final-count').val("");
    $('#return-btn').hide();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateString(len, maxCount, allowNegatives, allowedCommands) {
    let count = 0;
    let counts = [];
    let string = "";
    let firstTime = true;
    while (true) {
        let rng = Math.random();
        if (rng < 0.4 && (count > 0 || allowNegatives)) {
            string += "L";
            count--;
        }
        else if (rng < 0.8) {
            string += "Đ";
            count++;
        }
        else {
            let rngSeconds = Math.random();
            while (!allowedCommands[Math.floor(rngSeconds*9)] || firstTime) {
                rngSeconds = Math.random();
                if (rngSeconds < 1/9 && count % 2 == 0 && allowedCommands[0]) {
                    string += "M";
                    count = Number(count/2);
                }
                else if (rngSeconds < 2/9 && square(count) && allowedCommands[1]) {
                    string += "D";
                    count = Number(Math.sqrt(count));
                }
                else if (rngSeconds < 3/9 && count > 0 && allowedCommands[2]) {
                    string += "Σ";
                    count = sigma(count);
                }
                else if (rngSeconds < 4/9 && count >= 0 && count <= 8 && allowedCommands[3]) {
                    string += "C";
                    count = Math.pow(2, count);
                }
                else if (rngSeconds < 5/9 && string.length > 0 && allowedCommands[4]) {
                    string += "U";
                    count = counts[counts.length-2];
                }
                else if (rngSeconds < 6/9 && count <= 6 && allowedCommands[5]) {
                    string += "T";
                    count = factorial(count);
                }
                else if (rngSeconds < 7/9 && allowedCommands[6]) {
                    string += "W";
                    count *= 2;
                }
                else if (rngSeconds < 8/9 && allowedCommands[7]) {
                    string += "X";
                    count = 0;
                }
                else if (allowedCommands[8]) {
                    string += "A";
                    count *= count;
                }
                else {
                    let rng3 = Math.random();
                    string += rng3 < 0.5 && (count > 0 || allowNegatives) ? "L" : "Đ";
                    count += rng3 < 0.5 && (count > 0 || allowNegatives) ? -1 : 1;
                    break
                }
                firstTime = false;
            }
        }        
        counts.push(count);
        if (string.length > len*1.2) {
            return ['', -1]
        }
        let finished = Math.random() < 3.5/len ? true : false;
        if (finished && count <= maxCount && string.length > len/2 && string[string.length-1] != "X") {
            return [string, count, counts];
        }
        firstTime = true;
    }
}