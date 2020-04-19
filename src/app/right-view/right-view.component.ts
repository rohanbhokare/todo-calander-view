import { Component, OnInit, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToDoService } from '../service/to-do.service';
import { ToDoTask } from '../service/ToDoTask';
import { AddTaskComponent } from './add-task/add-task.component';

@Component({
  selector: 'app-right-view',
  templateUrl: './right-view.component.html',
  styleUrls: ['./right-view.component.css']
})
export class RightViewComponent implements OnInit {
  currentDate = new Date();
  selectedYear: number;
  selectedMonth: string;
  selectedDate: number;
  rightViewValues: any[] = [];
  modalRef: BsModalRef;
  allMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  allDays = [
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'],
    ['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'],
    ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'],
    ['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'],
    ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  ];
  monthDays = [];
  constructor(private todoService: ToDoService, private modalService: BsModalService) { }

  ngOnInit() {
    this.setInitialDate();
    this.setDays();
    this.sortMonthsByDays();

    // demo task
    this.todoService.add(new ToDoTask(
      new Date(2020, 3, 4),
      'Call Rohan at 4:00pm'
    ));
  }

  setInitialDate() {
    const date = new Date();
    this.selectedMonth = this.allMonth[date.getMonth()];
    this.selectedYear = date.getFullYear();
    this.selectedDate = date.getDate();
  }

  sortMonthsByDays() {
    this.rightViewValues = [ { day: 'Sun', months: [] }, { day: 'Mon', months: [] }, { day: 'Tue', months: [] },
    { day: 'Wed', months: [] }, { day: 'Thur', months: [] }, { day: 'Fri', months: [] }, { day: 'Sat', months: [] } ];
    for (let index = 0; index < 12; index++) {
      const month = new Date(this.selectedYear, index, 1);
      const day = month.getDay();
      this.rightViewValues[day].months.push(this.allMonth[month.getMonth()]);
    }
  }



  getMonthCss(month: string) {
    const monthIndex = this.allMonth.indexOf(month);
    const date = new Date(this.selectedYear, monthIndex, 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    switch (lastDay.getDate()) {
      case 31:
        return '31';
      case 30:
          return '30';
      default:
        return 'feb';
    }
  }

  setDays() {
    this.monthDays = [];
    const firstDay = new Date(this.selectedYear, this.allMonth.indexOf(this.selectedMonth), 1);
    const lastDay = new Date(this.selectedYear, this.allMonth.indexOf(this.selectedMonth) + 1, 0);
    const toAdd = firstDay.getDay();
    console.log(toAdd);
    for (let index = 1; index < toAdd; index++) {
      this.monthDays.push(0);
    }
    for (let index = 1; index <=  lastDay.getDate(); index++) {
      this.monthDays.push(index);
    }

    // const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  changeYear(num: number) {
    this.selectedYear = this.selectedYear + num;
    this.sortMonthsByDays();
    this.setDays();
  }

  changeMonth(month: string) {
    if (month) {
    this.selectedMonth = month;
    this.setDays();
  }
    // console.log(this.ToDoList);
  }

  highligheCurrentDate(date) {
    if (this.selectedYear === this.currentDate.getFullYear()
      && this.selectedMonth === this.allMonth[this.currentDate.getMonth()]
      && date === this.currentDate.getDate()) {
        return true;
    }
    return false;
  }

  isTaskAvaliable(date: number) {
    if (date !== 0) {
      const currentIndexDate = new Date(this.selectedYear, this.allMonth.indexOf(this.selectedMonth), date);
      const record = this.todoService.getAll(currentIndexDate);
      if (record.length > 0) {
       return true;
      }
      return false;
    }
  }

  getTask(date) {
    if (date !== 0) {
      const currentSelectedDate = new Date(this.selectedYear, this.allMonth.indexOf(this.selectedMonth), date);
      return this.todoService.getAll(currentSelectedDate);
    }
  }

  AddEvent(date) {
    if (date !== 0) {
      const currentSelectedDate = new Date(this.selectedYear, this.allMonth.indexOf(this.selectedMonth), date);
      const initialState = {
        date: currentSelectedDate,
      };
      this.modalRef = this.modalService.show(AddTaskComponent, { initialState });
      // this.modalRef.setClass('modal-lg');
      const sub = this.modalService.onHide.subscribe(x => {
        if (this.modalRef.content.isSuccess) {
          this.setDays();
        }
        sub.unsubscribe();
      });
    }
  }
}
