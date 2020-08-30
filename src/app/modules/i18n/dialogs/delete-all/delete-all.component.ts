import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-all',
  templateUrl: './delete-all.component.html',
  styleUrls: ['./delete-all.component.scss']
})
export class DeleteAllComponent implements OnInit {
  translateWindow: any;
  isTranslated = false;
  listTrans = [];

  constructor(
    public dialogRef: MatDialogRef<DeleteAllComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDeleteAllDialogModel,
  ) {
  }

  ngOnInit(): void {
    const local = localStorage.getItem('listTrans');
    this.listTrans = JSON.parse(local);
  }

  onConfirm(): void {
    this.listTrans = [];
    localStorage.setItem('listTrans', JSON.stringify(this.listTrans));
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}

export class ConfirmDeleteAllDialogModel {
  constructor() {
  }
}
