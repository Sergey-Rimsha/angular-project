import { Component } from '@angular/core'
import { Grade } from './child/child.component'

export interface Address {
  city: string
  street: string
  house: number
}

interface WeekGrade {
  id: number
  gradeItem: number
}

interface Lesson {
  id: number
  title: string
  weekGrades: WeekGrade[]
}

@Component({
  selector: 'inst-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
})
export class ParentComponent {
  name = 'Sergey'
  surname = 'Petrov'
  city = 'Minsk'

  address: Address = {
    city: 'Borisov',
    street: '50летБССР',
    house: 49,
  }

  math?: number
  physic?: number

  getGrade(value: Grade) {
    this.math = value.math
    this.physic = value.physic
  }

  grades: string[] = ['math: 5', 'english: 2']

  getGradeArr(grade: string) {
    this.grades.push(grade)
  }

  lessons: Lesson[] = [
    {
      id: 0,
      title: 'Math',
      weekGrades: [
        { id: 0, gradeItem: 4 },
        { id: 1, gradeItem: 3 },
        { id: 2, gradeItem: 1 },
      ],
    },
  ]
}
