# Contributing to Awesome Agent Templates

Thank you for your interest in contributing to **Awesome Agent Templates**! We're building the open standard for AI agents, and every contribution helps make agent development more accessible to everyone.

## Ways to Contribute

### Add a New Agent Template

Have you built an amazing agent? Share it with the community!

#### Step-by-Step Guide:

1. **Fork the Repository**
   ```bash
   # Click the "Fork" button on GitHub, then:
   git clone https://github.com/YOUR-USERNAME/awesome-agent-templates.git
   cd awesome-agent-templates
   ```

2. **Create Your Agent Template**
   ```bash
   # Copy an existing template as a starting point
   cp templates/websearch-agent.yaml templates/your-agent-name.yaml
   ```

3. **Fill in Your Agent Details**
   Follow our [template schema](#template-schema) and include:
   - Clear identity and description
   - Relevant tools and MCP servers
   - Proper reasoning settings
   - Helpful hints for users

4. **Test Your Template**
   ```bash
   # Validate your template
   npm install
   npm run validate
   ```

5. **Submit Your Contribution**
   ```bash
   git add templates/your-agent-name.yaml
   git commit -m "Add [YourAgentName]: Brief description"
   git push origin main
   ```
   
   Then create a Pull Request with:
   - Clear title: "Add [AgentName] template"
   - Description of what the agent does
   - Use cases and examples
   - Any special requirements

### Report Issues

Found a bug or have a suggestion?
- **Bug Reports**: [Open an issue](https://github.com/samitugal/awesome-agent-templates/issues/new?template=bug_report.md)
- **Feature Requests**: [Open an issue](https://github.com/samitugal/awesome-agent-templates/issues/new?template=feature_request.md)
- **Questions**: [Start a discussion](https://github.com/samitugal/awesome-agent-templates/discussions)

### Improve Documentation

Help make our docs better:
- Add new built-in tools
- Add new MCP servers
- Fix typos and improve clarity
- Add usage examples
- Create tutorials and guides
- Translate to other languages
- Update outdated information

### Enhance the Platform

Technical contributions are welcome:
- Improve the UI/UX
- Add new features
- Optimize performance
- Write tests
- Fix bugs

## Template Guidelines

### What Makes a Great Agent Template?

1. **Solves a Real Problem**: Address specific, practical use cases
2. **Well-Documented**: Clear descriptions and helpful examples
3. **Framework Agnostic**: Works across multiple AI frameworks
4. **Production Ready**: Tested and reliable
5. **Community Focused**: Helps others learn and build

### Template Schema

Every agent template must follow this structure:

```yaml
identity:
  name: "Your Agent Name"              # Clear, descriptive name
  description: "What this agent does"  # Max 150 characters
  author: "your-github-username"       # Your GitHub username
  tags: ["tag1", "tag2", "tag3"]      # Searchable keywords
  license: "MIT"                       # Open source license

prompt:
  system_prompt: |                     # Main instructions
    You are an expert agent that...
  user_prompt_examples:                # Example interactions
    - "How do I use this agent?"
    - "Show me an example output"

tools:
  recommended_tools:                   # External tools
    - name: "tool_name"
      description: "What this tool does"
      provider:
        name: "Provider Name"
        type: "Official|Community|Custom"
        url: "https://github.com/provider/tool"
  
  recommended_mcp_servers:             # MCP servers
    - name: "mcp_server"
      description: "MCP functionality"
      provider:
        name: "Provider Name"
        type: "Official|Community|Custom"
        url: "https://github.com/provider/server"

settings:
  reasoning_level: "recommended"       # none|optional|recommended|mandatory
  reasoning_strategy: "chain-of-thought"  # react|chain-of-thought|tree-of-thought
  memory_policy: "short-term"         # none|short-term|long-term
  state_storage: "in-memory"          # in-memory|local|remote

hints:
  - "Pro tip 1: How to use this agent effectively"
  - "Pro tip 2: Common pitfalls to avoid"
  - "Pro tip 3: Best practices and optimization"

metadata:
  template_version: "1.0.0"
  last_updated: "2025-11-02"          # Today's date
  schema_compatibility: "v1.0"
  related_agents: ["RelatedAgent1", "RelatedAgent2"]
  compatible_frameworks: ["LangChain", "Semantic Kernel", "CrewAI"]
  author: "https://github.com/your-username"
```

### Quality Standards

- **Originality**: Don't copy existing templates
- **Clarity**: Use clear, descriptive language
- **Completeness**: Fill all required fields
- **Testing**: Verify your template works
- **Ethics**: Follow AI ethics guidelines
- **Licensing**: Use open source licenses (MIT preferred)

## Recognition

We celebrate our contributors!

- **Featured Contributors**: Monthly spotlight
- **Hall of Fame**: Best templates get permanent recognition
- **Impact Metrics**: See how many people use your templates

## Community Guidelines

Our community is built on:

- ** Respect**: Treat everyone with kindness and respect
- **Learning**: Help others learn and grow
- **Sharing**: Share knowledge freely and openly
- **Inclusion**: Welcome people from all backgrounds
- **Innovation**: Push the boundaries of what's possible

### Code of Conduct

We follow the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). Please read it before participating.

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Local Development

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/awesome-agent-templates.git
cd awesome-agent-templates

# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:3000
```

### Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server

# Testing & Validation
npm run lint            # Check code quality
npm run validate        # Validate all templates
npm run generate-schema # Update schema from constants

# Deployment
npm run vercel-build    # Vercel-optimized build
npm run export          # Static site export
```

## Pull Request Process

1. **Fork & Branch**: Create a feature branch from `main`
2. **Develop**: Make your changes following our guidelines
3. **Test**: Ensure all tests pass and templates validate
4. **Document**: Update docs if needed
5. **Submit**: Create a clear, descriptive PR
6. **Review**: Respond to feedback and make requested changes
7. **Merge**: Once approved, we'll merge your contribution

### PR Checklist

- [ ] Template follows the schema
- [ ] All required fields are filled
- [ ] Template validates successfully
- [ ] Description is clear and under 150 characters
- [ ] Tags are relevant and searchable
- [ ] Hints are helpful and actionable
- [ ] Compatible frameworks are listed
- [ ] Author information is correct

## Getting Help

Need help with your contribution?

- **GitHub Discussions**: [Ask questions](https://github.com/samitugal/awesome-agent-templates/discussions)
- **Discord**: Coming soon!
- **Email**: [contributors@awesome-agent-templates.org](mailto:contributors@awesome-agent-templates.org)

## License

By contributing to Awesome Agent Templates, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for helping build the future of AI agents! **
