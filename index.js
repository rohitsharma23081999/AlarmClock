let screen = document.getElementById("screen");
let selectMenu = document.querySelectorAll("select");
var sound = new Audio(
  "https://freesound.org/data/previews/316/316847_4939433-lq.mp3"
);
function watchTime() {
  let today = new Date();
  let hour = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  ////////////////////////  AM/PM logic///////////////////////
  let session = "AM";

  if (hour > 12) {
    hour = hour - 12;
    session = "PM";
  }
  //////////////////////////////////////////////////////////
  hour = checkTime(hour);
  minutes = checkTime(minutes);
  seconds = checkTime(seconds);
  screen.innerHTML = `${hour}:${minutes}:${seconds}`;
  document.getElementById("session").innerHTML = `${session}`;
  setTimeout(watchTime, 1000);
  ////////////////////////////end////////////////////////////////
}
watchTime();
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

////////////////Create options/////////////////
var alarmHour = document.getElementById("alarmHour");
var alarmMinute = document.getElementById("alarmMinute");
var alarmSeconds = document.getElementById("alarmSecond");
var alarmSession = document.getElementById("alarmSession");
var allAlarmList = document.getElementById("allAlarmList");

for (let i = 0; i <= 12; i++) {
  var paragraph = document.createElement("option");
  paragraph.value = `${i}`;
  paragraph.innerHTML = `${i}`;
  alarmHour.appendChild(paragraph);
}

for (let i = 0; i <= 59; i++) {
  var paragraph = document.createElement("option");
  paragraph.value = `${i}`;
  paragraph.innerHTML = `${i}`;
  alarmMinute.appendChild(paragraph);
}
for (let i = 0; i <= 59; i++) {
  var paragraph = document.createElement("option");
  paragraph.value = `${i}`;
  paragraph.innerHTML = `${i}`;
  alarmSeconds.appendChild(paragraph);
}
////////////////////////////end/////////////////////////////

///////////////////////create list and delete button//////////////
let setAlarmButton = document.getElementById("setAlarmButton");
let idListCounter = 0;
let alarmTimeouts = []; // Array to store alarm timeout IDs

setAlarmButton.addEventListener("click", (e) => {
  e.preventDefault();
  /////////////////////////////Alarm//////////////////////////////
  let updateAlarm = alarmHour.value;
  if (alarmSession.value == "PM") {
    let a = alarmHour.value;

    let b = 12 + Number(a);
    if (a == 12) {
      a = 0;
      b = 0;
    }
    updateAlarm = alarmHour.value;
    updateAlarm = b;
  } else {
    updateAlarm = alarmHour.value;
  }

  //
  let realTiming = new Date();
  let checkDate = new Date(
    2024,
    2,
    1,
    updateAlarm,
    alarmMinute.value,
    alarmSeconds.value
  );

  let testAlarm = checkDate - realTiming;
  if (testAlarm >= 0) {
    let alarmID = setTimeout(() => {
      sound.play();
      alert("Times up");
    }, testAlarm);
    alarmTimeouts.push(alarmID); // Store the timeout ID
  }

  ////////////////////end///////////////////
  // Create a new delete button
  idListCounter++;
  var deleteButton = document.createElement("button");
  deleteButton.id = `alarmDelete${idListCounter}`;
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function () {
    // Remove the list item containing the delete button when clicked
    var listItem = this.parentNode;
    listItem.parentNode.removeChild(listItem);

    // Stop the corresponding alarm timeout
    let index = Number(this.id.replace("alarmDelete", ""));
    if (index <= alarmTimeouts.length) {
      clearTimeout(alarmTimeouts[index - 1]);
      alert(`Alarm ${index} deleted`);
      alarmTimeouts.splice(index - 1, 1);
    }
  };

  // Create a new list item to contain the delete button
  var listItem = document.createElement("li");
  listItem.innerHTML = `Hr&nbsp;${alarmHour.value} &nbsp;&nbsp;Min&nbsp;${alarmMinute.value} &nbsp;&nbsp;Sec&nbsp;${alarmSeconds.value} &nbsp;&nbsp;${alarmSession.value}&nbsp;&nbsp;&nbsp;&nbsp;`;
  listItem.appendChild(deleteButton);

  // Append the list item to an existing list or container
  var listContainer = document.getElementById("buttonContainer");
  listContainer.appendChild(listItem);

  //testing area

  //
});
