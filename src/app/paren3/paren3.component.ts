import { Component, OnInit } from '@angular/core'
import { ValueService } from '../services/value.service'

@Component({
  selector: 'inst-paren3',
  templateUrl: './paren3.component.html',
  styleUrls: ['./paren3.component.scss'],
})
export class Paren3Component implements OnInit {
  constructor(private valueService: ValueService) {}

  public test = 1

  ngOnInit(): void {
    this.valueService.value$.subscribe(value => {
      this.test = value
    })
  }

  addValueHandler() {
    this.valueService.add()
  }

  decValueHandler() {
    this.valueService.dec()
  }
}
