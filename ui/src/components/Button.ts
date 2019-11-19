export class Button {
    element: HTMLElement

    constructor(){
        this.element = document.getElementById('cg-action');
    }

    enable() {
        this.element.classList.add('active');
        this.element.innerText = "Click me now!";
    }

    disable() {
        this.element.classList.remove('active');
        this.element.innerText = "...";
    }
}