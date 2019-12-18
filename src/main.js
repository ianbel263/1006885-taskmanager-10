import {tasks} from './mock/task.js';
import {render, RenderPosition} from './utils/render.js';
import BoardComponent from './components/board.js';
import BoardController from './controllers/board.js';
import TasksModel from './models/tasks-model.js';
import FilterController from './controllers/filter.js';
import SiteMenuComponent from './components/site-menu.js';

const siteMainElement = document.querySelector(`.main`);
const siteControlElement = siteMainElement.querySelector(`.main__control`);

const siteMenuComponent = new SiteMenuComponent();
siteMenuComponent.getElement().querySelector(`.control__label--new-task`)
  .addEventListener(`click`, () => {
    boardController.createTask();
  });

render(siteControlElement, siteMenuComponent, RenderPosition.BEFOREEND);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterController = new FilterController(siteMainElement, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

const boardController = new BoardController(boardComponent, tasksModel);
boardController.render();
