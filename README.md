# Claim Management System

A modern, interactive insurance platform designed to streamline policy purchases, user onboarding, and claims management. Built with the MERN stack, this system delivers a smooth user experience and integrates serverless components to enhance efficiency and scalability.

## Project Status

This project is **currently under development**.  
- Frontend features like user registration, login, policy purchase, and claim submission are functional using **browser local storage**.
- Backend integration using **MongoDB**, **JWT-based authentication**, and **AWS** services is actively in progress.

## Features

-  User registration and login with JWT authentication
-  Purchase insurance policies and manage user profiles
-  File and track insurance claims via an intuitive Material-UI interface
-  Real-time insights into policies and claims (coming soon via AWS Redshift & Airflow)
-  Secure microservices architecture (in-progress)
-  Serverless backend for claims automation using AWS Lambda, Step Functions, and SNS
-  CI/CD setup with GitHub Actions and containerization with Docker (WIP)
-  Planned integration of Apache Kafka & Spark Streaming for live data ingestion and fraud detection

## UI Preview

*Include screenshots or a short demo video link here if available*

## Tech Stack

**Frontend:**
- React.js
- Material-UI
- LocalStorage (temporary)

**Backend (In Progress):**
- Node.js, Express.js
- MongoDB
- JWT for authentication

**Cloud & DevOps (Planned / Partially Integrated):**
- AWS Lambda, Step Functions, SNS
- Docker, GitHub Actions (CI/CD)
- Apache Airflow for ETL workflows
- AWS Redshift for analytics
- Apache Kafka & Spark Streaming

##  Getting Started

### Prerequisites
- Node.js & npm
- Git

### Installation
```bash
git clone https://github.com/5umitra/Claim-Management.git
cd Claim-Management
npm install
npm start


## To Do

- [ ] Connect frontend with MongoDB backend  
- [ ] Add authentication middleware  
- [ ] Deploy Docker containers  
- [ ] Implement AWS serverless workflows (Lambda, Step Functions)  
- [ ] Integrate ETL and real-time analytics (Airflow)


## Project Structure
/client → React frontend (LocalStorage-based)
/server → (Coming soon) Node.js + MongoDB backend
/.github → GitHub Actions workflows
/docker → Docker setup files (planned)

Let me know if you'd like this README adjusted for deployment (e.g., Vercel, Render, etc.) or if you want a database-ready version once your backend is done.
