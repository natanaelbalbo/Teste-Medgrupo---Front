# EduManager - Sistema de Gestão Escolar

Este projeto é uma solução moderna e robusta para o desafio técnico de gerenciamento de escolas públicas e turmas. Desenvolvido com React 19, Vite e Tailwind CSS v4, o sistema oferece uma experiência de usuário premium com animações fluidas e arquitetura escalável.

## Funcionalidades

- **Gestão de Escolas**: CRUD completo (Criar, Listar, Editar e Excluir) com busca em tempo real.
- **Gestão de Turmas**: CRUD completo vinculado a cada escola, incluindo gerenciamento de turnos e anos letivos.
- **Persistência Local**: Integração com localStorage através de um backend simulado (MSW).
- **Testes Automatizados**: Suíte de testes unitários e de estado com Vitest.
- **Design Premium**: Interface responsiva, modo Dark, Glassmorphism e animações com Framer Motion.

## Tecnologias e Versões

- **Node.js**: v20+
- **React**: 19.0
- **TypeScript**: 5.7
- **Vite**: 6.0
- **Tailwind CSS**: 4.0
- **Zustand**: 5.0 (Gestão de Estado)
- **MSW (Mock Service Worker)**: 2.7 (Simulação de API)
- **Vitest**: 2.1 (Testes)
- **Framer Motion**: 11.1 (Animações)
- **Lucide React**: 0.46 (Ícones)

## Instalação e Execução

1. **Clonar o repositório**:
   ```bash
   git clone https://github.com/natanaelbalbo/Teste-Medgrupo---Front.git
   cd Teste-Medgrupo---Front
   ```

2. **Instalar dependências**:
   ```bash
   npm install
   ```

3. **Executar o projeto**:
   ```bash
   npm run dev
   ```
   *O sistema abrirá automaticamente em `http://localhost:5173`.*

## Como Rodar os Testes

Implementamos testes unitários para garantir a estabilidade do Store e dos componentes principais.

Para rodar os testes:
```bash
npm test
```

## Backend Simulado (MSW)

O projeto utiliza MSW para interceptar chamadas de rede. 
- Os dados são carregados inicialmente de src/mocks/handlers.ts.
- Qualquer alteração (criação, edição ou exclusão) é persistida no localStorage do seu navegador para que os dados não sejam perdidos ao recarregar a página.

---
Desenvolvido como parte de um teste técnico de excelência.
