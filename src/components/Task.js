import Actions from "../store/Actions";
import { dispatch } from "../store";

export default class Task {
  constructor(task) {
    this.task = task;
  }

  render = () => {
    const liNode = document.createElement('li');
    liNode.className = 'task'
    const inputCheckBoxNode = document.createElement('input');
    inputCheckBoxNode.type = 'checkbox';
    inputCheckBoxNode.ariaLabel = 'aria-label';
    inputCheckBoxNode.checked = this.task.status;
    inputCheckBoxNode.addEventListener('change', (event) => {
      this.task.status = event.target.checked;
      dispatch({
        type: Actions.ChangeTask,
        payload: {
          task: this.task
        },
      });
    });
    const spanNode = document.createElement('span');
    spanNode.className = 'task-text';
    spanNode.innerText = this.task.text;
    const inputButtonNode = document.createElement('input');
    inputButtonNode.type = 'button';
    inputButtonNode.className = 'delete-task';
    inputButtonNode.title = 'Delete a task';
    inputButtonNode.addEventListener('click', () => {
      dispatch({
        type: Actions.DeleteTask,
        payload: {
          task: this.task,
        }
      })
    });

    liNode.appendChild(inputCheckBoxNode);
    liNode.appendChild(spanNode);
    liNode.appendChild(inputButtonNode);

    return liNode;
  }
}