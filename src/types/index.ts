export interface School {
  id: string;
  name: string;
  address: string;
  classCount: number;
}

export interface SchoolClass {
  id: string;
  schoolId: string;
  name: string;
  shift: 'Manhã' | 'Tarde' | 'Noite';
  academicYear: string;
}

export const types = true;
