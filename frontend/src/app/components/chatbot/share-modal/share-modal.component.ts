import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import Modal from "mdb-angular-ui-kit";

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss'],
})
export class ShareModalComponent {
  email: string = '';

  constructor(
    public dialogRef: MatDialogRef<ShareModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onShare(): void {
    console.log('Sharing with email:', this.email);
    this.dialogRef.close(this.email); // Pass the email back to the calling component
  }
}