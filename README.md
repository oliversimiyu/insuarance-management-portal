# InsureManage Portal

![InsureManage Portal](https://img.shields.io/badge/InsureManage-Portal-blue)
![React](https://img.shields.io/badge/React-18.x-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-purple)
![Recharts](https://img.shields.io/badge/Recharts-2.x-orange)
![jsPDF](https://img.shields.io/badge/jsPDF-2.x-red)
![License](https://img.shields.io/badge/License-MIT-green)

A comprehensive insurance management portal built with React.js that allows insurance companies to manage policies, clients, claims, and payments through an intuitive and modern interface. Features include policy management, client management, claims processing, payment tracking, and advanced reporting with PDF export capabilities.

## Features

- **Dashboard**: Overview with key metrics, recent activities, and alerts
- **Policy Management**: Create, view, edit, and manage insurance policies
- **Client Management**: Maintain a comprehensive client database
- **Claims Processing**: Track and process insurance claims efficiently
- **Payment Recording**: Record and track claim payments with detailed information
- **Payment Tracking**: Monitor premium payments and transactions
- **Advanced Reporting**: Generate insights with interactive charts and visualizations
- **PDF Export**: Export reports and data as professional PDF documents
- **Data Visualization**: Interactive charts using Recharts for better data interpretation
- **User Authentication**: Secure login and registration system with localStorage persistence
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Screenshots

*(Screenshots would be added here in a production README)*

## Technology Stack

- **Frontend**: React.js, React Router, Bootstrap 5
- **Form Handling**: Formik with Yup validation
- **UI Components**: React Icons
- **State Management**: React Context API and localStorage for auth state
- **Data Visualization**: Recharts for interactive charts and graphs
- **PDF Generation**: jsPDF and html2canvas for PDF export functionality
- **Styling**: Bootstrap 5 with custom CSS

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/oliversimiyu/insuarance-management-portal.git
   cd insuarance-management-portal
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Project Structure

```
src/
├── components/       # Reusable UI components
│   └── layout/      # Layout components (Navbar, Sidebar, Footer)
├── pages/           # Page components
├── services/        # API services and data fetching
├── utils/           # Utility functions and helpers
├── context/         # React Context for state management
├── assets/          # Static assets (images, CSS)
└── App.js           # Main application component with routing
```

## Demo Credentials

Use the following credentials to test the application:

- **Email**: admin@example.com
- **Password**: password

## Available Scripts

- `npm start`: Run the app in development mode
- `npm test`: Launch the test runner
- `npm run build`: Build the app for production

## Future Enhancements

- Integration with backend API for real data persistence
- User roles and permissions system
- Document management system for policy documents
- Email notifications for claim status updates
- Multi-language support for international use
- Dark mode theme for better accessibility
- Mobile app version using React Native

## License

MIT © 2025

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
