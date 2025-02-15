import { Injectable } from '@angular/core';
import { IUser } from '../types/user';
import { UtilsService } from './utils.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // List of users
  public users: IUser[] = [];
  public users$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

  // Dependancy injection
  constructor(private utilsService: UtilsService) {}

  // Adds user
  public addUser(user: IUser): void {
    this.users = [...this.users, user];
  }

  // Adds user with RxJs
  public addUserRx(user: IUser): void {
    this.users$.next([...this.users$.getValue(), user]);
  }

  // Removes user
  public removeUser(id: string): void {
    this.users = this.users.filter((user: IUser) => user.id !== id);
  }

  // Removes user with RxJs
  public removeUserRx(id: string): void {
    this.users$.next(this.users$.getValue().filter((user: IUser) => user.id !== id));
  }

  // Gets usernames
  public getUsernames(): string[] {
    return this.utilsService.pluck(this.users, 'name');
  }

  // Gets usernames with RxJs
  public getUsernamesRx(): string[] {
    return this.utilsService.pluck(this.users$.getValue(), 'name');
  }

}