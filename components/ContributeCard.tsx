import { Plus, Github, ExternalLink } from 'lucide-react'

interface ContributeCardProps {
  templateCount?: number
}

export default function ContributeCard({ templateCount = 5 }: ContributeCardProps) {
  const handleContribute = () => {
    window.open('https://github.com/samitugal/awesome-agent-templates', '_blank')
  }

  return (
    <div 
      className="group relative bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-dashed border-primary/30 rounded-lg p-4 hover:shadow-lg transition-all duration-200 hover:border-primary/50 hover:from-primary/15 hover:to-primary/10 cursor-pointer h-full flex flex-col"
      onClick={handleContribute}
    >
      {/* Header */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <Plus className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground leading-tight">
            Add Your Agent
          </h3>
        </div>
      </div>

      {/* Tags placeholder to match AgentCard structure */}
      <div className="flex flex-wrap gap-1 mb-3">
        <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
          contribute
        </span>
        <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
          community
        </span>
      </div>

      {/* Description */}
      <div className="mb-4 flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2">
          Share your creative agents with the community! Submit a pull request to add your agent templates.
        </p>
      </div>

      {/* Stats placeholder to match AgentCard structure */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 overflow-hidden">
        <span className="truncate flex-shrink-0">
          Templates: {templateCount}
        </span>
        <span className="truncate flex-shrink-0">
          Community: Growing
        </span>
      </div>

      {/* Action Button */}
      <div className="mt-2 pt-2 border-t border-border flex items-center justify-between">
        <span className="text-xs text-muted-foreground truncate flex-1 mr-2">
          by{' '}
          <span className="text-primary">
            @community
          </span>
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleContribute();
          }}
          className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors flex items-center gap-1 flex-shrink-0"
          title="Contribute on GitHub"
        >
          <Github className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}
