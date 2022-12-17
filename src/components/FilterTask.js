import FilterModeStatus from '../models/FilterModeStatus';
import Actions from '../store/Actions';
import { dispatch, selector, subscribe } from '../store/index'

export default class FilterTask {
  constructor() {
    subscribe(this.render);

    const all_tasks = document.querySelector('#all-tasks');
    all_tasks.addEventListener('click', () => {
      dispatch({
        type: Actions.ChangeFilterStatus,
        payload: {
          status: FilterModeStatus.All
        }
      })
    });

    const active_tasks = document.querySelector('#active-tasks');
    active_tasks.addEventListener('click', () => {
      dispatch({
        type: Actions.ChangeFilterStatus,
        payload: {
          status: FilterModeStatus.Active
        }
      })
    });

    const completed_tasks = document.querySelector('#completed-tasks');
    completed_tasks.addEventListener('click', () => {
      dispatch({
        type: Actions.ChangeFilterStatus,
        payload: {
          status: FilterModeStatus.Completed
        }
      })
    });

    const clear_text = document.querySelector('.clear-text');
    clear_text.addEventListener('click', () => {
      dispatch({
        type: Actions.DeleteAllTasks,
      })
    });
  }

  render = () => {
    const status = selector((initialState) => initialState.filter_mode_status);
    let count;

    switch (status) {
      case FilterModeStatus.All:
        count = selector((initialState) => initialState.count);
        break;
      case FilterModeStatus.Active:
        count = selector((initialState) => initialState.countActive);
        break;
      case FilterModeStatus.Completed:
        count = selector((initialState) => initialState.countCompleted);
        break;
    }

    const counter = document.querySelector('.task-counter');
    counter.textContent = count + ' items left';
  }
}
