import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [],
  imports: [MatTableModule, MatSelectModule, MatButtonToggleModule, MatInputModule, MatSnackBarModule, MatIconModule, MatListModule, MatFormFieldModule, MatToolbarModule,
    MatSidenavModule, CommonModule, MatButtonModule, MatCardModule
  ],
  exports: [MatTableModule, MatSelectModule, MatButtonToggleModule, MatInputModule, MatSnackBarModule, MatIconModule, MatListModule, MatFormFieldModule, MatToolbarModule,
    MatSidenavModule, MatButtonModule, MatCardModule
  ],
})
export class MaterialModule { }
