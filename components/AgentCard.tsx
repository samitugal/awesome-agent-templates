import { AgentTemplate } from '@/types/agent'
import { AgentWithSlug } from '@/lib/agents'
import { cn, getReasoningLevelColor, getProviderIconUrl } from '@/lib/utils'
import { AGENT_CONSTANTS } from '@/lib/constants'
import { ExternalLink, Copy, Github, Eye } from 'lucide-react'
import Image from 'next/image'

interface AgentCardProps {
  agent: AgentWithSlug
  slug: string
  onSelect: (agent: AgentWithSlug, slug: string) => void
}

export default function AgentCard({ agent, slug, onSelect }: AgentCardProps) {
  const handleViewDetails = () => {
    if (onSelect) {
      onSelect(agent, slug)
    }
  }

  const handleCopyTemplate = async () => {
    try {
      const response = await fetch(`/api/agents/${slug}/raw`)
      const yamlContent = await response.text()
      await navigator.clipboard.writeText(yamlContent)
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy template:', error)
    }
  }

  const handleOpenGithub = () => {
    window.open(`https://github.com/awesome-agent-templates/awesome-agent-templates/blob/main/templates/${slug}.yaml`, '_blank')
  }

  return (
    <div 
      className="group relative bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-all duration-200 hover:border-primary/50 cursor-pointer h-full flex flex-col"
      onClick={handleViewDetails}
    >
      {/* Header */}
      <div className="mb-2">
        <h3 className="text-lg font-semibold text-foreground leading-tight">
          {agent.identity.name}
        </h3>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {agent.identity.tags.slice(0, AGENT_CONSTANTS.MAX_TAGS_DISPLAY).map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
          >
            {tag}
          </span>
        ))}
        {agent.identity.tags.length > AGENT_CONSTANTS.MAX_TAGS_DISPLAY && (
          <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
            +{agent.identity.tags.length - AGENT_CONSTANTS.MAX_TAGS_DISPLAY}
          </span>
        )}
      </div>

      {/* Description */}
      <div className="mb-4 flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {agent.identity.description}
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 overflow-hidden">
        <span className="truncate flex-shrink-0">
          Tools: {(agent.tools.recommended_tools?.length || 0)}
        </span>
        {agent.tools.recommended_mcp_servers && agent.tools.recommended_mcp_servers.length > 0 && (
          <span className="truncate flex-shrink-0">
            MCP: {agent.tools.recommended_mcp_servers.length}
          </span>
        )}
      </div>

      {/* Author */}
      <div className="mt-2 pt-2 border-t border-border flex items-center justify-between">
        <span className="text-xs text-muted-foreground truncate flex-1 mr-2">
          by{' '}
          <a
            href={agent.metadata.author || `https://github.com/${agent.identity.author}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            @{agent.metadata.author ? agent.metadata.author.split('/').pop() : agent.identity.author}
          </a>
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpenGithub();
          }}
          className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors flex-shrink-0"
          title="View on GitHub"
        >
          <Github className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}
