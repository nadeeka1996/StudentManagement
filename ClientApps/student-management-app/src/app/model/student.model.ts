export type StudentCategory = 'Primary' | 'Middle School' | 'Upper School' | 'Other';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  // Store birthDate as ISO string (yyyy-mm-dd)
  birthDate: string;
  category: StudentCategory;
  createdDate?: string;
  updatedDate?: string;
}

export interface StudentCreateRequest {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  category: StudentCategory;
}

export interface StudentUpdateRequest {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  category: StudentCategory;
}
  