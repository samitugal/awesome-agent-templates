import { useState } from 'react'
import { AgentWithSlug } from '@/lib/agents'
import { cn, getReasoningLevelColor, getProviderIconUrl, getCategoryColor } from '@/lib/utils'
import { AGENT_CONSTANTS } from '@/lib/constants'
import { Check, Copy, Github } from 'lucide-react'
import Image from 'next/image'

interface AgentCardProps {
  agent: AgentWithSlug
  slug: string
  onSelect: (agent: AgentWithSlug, slug: string) => void
}

// Full labels overflow the card at four-column widths; the tooltip carries the long form.
const REASONING_ABBR: Record<string, string> = {
  none: 'no reasoning',
  optional: 'opt',
  recommended: 'rec',
  mandatory: 'req',
}

export default function AgentCard({ agent, slug, onSelect }: AgentCardProps) {
  const [copied, setCopied] = useState(false)

  const handleViewDetails = () => {
    onSelect?.(agent, slug)
  }

  const handleCopyTemplate = async () => {
    try {
      const category = agent.identity.category
      const response = await fetch(`/templates/${encodeURIComponent(category)}/${slug}.yaml`)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      await navigator.clipboard.writeText(await response.text())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy template:', error)
    }
  }

  const handleOpenGithub = () => {
    const category = agent.identity.category
    window.open(
      `https://github.com/samitugal/awesome-agent-templates/blob/main/templates/${encodeURIComponent(category)}/${slug}.yaml`,
      '_blank'
    )
  }

  // Extract GitHub username from author field
  const getGithubUsername = () => {
    if (agent.metadata.author) {
      const match = agent.metadata.author.match(/github\.com\/([^\/]+)/)
      return match ? match[1] : agent.identity.author
    }
    return agent.identity.author
  }

  const githubUsername = getGithubUsername()
  const frameworks = agent.metadata.compatible_frameworks || []
  const tags = agent.identity.tags || []
  const visibleTags = tags.slice(0, AGENT_CONSTANTS.MAX_TAGS_DISPLAY)
  const visibleFrameworks = frameworks.slice(0, AGENT_CONSTANTS.MAX_FRAMEWORKS_DISPLAY)
  const toolCount = agent.tools.recommended_tools?.length || 0
  const mcpCount = agent.tools.recommended_mcp_servers?.length || 0

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View details for ${agent.identity.name}`}
      className="group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer h-full flex flex-col"
      onClick={handleViewDetails}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleViewDetails()
        }
      }}
    >
      {/* Category accent stripe — the strongest per-card color signal */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-x-0 top-0 h-1',
          getCategoryColor(agent.identity.category, 'activeColor')
        )}
      />

      <div className="p-4 pt-5 flex flex-col h-full">
        {/* Header with Category Badge */}
        <div className="mb-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-semibold text-foreground leading-tight flex-1">
              {agent.identity.name}
            </h3>
            {agent.identity.category && (
              <span
                className={cn(
                  'px-2 py-1 text-xs font-medium rounded-md border whitespace-nowrap',
                  getCategoryColor(agent.identity.category, 'color')
                )}
              >
                {agent.identity.category}
              </span>
            )}
          </div>
          {agent.identity.purpose && (
            <p className="text-sm text-muted-foreground italic">{agent.identity.purpose}</p>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {agent.identity.description}
        </p>

        {/* Tags */}
        {visibleTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded-md"
              >
                #{tag}
              </span>
            ))}
            {tags.length > visibleTags.length && (
              <span className="px-2 py-0.5 text-xs text-muted-foreground">
                +{tags.length - visibleTags.length}
              </span>
            )}
          </div>
        )}

        {/* Spacer keeps the footer pinned regardless of body length */}
        <div className="flex-1" />

        {/* Frameworks + counts. Wraps because four-column cards are too narrow to
            hold five icons and the meta row on one line. */}
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 mb-3">
          <div className="flex items-center gap-1">
            {visibleFrameworks.map((framework) => (
              <span
                key={framework}
                title={framework}
                className="w-5 h-5 relative flex items-center justify-center rounded-sm bg-muted"
              >
                <Image
                  src={getProviderIconUrl(framework)}
                  alt={framework}
                  width={14}
                  height={14}
                  className="object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    const container = target.parentElement
                    if (container) {
                      container.textContent = framework.charAt(0)
                      container.className =
                        'w-5 h-5 flex items-center justify-center rounded-sm bg-muted text-[10px] font-semibold text-muted-foreground'
                    }
                  }}
                />
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground whitespace-nowrap">
            <span>{toolCount} tools</span>
            {mcpCount > 0 && <span>{mcpCount} MCP</span>}
            <span
              className={cn(
                'px-1.5 py-0.5 rounded text-[10px] font-medium',
                getReasoningLevelColor(agent.settings.reasoning_level)
              )}
              title={`Reasoning: ${agent.settings.reasoning_level}`}
            >
              {REASONING_ABBR[agent.settings.reasoning_level] ?? agent.settings.reasoning_level}
            </span>
          </div>
        </div>

        {/* Author + actions */}
        <div className="pt-2 border-t border-border flex items-center justify-between">
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
                width={28}
                height={28}
                className="rounded-full hover:ring-2 hover:ring-primary transition-all"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://github.com/github.png'
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

          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleCopyTemplate()
              }}
              className={cn(
                'flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors',
                copied
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              )}
              title="Copy YAML to clipboard"
              aria-label={copied ? 'Copied' : 'Copy YAML to clipboard'}
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleOpenGithub()
              }}
              className="p-1.5 text-xs bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors"
              title="View on GitHub"
              aria-label="View on GitHub"
            >
              <Github className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
