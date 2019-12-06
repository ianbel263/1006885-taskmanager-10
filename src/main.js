import {tasks} from './mock/task.js';
import {filters} from './mock/filter.js';
import {render, RenderPosition} from './utils/render.js';
import BoardComponent from './components/board.js';
import BoardController from './controllers/board.js';
import FilterComponent from './components/site-filter.js';
import SiteMenuComponent from './components/site-menu.js';

const siteMainElement = document.querySelector(`.main`);
const siteControlElement = siteMainElement.querySelector(`.main__control`);

render(siteControlElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

const boardController = new BoardController(boardComponent);
boardController.render(tasks);
