export class Round {
    readonly element: HTMLElement
    
    count: number 

    constructor() {
        this.element = document.getElementById('round-id')
        this.count = 0;
    }

    increment() {
        this.count++

        this.element.innerText = this.count.toString()
    }

    decrement() {
        this.count--

        this.element.innerText = this.count.toString()
    }
}