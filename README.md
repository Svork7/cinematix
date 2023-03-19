# Cinematix

React app with info about movies
Выполненные требования к проекту

- Функциональные компоненты c хуками в приоритете над классовыми
- Есть четкое разделение на умные и глупые компоненты
- Есть рендеринг списков
  - https://github.com/Svork7/cinematix/blob/main/src/components/SearchResults/SearchResults.tsx
  - https://github.com/Svork7/cinematix/blob/main/src/components/Pages/Favorite/Favorite.tsx - https://github.com/Svork7/cinematix/blob/main/src/components/Pages/History/History.tsx
- Реализованы формы
  - https://github.com/Svork7/cinematix/blob/main/src/components/UI/SearchInput/SearchInput.tsx
  - https://github.com/Svork7/cinematix/blob/main/src/components/UI/Input/Input.tsx
- Есть применение Контекст API https://github.com/Svork7/cinematix/tree/main/src/components/ThemeProvider.tsx
- Есть применение предохранителя:
  https://github.com/Svork7/cinematix/blob/main/src/App.tsx
  https://github.com/Svork7/cinematix/blob/main/src/components/ErrorFallback/ErrorFallback.tsx
- Есть хотя бы один кастомный хук: https://github.com/Svork7/cinematix/blob/main/src/app/hooks.ts
- Использование PropTypes https://github.com/Svork7/cinematix/blob/main/src/components/Card/Card.tsx (проект писался на тайпскрипте, поэтому указал в одном компоненте чтобы было)
- Поиск не должен триггерить много запросов к серверу
  https://github.com/Svork7/cinematix/blob/main/src/app/useDebounce.ts
  https://github.com/Svork7/cinematix/blob/main/src/components/Pages/Movies/Movies.tsx
- Есть применение lazy + Suspense
  https://github.com/Svork7/cinematix/blob/main/src/components/Pages/Movies/Movies.tsx
  https://github.com/Svork7/cinematix/blob/main/src/components/Pages/Search/Search.tsx

### Redux

- Использование Modern Redux with Redux Toolkit
- Используем слайсы https://github.com/Svork7/cinematix/blob/main/src/redux/userSlice.ts
- Есть хотя бы одна кастомная мидлвара https://github.com/Svork7/cinematix/blob/main/src/middleware/checkLoginMiddleware.ts
- Используется RTK Query https://github.com/Svork7/cinematix/blob/main/src/API/omdbAPI.ts
- Используется Transforming Responses https://github.com/Svork7/cinematix/blob/main/src/API/omdbAPI.ts

## 2 уровень

- Использование TypeScript
- StoryBook https://github.com/Svork7/cinematix/blob/main/src/components/UI/Button/Button.stories.tsx

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
