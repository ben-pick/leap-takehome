## Live site

https://leap-takehome.vercel.app/home

## Using the tool

This tool provides a way to create a list from a prompt input with CRUD functionality. Simply enter a prompt such as "How do I make sushi?" or "“I am an accountant, and my client is asking for advice on strategies to optimise his tax
structure. He and his partner have an income of $200,000 per year. They live in Sydney, Australia, and have no kids.".

## Getting Started

First, fill out the .env file. You will need to get a HuggingFace token (https://huggingface.co/docs/hub/en/security-tokens) and a Neon postgres instance. Fill out the .env in the root of the project:

```
MODEL=meta-llama/Meta-Llama-3-8B-Instruct
MAX_TOKENS=512
DATABASE_URL=<YOUR NEON POSTGRES INSTANCE HERE>
HF_TOKEN=<YOUR HUGGING FACE TOKEN HERE>
```

Next, build and start

```bash
npm install
npm run build
npm run start
```
