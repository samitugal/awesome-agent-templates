# Awesome Agent Templates

<div align="center">

![Awesome Agent Templates](https://img.shields.io/badge/Awesome-Agent%20Templates-blue?style=for-the-badge&logo=robot)
![Framework Agnostic](https://img.shields.io/badge/Framework-Agnostic-green?style=for-the-badge)
![Community Driven](https://img.shields.io/badge/Community-Driven-orange?style=for-the-badge)

**Define once, run anywhere — the open standard for AI Agents.**

[🌐 Website](https://samitugal.github.io/awesome-agent-templates) • [📖 Docs](#-about) • [🤝 Contribute](CONTRIBUTING.md) • [💬 Community](https://github.com/samitugal/awesome-agent-templates/discussions)

</div>

---

## About

**Awesome Agent Templates** is a community project that aims to make **AI agent development simple, reusable, and open**.


We collect, standardize, and share high-quality **agent templates** so anyone can build and run powerful AI systems without starting from scratch.

Whether you’re using **LangChain**, **Semantic Kernel**, **CrewAI**, **Agno**, **Upsonic**, or any MCP-compatible platform, you’ll find reusable agent blueprints here.

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
- [Warren Buffett Agent](https://samitugal.github.io/awesome-agent-templates) — Investment analysis and financial advice  
- [Web Search Agent](https://samitugal.github.io/awesome-agent-templates) — Find and summarize information from the web  
- [Retrieval Agent](https://samitugal.github.io/awesome-agent-templates) — Query and retrieve information from databases  
- [Code Executor Agent](https://samitugal.github.io/awesome-agent-templates) — Run, test, and debug code safely  
- [Command Agent](https://samitugal.github.io/awesome-agent-templates) — Execute system commands and operations  
- [Orchestrator Agent](https://samitugal.github.io/awesome-agent-templates) — Coordinate multiple agents and workflows  

Each template follows a simple schema — name, purpose, tools, reasoning level, memory settings, metadata — everything an agent needs to come alive.

**Categories are automatically assigned** from the folder structure, making it easy to organize and discover agents.

### Framework Agnostic
Write once, deploy anywhere.  
Each agent can run across multiple ecosystems: LangChain, Semantic Kernel, CrewAI, Agno, Upsonic, or even custom MCP setups.

### Beautiful Interface
Browse templates visually with:
- Color-coded categories
- GitHub profile integration
- Smart filtering and search
- Responsive design

---

## How to Contribute

**We’re a community project, your ideas shape this ecosystem.**

### Add a New Agent

Templates are organized by category in folders:
```
templates/
├── Development/
├── Research/
├── Data Analysis/
├── Automation/
├── Productivity/
└── Finance/
```

1. **Fork the repo**
2. **Choose or create a category folder**
   ```bash
   # Use existing category
   cd templates/Development
   
   # OR create new category
   mkdir templates/"Your Category"
   ```
3. **Create your agent YAML** (category is auto-assigned from folder)
4. **Submit a PR** with a clear description

We'll validate it, review it, and feature it on the site!

📖 **Full guide:** See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions.

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

We’re building a place where AI engineers, researchers, and creators share what they find useful tips and templates.

Join us if you believe in:
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
- **GitHub Discussions:** [samitugal/awesome-agent-templates/discussions](https://github.com/samitugal/awesome-agent-templates/discussions)  

---

## Recognition

Every contributor is a builder of the open-agent future.  
We highlight:
- Featured Contributors — monthly showcase  

---


## Acknowledgments 
Inspired by [awesome-prompts](https://github.com/f/awesome-chatgpt-prompts)