import { Directive } from '@angular/core';

/**
 * Generated class for the PressDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[press]' // Attribute selector
})
export class PressDirective {

  constructor() {
    console.log('Hello PressDirective Directive');
  }

}
