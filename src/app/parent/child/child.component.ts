import { Component, Input, OnInit } from '@angular/core'
import { Address } from '../parent.component'

@Component({
  selector: 'inst-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent {
  name = 'Ivan'
  // add props Input
  @Input() surnameProps?: string
  @Input() city?: string
  @Input() address?: Address
}
