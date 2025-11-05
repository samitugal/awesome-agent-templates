# Agent Templates

This directory contains agent templates organized by category.

## Structure

Each category has its own folder, and agent templates are placed inside their respective category folders:

```
templates/
├── Development/
│   └── code-executor-agent.yaml
├── Research/
│   └── web-search-agent.yaml
├── Data Analysis/
│   ├── retrieval-agent.yaml
│   └── warren-buffett-agent.yaml
├── Automation/
│   └── command-agent.yaml
└── Productivity/
    └── orchestrator-agent.yaml
```

## Adding a New Agent

1. **Choose or Create a Category**: 
   - Use an existing category folder (Development, Research, Data Analysis, Automation, Productivity, Creative, Customer Support)
   - Or create a new category folder with a descriptive name

2. **Create Your Agent YAML File**:
   - Place your agent YAML file in the appropriate category folder
   - The category will be **automatically assigned** from the folder name
   - **Do not include a `category` field** in your YAML file

3. **YAML Template**:
```yaml
identity:
  name: "Your Agent Name"
  description: "Brief description of what your agent does"
  purpose: "One-line purpose statement"
  author: "your-github-username"
  tags: ["tag1", "tag2", "tag3"]
  license: "MIT"

prompt:
  system_prompt: |
    Your agent's system prompt here...
  user_prompt_examples:
    - "Example user prompt 1"
    - "Example user prompt 2"

tools:
  recommended_tools:
    - name: "tool_name"
      description: "Tool description"
      provider:
        name: "Provider Name"
        type: "Official" # or "Community" or "Custom"
        url: "https://github.com/..."

settings:
  reasoning_level: "recommended" # none, optional, recommended, mandatory
  reasoning_strategy: "chain-of-thought" # react, chain-of-thought, tree-of-thought, reflection
  memory_policy: "short-term" # none, short-term, long-term
  state_storage: "in-memory" # in-memory, local, remote

metadata:
  template_version: "1.0.0"
  last_updated: "2025-11-05"
  schema_compatibility: "v1.0"
  related_agents: []
  compatible_frameworks: ["LangChain", "Semantic Kernel", "CrewAI", "Agno", "Upsonic"]
  author: "https://github.com/your-username"
```

## Creating a New Category

To add a new category:

1. Create a new folder under `templates/` with your category name
2. Add your agent YAML files to that folder
3. The category will automatically appear in the UI with the folder name

Example:
```bash
mkdir templates/"Customer Support"
# Add your agent YAML file
cp my-agent.yaml templates/"Customer Support"/
```

## Category Colors

Categories are automatically assigned colors in the UI. Current categories:
- **Development** - Emerald
- **Creative** - Purple
- **Data Analysis** - Green
- **Customer Support** - Orange
- **Productivity** - Pink
- **Research** - Indigo
- **Automation** - Cyan

New categories will get a default gray color until added to the color mapping.

## Guidelines

- Use descriptive, clear category names
- Keep agent files focused on a single purpose
- Include comprehensive examples in `user_prompt_examples`
- Document all required tools and their providers
- Keep descriptions concise but informative
