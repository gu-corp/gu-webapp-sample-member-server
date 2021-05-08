import { Args, Mutation, Query, Resolver, ResolveField, Subscription, Parent } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { Task } from './task.model';
import { NewTaskInput } from './new-task.input';
import { TaskService } from './task.service';

const pubSub = new PubSub();

@Resolver(of => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {
  }

  @Query(returns => [Task])
  async listTasks(): Promise<Task[]> {
    
    return await this.taskService.listTasks();
  }

  @Mutation(returns => Task)
  async addTask(@Args('newTaskData') input: NewTaskInput): Promise<Task> {
    const task = this.taskService.addTask(input);
    pubSub.publish('taskAdded', { taskAdded: task });
    return task;
  }

  @Subscription(returns => Task)
  taskAdded() {
    return pubSub.asyncIterator('taskAdded');
  }
}
