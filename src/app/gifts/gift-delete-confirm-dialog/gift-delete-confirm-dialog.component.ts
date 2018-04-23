import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { deepClone } from '../../shared/util';
import { Store } from '@ngrx/store';

@Component({
	selector: 'gift-delete-confirm-dialog',
	templateUrl: './gift-delete-confirm-dialog.component.html',
})
export class GiftDeleteConfirmDialog {
	originalData: any;

	ngOnInit() {}

	constructor(public dialogRef: MatDialogRef<GiftDeleteConfirmDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {}
}
