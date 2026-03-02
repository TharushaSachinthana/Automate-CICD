# Automate-CICD 🚀

An industry-standard, multi-service CI/CD pipeline implementation using **GitHub Actions**, **Docker Hub**, and **Watchtower**. This project serves as a production-grade template for automating the development lifecycle of a React/Node.js stack.

## 🏗️ Architecture
- **Frontend**: React (Vite) - Served via Nginx in a multi-stage Docker build.
- **Backend**: Node.js (Express) - REST API with Jest/Supertest suite.
- **Reverse Proxy**: Nginx - Routes traffic between frontend and backend services.
- **Continuous Registry**: Docker Hub (Public/Private repositories).

## 🔄 CI/CD Pipeline Flow (The Big Picture)
The workflow follows a **GitFlow-Lite** strategy to ensure code quality and seamless deployments:

1.  **Development (`test` branch)**: Daily work and experimentation. Every push triggers a high-quality audit.
2.  **Pull Request (`test` → `develop`)**: 
    - **QA Gate**: Triggers **Strict 90% Code Coverage** enforcement.
    - **Security Scans**: Executes `npm audit` for critical vulnerabilities.
    - **Linting**: Ensures code consistency before merging.
3.  **Merge to `develop`**:
    - Automatically builds 3 Docker images (Frontend, Backend, Nginx).
    - Tags images with **Semantic Versioning** (`MAJOR.MINOR.RUN_NUMBER`) and `latest`.
    - Pushes images to **Docker Hub**.
4.  **Auto-Deployment**:
    - **Watchtower** (running locally or on server) detects the new `latest` tag on Docker Hub.
    - Automatically pulls updated images and restarts containers with **zero manual effort**.

## 🛡️ QA & Reliability (90% Guardrail)
This project implements professional-grade Quality Assurance:
- **Strict Coverage Thresholds**: Every PR must achieve >90% coverage in **Branches, Functions, Lines, and Statements**.
- **Refactored for Testability**: The Express app is modularly exported to allow in-memory testing with `supertest`.
- **Istanbul Integration**: Key infrastructure blocks are identified for exclusion, ensuring we only measure meaningful business logic.
- **Artifact Auditing**: Full HTML coverage reports are saved as workflow artifacts on every build.

## 🤖 Daily Heartbeat Automation
To ensure the pipeline is always functional, a "Heartbeat" workflow runs daily at 09:00 UTC (configured on the `main` branch):
- Makes a chore commit to the `test` branch to maintain consistency and keep the GitHub streak alive.
- Automatically opens (and updates) a Pull Request from `test` to `develop`.
- Uses the **GitHub CLI (`gh`)** for robust automated PR management.
- Provides a "Merge" opportunity to verify the entire build/push/pull cycle systematically.

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

## 🚀 Future Direction
Leveling up the ecosystem with these upcoming features:
- **GitOps with ArgoCD**: Moving towards declarative state management in Kubernetes.
- **End-to-End (E2E) Testing**: Implementing Playwright/Cypress for full user-journey verification.
- **Monitoring & Alerts**: Integrating Prometheus/Grafana and Slack notifications for deployment status.
- **Infrastructure as Code (IaC)**: Using Terraform to manage cloud resources.

---
*Maintained for practicing high-frequency, reliable automation and engineering excellence.*
