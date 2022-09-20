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
  title = 'angular-project'
  appTitle: string = 'Instagram'

  user: IUser = {
    age: 28,
    name: 'Sergey',
  }

  // Property binding
  isAppLoading = true

  constructor() {
    setTimeout(() => {
      this.isAppLoading = false
    }, 3000)
  }
}
