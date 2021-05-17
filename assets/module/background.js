let images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg',
        '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg',
        '19.jpg', '20.jpg'],
    randomIndexesForImages = [],
    buttonChange = document.querySelector('.refresh'),
    currentImageIndex = 0,
    currentDate = new Date(),
    currentHour = currentDate.getHours();

function ChooseTimeOfDay() {
    let today = new Date(),
        hour = today.getHours();
    if (hour >= 6 && hour <= 12) {
        return 'morning';
    } else if (hour > 12 && hour <= 18) {
        return 'day';
    } else if (hour > 18 && hour <= 24) {
        return 'evening';
    } else {
        return 'night';
    }
}

function GetRandomNumber(min, max) {
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
}

function GenerateRandomIndexes(len) {
    let arr = [];
    while (arr.length !== len) {
        let number = GetRandomNumber(0, 20);
        if (arr.indexOf(number) === -1)
            arr.push(number);
    }
    return arr;
}

function SetBackground(src) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        document.body.style.backgroundImage = `url(${src})`;
    };
}

function ToggleBGEveryHour() {
    let time = new Date(),
        hour = time.getHours();
    if (currentHour !== hour) {
        let src = ChoosePathToImg(images, randomIndexesForImages, currentImageIndex);
        currentImageIndex = (currentImageIndex >= 19) ? currentImageIndex = 0 : ++currentImageIndex;
        SetBackground(src);
        currentHour = hour;
    }
    setTimeout(ToggleBGEveryHour, 1000);
}

function ChoosePathToImg(images, randomIndexesForImages, currentImageIndex) {
    if (ChooseTimeOfDay() === 'morning') {
        return "assets/images/morning/" +
            images[randomIndexesForImages[currentImageIndex]];
    } else if (ChooseTimeOfDay() === 'day') {
        return "assets/images/day/" +
            images[randomIndexesForImages[currentImageIndex]];
    } else if (ChooseTimeOfDay() === 'evening') {
        return "assets/images/evening/" +
            images[randomIndexesForImages[currentImageIndex]];
    } else {
        return "assets/images/night/" +
            images[randomIndexesForImages[currentImageIndex]];
    }
}

buttonChange.addEventListener('click', function () {
    currentImageIndex = (currentImageIndex >= 19) ? currentImageIndex = 0 : ++currentImageIndex;
    SetBackground(ChoosePathToImg(images, randomIndexesForImages, currentImageIndex));
})

randomIndexesForImages = GenerateRandomIndexes(20);
SetBackground(ChoosePathToImg(images, randomIndexesForImages, currentImageIndex));
ToggleBGEveryHour();

buttonChange.addEventListener('click', function(){
    const icon = document.querySelector(".refresh__icon")
    let startTime = Date.now();
    let current_rotation = 0;
    let timer = setInterval(()=>{
        current_rotation += 24;
        icon.style.transform = 'rotate(' + current_rotation + 'deg)';
        let duration = Date.now() - startTime;
        if (duration >= 1500) {
            clearInterval(timer);
        }
    }, 100);
});