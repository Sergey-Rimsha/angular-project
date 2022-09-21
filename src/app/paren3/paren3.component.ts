import { Component, OnInit } from '@angular/core'
import { ValueService } from '../services/value.service'
import { Observable } from 'rxjs'
import { LogService } from '../services/log.service'

@Component({
  selector: 'inst-paren3',
  templateUrl: './paren3.component.html',
  styleUrls: ['./paren3.component.scss'],
})
export class Paren3Component implements OnInit {
  constructor(private valueService: ValueService, private logService: LogService) {}

  // public test = 1

  test$ = new Observable()

  ngOnInit(): void {
    // this.valueService.value$.subscribe(value => {
    //   this.test = value
    // })

    this.test$ = this.valueService.value$
  }

  addValueHandler() {
    this.valueService.add()
    this.logService.log('add + 1', 'success')
  }

  decValueHandler() {
    this.valueService.dec()
    this.logService.log('dec - 1', 'warning')
  }
}
