export interface AgentIdentity {
  name: string
  description: string
  author: string
  tags: string[]
  license: string
}

export interface AgentPrompt {
  system_prompt: string
  user_prompt_examples?: string[]
}

export interface ToolProvider {
  name: string
  type: 'builtin' | 'community' | 'custom'
  url?: string
}

export interface Tool {
  name: string
  description: string
  provider: {
    name: string
    type: 'Official' | 'Community' | 'Custom'
    url?: string
  }
}

export interface MCPServer {
  name: string
  description: string
  provider: {
    name: string
    type: 'Official' | 'Community'
    url: string
  }
}

export interface AgentTools {
  required_tools?: Tool[]
  recommended_tools?: Tool[]
  recommended_builtin_tools?: string[]
  recommended_mcp_servers?: MCPServer[]
  agno_tools?: Tool[]
}

export interface AgentSettings {
  reasoning_level: 'none' | 'optional' | 'recommended' | 'mandatory'
  reasoning_strategy: 'react' | 'chain-of-thought' | 'tree-of-thought' | 'reflection'
  memory_policy: 'none' | 'short-term' | 'long-term'
  state_storage: 'in-memory' | 'local' | 'remote'
}

export interface AgentMetadata {
  template_version: string
  last_updated?: string
  schema_compatibility: string
  related_agents?: string[]
  compatible_frameworks?: string[]
  author?: string
  hints?: string[]
}

export interface AgentTemplate {
  identity: AgentIdentity
  prompt: AgentPrompt
  tools: AgentTools
  settings: AgentSettings
  metadata: AgentMetadata
}

export interface AgentCardProps {
  agent: AgentTemplate
  slug: string
  onSelect?: (agent: AgentTemplate, slug: string) => void
}

export interface SearchFilters {
  query: string
  reasoning_level: string[]
  frameworks: string[]
  tags: string[]
}
