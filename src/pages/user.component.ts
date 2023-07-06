import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserModel} from "../models/user.model";
import {UserService} from "../mock-service/user.service";
import { MatDialog } from "@angular/material/dialog";
import {NewUserDialogComponent} from "../dialogs/new-user/new-user-dialog.component";
import {BehaviorSubject, Observable, of} from "rxjs";
import {EditUserDialogComponent} from "../dialogs/edit-user/edit-user-dialog.component";
import {DeleteUserDialogComponent} from "../dialogs/delete-user/delete-user-dialog.component";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;
  user: UserModel = new UserModel();
  displayedColumns = ['id', 'email', 'username', 'actions']
  dataSource: MatTableDataSource<UserModel> = new MatTableDataSource<UserModel>();
  users$: Observable<UserModel[]> = new BehaviorSubject<UserModel[]>([]);
  allUsers: UserModel[] = [];
  search: string = '';

  constructor(private userService: UserService,
              public dialog: MatDialog,
              private _liveAnnouncer: LiveAnnouncer
              ) {

  }
  ngOnInit(): void {
    this.allUsers = this.userService.findAll(this.paginator);
    this.users$ = of(this.allUsers);
    this.users$.subscribe(res => {
      this.dataSource.data = res;
    });
  }

  refreshData() {
    this.users$ = of(this.userService.findAll());
    this.users$.subscribe(res => {
      this.dataSource.data = res;
    });
  }

  searchFilter() {
    const filterValue = this.search.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(NewUserDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.paginator.length = this.allUsers.length;
        this.paginator.pageIndex = Math.ceil(this.allUsers.length / this.paginator.pageSize) - 1;
        this.refreshData();
      }
    });
  }

  openUpdateUserDialog(user: UserModel): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { userId: user.id, email: user.email, username: user.username, editMode: true },
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(updatedUserData => {
      if (updatedUserData) {
        this.refreshData();
      }
    });
  }

  openViewUserDialog(user: UserModel): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { userId: user.id, email: user.email, username: user.username, editMode: false },
      width: '300px',
    });
  }

  openDeleteUserDialog(user: UserModel): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: { userId: user.id, email: user.email, username: user.username },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(deletedUser => {
      if (deletedUser) {
        this.refreshData();
      }
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.users$.subscribe(res => {
      this.dataSource.data = res;
    });
  }
}
