import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  idTrans: number;
  transName: string;
  translateWindow: any;
  isTranslated = false;
  listTrans = [];

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDeleteDialogModel,
  ) {
    this.idTrans = data.id;
    this.transName = data.transName;
  }

  ngOnInit(): void {
    const local = localStorage.getItem('listTrans');
    this.listTrans = JSON.parse(local);
  }

  onConfirm(): void {
    this.listTrans.forEach((data, index) => {
      if (data.created === this.idTrans) {
        this.listTrans.splice(index, 1);
      }
    });
    localStorage.setItem('listTrans', JSON.stringify(this.listTrans));
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}

export class ConfirmDeleteDialogModel {
  constructor(public id: number, public transName: string) {
  }
}
