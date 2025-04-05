async function startGame() {
    $('return-btn').hide()
    if (!$('#len').val() || !$('#max-count').val() || !$('#allow-negative') || !$('#wait-time').val()) {
        alert("Còn những tham số chưa được nhập vào!");
        return;
    }
    let s = generateString($('#len').val(), $('#max-count').val(), $('#allow-negative').is(":checked"));
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
    if (count == s[1]) {
        $('#status').text("CHEATeR INSSPeCT ELEMENTTTTTTT");
    }
    else {
        $('#status').text("NGU BÒ ĐÁP ÁN ĐÚNG LÀ " + s[1] + " LẦN ỈA");
    }

    $('.command').text("Kết thúc");
    $('#return-btn').show();
}

function returnHome() {
    $('.start-div').show();
    $('.game-div').hide();
    $('.command').text("");
    $('#final-count').prop("disabled", true);
    $('#status').hide();
    $('#final-count').val("");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateString(len, maxCount, allowNegatives) {
    console.log(allowNegatives)
    let count = 0;
    let string = "";
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
            if (rngSeconds < 1/3 && count % 2 == 0) {
                string += "M";
                count = Number(count/2);
            }
            else if (rngSeconds < 2/3) {
                string += "W";
                count *= 2;
            }
            else {
                string += "X";
                count = 0;
            }
        }
        let finished = Math.random() < 1/len ? true : false;
        if (finished && count <= maxCount && string.length > 5 && string[string.length-1] != "X") {
            return [string, count];
        }
    }
}