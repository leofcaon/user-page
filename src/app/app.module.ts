import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {UserComponent} from "../pages/user.component";
import {MatTableModule} from "@angular/material/table";
import {UserService} from "../mock-service/user.service";
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {NewUserDialogComponent} from "../dialogs/new-user/new-user-dialog.component";
import {EditUserDialogComponent} from "../dialogs/edit-user/edit-user-dialog.component";
import {DeleteUserDialogComponent} from "../dialogs/delete-user/delete-user-dialog.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NewUserDialogComponent,
    EditUserDialogComponent,
    DeleteUserDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [
    UserService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
