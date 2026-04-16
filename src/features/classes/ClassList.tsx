import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Card, Button, Input, Select } from '../../components/ui';
import { Plus, ArrowLeft, Users, Trash2, Calendar, Clock, Edit2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const ClassList = () => {
  const { schoolId } = useParams<{ schoolId: string }>();
  const navigate = useNavigate();
  const { classes, schools, fetchClasses, fetchSchools, addClass, updateClass, deleteClass, isLoading } = useStore();
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingClass, setEditingClass] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [shift, setShift] = useState<'Manhã' | 'Tarde' | 'Noite'>('Manhã');
  const [year, setYear] = useState('2024');

  const school = schools.find(s => s.id === schoolId);

  useEffect(() => {
    if (schoolId) {
      fetchClasses(schoolId);
      if (schools.length === 0) fetchSchools();
    }
  }, [schoolId, fetchClasses, fetchSchools, schools.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (schoolId) {
      if (editingClass) {
        await updateClass(editingClass, { name, shift, academicYear: year });
        setEditingClass(null);
      } else {
        await addClass({
          schoolId,
          name,
          shift,
          academicYear: year,
        });
      }
      setName('');
      setIsAdding(false);
    }
  };

  const handleEdit = (c: any) => {
    setName(c.name);
    setShift(c.shift);
    setYear(c.academicYear);
    setEditingClass(c.id);
    setIsAdding(true);
  };

  if (!school && !isLoading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Escola não encontrada</h2>
        <Button onClick={() => navigate('/')} className="mt-4">Voltar para Início</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors group cursor-pointer"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Voltar para Escolas
      </button>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-primary font-bold text-sm uppercase tracking-widest">Turmas da Instituição</span>
          <h1 className="text-4xl font-bold mt-1">{school?.name}</h1>
          <p className="text-muted-foreground mt-2">{school?.address}</p>
        </div>
        <Button icon={Plus} onClick={() => { setIsAdding(true); setEditingClass(null); setName(''); }}>
          Nova Turma
        </Button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <Card className="w-full max-w-md relative">
              <h2 className="text-2xl font-bold mb-6">{editingClass ? 'Editar Turma' : 'Cadastrar Turma'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input 
                  label="Identificação da Turma" 
                  placeholder="Ex: 8º Ano B" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Select 
                    label="Turno" 
                    value={shift}
                    onChange={(e: any) => setShift(e.target.value)}
                    options={[
                      { label: 'Manhã', value: 'Manhã' },
                      { label: 'Tarde', value: 'Tarde' },
                      { label: 'Noite', value: 'Noite' },
                    ]}
                  />
                  <Input 
                    label="Ano Letivo" 
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">{editingClass ? 'Salvar' : 'Criar Turma'}</Button>
                  <Button variant="secondary" onClick={() => setIsAdding(false)} type="button">Cancelar</Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {classes.map((c, index) => (
            <Card key={c.id} delay={index * 0.05} className="flex flex-col border-white/5 bg-white/5 group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/20 rounded-lg text-accent">
                    <Users size={20} />
                  </div>
                  <h3 className="font-bold text-lg">{c.name}</h3>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleEdit(c)}
                    className="p-2 hover:bg-white/10 rounded-lg text-blue-400 cursor-pointer"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => deleteClass(c.id)}
                    className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mt-auto">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={14} /> 
                  <span className="capitalize">{c.shift}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar size={14} /> {c.academicYear}
                </div>
              </div>
            </Card>
          ))}
        </AnimatePresence>
      </div>

      {!isLoading && classes.length === 0 && (
        <div className="text-center py-20 bg-secondary/10 rounded-3xl border border-dashed border-white/10">
          <Users className="mx-auto text-muted-foreground mb-4 opacity-20" size={64} />
          <h3 className="text-xl font-medium">Nenhuma turma cadastrada</h3>
          <p className="text-muted-foreground mt-2">Adicione a primeira turma desta escola clicando em "Nova Turma".</p>
        </div>
      )}
    </div>
  );
};
