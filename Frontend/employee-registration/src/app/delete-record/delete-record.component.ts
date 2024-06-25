import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-record',
  templateUrl: './delete-record.component.html',
  styleUrl: './delete-record.component.css'
})
export class DeleteRecordComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteRecordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, firstName: String, lastName: String }
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
