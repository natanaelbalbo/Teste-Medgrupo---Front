import { http, HttpResponse } from 'msw';
import type { School, SchoolClass } from '../types/index';

const getSchools = (): School[] => JSON.parse(localStorage.getItem('mock_schools') || '[]');
const setSchools = (schools: School[]) => localStorage.setItem('mock_schools', JSON.stringify(schools));

const getClasses = (): SchoolClass[] => JSON.parse(localStorage.getItem('mock_classes') || '[]');
const setClasses = (classes: SchoolClass[]) => localStorage.setItem('mock_classes', JSON.stringify(classes));

if (getSchools().length === 0) {
  setSchools([
    { id: '1', name: 'Escola Central', address: 'Av. Paulista, 1000', classCount: 2 },
    { id: '2', name: 'Colégio Alpha', address: 'Rua das Flores, 450', classCount: 1 },
  ]);
}

if (getClasses().length === 0) {
  setClasses([
    { id: '101', schoolId: '1', name: 'Turma A', shift: 'Manhã', academicYear: '2024' },
    { id: '102', schoolId: '1', name: 'Turma B', shift: 'Tarde', academicYear: '2024' },
    { id: '201', schoolId: '2', name: 'Turma C', shift: 'Manhã', academicYear: '2024' },
  ]);
}

export const handlers = [
  http.get('/schools', () => {
    return HttpResponse.json(getSchools());
  }),

  http.post('/schools', async ({ request }) => {
    const newSchool = await request.json() as Omit<School, 'id' | 'classCount'>;
    const schools = getSchools();
    const school: School = {
      ...newSchool,
      id: Math.random().toString(36).substr(2, 9),
      classCount: 0,
    };
    setSchools([...schools, school]);
    return HttpResponse.json(school, { status: 201 });
  }),

  http.put('/schools/:id', async ({ params, request }) => {
    const { id } = params;
    const updatedData = await request.json() as Partial<School>;
    const schools = getSchools();
    const index = schools.findIndex(s => s.id === id);
    if (index === -1) return new HttpResponse(null, { status: 404 });

    schools[index] = { ...schools[index], ...updatedData };
    setSchools(schools);
    return HttpResponse.json(schools[index]);
  }),

  http.delete('/schools/:id', ({ params }) => {
    const { id } = params;
    const schools = getSchools().filter(s => s.id !== id);
    setSchools(schools);
    const classes = getClasses().filter(c => c.schoolId !== id);
    setClasses(classes);
    return new HttpResponse(null, { status: 204 });
  }),

  http.get('/classes', ({ request }) => {
    const url = new URL(request.url);
    const schoolId = url.searchParams.get('schoolId');
    const classes = getClasses();
    return HttpResponse.json(schoolId ? classes.filter(c => c.schoolId === schoolId) : classes);
  }),

  http.post('/classes', async ({ request }) => {
    const newClassData = await request.json() as Omit<SchoolClass, 'id'>;
    const classes = getClasses();
    const newClass: SchoolClass = {
      ...newClassData,
      id: Math.random().toString(36).substr(2, 9),
    };
    setClasses([...classes, newClass]);

    const schools = getSchools();
    const schoolIndex = schools.findIndex(s => s.id === newClass.schoolId);
    if (schoolIndex !== -1) {
      schools[schoolIndex].classCount += 1;
      setSchools(schools);
    }

    return HttpResponse.json(newClass, { status: 201 });
  }),

  http.put('/classes/:id', async ({ params, request }) => {
    const { id } = params;
    const updatedData = await request.json() as Partial<SchoolClass>;
    const classes = getClasses();
    const index = classes.findIndex(c => c.id === id);
    if (index === -1) return new HttpResponse(null, { status: 404 });

    classes[index] = { ...classes[index], ...updatedData };
    setClasses(classes);
    return HttpResponse.json(classes[index]);
  }),

  http.delete('/classes/:id', ({ params }) => {
    const { id } = params;
    const classes = getClasses();
    const classToDelete = classes.find(c => c.id === id);
    if (!classToDelete) return new HttpResponse(null, { status: 404 });

    setClasses(classes.filter(c => c.id !== id));

    const schools = getSchools();
    const schoolIndex = schools.findIndex(s => s.id === classToDelete.schoolId);
    if (schoolIndex !== -1) {
      schools[schoolIndex].classCount = Math.max(0, schools[schoolIndex].classCount - 1);
      setSchools(schools);
    }

    return new HttpResponse(null, { status: 204 });
  }),
];
