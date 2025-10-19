import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Student, StudentCreateRequest, StudentUpdateRequest } from '../../../model/student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  // Service now used for Students endpoints
  private readonly apiUrl = `${environment.apiUrl}/students`;
  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudent(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  createStudent(request: StudentCreateRequest): Observable<string> {
    return this.http.post<string>(this.apiUrl, request);
  }

  updateStudent(id: string, request: StudentUpdateRequest): Observable<void> {
    debugger
    return this.http.put<void>(`${this.apiUrl}/${id}`, request);
  }

  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
