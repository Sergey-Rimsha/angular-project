import { Injectable } from '@angular/core'

type LogType = 'error' | 'success' | 'info' | 'warning'

@Injectable({
  providedIn: 'root',
})
export class LogService {
  log(message: string, type: LogType) {
    console.log(`%c${message}`, this.getLog(type))
  }

  getLog(type: LogType) {
    switch (type) {
      case 'success':
        return 'background: green; color: white'
      case 'warning':
        return 'background: orange; color: black'
      default:
        return ''
    }
  }
}
