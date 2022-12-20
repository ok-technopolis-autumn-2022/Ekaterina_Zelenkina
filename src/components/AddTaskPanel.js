import Task from "../models/Task";
import { dispatch } from "../store";
import Actions from "../store/Actions";
import counter from "../utils/counter";

export default class AddTaskPanel {
  constructor() {
    const add_task = document.querySelector('.add-task');
    add_task.addEventListener('click', (e) => {
      e.preventDefault();
      dispatch({
        type: Actions.SetAllTasksCompleted,
      });
    });

    const input = document.querySelector('.add-task-text');
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const task = new Task(counter(), input.value, false);
        dispatch({
          type: Actions.AddTask,
          payload: {
            task,
          }
        });
        input.value = '';
      }
    })
  }
}