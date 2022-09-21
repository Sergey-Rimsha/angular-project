import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { FormsModule } from '@angular/forms'
import { ChildComponent } from './parent/child/child.component'
import { ParentComponent } from './parent/parent.component'
import { Parent2Component } from './parent2/parent2.component'
import { Paren3Component } from './paren3/paren3.component'
import { ValueService } from './services/value.service'

@NgModule({
  declarations: [AppComponent, ChildComponent, ParentComponent, Parent2Component, Paren3Component],
  imports: [BrowserModule, FormsModule],
  providers: [ValueService],
  bootstrap: [AppComponent],
})
export class AppModule {}
