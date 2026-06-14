# Local AI Copilot Platform (Monorepo)

An enterprise-ready Micro-Frontend (MFE) platform featuring an AI Copilot chat interface. This architecture decouples the user interface layer into independent, modular web applications powered by Webpack Module Federation, integrating seamlessly with a high-performance Python FastAPI vector retrieval (RAG) backend. 

The system has been fully migrated from heavy local models to an optimized online cloud infrastructure (Google Gemini). This eliminates local CPU/GPU overhead, avoids thermal limitations on developer machines, and provides massive context windows for scanning local text datasets.

---

## 🏗️ Project Components Summary

This monorepo is divided into three distinct operational layers:

1. **`host-app` (Frontend Shell - Port 3000):** The central orchestration container. It manages global app states, design system layouts, routing boundaries, and dynamically imports remote micro-frontends at runtime.
2. **`ai-chat-feature` (Remote MFE - Port 3001):** An isolated, pluggable user interface micro-feature. It serves the chatbot interface widget independently and gets loaded into the host shell via Module Federation.
3. **`ai-backend` (FastAPI Server - Port 8000):** A Python application managing semantic chunk splitting, local vector indexing via ChromaDB, and real-time inference mapping out to Google Gemini's API.

---

## 🔒 Security & Git Protection

* **Zero Hardcoded Keys:** Your sensitive cloud credentials are dynamically looked up inside the code via system environment variables (`os.getenv("GOOGLE_API_KEY")`).
* **Clean History Tracking:** The workspace configurations ensure that untracked transient layers like local data structures (`.chroma/`), local runtimes (`venv/`), and massive JavaScript folders (`node_modules/`) never get pushed to your remote repository.

---

## 🚀 Execution & Running Instructions

Follow these instructions exactly to spin up your backend data engines and frontend microservice systems concurrently.

### 1. Start the Python AI Backend
Open a terminal window and run these commands to set up your isolated Python layer, configure security tokens, and spin up the API:

```bash
# Navigate to the backend workspace
cd /Users/rohanmahajan/local-ai-mfe-platform/ai-backend

# Initialize and activate an isolated virtual runtime environment
python3 -m venv venv
source venv/bin/activate

# Upgrade the pip package installer and install essential dependencies
python3 -m pip install --upgrade pip
python3 -m pip install langchain-google-genai fastapi uvicorn langchain langchain-community chromadb pydantic

# SECURE INJECTION: Expose your AI Studio token to your active terminal process
export GOOGLE_API_KEY="AIzaSyYourActualKeyFromGoogleAIStudio"

# Ensure your underlying vector text knowledge base document exists
mkdir -p documents
echo "Add your company portfolio, investments, or custom data points here." > documents/data.txt

# Start the live-reloading FastAPI application web server
python3 -m uvicorn main:app --reload --port 8000

# Navigate into the UI feature workspace
cd /Users/rohanmahajan/local-ai-mfe-platform/ai-chat-feature

# Install all required frontend packages and launch the dev server
npm install
npm start

# Navigate into the global container layout workspace
cd /Users/rohanmahajan/local-ai-mfe-platform/host-app

# Install dependencies and build the runtime interface shell
npm install
npm start