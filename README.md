# Automate-CICD 🚀

An automated, multi-service CI/CD pipeline implementation using **GitHub Actions**, **Docker Hub**, and **Watchtower**. This project serves as a clean, production-grade template for automating the testing, containerization, and continuous delivery of a full-stack React and Node.js application.

---

## 🏗️ Architecture

The application is structured as a 3-tier containerized architecture:

```
[ Client Browser ]
        │
        ▼ (Port 80)
┌──────────────┐
│    Nginx     │ ──( / )────► [ Frontend: React + Vite (Static Nginx) ]
│ Reverse Proxy│
│              │ ──( /api )─► [ Backend: Node.js + Express (Port 5000) ]
└──────────────┘
```

- **Frontend (`frontend/`)**: React (Vite) Single-Page Application (SPA) containerized via multi-stage Docker build with Nginx.
- **Backend (`backend/`)**: Node.js (Express) REST API with automated unit and integration tests using **Jest** and **Supertest**.
- **Reverse Proxy (`nginx/`)**: Nginx reverse proxy routing port `80` client traffic between frontend (`/`) and backend (`/api`).
- **Container Registry**: Docker Hub for versioned and latest container images.
- **Continuous Deployment**: **Watchtower** for automated container updates upon new image releases.

---

## 🔄 CI/CD Pipeline Workflow

The automated pipeline is defined in [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml):

1. **Pull Request or Push to `develop`**:
   - **Automated Testing**: Runs backend integration tests (`npm test`) using Jest & Supertest.
   - **Security Audit**: Executes `npm audit --audit-level=high` to detect known vulnerabilities.
2. **Merge to `develop`**:
   - **Docker Build**: Builds production Docker images for Frontend, Backend, and Nginx reverse proxy.
   - **Semantic Tagging**: Tags images with both `MAJOR.MINOR.<RUN_NUMBER>` and `latest`.
   - **Registry Push**: Authenticates and publishes all three images to **Docker Hub**.
3. **Auto-Deployment (Watchtower)**:
   - Watchtower monitors Docker Hub for new `latest` tags.
   - Automatically pulls new images and gracefully restarts containers without manual intervention.

---

## 🛠️ Local Development & Setup

### Prerequisites
- Docker & Docker Compose
- Node.js (v18+) *(Optional, for running outside Docker)*

### 1. Clone the Repository
```bash
git clone https://github.com/TharushaSachinthana/Automate-CICD.git
cd Automate-CICD
```

### 2. Run with Docker Compose (Local Build)
Build and start all 3 services locally:
```bash
docker compose up --build -d
```
Access the application at `http://localhost`.

### 3. Run Production Stack (Pre-built Images)
Create a `.env` file in the root directory:
```env
DOCKERHUB_USERNAME=your_dockerhub_username
```
Launch the production images:
```bash
docker compose -f docker-compose.prod.yml up -d
```

### 4. Enable Automated Container Updates with Watchtower
```bash
docker run -d \
  --name watchtower \
  -v /var/run/docker.sock:/var/run/docker.sock \
  containrrr/watchtower --interval 30
```

---

## 🧪 Testing

Run the backend integration test suite:
```bash
cd backend
npm install
npm test
```

---

## 📂 Project Structure

```
Automate-CICD/
├── .github/
│   └── workflows/
│       └── ci-cd.yml              # GitHub Actions CI/CD Pipeline
├── backend/
│   ├── Dockerfile                 # Backend Node.js image definition
│   ├── index.js                   # Express application & REST endpoints
│   ├── index.test.js              # Integration tests (Jest + Supertest)
│   └── package.json
├── frontend/
│   ├── Dockerfile                 # Multi-stage build (Vite build -> Nginx)
│   ├── src/                       # React source code
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── nginx/
│   ├── Dockerfile                 # Nginx reverse proxy image
│   └── default.conf               # Routing configuration (/ and /api)
├── docker-compose.yml             # Local build compose
├── docker-compose.prod.yml        # Docker Hub production image compose
└── README.md
```
