import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RightViewComponent } from './right-view/right-view.component';
import { ToDoService } from './service/to-do.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AddTaskComponent } from './right-view/add-task/add-task.component';
import { ShowTaskComponent } from './right-view/show-task/show-task.component';

@NgModule({
   declarations: [
      AppComponent,
      RightViewComponent,
      AddTaskComponent,
      ShowTaskComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule, ReactiveFormsModule,
      ModalModule.forRoot(),
   ],
   providers: [ToDoService],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [AddTaskComponent]
})
export class AppModule { }
