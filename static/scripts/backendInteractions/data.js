import { repeat } from "../api/lib.js";
import { get, getFormData, post, put } from "../api/api.js";
import { showPopupOnSelectedDate } from "../calendarView/datePopup.js";
import { getActiveDateParams } from "../calendarView/calendarMain.js";

export async function onSubmitExerciseInstance(ev, userId) {
  const instanceUrl = "/DoneExercise";
  const activeDate = getActiveDateParams();
  try {
    const formData = getFormData(ev);
    const filter = {
      objectId: formData.name,
    };
    let exerciseUrl = "/Exercise";
    let quary = "?where=" + JSON.stringify(filter);
    const exercise = (await get(exerciseUrl + quary)).results[0];
    const sentData = {
      name: exercise.name,
      sets: formData.sets,
      reps: formData.reps,
      note: formData.note,
      date: {
        __type: "Date",
        //2022-08-12T14:22:00.000Z
        iso: `${activeDate.year}-${activeDate.month + 1}-${activeDate.day}`,
      },
      user: {
        __type: "Pointer",
        className: "_User",
        objectId: userId,
      },
      exercise: {
        __type: "Pointer",
        className: "Exercise",
        objectId: exercise.objectId,
      },
    };
    ev.target.reset();
    quary = encodeURI(quary);
    const result = await post(instanceUrl, sentData);
    await put(exerciseUrl + "/" + exercise.objectId, {
      instances: { __op: "AddUnique", objects: [result.objectId] },
    });
    showPopupOnSelectedDate();
  } catch (err) {
    alert(err);
  }
}
export async function onSubmitNewExercise(ev, userId) {
  const url = "/Exercise";
  try {
    const formData = getFormData(ev);
    const sentData = {
      name: formData.name,
      targetArea: formData.area,
      targetMuscles: [formData.muscles],
      note: formData.note,
      user: {
        __type: "Pointer",
        className: "_User",
        objectId: userId,
      },
    };
    await post(url, sentData);
    return sentData.name;
  } catch (err) {
    alert(err);
  }
}
export async function getExercises(url, exerciseCard) {
  const exercises = await get(url);
  return repeat(exercises.results, (e) => e.objectId, exerciseCard);
}
