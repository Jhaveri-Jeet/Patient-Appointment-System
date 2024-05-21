<div align="center">

# 🏥 Patient Appointment System - Frontend 📅

**Watch full video demonstration of the software**

[![Watch the video](./Patient%20Appointment%20System.png)](https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7198646882674339840?compact=1)

**Harnessing the Power of Modern Web Technologies to Streamline Healthcare Appointments**

[![Vite](https://img.shields.io/badge/built_with-Vite-blueviolet)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/framework-React-blue)](https://reactjs.org/)
[![TanStack Query](https://img.shields.io/badge/state_management-TanStack_Query-orange)](https://tanstack.com/query/v4)
[![Shadcn UI](https://img.shields.io/badge/UI_library-Shadcn_UI-yellowgreen)](https://shadcn.com/)
[![Stripe Integration](https://img.shields.io/badge/payment-Stripe_integration-blue)](https://stripe.com/)

</div>

## 🚀 Overview

The Patient Appointment System is a dynamic frontend application designed to optimize healthcare appointment scheduling and management. Utilizing a suite of modern web technologies, it provides a robust platform for patients and healthcare providers to interact efficiently, backed by a powerful FastAPI backend.

## ✨ Key Features

- **Interactive Patient Dashboard**: Manage and view patients with detailed profiles. Click interactions reveal appointment histories and related actions in a dynamic, intuitive interface.
- **Comprehensive Appointment Handling**: Seamlessly manage pending and past appointments, with functionality to issue prescriptions that automatically update the appointment status.
- **Service Management**: Easily update and manage healthcare services with interactive list controls.
- **Real-Time Notifications**: Automated feedback notifications for user actions, enhancing the overall user experience.
- **Secure User Authentication**: Includes features for user login and logout, utilizing JWT for secure access and ensuring that users can only access routes they are authorized for.
- **Adaptive UI Themes**: Choose from light, dark, or system-based themes to personalize the visual experience.
- **Optimized Data Queries**: Leverage caching and state management for enhanced performance and faster response times.
- **Integrated Payment Processing**: Facilitated through Stripe for secure and hassle-free transactions.

## 🧰 Technologies and Libraries

- **Vite**: Next generation frontend tooling.
- **React**: For building powerful and interactive UIs.
- **TanStack Query**: State management optimized for async operations and caching.
- **Shadcn UI**: For crafting responsive and visually appealing components.
- **Stripe**: Secure online payment integration.

## 📦 Getting Started

### Prerequisites

Ensure you have Node.js, npm, and Python installed:

```bash
node --version
npm --version
python --version
```

### Installation

1. **Clone the frontend repository**:

   ```bash
   git clone https://github.com/Jhaveri-Jeet/Patient-Appointment-System-Admin.git
   cd Patient-Appointment-System-Admin
   npm install
   ```

2. **Clone the API repository** (necessary for backend services):

   ```bash
   git clone https://github.com/Jhaveri-Jeet/Patient-Appointment-System-Backend.git
   cd Patient-Appointment-System-Backend
   pip install -r requirements.txt
   ```

3. **Run both servers** (ensure both directories are running in separate terminals):
   ```bash
   # In the frontend directory
   npm run dev
   # In the backend directory
   uvicorn main:app --reload
   ```

Visit `http://localhost:3000` to explore the application.

## 🔧 Reporting Issues

Encounter a bug or have a suggestion? Please [open an issue](https://github.com/Jhaveri-Jeet/Patient-Appointment-System-Admin/issues) to help us improve.
