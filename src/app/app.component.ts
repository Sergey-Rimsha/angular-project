import { Component } from '@angular/core'

interface IUser {
  age: number
  name: string
}

@Component({
  selector: 'inst-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Property binding
  isAppLoading = true

  constructor() {
    setTimeout(() => {
      this.isAppLoading = false
    }, 3000)
  }

  title = 'angular-project'
  appTitle: string = 'Instagram'

  user: IUser = {
    age: 28,
    name: 'Sergey',
  }

  // event binding
  changeTitleHandler() {
    this.title = 'Angular!!!'
  }

  // event binding input
  text = ''

  changeTextHandler($event: Event) {
    if (event) {
      this.text = (event.currentTarget as HTMLInputElement).value
    }
  }

  //Two-way binding
  textTwoWay = ''
}
