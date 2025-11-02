# Awesome Agent Templates

<div align="center">

![Awesome Agent Templates](https://img.shields.io/badge/Awesome-Agent%20Templates-blue?style=for-the-badge&logo=robot)
![Framework Agnostic](https://img.shields.io/badge/Framework-Agnostic-green?style=for-the-badge)
![Community Driven](https://img.shields.io/badge/Community-Driven-orange?style=for-the-badge)

**Define once, run anywhere — the open standard for AI Agents.**

[🌐 Website](https://awesome-agent-templates.vercel.app) • [📖 Docs](#-about) • [🤝 Contribute](CONTRIBUTING.md) • [💬 Community](https://github.com/awesome-agent-templates/awesome-agent-templates/discussions)

</div>

---

## About

**Awesome Agent Templates** is a community project that aims to make **AI agent development simple, reusable, and open**.

Think of it as *“the GitHub of AI agents.”*  
We collect, standardize, and share high-quality **agent templates** so anyone can build and run powerful AI systems — without starting from scratch.

Whether you’re using **LangChain**, **Semantic Kernel**, **CrewAI**, **Agno**, or any MCP-compatible platform, you’ll find reusable agent blueprints here.

> One language for all agents.  
> One format, infinite possibilities.

---

## Why It Exists

While working on different AI projects, I kept running into the same loop building the same kinds of agents over and over. Copy, paste, tweak, repeat. It got old fast.  

So I created this repo to make things simpler a single place for reusable, shareable agent templates.  

**Build once, use everywhere.**

---

## What You’ll Find Here

### Agent Templates
Reusable YAML definitions for different agent types:
- [Warren Buffett Agent](https://awesome-agent-templates.vercel.app/agents/warren-buffett-agent) — Investment analysis and financial advice  
- [Web Search Agent](https://awesome-agent-templates.vercel.app/agents/websearch-agent) — Find and summarize information from the web  
- [Retrieval Agent](https://awesome-agent-templates.vercel.app/agents/retrieval-agent) — Query and retrieve information from databases  
- [Code Executor Agent](https://awesome-agent-templates.vercel.app/agents/code-executor-agent) — Run, test, and debug code safely  
- [Command Agent](https://awesome-agent-templates.vercel.app/agents/command-agent) — Execute system commands and operations  
- [Orchestrator Agent](https://awesome-agent-templates.vercel.app/agents/orchestrator-agent) — Coordinate multiple agents and workflows  

Each template follows a simple schema — name, tools, reasoning level, memory settings, metadata — everything an agent needs to come alive.

### Framework Agnostic
Write once, deploy anywhere.  
Each agent can run across multiple ecosystems: LangChain, Semantic Kernel, CrewAI, Agno, AutoGen, or even custom MCP setups.

### Beautiful Interface
Browse templates visually, just like [prompts.chat](https://prompts.chat)

---

## How to Contribute

**We’re a community project, your ideas shape this ecosystem.**

### Add a New Agent
1. Fork the repo  
2. Copy `templates/example-agent.yaml`  
3. Fill in your agent’s details  
4. Submit a PR with a clear description  

We’ll validate it, review it, and feature it on the site!

### Improve the Docs
- Add new built-in tools
- Add new MCP servers
- Simplify explanations  
- Add usage examples  
- Translate to other languages  
- Fix typos or add links  

### Suggest Features
Open a discussion for:
- New schema fields  
- Framework adapters  
- Language generators  
- MCP registry integrations  

---

## Community

We’re building a place where AI engineers, researchers, and creators share what they learn — not just code, but ideas.

Join us if you believe in:
- Collaboration over competition  
- Open knowledge for everyone  
- Building things that last  


---

## Future Works

The *Awesome Agent Templates* project is designed to evolve with the community and we’re already trying to explore ambitious next steps.

### 1. Framework-Aware Code Generation
Imagine this:  
You pick a template like `WebSearchAgent`, choose your target framework (`LangChain`, `Semantic Kernel`, `Agno`, `CrewAI`, etc.), and select a language (`Python`, `C#`, `TypeScript`).

Then — **boom** — the system generates a **ready-to-run agent code** using the metadata in the YAML file.

The generator will:
- Parse the agent’s reasoning level, tools, and connectivity  
- Match each tool with known framework adapters  
- Inject the correct imports, classes, and initialization patterns  
- Output clean, runnable code for your chosen stack  

Example:
```bash
aat generate WebSearchAgent --framework semantic-kernel --lang python
```

---

### Connect
- **GitHub Discussions:** [awesome-agent-templates/discussions](https://github.com/awesome-agent-templates/awesome-agent-templates/discussions)  

---

## Recognition

Every contributor is a builder of the open-agent future.  
We highlight:
- Featured Contributors — monthly showcase  
- Hall of Fame — best community templates  
- Swag drops & recognition


---


## Acknowledgments 
Inspired by [awesome-prompts](https://github.com/f/awesome-chatgpt-prompts)