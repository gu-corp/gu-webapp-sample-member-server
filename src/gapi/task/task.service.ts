import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { NewTaskInput } from './new-task.input';
import { Logger } from '@nestjs/common';
@Injectable()
export class TaskService {
  private _index = 0;
  private _tasks: Task[] = [];

  async addTask(input: NewTaskInput): Promise<Task> {
    const task = new Task();
    task.id = ++this._index;
    task.name = input.name;
    const length = this._tasks.push(task);
    return this._tasks[length - 1];
  }

  async listTasks() {
    return this._tasks;
  }
}
