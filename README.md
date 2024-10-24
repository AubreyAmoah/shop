# Shop Application

## Description
This is a full-stack e-commerce application with an admin dashboard. The backend is powered by Node.js, while the frontend includes two sections: an admin dashboard built using React.js, and a public-facing e-commerce platform built using Next.js.

## Project Structure
```bash
shop/
│
├── client/
│   ├── admin/       # Frontend for the admin dashboard (React.js)
│   └── public/      # Frontend for the e-commerce site (Next.js)
│
└── server/          # Backend API (Node.js)
```

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Backend (Server)
1. Navigate to the `server` folder:
   ```bash
   cd shop/server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Node.js server:
   ```bash
   npm start
   ```

### Frontend (Client)
#### Admin Dashboard (React.js)
1. Navigate to the `client/admin` folder:
   ```bash
   cd shop/client/admin
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the admin dashboard:
   ```bash
   npm start
   ```

#### Public eCommerce Dashboard (Next.js)
1. Navigate to the `client/public` folder:
   ```bash
   cd shop/client/public
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js server:
   ```bash
   npm run dev
   ```

## Usage
- Visit the admin dashboard at `http://localhost:3000/admin`
- Visit the public e-commerce site at `http://localhost:3000`

## Contributing
Feel free to open an issue or submit a pull request for contributions. We welcome improvements to both the backend and frontend.

## License
This project is licensed under the MIT License.
