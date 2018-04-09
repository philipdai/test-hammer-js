import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { deepClone } from '../../shared/util';

@Component({
	selector: 'gift-edit-create-dialog',
	templateUrl: './gift-edit-create-dialog.html',
})
export class GiftEditCreateDialog {
	originalData: any;

	ngOnInit() {
		this.originalData = deepClone(this.data);
	}

	constructor(public dialogRef: MatDialogRef<GiftEditCreateDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {}

	onCancelClick(): void {
		if (this.originalData.id) {
			this.data = this.originalData;
		} else {
			this.originalData = null;
		}

		this.dialogRef.close();
	}
}
