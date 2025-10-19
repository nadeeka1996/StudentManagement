import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Student, StudentCreateRequest } from '../model/student.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-student-popup',
  templateUrl: './student-popup.component.html',
  styleUrls: ['./student-popup.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ],
})
export class StudentPopupComponent {
  @Input() student: Student | null = null;
  @Output() save = new EventEmitter<Student>();
  @Output() cancel = new EventEmitter<void>();

  taskForm: FormGroup;

  categoryOptions = [
    { label: 'Primary', value: 'Primary' },
    { label: 'Middle School', value: 'Middle School' },
    { label: 'Upper School', value: 'Upper School' },
    { label: 'Other', value: 'Other' },
  ];

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
   
      birthDate: ['', Validators.required],
      category: ['Primary', Validators.required],
    });
  }

  ngOnChanges(): void {
    if (this.student) {
      this.taskForm.patchValue({
        firstName: this.student.firstName,
        lastName: this.student.lastName,
        email: this.student.email,
        birthDate: this.student.birthDate,
        category: this.student.category,
      });
    } else {
      this.taskForm.reset({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        category: 'Primary',
      });
    }
  }
  onSave(): void {
    debugger
    if (this.taskForm.valid) {
      const updated = this.taskForm.value as StudentCreateRequest;

      const computedCategory = this.computeCategoryFromBirthDate(updated.birthDate);

      const student: Student = {
        id: this.student?.id ?? '',
        firstName: updated.firstName,
        lastName: updated.lastName,
        email: updated.email,
        birthDate: updated.birthDate,
        category: computedCategory,
        createdDate: this.student?.createdDate ?? '',
        updatedDate: this.student?.updatedDate ?? '',
      };
debugger
      this.save.emit(student);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  computeCategory(age: number): import('../model/student.model').StudentCategory {
    if (age >= 6 && age <= 10) return 'Primary';
    if (age >= 11 && age <= 15) return 'Middle School';
    if (age >= 16 && age <= 19) return 'Upper School';
    return 'Other';
  }

  computeCategoryFromBirthDate(birthDateIso: string): import('../model/student.model').StudentCategory {
    if (!birthDateIso) return 'Other';
    const birth = new Date(birthDateIso);
    if (isNaN(birth.getTime())) return 'Other';
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return this.computeCategory(age);
  }
}
