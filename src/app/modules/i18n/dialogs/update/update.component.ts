import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  idTrans: number;
  updateForm = new FormGroup({
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
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmUpdateDialogModel,
  ) {
    this.idTrans = data.id;
  }

  ngOnInit(): void {
    const local = localStorage.getItem('listTrans');
    this.listTrans = JSON.parse(local);
    this.listTrans.forEach(data => {
      if (data.created === this.idTrans) {
        this.updateForm = new FormGroup({
          err: new FormControl('' + data.id),
          vi: new FormControl('' + data.vi),
          en: new FormControl('' + data.en)
        });
      }
    });
  }

  onConfirm(): void {
    if (this.updateForm.invalid === false) {
      if (this.isTranslated === true) {
        this.closeWin();
      }
      this.listTrans.forEach((data, index) => {
        if (data.created === this.idTrans) {
          this.listTrans.splice(index, 1);
        }
      });
      const formOBJ = this.updateForm.getRawValue();
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
    const formOBJ = this.updateForm.getRawValue();
    const link = 'https://translate.google.com/#view=home&op=translate&sl=vi&tl=en&text=' + formOBJ.vi;
    this.translateWindow = window.open(link, '_blank', 'resizable=no, toolbar=no, scrollbars=no, menubar=no, status=no, directories=no,top=50,left=500,width=400,height=500');
  }

  closeWin(): void {
    this.translateWindow.close();
  }

}

export class ConfirmUpdateDialogModel {
  constructor(public id: number) {
  }
}
