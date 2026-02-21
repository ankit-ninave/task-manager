import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';  // Using Angular Material for snackbars

@Injectable({
  providedIn: 'root',
})
export class GNotificationService {
  constructor(private snackBar: MatSnackBar) {}

  lFN_ShowSuccess(message: string, duration = 3000) {
    console.warn('dfgdsfdsffdsd');
    this.snackBar.open(message, '✔', {
      duration,
      panelClass: ['snackbar-success'],
    });
  }

  lFN_ShowError(message: string, duration = 3000) {
    this.snackBar.open(message, '✖', {
      duration,
      panelClass: ['snackbar-error'],
    });
  }

  lFN_ShowInfo(message: string, duration = 3000) {
    this.snackBar.open(message, 'ℹ', {
      duration,
      panelClass: ['snackbar-info'],
    });
  }

   lFN_ShowWarning(message: string, duration = 3000) {
    this.snackBar.open(message, '!', {
      duration,
      panelClass: ['snackbar-warning'],
    });
  }
}
