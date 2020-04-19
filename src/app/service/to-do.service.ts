import { Injectable } from '@angular/core';
import { ToDoTask } from './ToDoTask';

@Injectable()
export class ToDoService {
    private ToDoList: ToDoTask[] = [];
    constructor() { }

    add(task: ToDoTask) {
        this.ToDoList.push(task);
        console.log(this.ToDoList);
    }

    getAll(filter: Date) {
        const records = this.ToDoList.filter(x => x.date.getDate() === filter.getDate()
        && x.date.getFullYear() === filter.getFullYear() && x.date.getMonth() === filter.getMonth());
        return records;
    }
}


