import { changeToNextMonth, changeToPrevMonth } from "./changeMonth.js";
import { showPopupOnSelectedDate } from "./datePopup.js";


function selectActiveDate(e) {
  const prevActive = document.querySelector(".active");
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
        prevActive.classList.remove("active");
        e.target.classList.add("active");
        showPopupOnSelectedDate(e);
      }
    }
  }
}

export { selectActiveDate };
