import {createSiteMenuTemplate} from './components/site-menu.js';
import {createSiteFilterTemplate} from './components/site-filter.js';
import {createBoardTemplate} from './components/board.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createTaskTemplate} from './components/task.js';
import {createLoadMoreButtomTemplate} from './components/load-more-btn.js';
import {generateAllTasks} from './mock/task.js';
import {generateFilter} from './mock/filter.js';

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const main = document.querySelector(`.main`);
const siteControl = main.querySelector(`.main__control`);
render(siteControl, createSiteMenuTemplate());

const filters = generateFilter();
render(main, createSiteFilterTemplate(filters));

render(main, createBoardTemplate());

const taskList = main.querySelector(`.board__tasks`);
const tasks = generateAllTasks(TASK_COUNT);

render(taskList, createTaskEditTemplate(tasks[0]));
let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks.slice(1, showingTasksCount).forEach((task) => render(taskList, createTaskTemplate(task)));

const board = main.querySelector(`.board`);
render(board, createLoadMoreButtomTemplate());
