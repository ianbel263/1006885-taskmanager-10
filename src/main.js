import {tasks} from './mock/task.js';
import {render, RenderPosition} from './utils/render.js';
import BoardComponent from './components/board.js';
import BoardController from './controllers/board.js';
import StatisticsComponent from './components/statistics.js';
import TasksModel from './models/tasks-model.js';
import FilterController from './controllers/filter.js';
import SiteMenuComponent, {MenuItem} from './components/site-menu.js';

const siteMainElement = document.querySelector(`.main`);
const siteControlElement = siteMainElement.querySelector(`.main__control`);

const siteMenuComponent = new SiteMenuComponent();
// const statisticsComponent = new StatisticsComponent();

render(siteControlElement, siteMenuComponent, RenderPosition.BEFOREEND);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();
const statisticsComponent = new StatisticsComponent({tasks: tasksModel, dateFrom, dateTo});

const filterController = new FilterController(siteMainElement, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);

const boardController = new BoardController(boardComponent, tasksModel);
statisticsComponent.hide();
boardController.render();

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      siteMenuComponent.setActiveItem(MenuItem.TASKS);
      statisticsComponent.hide();
      boardController.show();
      boardController.createTask();
      break;
    case MenuItem.STATISTICS:
      boardController.hide();
      statisticsComponent.show();
      break;
    case MenuItem.TASKS:
      statisticsComponent.hide();
      boardController.show();
      break;
  }
});
