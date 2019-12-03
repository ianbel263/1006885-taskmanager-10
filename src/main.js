import {createSiteMenuTemplate} from './components/site-menu.js';
import {createSiteFilterTemplate} from './components/site-filter.js';
import {createBoardTemplate} from './components/board.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createTaskTemplate} from './components/task.js';
import {createLoadMoreButtomTemplate} from './components/load-more-btn.js';
import {tasks} from './mock/task.js';
import {filters} from './mock/filter.js';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const main = document.querySelector(`.main`);
const siteControl = main.querySelector(`.main__control`);
render(siteControl, createSiteMenuTemplate());

render(main, createSiteFilterTemplate(filters));

render(main, createBoardTemplate());

const taskList = main.querySelector(`.board__tasks`);

render(taskList, createTaskEditTemplate(tasks[0]));
let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks.slice(1, showingTasksCount).forEach((task) => render(taskList, createTaskTemplate(task)));

const board = main.querySelector(`.board`);
render(board, createLoadMoreButtomTemplate());

const loadMoreBtn = main.querySelector(`.load-more`);

loadMoreBtn.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(taskList, createTaskTemplate(task)));

  if (showingTasksCount >= tasks.length) {
    loadMoreBtn.remove();
  }
});
