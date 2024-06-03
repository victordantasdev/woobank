# WooBank 💵

WooBank is a simple web app that simulates a banking system. With WooBank, you can register, log in, perform transactions between accounts, and view the transaction history and account ledger.

## Table of Contents
- [WooBank](#woobank)
  - [Technologies Used](#technologies-used)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Features](#features)
  - [Installation and Project Setup](#installation-and-project-setup)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Accessing the Application](#accessing-the-application)
  - [Additional Commands](#additional-commands)
  - [Running Tests](#running-tests)
  - [Starting Storybook](#starting-storybook)
  - [Application Screenshots](#application-screenshots)
  - [Deployment](#deployment)
  - [License](#license)

## Features

- User registration
- User login
- Perform transactions between accounts
- Access transaction history
- View account ledger and account balance

## Installation and Project Setup

### Prerequisites

- Node.js installed
- Yarn installed

### Steps

1. **Install dependencies**

   ```sh
   yarn
   ```

2. **Start the database**

   ```sh
   yarn compose:up
   ```

3. **Set up environment variables**

   ```sh
   yarn set:env
   ```

4. **Generate the GraphQL schema**

   ```sh
   yarn schema
   ```

5. **Run the Relay compiler**

   ```sh
   yarn relay
   ```

6. **Start both backend and frontend**
   ```sh
   yarn dev
   ```

### Accessing the Application

- The API will be available at: [http://localhost:4000/graphql](http://localhost:4000/graphql), where you will find a playground to test the available queries and mutations.
- The web application will be available at: [http://localhost:3000](http://localhost:3000).

### Additional Commands

- **Start only the server**

  ```sh
  yarn dev:server
  ```

- **Start only the web application**
  ```sh
  yarn dev:web
  ```

### Running Tests

- **Run tests with Jest**

  ```sh
  yarn test
  ```

- **Run component tests with Cypress**

  ```sh
  yarn cypress:component
  ```

- **Run all tests**
  ```sh
  yarn test:all
  ```

### Starting Storybook

```sh
yarn storybook
```

## Application Screenshots

- Login page:
![image](https://github.com/victordantasdev/woobank/assets/64330605/d4994d13-a23d-4143-b7df-f08ebbf1919a)
- Registration Page:
![image](https://github.com/victordantasdev/woobank/assets/64330605/362e1c89-c2a4-415b-b035-1667a0f16bda)
- Home page:
![image](https://github.com/victordantasdev/woobank/assets/64330605/6f2299ee-49c3-4c6c-ab1c-d0bc81ef9a79)
- Account Ledger:
![image](https://github.com/victordantasdev/woobank/assets/64330605/09dd3864-66f0-42fb-8132-0c3dc7c81b9e)


## Deployment

The application is available at: [https://woobank-web.vercel.app/](https://woobank-web.vercel.app/)

## Technologies Used

### Frontend

- **React**
- **TypeScript**
- **Vite**
- **Cypress**
- **TailwindCSS**
- **Chakra UI**
- **Relay**
- **Storybook**

### Backend

- **TypeScript**
- **Relay**
- **Koa**
- **Jest**

## License

This project is licensed under the [MIT License](LICENSE).

---

We hope you enjoy using WooBank! If you have any questions or suggestions, feel free to open an issue in the repository.
