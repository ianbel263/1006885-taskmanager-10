import AbstractComponent from './abstract-component.js';

const createTasksContainerTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};


export default class TasksContainer extends AbstractComponent {
  getTemplate() {
    return createTasksContainerTemplate();
  }
}
