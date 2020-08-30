import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  addForm = new FormGroup({
    err: new FormControl(''),
    vi: new FormControl(''),
    en: new FormControl('')
  });
  public reg = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  err = new FormControl('', [Validators.required, Validators.pattern(this.reg)]);
  vi = new FormControl('', [Validators.required, Validators.pattern(this.reg)]);
  en = new FormControl('', [Validators.required, Validators.pattern(this.reg)]);

  translateWindow: any;
  isTranslated = false;
  listTrans = [];

  constructor(
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmAddDialogModel,
  ) { }

  ngOnInit(): void {
    const local = localStorage.getItem('listTrans');
    this.listTrans = JSON.parse(local);
  }

  onConfirm(): void {
    if (this.addForm.invalid === false) {
      if (this.isTranslated === true) {
        this.closeWin();
      }
      const formOBJ = this.addForm.getRawValue();
      this.listTrans.push({
        id: formOBJ.err,
        vi: formOBJ.vi,
        en: formOBJ.en,
        created: new Date().getTime()
      });
      localStorage.setItem('listTrans', JSON.stringify(this.listTrans));
      this.dialogRef.close(true);
    }
  }

  onDismiss(): void {
    if (this.isTranslated === true) {
      this.closeWin();
    }
    this.dialogRef.close(false);
  }

  translate(): void {
    this.isTranslated = true;
    const formOBJ = this.addForm.getRawValue();
    const link = 'https://translate.google.com/#view=home&op=translate&sl=vi&tl=en&text=' + formOBJ.vi;
    this.translateWindow = window.open(link, '_blank', 'resizable=no, toolbar=no, scrollbars=no, menubar=no, status=no, directories=no,top=50,left=500,width=400,height=500');
  }

  closeWin(): void {
    this.translateWindow.close();
  }

}

export class ConfirmAddDialogModel {
  constructor() {
  }
}
