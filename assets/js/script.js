// Modo estrito
"use strict";

// Elementos
const hoursPointer = document.querySelector(".hours");
const minutesPointer = document.querySelector(".minutes");
const secondsPointer = document.querySelector(".seconds");
const dateText = document.querySelector(".date-text");
const selectBox = document.querySelector(".select-box");
const selects = document.querySelectorAll(".select-box select");
const info = document.querySelector(".info");
const setBtn = document.querySelector("button");

info.textContent = "Set a time to activate the alarm.";

let alarmTime = null;
let isAlarmSet = false;
let ringtone = new Audio("./assets/file/ringtone.mp3");

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Gerando dias da semana de forma dinâmica
let weekFormatOne = weekDays.reverse();
function createDays() {
    for(let i = 0; i < weekFormatOne.length; i ++) {
        let option = `<option value="${weekFormatOne[i]}">${weekFormatOne[i]}</option>`;
        selects[0].firstElementChild.insertAdjacentHTML("afterend", option);
    }
}
createDays();

// Gerando horas de forma dinâmica
function createHours() {
    for(let i = 12; i > 0; i --) {
        i = i < 10 ? "0" + i : i;
        let option = `<option value="${i}">${i}</option>`;
        selects[1].firstElementChild.insertAdjacentHTML("afterend", option);
    }
}
createHours();

// Gerando minutos de forma dinâmica
function createMinutes() {
    for(let i = 59; i >= 0; i --) {
        i = i < 10 ? "0" + i : i;
        let option = `<option value="${i}">${i}</option>`;
        selects[2].firstElementChild.insertAdjacentHTML("afterend", option);
    }
}
createMinutes();

// Gerando período de forma dinâmica
function createPeriod() {
    for(let i = 2; i > 0; i --) {
        let period = i === 1 ? "AM" : "PM";
        let option = `<option value="${period}">${period}</option>`;
        selects[3].firstElementChild.insertAdjacentHTML("afterend", option);
    }
}
createPeriod();

// Obtendo horário atual do sistema
let weekFormatTwo = weekFormatOne.reverse();
function getHours() {
    const date = new Date();
    const degHours = (360 / 12) * date.getHours();
    const degMinutes = (360 / 60) * date.getMinutes();
    const degSeconds = (360 / 60) * date.getSeconds();
    
    let day = weekFormatTwo[date.getDay()];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let period = "AM";

    hoursPointer.style.transform = `rotate(${degHours}deg)`;
    minutesPointer.style.transform = `rotate(${degMinutes}deg)`;
    secondsPointer.style.transform = `rotate(${degSeconds}deg)`;

    if(hours >= 12) {
        hours = hours - 12;
        period = "PM";
    }

    hours = hours === 0 ? hours = 12 : hours;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    dateText.textContent = `${day}, ${hours}h${minutes}m${seconds}s ${period}`;

    if(alarmTime === `${day} at ${hours}h${minutes}m ${period}`) {
        ringtone.play();
        ringtone.loop = true;
    }
}
setInterval(getHours, 1000);
getHours();

// Programar alarme
function setAlarm() {
    if(!isAlarmSet) {
        let time = `${selects[0].value} at ${selects[1].value}h${selects[2].value}m ${selects[3].value}`;
        alarmTime = time;
        if(alarmTime.includes("Day") || alarmTime.includes("Hour") || alarmTime.includes("Minute") || alarmTime.includes("Period")) {
            info.textContent = "Please, set a time to activate the alarm!";
            selects.forEach((select) => select.classList.remove("success"));
            selects.forEach((select) => select.classList.add("error"));
        }
        else {
            info.textContent = "Alarm set for " + time;
            selects.forEach((select) => select.classList.remove("error"));
            selects.forEach((select) => select.classList.add("success"));
        }
        isAlarmSet = true;
        selectBox.classList.add("disable");
        setBtn.textContent = "Clear alarm";
    }
    else {
        alarmTime = "";
        ringtone.pause();
        selectBox.classList.remove("disable");
        selects.forEach((select) => select.classList.remove("error"));
        selects.forEach((select) => select.classList.remove("success"));
        setBtn.textContent = "Set alarm";
        return isAlarmSet = false;
    }
}

// Evento
setBtn.addEventListener("click", setAlarm);