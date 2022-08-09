import { repeat } from "../api/lib.js";
import { get, getFormData, post } from "../api/api.js";
import { currDate } from "../calendarView/changeMonth.js";
import { showPopupOnSelectedDate } from "../calendarView/datePopup.js";

export async function onSubmitExerciseInstance(ev, userId) {
  const url = "/DoneExercises";
  try {
    const formData = getFormData(ev);
    const sentData = {
      name: formData.name,
      sets: formData.sets,
      reps: formData.reps,
      note: formData.note,
      date: {
        __type: "Date",
        iso: currDate,
      },
      user: {
        __type: "Pointer",
        className: "_User",
        objectId: userId,
      },
    };
    ev.target.reset();
    await post(url, sentData);
    showPopupOnSelectedDate();
  } catch (err) {
    alert(err);
  }
}
export async function onSubmitNewExercise(ev) {
  const url = "/Exercise";
  try {
    const formData = getFormData(ev);
    const sentData = {
      name: formData.name,
      targetArea: formData.area,
      targetMuscles: [formData.muscles],
      note: formData.note,
    };
    await post(url, sentData);
  } catch (err) {
    alert(err);
  }
}
export async function getExercises(url, exerciseCard) {
  const exercises = await get(url);
  return repeat(exercises.results, (e) => e.objectId, exerciseCard);
}
