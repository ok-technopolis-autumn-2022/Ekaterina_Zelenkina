import Actions from './Actions';
import FilterModeStatus from '../models/FilterModeStatus'
import Observer from './Observer';

const observer = new Observer();

let initialState = {
  tasks: {},
  count: 0,
  countActive: 0,
  countCompleted: 0,
  filter_mode_status: FilterModeStatus.All,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.AddTask:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.task.id]: action.payload.task,
        },
        count: state.count + 1,
        countActive: state.countActive + 1,
      }
    case Actions.ChangeTask:
      state.tasks[action.payload.task.id] = action.payload.task;
      return {
        ...state,
        countActive: action.payload.task.status ? state.countActive - 1 : state.countActive + 1,
        countCompleted: action.payload.task.status ? state.countCompleted + 1 : state.countCompleted - 1,
      }
    case Actions.DeleteTask:
      delete state.tasks[action.payload.task.id];
      return {
        ...state,
        count: state.count - 1,
        countActive: action.payload.task.status ? state.countActive : state.countActive - 1,
        countCompleted: action.payload.task.status ? state.countCompleted - 1 : state.countCompleted,
      }
    case Actions.DeleteAllTasks:
      return {
        ...state,
        tasks: {},
        count: 0,
        countActive: 0,
        countCompleted: 0,
      }
    case Actions.ChangeFilterStatus:
      return {
        ...state,
        filter_mode_status: action.payload.status,
      }
    case Actions.SetAllTasksCompleted:
      Object.keys(state.tasks).forEach(id => state.tasks[id].status = true);
      return {
        ...state,
        countActive: 0,
        countCompleted: state.count,  
      }
  }
}

export const dispatch = (action) => {
  initialState = rootReducer(initialState, action);
  observer.notify();
}

export const selector = (callback) => {
  return callback(initialState);
}

export const subscribe = (subscriber) => observer.subscribe(subscriber);
export const unSubscribe = (subscriber) => observer.unSubscribe(subscriber);
export const notify = () => observer.notify();
