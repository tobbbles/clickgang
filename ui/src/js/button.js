export default class Button {
    constructor() {
        this.state.element = document.getElementById('cg-action');
    }


    disable() {
        this.state.element.classList.remove('active');
    }
};