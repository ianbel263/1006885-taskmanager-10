import TaskEditComponent from '../components/task-edit.js';
import TaskComponent from '../components/task.js';
import {ESC_KEYCODE} from '../constants.js';
import {render, replace, RenderPosition} from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._taskComponent = null;
    this._taskEditComponent = null;

    this._onEscPress = this._onEscPress.bind(this);
  }

  render(task) {

    const oldTaskComponent = this._taskComponent;
    const oldTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new TaskComponent(task);
    this._taskEditComponent = new TaskEditComponent(task);

    this._taskComponent.setEditButtonClickHandler(() => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._onEscPress);
    });

    this._taskComponent.setOnArchiveButtonClick(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isArchive: !task.isArchive,
      }));
    });

    this._taskComponent.setOnFavoritesButtonClick(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isFavorite: !task.isFavorite,
      }));
    });

    this._taskEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToTask();
    });

    if (oldTaskEditComponent && oldTaskComponent) {
      replace(this._taskComponent, oldTaskComponent);
      replace(this._taskEditComponent, oldTaskEditComponent);
    } else {
      render(this._container, this._taskComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToTask();
    }
  }

  _replaceEditToTask() {
    this._taskEditComponent.reset();

    replace(this._taskComponent, this._taskEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _replaceTaskToEdit() {
    this._onViewChange();

    replace(this._taskEditComponent, this._taskComponent);
    this._mode = Mode.EDIT;
  }

  _onEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscPress);
    }
  }
}
