import {getTasksByFilter} from '../utils/filter.js';
import {FilterType} from '../constants.js';

export default class Tasks {
  constructor() {
    this._tasks = [];

    this._activeFilterType = FilterType.ALL;
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getTasks() {
    return getTasksByFilter(this._tasks, this._activeFilterType);
  }

  getTasksAll() {
    return this._tasks;
  }

  setTasks(tasks) {
    this._tasks = Array.from(tasks);
  }

  updateTask(id, task) {
    const index = this._tasks.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._tasks = [
      ...this._tasks.slice(0, index),
      task,
      ...this._tasks.slice(index + 1)
    ];

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  removeTask(id) {
    const index = this._tasks.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._tasks = [
      ...this._tasks.slice(0, index),
      ...this._tasks.slice(index + 1)
    ];

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  addTask(task) {
    this._tasks = [].concat(task, this._tasks);
    this._callHandlers(this._dataChangeHandlers);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
