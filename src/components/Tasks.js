import { subscribe, selector } from "../store";
import FilterModeStatus from "../models/FilterModeStatus";
import Task from "./Task";

export default class Tasks {
  constructor() {
    subscribe(this.render);
  }
  render = () => {
    const tasksNode = document.querySelector('.tasks');
    tasksNode.innerHTML = '';

    const tasks = selector((initialState) => {
      return initialState.tasks;
    });

    const status = selector((initialState) => {
      return initialState.filter_mode_status;
    });
    
    Object.entries(tasks)
      .filter(([id, task]) => 
        status === FilterModeStatus.All
        ? true
        : (status === FilterModeStatus.Active && !task.status) || (status === FilterModeStatus.Completed && task.status)
      )
      .forEach(([id, task]) => {
        const taskNode = new Task(task);
        tasksNode.appendChild(taskNode.render(task));
      });
  }
}