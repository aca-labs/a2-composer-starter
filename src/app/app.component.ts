/*
* Angular 2 decorators and services
*/
import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { NotificationService, ModalService } from '@aca-1/a2-widgets';

/*
* App Component
* Top Level Component
*/
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./app.style.scss')
    ],
    template: `
    <div class="app">
        <router-outlet></router-outlet>
    </div>
    `
})
export class App {
    constructor(private view: ViewContainerRef,
                private modal: ModalService,
                private notify: NotificationService ) {
        modal.view = view;
        notify.view = view;
        notify.canClose(false, 5000);

    }
}
