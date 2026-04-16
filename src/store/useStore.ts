import { create } from 'zustand';
import { type School, type SchoolClass } from '../types/index';
import { SchoolService, ClassService } from '../services/api';

interface SchoolStore {
  schools: School[];
  classes: SchoolClass[];
  isLoading: boolean;
  error: string | null;
  
  fetchSchools: () => Promise<void>;
  addSchool: (school: Omit<School, 'id' | 'classCount'>) => Promise<void>;
  updateSchool: (id: string, data: Partial<School>) => Promise<void>;
  deleteSchool: (id: string) => Promise<void>;
  
  fetchClasses: (schoolId?: string) => Promise<void>;
  addClass: (newClass: Omit<SchoolClass, 'id'>) => Promise<void>;
  updateClass: (id: string, data: Partial<SchoolClass>) => Promise<void>;
  deleteClass: (id: string) => Promise<void>;
}

export const useStore = create<SchoolStore>((set, get) => ({
  schools: [],
  classes: [],
  isLoading: false,
  error: null,

  fetchSchools: async () => {
    set({ isLoading: true });
    try {
      const data = await SchoolService.getAll();
      set({ schools: data, isLoading: false });
    } catch (err) {
      set({ error: 'Erro ao buscar escolas', isLoading: false });
    }
  },

  addSchool: async (school) => {
    try {
      const data = await SchoolService.create(school);
      set({ schools: [...get().schools, data] });
    } catch (err) {
      set({ error: 'Erro ao adicionar escola' });
    }
  },

  updateSchool: async (id, data) => {
    try {
      const updated = await SchoolService.update(id, data);
      set({
        schools: get().schools.map(s => s.id === id ? updated : s)
      });
    } catch (err) {
      set({ error: 'Erro ao atualizar escola' });
    }
  },

  deleteSchool: async (id) => {
    try {
      await SchoolService.delete(id);
      set({
        schools: get().schools.filter(s => s.id !== id),
        classes: get().classes.filter(c => c.schoolId !== id)
      });
    } catch (err) {
      set({ error: 'Erro ao excluir escola' });
    }
  },

  fetchClasses: async (schoolId) => {
    set({ isLoading: true });
    try {
      const data = await ClassService.getBySchool(schoolId);
      set({ classes: data, isLoading: false });
    } catch (err) {
      set({ error: 'Erro ao buscar turmas', isLoading: false });
    }
  },

  addClass: async (newClass) => {
    try {
      const data = await ClassService.create(newClass);
      set({ classes: [...get().classes, data] });
      set({
        schools: get().schools.map(s => s.id === newClass.schoolId ? { ...s, classCount: s.classCount + 1 } : s)
      });
    } catch (err) {
      set({ error: 'Erro ao adicionar turma' });
    }
  },

  updateClass: async (id, data) => {
    try {
      const resp = await fetch(`/classes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const updated = await resp.json();
      set({
        classes: get().classes.map(c => c.id === id ? updated : c)
      });
    } catch (err) {
      set({ error: 'Erro ao atualizar turma' });
    }
  },

  deleteClass: async (id) => {
    try {
      const classToDelete = get().classes.find(c => c.id === id);
      await ClassService.delete(id);
      set({ classes: get().classes.filter(c => c.id !== id) });
      if (classToDelete) {
        set({
          schools: get().schools.map(s => s.id === classToDelete.schoolId ? { ...s, classCount: Math.max(0, s.classCount - 1) } : s)
        });
      }
    } catch (err) {
      set({ error: 'Erro ao excluir turma' });
    }
  }
}));
