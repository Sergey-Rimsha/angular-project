import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Address } from '../parent.component'

export interface Grade {
  math: number
  physic: number
}

@Component({
  selector: 'inst-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent {
  name = 'Ivan'
  // add props Input дикаратор
  @Input() surnameProps?: string
  @Input() city?: string
  @Input() address?: Address

  @Output() sendGradeEvent = new EventEmitter<Grade>()
  sendGradeHandler() {
    const math = 5
    const physic = 10
    this.sendGradeEvent.emit({ math, physic })
  }

  @Output() sendGrateArrHandlerEvent = new EventEmitter<string>()

  inputGrade = ''

  sendGrateArrHandler() {
    this.sendGrateArrHandlerEvent.emit(this.inputGrade)
  }
}
