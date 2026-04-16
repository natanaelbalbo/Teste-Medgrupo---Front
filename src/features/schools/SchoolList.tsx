import { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import { Card, Button, Input } from '../../components/ui';
import { Plus, Search, MapPin, School as SchoolIcon, Trash2, Edit2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export const SchoolList = () => {
  const { schools, fetchSchools, addSchool, deleteSchool, updateSchool, isLoading } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingSchool, setEditingSchool] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    fetchSchools();
  }, [fetchSchools]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSchool) {
      await updateSchool(editingSchool, { name, address });
      setEditingSchool(null);
    } else {
      await addSchool({ name, address });
    }
    setName('');
    setAddress('');
    setIsAdding(false);
  };

  const handleEdit = (school: any) => {
    setName(school.name);
    setAddress(school.address);
    setEditingSchool(school.id);
    setIsAdding(true);
  };

  const filteredSchools = schools.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Escolas Públicas
          </h1>
          <p className="text-muted-foreground mt-2">Gerencie as instituições de ensino da cidade.</p>
        </div>
        <Button icon={Plus} onClick={() => { setIsAdding(true); setEditingSchool(null); }}>
          Adicionar Escola
        </Button>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
        <input
          type="text"
          placeholder="Buscar escola por nome ou endereço..."
          className="w-full pl-12 pr-4 py-4 bg-secondary/30 border-white/5 rounded-2xl focus:ring-2 focus:ring-primary/20 backdrop-blur-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
              <h2 className="text-2xl font-bold mb-6">{editingSchool ? 'Editar Escola' : 'Nova Escola'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Nome da Escola"
                  placeholder="Ex: Escola Municipal..."
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label="Endereço"
                  placeholder="Rua, Número, Bairro"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingSchool ? 'Salvar Alterações' : 'Cadastrar'}
                  </Button>
                  <Button variant="secondary" onClick={() => setIsAdding(false)} type="button">
                    Cancelar
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && schools.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
            <p className="text-muted-foreground">Carregando escolas...</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredSchools.map((school, index) => (
              <Card key={school.id} delay={index * 0.05} className="group hover:border-primary/50 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <SchoolIcon size={24} />
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(school)} className="p-2 hover:bg-white/10 rounded-lg text-blue-400 cursor-pointer">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => deleteSchool(school.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 cursor-pointer">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-1 truncate">{school.name}</h3>
                <p className="text-muted-foreground text-sm flex items-center gap-1 mb-6">
                  <MapPin size={14} /> {school.address}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="text-sm">
                    <span className="text-primary font-bold">{school.classCount}</span>
                    <span className="text-muted-foreground ml-1">Turmas</span>
                  </div>
                  <Link to={`/schools/${school.id}`} className="text-primary hover:underline text-sm flex items-center gap-1 font-medium">
                    Ver Turmas <ChevronRight size={16} />
                  </Link>
                </div>
              </Card>
            ))}
          </AnimatePresence>
        )}
      </div>

      {!isLoading && filteredSchools.length === 0 && (
        <div className="text-center py-20 bg-secondary/10 rounded-3xl border border-dashed border-white/10">
          <SchoolIcon className="mx-auto text-muted-foreground mb-4 opacity-20" size={64} />
          <h3 className="text-xl font-medium">Nenhuma escola encontrada</h3>
          <p className="text-muted-foreground mt-2">Comece adicionando uma nova escola no botão acima.</p>
        </div>
      )}
    </div>
  );
};
