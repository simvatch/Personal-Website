from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from Jay import jay_execute 

app = FastAPI(title="Jay API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CommandRequest(BaseModel):
    command: str

@app.get("/")
def read_root():
    return {"message": "Jay API is running!"}

@app.post("/")
def execute_command(request: CommandRequest):
    command = request.command
    response = jay_execute(command)
    if response is None:
        response = "No response from Jay."
    elif isinstance(response, (list, dict)):
        response = str(response)

    return {"response": response}