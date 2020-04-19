import { Component, OnInit } from '@angular/core';
import { ToDoService } from 'src/app/service/to-do.service';
import { ToDoTask } from 'src/app/service/ToDoTask';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  addTaskForm: FormGroup;
  date: Date;
  isSuccess = false;
  constructor(private todoService: ToDoService, public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.addTaskForm = new FormGroup({
      task: new FormControl('', [Validators.required])
    });
  }

  onaddClick() {
    this.addTaskForm.markAllAsTouched();
    if (this.addTaskForm.valid) {
      console.log(this.date);
      const obj = new ToDoTask(this.date, this.addTaskForm.value.task);
      this.todoService.add(obj);
      this.isSuccess = true;
      this.bsModalRef.hide();
    }
  }
}
