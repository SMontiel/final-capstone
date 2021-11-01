# Setup
### Install dependencies.
```bash
npm install
```
### Setup dotenv (environment vars).
Copy the file .env.example to .env
```bash
cp .env.example
```
Remplace the values of the vars in the .env file.

### Run project.
```bash
npm start
```

### Endpoints
- [get] /
- [post] /login
- [get] /_health
- [get] /cidr-to-mask?value=${cidr}
- [get] /mask-to-cidr?value=${mask}

# How to run with Docker

## Getting the image

### Building locally
Open a terminal in this directory, then run the following command:
```bash
docker build --tag smontiel/academy-sre-bootcamp-salvador-montiel:latest ./
```

### From Docker Hub
Open a terminal, then run the following command:
```
docker pull smontiel/academy-sre-bootcamp-salvador-montiel:latest
```

## Running
```
docker run -p 8000:8000 --rm -it smontiel/academy-sre-bootcamp-salvador-montiel:latest
```

Now, go to: http://localhost:8000/
