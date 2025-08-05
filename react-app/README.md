# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Recipe Book React App

Современное веб-приложение для отображения коллекции рецептов с красивым дизайном в стиле кулинарной книги.

## Возможности

- 📱 **Адаптивный дизайн** - работает на всех устройствах
- 🎨 **Красивый интерфейс** - дизайн в стиле винтажной кулинарной книги
- 🔍 **Легкая навигация** - простой переход между рецептами
- 🌐 **GitHub Pages** - автоматическая публикация
- 🚀 **Быстрая загрузка** - оптимизированная сборка с Vite

## Технологии

- **React 19** с TypeScript
- **Vite** для быстрой разработки и сборки
- **React Router** для маршрутизации
- **Tailwind CSS** для стилизации
- **GitHub Actions** для автоматического развертывания

## Структура проекта

```
react-app/
├── src/
│   ├── components/          # React компоненты
│   │   ├── RecipeListPage.tsx    # Страница списка рецептов
│   │   └── RecipeDetailPage.tsx  # Страница детального просмотра
│   ├── data/               # Данные рецептов
│   │   ├── recipes/        # JSON файлы рецептов
│   │   └── index.ts        # Индекс всех рецептов
│   ├── types/              # TypeScript типы
│   │   └── recipe.ts       # Интерфейсы рецептов
│   └── App.tsx             # Главный компонент
├── public/                 # Статические файлы
└── dist/                   # Готовая сборка
```

## Маршруты

- `/` - Главная страница со списком рецептов
- `/recipes/{recipe-id}` - Страница конкретного рецепта

## Разработка

### Запуск в режиме разработки

```bash
cd react-app
npm install
npm run dev
```

Приложение будет доступно по адресу http://localhost:5173

### Сборка для продакшена

```bash
npm run build
```

### Предварительный просмотр сборки

```bash
npm run preview
```

## Добавление новых рецептов

1. Добавьте JSON файл рецепта в `data/recipes/`
2. Обновите файл `src/data/index.ts`, импортировав новый рецепт
3. Приложение автоматически обновится при следующей сборке

## Развертывание

Приложение автоматически развертывается на GitHub Pages при пуше в ветку `main` через GitHub Actions.

URL: https://georgeparkdev.github.io/Recipe-Book

## Особенности дизайна

- **Винтажный стиль** с элементами тетради и рукописной книги
- **Теплая цветовая палитра** в оттенках янтаря и оранжевого
- **Типографика с засечками** для уютного ощущения
- **Анимации и переходы** для плавного взаимодействия
- **Карточки рецептов** с предварительным просмотром ингредиентов

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
