import {Component, EventEmitter, Inject, Output} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {UserService} from "../../mock-service/user.service";

@Component({
  selector: 'edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent {
  @Output() dataSaved: EventEmitter<void> = new EventEmitter<void>();

  userId: number = 0;
  updatedEmail: string = '';
  updatedUsername: string = '';

  editMode: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userId = data.userId;
    this.updatedEmail = data.email;
    this.updatedUsername = data.username;
    this.editMode = data.editMode;
  }

  onSave(): void {
    const userData = {
      id: this.userId,
      email: this.updatedEmail,
      username: this.updatedUsername
    };

    if(userData) {

      this.userService.update(userData);
      this.dataSaved.emit();
    }

    this.dialogRef.close(userData);
  }
}
