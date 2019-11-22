import {createSiteMenuTemplate} from './components/site-menu.js';
import {createSiteFilterTemplate} from './components/site-filter.js';
import {createBoardTemplate} from './components/board.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createTaskTemplate} from './components/task.js';
import {createLoadMoreButtomTemplate} from './components/load-more-btn.js';

const TASK_NUMBER = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const main = document.querySelector(`.main`);
const siteControl = main.querySelector(`.main__control`);
render(siteControl, createSiteMenuTemplate());
render(main, createSiteFilterTemplate());
render(main, createBoardTemplate());

const taskList = main.querySelector(`.board__tasks`);
render(taskList, createTaskEditTemplate());

for (let i = 1; i <= TASK_NUMBER; i++) {
  render(taskList, createTaskTemplate());
}

const board = main.querySelector(`.board`);
render(board, createLoadMoreButtomTemplate());
