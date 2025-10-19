import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../core/services/http/student.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MessagePopupComponent } from '../shared/message-popup/message-popup.component';
import { StudentPopupComponent } from './student-popup.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { Student } from '../model/student.model';
import { ToolbarComponent } from '../shared/toolbar/toolbar.component';

@Component({
  standalone: true,
  selector: 'app-student-list',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatTooltipModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatCheckboxModule,
    StudentPopupComponent,
    MessagePopupComponent,
  MatSortModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatOptionModule,
    FormsModule,
    ToolbarComponent
  ],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  filteredTasks = new MatTableDataSource<Student>([]);
  // Map numeric enum values (or numeric strings) to display names
  categoryMap: Record<string, string> = {
    '1': 'Primary',
    '2': 'Middle School',
    '3': 'Upper School',
    '4': 'Other',
    // allow direct string passthrough as well
    'primary': 'Primary',
    'middle school': 'Middle School',
    'upper school': 'Upper School',
    'other': 'Other',
  };

  getCategoryName(cat: any): string {
    if (cat === null || cat === undefined) return '';
    const key = cat.toString().trim().toLowerCase();
    return this.categoryMap[key] ?? cat.toString();
  }
  editingStudent: Student | null = null;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'birthDate', 'category', 'actions'];

  popupMessage: string | null = null;
  popupType: 'success' | 'error' = 'success';
  searchTerm = '';
  categoryFilter = '';

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private studentService: StudentService, private dialog: MatDialog) {}

  ngOnInit() {
    this.fetchStudents();

    this.filteredTasks.filterPredicate = (data: Student, filter: string) => {
      let parsed: { search?: string; category?: string } = { search: '', category: '' };
      try {
        parsed = JSON.parse(filter || '{}');
      } catch (e) {

        parsed = { search: (filter || '').toString() };
      }

      const search = (parsed.search || '').toString().trim().toLowerCase();
      const categoryFilter = (parsed.category || '')
        .toString()
        .trim()
        .toLowerCase();

      const first = (data.firstName || '').toLowerCase();
      const last = (data.lastName || '').toLowerCase();
      const email = (data.email || '').toLowerCase();
      // Convert numeric or variant category values to canonical name before comparing
      const categoryName = this.getCategoryName(data.category).toString().trim().toLowerCase();

      const fullName = `${first} ${last}`.trim();

      const matchesText = !search || fullName.includes(search) || email.includes(search);
  const matchesCategory = !categoryFilter || categoryName === categoryFilter;

      return matchesText && matchesCategory;
    };
  }
  ngAfterViewInit() {
    this.sort?.sortChange.subscribe(() => {
      this.fetchStudents();
    });
  }
  fetchStudents() {
  this.studentService.getStudents().subscribe({
      next: (response) => {

        this.students = response?.value ?? response;
        this.filteredTasks.data = this.students;
        this.filteredTasks.sort = this.sort;

        this.filteredTasks.filter = JSON.stringify({
          search: (this.searchTerm || '').trim().toLowerCase(),
          category: (this.categoryFilter || '').toString(),
        });
      },
      error: (err) => console.error(err),
    });
  }

  onCancelEdit() {
    this.editingStudent = null;
  }

  edit(student: Student) {
    this.editingStudent = student;
    this.popupVisible = true;
  }

  delete(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete',
        message: 'Are you sure you want to delete this student?',
      },
    });

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
        if (confirm) {
  this.studentService.deleteStudent(id).subscribe(
          {
            next: () => {
              this.fetchStudents();
              this.showSuccess('Student deleted successfully!');
            },
            error: () => this.showError('Failed to delete student.'),
          });
      }
    });
  }



  popupVisible = false;

  openAddPopup() {
    this.editingStudent = null;
    this.popupVisible = true;
  }

  onSave(student: Student) {
    debugger
    if (student.id) {

  const updateReq = {
    firstName: (student as any).firstName,
    lastName: (student as any).lastName,
    email: student.email,
    birthDate: (student as any).birthDate,
    category: student.category,
  };debugger

  this.studentService.updateStudent(student.id, updateReq).subscribe({
        next: () => {
          this.fetchStudents();
          this.showSuccess('Student updated successfully!');
        },
        error: () => this.showError('Failed to update student.'),
      });
    } else {
   
      const createReq = {
        firstName: (student as any).firstName,
        lastName: (student as any).lastName,
        email: student.email,
        birthDate: (student as any).birthDate,
        category: student.category,
      };
      debugger
  this.studentService.createStudent(createReq).subscribe({
        next: () => {
          this.fetchStudents();
          this.showSuccess('Student registered successfully!');
        },
        error: () => this.showError('Failed to register student.'),
      });
    }
    this.popupVisible = false;
  }

  onCancel() {
    this.popupVisible = false;
  }

  showSuccess(msg: string) {
    this.popupType = 'success';
    this.popupMessage = msg;
  }

  showError(msg: string) {
    this.popupType = 'error';
    this.popupMessage = msg;
  }

  applyFilter(event: Event | MatSelectChange): void {
debugger
    if ((event as MatSelectChange).value !== undefined) {

      this.categoryFilter = ((event as MatSelectChange).value || '').toString();
    } else {
      const input = (event as Event).target as HTMLInputElement;
      this.searchTerm = input?.value ?? '';
    }

    this.filteredTasks.filter = JSON.stringify({
      search: (this.searchTerm || '').trim().toLowerCase(),
      category: (this.categoryFilter || '').toString(),
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredTasks.filter = JSON.stringify({ search: '', category: this.categoryFilter || '' });
  }
}
