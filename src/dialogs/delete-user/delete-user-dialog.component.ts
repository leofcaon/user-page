import {Component, EventEmitter, Inject, Output} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {UserService} from "../../mock-service/user.service";

@Component({
  selector: 'delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent {
  @Output() dataSaved: EventEmitter<void> = new EventEmitter<void>();
  userId: number = 0;
  email: string = '';
  username: string = '';

  constructor(
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userId = data.userId;
    this.email = data.email;
    this.username = data.username;
  }

  onDelete(): void {
    const userData = {
      id: this.userId,
      email: this.email,
      username: this.username
    };

    if(userData) {
      this.userService.delete(userData);
      this.dataSaved.emit();
    }

    this.dialogRef.close(userData);
  }
}
