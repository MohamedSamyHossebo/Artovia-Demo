# ArtoviaApp

## Overview
ArtoviaApp is an e-commerce platform built using **Angular 17** and **Bootstrap 5**, featuring bilingual support (Arabic & English) and dark mode functionality for an enhanced user experience.

---

## Project Structure

```plaintext
ArtoviaApp
├── /src
│   ├── /app
│   │   ├── /components
│   │   ├── /services
│   │   │   ├── /categoriesService
│   │   │   ├── /darkMode
│   │   │   ├── /product
│   │   │   ├── /productsService
│   │   │   └── /subCategoryService
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── /assets
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── angular.json
├── package.json
└── README.md
```

---

## Technologies & Tools

- **Angular 17**: Framework for building dynamic web applications.
- **Angular Workspace**: Modular project structure.
- **Standalone Components**: Improved modularity and performance.
- **Bootstrap 5**: Responsive design framework.
- **TypeScript**: Strongly typed programming language.
- **RxJS**: Reactive programming library.
- **HTTP Client Module**: Efficient HTTP requests.
- **JWT (JSON Web Tokens)**: Secure authentication.
- **Ngx-cookie-service**: Cookie management.
- **FontAwesome**: Icon integration.
- **TranslateModule**: Multi-language support.
- **NgOptimizedImage**: Image optimization.
- **ActivatedRoute & RouterLink**: Routing and navigation.

---

## Features

- **JWT Authentication**: Secure login system.
- **Product Management**: Dynamic listing and filtering.
- **Responsive Design**: Mobile-first approach.
- **Dark Mode**: Theme toggle feature.
- **Multi-language Support**: Arabic & English.
- **Lazy Loading**: Optimized performance.

---

## Getting Started

### Development Server
Run `ng serve` to start the development server at `http://localhost:4200/`. The application will reload automatically on file changes.

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `/dist` directory.

### Code Scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Unit Tests
Run `ng test` to execute unit tests via [Karma](https://karma-runner.github.io).

### End-to-End Tests
Run `ng e2e` to execute end-to-end tests with a suitable testing package.

---

## Issues & Solutions

- **State Management**: BehaviorSubject for state handling.
- **Performance**: Implemented lazy loading and OnPush change detection.
- **Scalability**: Utilized Angular Workspace for modularity.

---

## Conclusion
ArtoviaApp is designed to be modular, scalable, and user-friendly, leveraging Angular's modern features for an optimized web application experience. This documentation serves to guide developers in understanding and maintaining the project.

