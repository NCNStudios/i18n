import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-add-multiple',
  templateUrl: './add-multiple.component.html',
  styleUrls: ['./add-multiple.component.scss']
})
export class AddMultipleComponent implements OnInit {
  addForm = new FormGroup({
    err: new FormControl('')
  });
  listSplited = [];
  public reg = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  err = new FormControl('', [Validators.required, Validators.pattern(this.reg)]);
  vi = new FormControl('', [Validators.required, Validators.pattern(this.reg)]);
  en = new FormControl('', [Validators.required, Validators.pattern(this.reg)]);

  translateWindow: any;
  isTranslated = false;
  listTrans = [];

  constructor(
    public dialogRef: MatDialogRef<AddMultipleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmAddMultiDialogModel,
  ) { }

  ngOnInit(): void {
    const local = localStorage.getItem('listTrans');
    this.listTrans = JSON.parse(local);
  }

  async split() {
    const formOBJ = this.addForm.getRawValue();
    const arr = formOBJ.err.split('\n');
    for await (const str of arr) {
      if (str != null && str.trim() != '') {
        const index1 = str.indexOf('["');
        const index2 = str.indexOf('"]');
        const index3 = str.indexOf('("');
        const index4 = str.indexOf('")');
        if (index1 !== -1) {
          const code = str.substring(index1 + 2, index2);
          const text = str.substring(index3 + 2, index4);
          let data = {
            code,
            textVi: text
          };
          const exist = this.listSplited.filter(ls => ls.code === code);
          if (exist == undefined || exist == null || exist.length == 0) {
            this.listSplited.push(data);
          }
        }
      }
    }
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

export class ConfirmAddMultiDialogModel {
  constructor() {
  }
}
