import { Component } from '@angular/core';
import { trigger, transition, animate, style, state, keyframes } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'simple',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './simple.style.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './simple.template.html'
})
export class SimpleComponent {
    image: string = 'http://static1.squarespace.com/static/52142586e4b0c09536a144ad/t/561327b2e4b06f521722e448/1469084115046/?format=1500w';
    title: string = 'Composer Starter Kit';
    system_data: any = {
        'sys-B0': {
            Cam: [{
                power: true,
                connected: true,
                $power: function (pwr: any) {
                    this.connected = !this.connected;
                }
            }],
            Lights: [{}],
            Projector: [{}, {}, {}]
        }
    }

    constructor(private router: Router) {

    }

    navigate(route: string) {
        this.router.navigate([route]);
    }
}
