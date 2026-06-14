# ./ai-backend/main.py (Configured for Gemini)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

# SET YOUR API KEY EXPLICITLY HERE (Or use os.environ["GOOGLE_API_KEY"])
GEMINI_API_KEY = ""

print("Initializing Cloud Gemini Models...")

# This embedding model works cleanly across all current versions
embeddings = GoogleGenerativeAIEmbeddings(
    model="gemini-embedding-001", 
    google_api_key=GEMINI_API_KEY
)

# FIX: Switch to ChatGoogleGenerativeAI and use "gemini-2.5-flash"
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash", 
    google_api_key=GEMINI_API_KEY,
    temperature=0.7
)

DOC_PATH = "./documents/data.txt"

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    user_query = request.message
    context_str = ""
    
    if os.path.exists(DOC_PATH):
        loader = TextLoader(DOC_PATH)
        documents = loader.load()
        text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        docs = text_splitter.split_documents(documents)
        
        vector_store = Chroma.from_documents(docs, embeddings)
        retriever = vector_store.as_retriever(search_kwargs={"k": 2})
        
        relevant_docs = retriever.invoke(user_query)
        context_str = "\n".join([doc.page_content for doc in relevant_docs])

    prompt = f"""
    You are a helpful assistant. Use ONLY the following pieces of context to answer the question at the end.
    If you do not know the answer based on the context, answer using your general knowledge but mention it isn't in the local data.

    Context:
    {context_str}

    Question: {user_query}
    Answer:
    """
    
    response = llm.invoke(prompt)

    # LangChain's ChatGoogleGenerativeAI returns an AIMessage object. 
    # We need to extract just the string content text:
    if hasattr(response, 'content'):
        clean_text = response.content
    else:
        clean_text = str(response)

    return {"response": clean_text} # Sends a clean string that your frontend understands