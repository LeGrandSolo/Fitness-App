const datesElem = document.querySelector(".dates");
const div = document.createElement("div");
const pMonth = document.createElement("p");
const pYear = document.createElement("p");
const popup = document.querySelector("#popup");
const currDate = new Date();
let monthUsrIsOn = currDate.getMonth();
let yearUsrIsOn = currDate.getFullYear();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dateData = {};
document.getElementById("prev").addEventListener("click", changeToPrevMonth);
document.getElementById("next").addEventListener("click", changeToNextMonth);
generateMonthAndYear();
function generateDates() {
  while (datesElem.firstChild) {
    datesElem.removeChild(datesElem.firstChild);
  }
  const weekDayOfFirstDayOfMonth = getWeekDay(yearUsrIsOn, monthUsrIsOn, 1);
  if (weekDayOfFirstDayOfMonth > 1) {
    let hightestDateOfPrevMonth = 0;
    if (monthUsrIsOn !== 0) {
      hightestDateOfPrevMonth = getNumberOfDaysOfMonth(
        yearUsrIsOn,
        monthUsrIsOn - 1
      );
    } else {
      hightestDateOfPrevMonth = getNumberOfDaysOfMonth(
        yearUsrIsOn - 1,
        monthUsrIsOn - 1
      );
    }
    for (
      let i = hightestDateOfPrevMonth - (weekDayOfFirstDayOfMonth - 2);
      i <= hightestDateOfPrevMonth;
      i++
    ) {
      createAndAppendLiWithDateNum(i, false, ["not-curr-month", "prev-month"]);
    }
  }
  let numOfDaysInCurrMonth = getNumberOfDaysOfMonth(yearUsrIsOn, monthUsrIsOn);
  for (let i = 1; i <= numOfDaysInCurrMonth; i++) {
    dateData[i] = document.createElement("ul");
    createAndAppendLiWithDateNum(i, true, ["curr-month"]);
  }
  const weekDayOfLastDateOfMonth = getWeekDay(
    yearUsrIsOn,
    monthUsrIsOn,
    numOfDaysInCurrMonth
  );
  if (weekDayOfLastDateOfMonth !== 0) {
    let addDate = 1;
    for (let i = 7 - (7 - weekDayOfLastDateOfMonth); i < 7; i++) {
      createAndAppendLiWithDateNum(addDate, false, [
        "not-curr-month",
        "next-month",
      ]);
      addDate++;
    }
  }
}
function createAndAppendLiWithDateNum(num, isCurrMonth, liClassArr) {
  const li = document.createElement("li");
  li.textContent = num;
  if (isCurrMonth) {
    if (num === currDate.getDate()) {
      li.id = "active";
      showPopupOnSelectedDate(num);
    }
  }
  for (const className of liClassArr) {
    li.classList.add(className);
  }
  datesElem.appendChild(li);
}
function generateMonthAndYear() {
  pMonth.textContent = months[monthUsrIsOn];
  pYear.textContent = currDate.getFullYear();
  pMonth.id = "monthHeaderName";
  pYear.id = "yearHeaderName";
  pMonth.className = "month-year-header";
  pYear.className = "month-year-header";
  div.append(pMonth, pYear);
  div.style.margin = "auto";
  generateDates();
  document.getElementById("month-header").appendChild(div);
}
function selectActiveDate() {
  datesElem.addEventListener("click", (e) => {
    const prevActive = document.getElementById("active");
    if (e.target.nodeName === "LI") {
      if (e.target.className === "curr-month") {
        checkPrevActive(e);
      } else if (e.target.className === "prev-month") {
        changeToPrevMonth();
        checkPrevActive(e);
      } else if (e.target.className === "next-month") {
        changeToNextMonth();
        checkPrevActive(e);
      }
      function checkPrevActive(e) {
        if (prevActive !== e.target) {
          prevActive.id = "";
          e.target.id = "active";
          showPopupOnSelectedDate(e);
        }
      }
    }
  });
}
//if initializing the first arg is num not event
function showPopupOnSelectedDate(e) {
  const input = document.createElement("input");
  const btn = document.createElement("button");
  btn.style.width = "1em";
  btn.style.height = "1em";
  while (popup.childNodes[2]) {
    popup.childNodes[2].remove();
  }
  let ul;
  if (typeof e === 'number') {
    ul = dateData[e];
  }else{
    ul = dateData[e.target.textContent];
  }
  btn.addEventListener("click", () => {
    const li = document.createElement("li");
    li.textContent = input.value;
    li.style.display = "block";
    let dateDataKey;
    if (typeof e === 'number') {
      dateDataKey = e;
    } else {
      dateDataKey = e.target.textContente;
    }
    ul = dateData[dateDataKey];
    ul.appendChild(li);
    dateData[dateData] = ul;
  });
  popup.append(input, btn);
  popup.appendChild(ul);
  popup.style.display = "block";
}
function changeToPrevMonth() {
  if (monthUsrIsOn === 0) {
    monthUsrIsOn = 12;
    yearUsrIsOn--;
    pYear.textContent = yearUsrIsOn;
  }
  monthUsrIsOn--;
  generateDates();
  pMonth.textContent = months[monthUsrIsOn];
}
function changeToNextMonth() {
  if (monthUsrIsOn === 11) {
    monthUsrIsOn = -1;
    yearUsrIsOn++;
    pYear.textContent = yearUsrIsOn;
  }
  monthUsrIsOn++;
  generateDates();
  pMonth.textContent = months[monthUsrIsOn];
}
function getNumberOfDaysOfMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getWeekDay(year, month, day) {
  return new Date(year, month, day).getDay();
}
