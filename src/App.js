import Tasks from "./components/Tasks";
import AddTaskPanel from "./components/AddTaskPanel"
import FilterTask from './components/FilterTask'
import { notify } from "./store"

export default class App {
  constructor() {
    new AddTaskPanel();
    new Tasks();
    new FilterTask();

    notify();
  }
}