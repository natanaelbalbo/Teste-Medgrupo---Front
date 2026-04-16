import type { School, SchoolClass } from '../types/index';

export const SchoolService = {
  async getAll(): Promise<School[]> {
    const resp = await fetch('/schools');
    return resp.json();
  },

  async create(school: Omit<School, 'id' | 'classCount'>): Promise<School> {
    const resp = await fetch('/schools', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(school),
    });
    return resp.json();
  },

  async update(id: string, data: Partial<School>): Promise<School> {
    const resp = await fetch(`/schools/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return resp.json();
  },

  async delete(id: string): Promise<void> {
    await fetch(`/schools/${id}`, { method: 'DELETE' });
  }
};

export const ClassService = {
  async getBySchool(schoolId?: string): Promise<SchoolClass[]> {
    const url = schoolId ? `/classes?schoolId=${schoolId}` : '/classes';
    const resp = await fetch(url);
    return resp.json();
  },

  async create(newClass: Omit<SchoolClass, 'id'>): Promise<SchoolClass> {
    const resp = await fetch('/classes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newClass),
    });
    return resp.json();
  },

  async delete(id: string): Promise<void> {
    await fetch(`/classes/${id}`, { method: 'DELETE' });
  }
};
