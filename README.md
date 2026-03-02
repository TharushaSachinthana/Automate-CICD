# Automate-CICD 🚀

An industry-standard, multi-service CI/CD pipeline implementation using **GitHub Actions**, **Docker Hub**, and **Watchtower**. This project serves as a production-grade template for automating the development lifecycle of a React/Node.js stack.

## 🏗️ Architecture
- **Frontend**: React (Vite) - Served via Nginx in a multi-stage Docker build.
- **Backend**: Node.js (Express) - REST API with Jest/Supertest suite.
- **Reverse Proxy**: Nginx - Routes traffic between frontend and backend services.
- **Continuous Registry**: Docker Hub (Public/Private repositories).

## 🔄 CI/CD Pipeline Flow
The workflow follows a **GitFlow-Lite** strategy to ensure code quality and seamless deployments:

1. **Development (`test` branch)**: Daily work and experimentation.
2. **Pull Request (`test` → `develop`)**: 
   - Triggers **Linting** & **Unit Tests**.
   - Executes **Security Scans** (`npm audit`).
3. **Merge to `develop`**:
   - Automatically builds 3 Docker images (Frontend, Backend, Nginx).
   - Tags images with **Semantic Versioning** (`MAJOR.MINOR.RUN_NUMBER`) and `latest`.
   - Pushes images to **Docker Hub**.
4. **Auto-Deployment**:
   - **Watchtower** (running locally or on server) detects the new `latest` tag.
   - Automatically pulls the updated images and restarts containers with zero manual effort.

## 🤖 Daily Heartbeat Automation
To ensure the pipeline is always functional, a "Heartbeat" workflow runs daily at 09:00 UTC (configured on the `main` branch):
- Makes a chore commit to the `test` branch to maintain consistency.
- Automatically opens a Pull Request from `test` to `develop`.
- Uses the **GitHub CLI (`gh`)** for robust PR management and updates.
- Provides a "Merge" opportunity to verify the entire build/push/pull cycle.


## 🛠️ Local Setup

### Prerequisites
- Docker Desktop
- Node.js (v18+)

### Installation
1. **Clone the repo**:
   ```bash
   git clone https://github.com/TharushaSachinthana/Automate-CICD.git
   cd Automate-CICD
   ```

2. **Configure Environment**:
   Create a `.env` file in the root:
   ```env
   DOCKERHUB_USERNAME=your_dockerhub_username
   ```

3. **Run Production Stack**:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

4. **Enable Auto-Updates**:
   ```bash
   docker run -d --name watchtower -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower --interval 30
   ```

## 🔒 Security & Best Practices
- **Multi-stage Builds**: Minimizes Docker image size and exposure.
- **Non-root privilege**: Backend runs under specialized Node user (Production prep).
- **Secrets Management**: Sensitive keys (Docker Tokens) are stored exclusively in GitHub Secrets.

---
*Maintained for practicing high-frequency, reliable automation.*
