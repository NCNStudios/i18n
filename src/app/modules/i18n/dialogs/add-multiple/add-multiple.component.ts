import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/data/service/snackbar/snackbar.service';
import { TranslateService } from 'src/app/data/service/translate/translate.service';
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
  isTranslating = false;

  constructor(
    public dialogRef: MatDialogRef<AddMultipleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmAddMultiDialogModel,
    private translateService: TranslateService,
    private snackbar: SnackbarService
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

  remove(code) {
    this.listSplited.forEach((element, index) => {
      if (element.code === code) {
        this.listSplited.splice(index, 1);
      }
    });
  }

  async onConfirm(): Promise<void> {
    for await (const item of this.listSplited) {
      this.listTrans.push({
        id: item.code,
        vi: item.textVi,
        en: item.textEn,
        created: new Date().getTime()
      });
      localStorage.setItem('listTrans', JSON.stringify(this.listTrans));
    }
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    if (this.isTranslated === true) {
      this.closeWin();
    }
    this.dialogRef.close(false);
  }

  async translate(): Promise<void> {
    this.isTranslating = true;
    let requestBody = {
      from: "vi",
      to: "en",
      e: "",
      q: []
    }
    for await (const item of this.listSplited) {
      requestBody.q.push(item.textVi);
    }
    const reBody = JSON.stringify(requestBody, null, 2);
    this.translateService.postTranslate(reBody).subscribe(async data => {
      let index = 0;
      for await (const trans of data) {
        this.listSplited[index].textEn = trans;
        index++;
      }
      setTimeout(() => {
        this.isTranslating = false;
      }, 1000);
    }, err => {
      this.snackbar.openSnackBar('Chuyển đổi', 'bản dịch', 'thất bại!', '', 'error_notification');
      setTimeout(() => {
        this.isTranslating = false;
      }, 1000);
    });
  }

  closeWin(): void {
    this.translateWindow.close();
  }

}

export class ConfirmAddMultiDialogModel {
  constructor() {
  }
}
