import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/data/service/snackbar/snackbar.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddComponent, ConfirmAddDialogModel } from './dialogs/add/add.component';
import { UpdateComponent, ConfirmUpdateDialogModel } from './dialogs/update/update.component';
import { DeleteComponent, ConfirmDeleteDialogModel } from './dialogs/delete/delete.component';
import { DeleteAllComponent, ConfirmDeleteAllDialogModel } from './dialogs/delete-all/delete-all.component';
import { AddMultipleComponent, ConfirmAddMultiDialogModel } from './dialogs/add-multiple/add-multiple.component';

export interface PeriodicElement {
  id: string;
  vi: string;
  en: string;
  created: number;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-i18n',
  templateUrl: './i18n.component.html',
  styleUrls: ['./i18n.component.scss']
})
export class I18nComponent implements OnInit {
  listTrans = [];
  displayedColumns: string[] = ['stt', 'id', 'vi', 'en', 'action'];
  ELEMENTDATA: PeriodicElement[] = [];
  dataSource: MatTableDataSource<PeriodicElement>;

  codeVi = '';
  codeEn = '';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private snackbar: SnackbarService
  ) {
    this.dataSource = new MatTableDataSource(this.ELEMENTDATA);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getListTrans();
  }

  getListTrans() {
    const t = localStorage.getItem("listTrans");
    this.listTrans = JSON.parse(t);
    this.ELEMENTDATA = [];
    this.codeVi = "";
    this.codeEn = "";
    this.listTrans.forEach((t, n) => {
      t.stt = n + 1,
        this.ELEMENTDATA.push(t)
    }
    ),
      this.dataSource.data = this.ELEMENTDATA,
      this.convertToVi(),
      this.convertToEn()
  }
  convertToVi() {
    this.codeVi = "",
      this.listTrans.forEach(t => {
        this.codeVi += '<trans-unit id="' + t.id + '" datatype="html">\n  <source>' + t.en + "</source>\n  <target>" + t.vi + "</target>\n</trans-unit>\n"
      }
      )
  }
  convertToEn() {
    this.codeEn = "",
      this.listTrans.forEach(t => {
        this.codeEn += '<trans-unit id="' + t.id + '" datatype="html">\n  <source>' + t.en + "</source>\n  <target>" + t.en + "</target>\n</trans-unit>\n"
      }
      )
  }

  add(): void {
    const dialogData = new ConfirmAddDialogModel();
    const dialogRef = this.dialog.open(AddComponent, {
      width: '50vw',
      data: dialogData,
      disableClose: false,
      position: {
        top: '10em'
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.getListTrans();
        this.snackbar.openSnackBar('Thêm mới', 'bản dịch', 'thành công!', '', 'success_notification');
      }
    });
  }

  addMulti(): void {
    const dialogData = new ConfirmAddMultiDialogModel();
    const dialogRef = this.dialog.open(AddMultipleComponent, {
      width: '50vw',
      data: dialogData,
      disableClose: false,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.getListTrans();
        this.snackbar.openSnackBar('Thêm mới', 'bản dịch', 'thành công!', '', 'success_notification');
      }
    });
  }

  update(id): void {
    const dialogData = new ConfirmUpdateDialogModel(id);
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '50vw',
      data: dialogData,
      disableClose: false,
      position: {
        top: '10em'
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.getListTrans();
        this.snackbar.openSnackBar('Cập nhật', 'bản dịch', 'thành công!', '', 'success_notification');
      }
    });
  }

  delete(id, name): void {
    const dialogData = new ConfirmDeleteDialogModel(id, name);
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '40vw',
      data: dialogData,
      disableClose: false,
      position: {
        top: '10em'
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.getListTrans();
        this.snackbar.openSnackBar('Xoá', 'bản dịch', 'thành công!', '', 'success_notification');
      }
    });
  }

  deleteAll(): void {
    const dialogData = new ConfirmDeleteAllDialogModel();
    const dialogRef = this.dialog.open(DeleteAllComponent, {
      width: '40vw',
      data: dialogData,
      disableClose: false,
      position: {
        top: '10em'
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.getListTrans();
        this.snackbar.openSnackBar('Xoá tất cả', 'bản dịch', 'thành công!', '', 'success_notification');
      }
    });
  }
}


