# Dockerized Web Architecture with Host Nginx Proxy

This project contains a static web application hosted inside an isolated Docker container and served publicly using a host-level Nginx reverse proxy. 

Instead of deploying raw code directly to a traditional web folder (`/var/www/html`), this setup uses a containerized layer combined with Docker volumes. This means the entire infrastructure can be zipped, moved, and spun up on any local machine or alternative cloud provider instantly—resolving the classic "it works on my machine" problem.

---

## The Infrastructure Design

The application uses a two-tier networking structure to keep the application isolated while remaining accessible to the public internet:

1. **The Entry point:** Public web traffic arrives at the AWS EC2 instance on standard **Port 80**.
2. **The Guard (Host Nginx):** A native Nginx installation running on the Ubuntu host intercepts the traffic. Using a custom server block configuration, it acts as a **Reverse Proxy**, instantly forwarding the incoming request inward to `http://127.0.0.1:8080`.
3. **The Application Core (Docker Container):** A lightweight `nginx:alpine` container is running in background mode, listening internally on **Port 8080**.
4. **The Storage Bridge (Bind Mount Volume):** The website files (HTML, CSS, JS, and images) sit safely on the host machine inside the `./staticWeb` directory. Docker mounts this directory straight into the container's web root (`/usr/share/nginx/html`) using a **Read-Only (`:ro`)** flag. 

---

## Live Reloading Capabilities

Because the container uses a direct filesystem bind-mount rather than baking the code directly into a static image, you don't have to rebuild the container or run complex Docker scripts when making updates. 

If you modify `index.html` or change a style in `home.css` using a command-line editor like `nano`, the container instantly sees the modification on disk. The updates go live the exact millisecond a user refreshes their browser.

---

## How to Run This Project Locally

To replicate this environment on your own local laptop (Linux, macOS, or Windows with Docker Desktop active), use the following steps:

### 1. Clone the Repository
git clone [https://github.com/YOUR_USERNAME/nginx-docker-reverse-proxy.git](https://github.com/YOUR_USERNAME/nginx-docker-reverse-proxy.git)
cd nginx-docker-reverse-proxy

### 2. Boot the Container Environment
Launch the isolated container stack using Docker Compose in background (detached) mode:
docker compose up -d

### 3. Verify System Operations
Check the running state and network port maps of the container:
docker compose ps

Once the container is marked as active, open your preferred web browser and navigate to:
Plaintext
http://localhost:8080

### 4. Repository Contents
docker-compose.yml - The environment infrastructure blueprint mapping services, ports, and volumes.

staticWeb/ - The core application directory containing the frontend code files, style components, and media assets.

.gitignore - Standard configuration ensuring platform-specific junk files remain untracke
