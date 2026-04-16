# EduManager - Desafio Técnico (Web Version)

Este projeto é uma plataforma de gestão escolar desenvolvida para facilitar o controle de escolas e turmas da rede pública. Originalmente proposto como um desafio React Native, esta versão foi adaptada para a **Web** com foco em uma experiência de usuário premium e performance excepcional.

## ✨ Diferenciais Técnicos (Avaliação)

Esta implementação foca em **qualidade de código** e **escalabilidade**, atendendo aos diferenciais solicitados:

- **📦 Design Patterns**: 
  - **Repository/Service Pattern**: Camada dedicada em `src/services/api.ts` para isolar a lógica de busca de dados (Fetch) da lógica de estado (Zustand).
  - **Modularização**: Organização estrita por features em `src/features/`.
- **🛡️ TypeScript Avançado**: Tipagem rigorosa de entidades, payloads de API e uso de `import type` para otimização de bundle.
- **🎨 UI Premium (Glassmorphism)**: Estilização com Tailwind CSS v4, animações fluidas com Framer Motion e design responsivo.
- **☁️ Mock Backend (MSW)**: Simulação completa de API REST com persistência em `localStorage` (trabalha offline após o primeiro carregamento).
- **📝 Qualidade**: Configuração de **Prettier** e **ESLint** para consistência de código.

## 🚀 Tecnologias e Versões

- **Node**: v18+ (Recomendado v20+)
- **React**: 19.x
- **Vite**: 6.x
- **Standard Libs**:
  - `Zustand`: Estado Global
  - `MSW`: API Mocking
  - `React Router`: Navegação
  - `Tailwind CSS v4`: Estilização
  - `Framer Motion`: Animações

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js instalado.

### Passos
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

### 🛰️ Mock Backend
O backend é simulado automaticamente pelo **Mock Service Worker** ao abrir o app no navegador. 
- Os dados são salvos no seu **LocalStorage**, então se você criar uma escola e recarregar a página, ela ainda estará lá.
- Para resetar o banco de dados simulado, basta limpar o LocalStorage do seu navegador.

## 📂 Estrutura do Projeto

```text
src/
├── components/      # Componentes UI compartilhados e Layouts
├── features/        # Módulos principais (Escolas e Turmas)
├── mocks/           # Interceptores de API e Handlers (MSW)
├── services/        # Camada de API (Repository Pattern)
├── store/           # Lógica de Estado Global (Zustand)
├── types/           # Definições de TypeScript
└── assets/          # Estilos e recursos estáticos
```

---
Este projeto demonstra competência em desenvolvimento Frontend moderno, organização de código e atenção aos detalhes de UX.
