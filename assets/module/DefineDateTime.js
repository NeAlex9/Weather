let date = document.querySelector(".date");
let time = document.querySelector(".time");

function SetTime() {
    function addZero(n) {
        return (parseInt(n, 10) < 10 ? '0' : '') + n;
    }

    let date = new Date();
    time.innerHTML = ' ,  ' + addZero(date.getHours().toString()) + "." + addZero(date.getMinutes().toString()) + "." + addZero(date.getSeconds());
    setTimeout(SetTime, 1000);
}

function SetDate() {
    let today = new Date();
    let lang;
    if (document.querySelector(".lang-text").textContent === "RU"){
        lang = "en-GB";
    }
    else{
        lang = "ru-GB";
    }
    let month = today.toLocaleString(lang, {month: 'long'});
    let dayWeek = today.toLocaleString(lang, {weekday: 'short'});
    let dayNum = today.toLocaleString(lang, {day: '2-digit'});
    date.innerHTML = dayWeek + ', ' + dayNum + ' ' + month;
    setTimeout(SetDate, 1000);
}

SetTime();
SetDate();