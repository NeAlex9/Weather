let date = document.querySelector(".date");
let time = document.querySelector(".time");

function SetTime(){
    function  addZero(n) {
        return (parseInt(n, 10) < 10 ? '0' : '') + n;
    }

    let date = new Date();
    time.innerHTML = ' ,  ' + addZero(date.getHours().toString()) + "." + addZero(date.getMinutes().toString( ))+ "." + addZero(date.getSeconds());
    setTimeout(SetTime, 1000);
}

function SetDate(){
    let today = new Date();
    let month = today.toLocaleString('en-GB', {month: 'long'});
    languageChangerContainer['en']["month"] = month;
    month = today.toLocaleString('ru-GB', {month: 'long'});
    languageChangerContainer['ru']["month"] = month;
    let dayWeek = today.toLocaleString('en-GB', {weekday: 'short'});
    languageChangerContainer['en']["dayWeek"] = dayWeek;
    dayWeek = today.toLocaleString('ru-GB', {weekday: 'short'});
    languageChangerContainer['ru']["dayWeek"] = dayWeek;
    let dayNum = today.toLocaleString('ru-GB', {day: '2-digit'});
    date.innerHTML = dayWeek + ', ' + dayNum + ' ' + month;
    setTimeout(SetDate, 1000);
}

SetTime();
SetDate();