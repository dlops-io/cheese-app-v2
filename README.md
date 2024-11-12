# Cheese App - APIs & Frontend

In this tutorial we will setup three containers:
* api-service
* frontend-simple
* frontend-react
* vector-db

## Prerequisites
* Have Docker installed
* Have VSCode or editor of choice

## Tutorial (23): Setup Environments
In this tutorial we will setup containers to run python code for creating APIs and a container to run HTML web server. We will also use the vector-db as the RAG setup.

### Clone the github repository
- Clone or download from [here](https://github.com/dlops-io/cheese-app-v2)

### Create a local **secrets** folder

It is important to note that we do not want any secure information in Git. So we will manage these files outside of the git folder. At the same level as the `cheese-app-v2` folder create a folder called **secrets**

Your folder structure should look like this:
```
   |-cheese-app-v2
     |-images
     |-src
       |---api-service
       |---frontend-simple
       |---frontend-react
       |---vector-db
   |-secrets
   |-persistent-folder
```

## Tutorial (23): Vector DB for RAG Setup
We will start our vector DB and ensure we have loaded all th cheese book chunks + embeddings

### Go into the vector-db folder 
- Open a terminal and go to the location where `cheese-app-v2/vector-db`

### Build & Run Container
- Run `sh docker-shell.sh`
- Then we will download embeddings and load them int our vector DB
- Run `python cli.py --download --load --chunk_type recursive-split`

This step will ensure we have all the backend data for our cheese assistant RAG chat.

## Tutorial (23): Backend APIs
We will create a backend container to run our REST API. FastAPI framework will be used for this.

### Go into the api-service folder 
- Open a terminal and go to the location where `cheese-app-v2/api-service`

### Build & Run Container
- Run `sh docker-shell.sh`

### Review docker container setup
- Review `Dockerfile` for `EXPOSE 9000`
- Review `docker-shell.sh` for `-p 9000:9000` option
- Review `docker-shell.sh` for `-e DEV=1` option
- Review `docker-entrypoint.sh` for dev mode vs production mode

### Start API Service
- To run development API service run `uvicorn_server` from the docker shell
- What is the command `uvicorn_server`?
- Test the API service by going to `http://localhost:9000/`

### Review APIs
- Open `api/service.py` in your editor
- Review the service.py file
- Go to `http://localhost:9000/docs` and test API

### Enable APIs
- Enable the newsletters api by uncommenting the route for newsletters.
```
# Additional routers here
app.include_router(newsletter.router, prefix="/newsletters")
# app.include_router(podcast.router, prefix="/podcasts")
# app.include_router(llm_chat.router, prefix="/llm")
# app.include_router(llm_cnn_chat.router, prefix="/llm-cnn")
# app.include_router(llm_rag_chat.router, prefix="/llm-rag")
# app.include_router(llm_agent_chat.router, prefix="/llm-agent")
```
- Go to `http://localhost:9000/docs` and test the newsletters routes

- For each module we have a separate route:
  - Newsletters (`api/routers/newsletters.py`)
  - Podcasts (`api/routers/podcasts.py`)
  - LLM Chat (`api/routers/llm_chat.py`)
  - LLM + CNN Chat (`api/routers/llm_cnn_chat.py`)
  - LLM Rag (`api/routers/llm_rag_chat.py`)
  - LLM Agent  (`api/routers/llm_agent_chat.py`)

- Enable all the routes

### View API Docs
Fast API gives us an interactive API documentation and exploration tool for free.
- Go to `http://localhost:9000/docs`
- You can test APIs from this tool


## Tutorial (24): Frontend App (Simple)
We will build a simple frontend app that uses basic HTML & Javascript. We will consume the REST APIs exposed by the api service container

### Go into the frontend-simple folder 
- Open a terminal and go to the location where `cheese-app-v2/frontend-simple`

### Build & Run Container
- Run `sh docker-shell.sh`

### Start Web Server
- To run development web server run `http-server` from the docker shell
- Go to `http://localhost:8080/index.html`
- You should see the home page of the cheese app

### Test Newsletters
- Go to `http://localhost:8080/newsletters.html`
- If your API service is running, the page should show cheese newsletters.

### Review Newsletter
- Open `newsletters.html`
- Review HTML & Javascript code on how APIs are called

### Test Chat
- Go to `http://localhost:8080/chat.html`
- Type in a question on the chat input: e.g:`How is cheese made?`
- If your API service is running, the chat interface should return response from your backend Gemini LLM.

### Review Chat
- Open `chat.html`
- Review HTML & Javascript code on how APIs are called

## Tutorial (25): Frontend App (React)
Here we will use the React frontend framework to build a robust cheese app. The app will have multiple components and navigation.

### Go into the frontend-react folder 
- Open a terminal and go to the location where `cheese-app-v2/frontend-react`

### Build & Run Container
- Run `sh docker-shell.sh`

First we need to install all dependencies by running: 
- `npm install`

This step is only required the first time you run the app. It install all the frontend components for the app to run.

### Start Development Web Server
To run the app in development mode, simply run:
- Run `npm run dev` from the docker shell
- Go to `http://localhost:3000`


---

## Docker Cleanup

### Make sure we do not have any running containers and clear up an unused images
* Run `docker container ls`
* Stop any container that is running
* Run `docker system prune`
* Run `docker image ls`
