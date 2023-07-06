import {Component, EventEmitter, Inject, Output} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {UserService} from "../../mock-service/user.service";

@Component({
  selector: 'new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.css']
})
export class NewUserDialogComponent {
  @Output() dataSaved: EventEmitter<void> = new EventEmitter<void>();
  email: string = '';
  username: string = '';

  constructor(
    public dialogRef: MatDialogRef<NewUserDialogComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onSave(): void {
    const userData = {
      email: this.email,
      username: this.username
    };

    if(userData) {
      this.userService.save(userData);
      this.dataSaved.emit();
    }

    this.dialogRef.close(userData);
  }
}
