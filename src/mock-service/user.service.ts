import { Injectable } from '@angular/core';
import {UserModel} from "../models/user.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatPaginator} from "@angular/material/paginator";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserModel = new UserModel();
  lastIdMock: number = 3
  users: UserModel[] = [
    {
      id: 1,
      email: "alisha@gmail.com",
      username: "Alisha"
    },
    {
      id: 2,
      email: "john@gmail.com",
      username: "John25"
    },
    {
      id: 3,
      email: "billy@gmail.com",
      username: "Billy88"
    }
  ];

  constructor(private snackBar: MatSnackBar) {
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }
  findAll(paginator?: MatPaginator): UserModel[] {
    if (paginator) {
      const startIndex = paginator.pageIndex * paginator.pageSize;
      const endIndex = startIndex + paginator.pageSize;
      const filteredUsers = this.users.slice(startIndex, endIndex);
      return filteredUsers;
    }
    return this.users;
  }

  save(user: UserModel) {
    user.id = this.lastIdMock + 1;
    this.users.push(user);
    this.lastIdMock++
  }

  update(user: UserModel) {
    const existingUserIndex = this.users.findIndex(u => u.id === user.id);
    if (existingUserIndex !== -1) {
      this.users[existingUserIndex] = { ...this.users[existingUserIndex], ...user };
    }
  }

  delete(user: UserModel): void {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}
