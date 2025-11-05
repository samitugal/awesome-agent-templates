import { AgentTemplate } from '@/types/agent'
import { AgentWithSlug } from '@/lib/agents'
import { cn, getReasoningLevelColor, getProviderIconUrl, getCategoryColor } from '@/lib/utils'
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
      const category = agent.identity.category
      const response = await fetch(`/templates/${category}/${slug}.yaml`)
      const yamlContent = await response.text()
      await navigator.clipboard.writeText(yamlContent)
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy template:', error)
    }
  }

  const handleOpenGithub = () => {
    const category = agent.identity.category
    window.open(`https://github.com/samitugal/awesome-agent-templates/blob/main/templates/${category}/${slug}.yaml`, '_blank')
  }

  // Extract GitHub username from author field
  const getGithubUsername = () => {
    if (agent.metadata.author) {
      // Extract username from GitHub URL
      const match = agent.metadata.author.match(/github\.com\/([^\/]+)/)
      return match ? match[1] : agent.identity.author
    }
    return agent.identity.author
  }

  const githubUsername = getGithubUsername()

  return (
    <div 
      className="group relative bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-all duration-200 hover:border-primary/50 cursor-pointer h-full flex flex-col"
      onClick={handleViewDetails}
    >
      {/* Header with Category Badge */}
      <div className="mb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-semibold text-foreground leading-tight flex-1">
            {agent.identity.name}
          </h3>
          {agent.identity.category && (
            <span className={cn(
              "px-2 py-1 text-xs font-medium rounded-md border whitespace-nowrap",
              getCategoryColor(agent.identity.category, 'color')
            )}>
              {agent.identity.category}
            </span>
          )}
        </div>
        {/* Purpose */}
        {agent.identity.purpose && (
          <p className="text-sm text-muted-foreground italic">
            {agent.identity.purpose}
          </p>
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

      {/* Author with Profile Picture */}
      <div className="mt-2 pt-2 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <a
            href={agent.metadata.author || `https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-shrink-0"
          >
            <Image
              src={`https://github.com/${githubUsername}.png`}
              alt={githubUsername}
              width={32}
              height={32}
              className="rounded-full hover:ring-2 hover:ring-primary transition-all"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://github.com/github.png';
              }}
            />
          </a>
          <a
            href={agent.metadata.author || `https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors truncate"
            onClick={(e) => e.stopPropagation()}
          >
            @{githubUsername}
          </a>
        </div>
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
