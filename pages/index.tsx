import { useState, useMemo } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Search, Filter, Moon, Sun, Github, ExternalLink } from 'lucide-react'
import { getAllAgents, AgentWithSlug } from '@/lib/agents'
import { SearchFilters } from '@/types/agent'
import AgentCard from '@/components/AgentCard'
import AgentModal from '@/components/AgentModal'
import CodeGeneratorModal from '@/components/CodeGeneratorModal'
import TagManager from '@/components/TagManager'
import ContributeCard from '@/components/ContributeCard'
import { cn, getProviderIconUrl, getFrameworkUrl, getCategoryColor } from '@/lib/utils'
import Image from 'next/image'

interface HomeProps {
  agents: AgentWithSlug[]
  allCategories: string[]
  allTags: string[]
  allFrameworks: string[]
  allReasoningLevels: string[]
}

export default function Home({ agents, allCategories, allTags, allFrameworks, allReasoningLevels }: HomeProps) {
  const [selectedAgent, setSelectedAgent] = useState<{ agent: AgentWithSlug; slug: string } | null>(null)
  const [codeGeneratorAgent, setCodeGeneratorAgent] = useState<AgentWithSlug | null>(null)
  const [darkMode, setDarkMode] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    reasoning_level: [],
    frameworks: [],
    categories: [],
    tags: []
  })
  const [availableTags, setAvailableTags] = useState<string[]>(allTags)

  const filteredAgents = useMemo(() => {
    return agents.filter(agent => {
      // Text search
      if (filters.query) {
        const query = filters.query.toLowerCase()
        const searchText = `${agent.identity.name} ${agent.identity.description} ${agent.identity.tags.join(' ')}`.toLowerCase()
        if (!searchText.includes(query)) return false
      }


      // Category filter
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(agent.identity.category)) return false
      }

      // Framework filter
      if (filters.frameworks.length > 0) {
        const agentFrameworks = agent.metadata.compatible_frameworks || []
        if (!filters.frameworks.some(f => agentFrameworks.includes(f))) return false
      }

      // Tags filter
      if (filters.tags.length > 0) {
        if (!filters.tags.some(t => agent.identity.tags.includes(t))) return false
      }

      return true
    })
  }, [agents, filters])

  const handleAgentSelect = (agent: AgentWithSlug, slug: string) => {
    setSelectedAgent({ agent, slug })
  }

  const handleGenerateCode = (agent: AgentWithSlug) => {
    setCodeGeneratorAgent(agent)
  }

  const toggleFilter = (type: keyof SearchFilters, value: string) => {
    setFilters(prev => {
      const currentValues = prev[type] as string[]
      return {
        ...prev,
        [type]: currentValues.includes(value)
          ? currentValues.filter(item => item !== value)
          : [...currentValues, value]
      }
    })
  }

  const handleTagsChange = (newTags: string[]) => {
    // Yeni tagları available tags listesine ekle
    const uniqueNewTags = newTags.filter(tag => !availableTags.includes(tag))
    if (uniqueNewTags.length > 0) {
      setAvailableTags(prev => [...prev, ...uniqueNewTags].sort())
    }
    
    setFilters(prev => ({
      ...prev,
      tags: newTags
    }))
  }

  const clearFilters = () => {
    setFilters({
      query: '',
      reasoning_level: [],
      frameworks: [],
      categories: [],
      tags: []
    })
  }

  return (
    <div className={cn("min-h-screen transition-colors", darkMode ? "dark" : "")}>
      <Head>
        <title>Awesome Agent Templates - Framework-Agnostic AI Agent Library</title>
        <meta name="description" content="Framework-agnostic standard and public template library for AI Agents. Define once, run anywhere." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-background text-foreground min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold gradient-text">
                  Awesome Agent Templates
                </h1>
                <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                  v1.0
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/samitugal/awesome-agent-templates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                  title="View on GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                  title="Toggle theme"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            {/* Subtitle */}
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Framework-agnostic standard and public template library for AI Agents. 
              <span className="font-medium text-primary"> Define once, run anywhere.</span>
            </p>
          </div>
        </header>

        {/* Search and Filters */}
        <div className="container mx-auto px-4 py-6 flex-1">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search agents..."
                value={filters.query}
                onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>
            
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 border rounded-md transition-colors",
                showFilters 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-card border-border hover:bg-muted"
              )}
            >
              <Filter className="w-4 h-4" />
              Filters
              {(filters.categories.length + filters.frameworks.length + filters.tags.length) > 0 && (
                <span className="bg-primary-foreground text-primary text-xs px-1.5 py-0.5 rounded-full">
                  {filters.categories.length + filters.frameworks.length + filters.tags.length}
                </span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-card border border-border rounded-lg p-4 mb-6 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {allCategories.map(category => (
                      <button
                        key={category}
                        onClick={() => toggleFilter('categories', category)}
                        className={cn(
                          "px-3 py-2 rounded-md border transition-all duration-200 hover:scale-105 text-sm font-medium",
                          filters.categories.includes(category)
                            ? getCategoryColor(category, 'activeColor')
                            : cn(getCategoryColor(category, 'color'), getCategoryColor(category, 'hoverColor'))
                        )}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Frameworks */}
                  <div>
                    <h4 className="font-medium mb-3">Frameworks</h4>
                  <div className="flex flex-wrap gap-1">
                    {allFrameworks.map(framework => (
                      <button
                        key={framework}
                        onClick={() => toggleFilter('frameworks', framework)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-200 hover:scale-105",
                          filters.frameworks.includes(framework)
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-card border-border hover:border-primary/50 hover:bg-muted hover:shadow-md"
                        )}
                      >
                        <div className="w-4 h-4 relative flex items-center justify-center bg-white/5 rounded-sm">
                          <Image
                            src={getProviderIconUrl(framework)}
                            alt={framework}
                            width={16}
                            height={16}
                            className="object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              const container = target.parentElement;
                              if (container) {
                                container.innerHTML = '<div class="w-3 h-3 bg-primary/20 rounded-full flex items-center justify-center"><span class="text-xs text-primary font-bold">?</span></div>';
                              }
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium">{framework}</span>
                      </button>
                    ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h4 className="font-medium mb-3">Tags</h4>
                    <TagManager
                      selectedTags={filters.tags}
                      availableTags={availableTags}
                      onTagsChange={handleTagsChange}
                      placeholder="Search or add new tags..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <p className="text-muted-foreground">
                {filteredAgents.length} of {agents.length} agents
              </p>
              {(filters.categories.length > 0 || filters.tags.length > 0) && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Filtered by:</span>
                  <div className="flex gap-1 flex-wrap">
                    {filters.categories.map(category => (
                      <span
                        key={category}
                        className={cn(
                          "inline-flex items-center px-2 py-1 text-xs rounded-full border",
                          getCategoryColor(category, 'color')
                        )}
                      >
                        {category}
                      </span>
                    ))}
                    {filters.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Powered by</span>
              <a
                href="https://github.com/awesome-agent-templates"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
              >
                awesome-agent-templates
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Agent Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Contribute Card - Always first */}
            <ContributeCard templateCount={agents.length} />
            
            {filteredAgents.length > 0 ? (
              filteredAgents.map((agent) => (
                <AgentCard
                  key={agent.slug}
                  agent={agent}
                  slug={agent.slug}
                  onSelect={handleAgentSelect}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold mb-2">No agents found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border bg-card/50">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">
                Made with ❤️ for the AI community
              </p>
              <p className="text-sm text-muted-foreground">
                Contribute on{' '}
                <a
                  href="https://github.com/samitugal/awesome-agent-templates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  GitHub
                </a>
              </p>
            </div>
          </div>
        </footer>

        {/* Agent Modal */}
        <AgentModal
          agent={selectedAgent?.agent || null}
          slug={selectedAgent?.slug || null}
          isOpen={!!selectedAgent}
          onClose={() => setSelectedAgent(null)}
          onGenerateCode={(agent) => setCodeGeneratorAgent(agent as AgentWithSlug)}
        />

        {/* Code Generator Modal */}
        <CodeGeneratorModal
          agent={codeGeneratorAgent}
          isOpen={!!codeGeneratorAgent}
          onClose={() => setCodeGeneratorAgent(null)}
        />
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const agents = getAllAgents()
  
  // Extract unique values for filters
  const allCategories = Array.from(new Set(agents.map(agent => agent.identity.category).filter(Boolean))).sort()
  const allTags = Array.from(new Set(agents.flatMap(agent => agent.identity.tags))).sort()
  const allFrameworks = Array.from(new Set(agents.flatMap(agent => agent.metadata.compatible_frameworks || []))).sort()
  const allReasoningLevels = ['none', 'optional', 'recommended', 'mandatory']

  return {
    props: {
      agents,
      allCategories,
      allTags,
      allFrameworks,
      allReasoningLevels
    }
  }
}
