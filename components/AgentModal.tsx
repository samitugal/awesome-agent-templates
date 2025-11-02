import { AgentTemplate } from '@/types/agent'
import { cn, getReasoningLevelColor, getProviderIconUrl, getFrameworkUrl, formatDate } from '@/lib/utils'
import { X, Eye, Copy, Github, ExternalLink, Zap, Database, Lightbulb, Settings, Brain } from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface AgentModalProps {
  agent: AgentTemplate | null
  slug: string | null
  isOpen: boolean
  onClose: () => void
}

export default function AgentModal({ agent, slug, isOpen, onClose }: AgentModalProps) {
  const [yamlContent, setYamlContent] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'overview' | 'yaml'>('overview')

  useEffect(() => {
    if (isOpen && slug) {
      fetch(`/templates/${slug}.yaml`)
        .then(res => res.text())
        .then(setYamlContent)
        .catch(console.error)
    }
  }, [isOpen, slug])

  const handleCopyYaml = async () => {
    try {
      await navigator.clipboard.writeText(yamlContent)
      // Add toast notification here
    } catch (error) {
      console.error('Failed to copy YAML:', error)
    }
  }

  const handleOpenGithub = () => {
    if (slug) {
      window.open(`https://github.com/awesome-agent-templates/awesome-agent-templates/blob/main/templates/${slug}.yaml`, '_blank')
    }
  }

  if (!isOpen || !agent) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-card border border-border rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {agent.identity.name}
            </h2>
            <p className="text-muted-foreground">
              {agent.identity.description}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyYaml}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              title="Copy YAML"
            >
              <Copy className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleOpenGithub}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              title="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </button>
            
            <button
              onClick={onClose}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('overview')}
            className={cn(
              "px-6 py-3 text-sm font-medium transition-colors",
              activeTab === 'overview'
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('yaml')}
            className={cn(
              "px-6 py-3 text-sm font-medium transition-colors",
              activeTab === 'yaml'
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            YAML Template
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'overview' ? (
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Configuration
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reasoning Level:</span>
                      <span className={cn(
                        "px-2 py-1 text-xs font-medium rounded-full",
                        getReasoningLevelColor(agent.settings.reasoning_level)
                      )}>
                        {agent.settings.reasoning_level}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Strategy:</span>
                      <span className="text-foreground">{agent.settings.reasoning_strategy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Memory:</span>
                      <span className="text-foreground">{agent.settings.memory_policy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Storage:</span>
                      <span className="text-foreground">{agent.settings.state_storage}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Metadata
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Version:</span>
                      <span className="text-foreground">{agent.metadata.template_version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Author:</span>
                      <span className="text-foreground">{agent.identity.author}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">License:</span>
                      <span className="text-foreground">{agent.identity.license}</span>
                    </div>
                    {agent.metadata.last_updated && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Updated:</span>
                        <span className="text-foreground">{formatDate(agent.metadata.last_updated)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {agent.identity.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Compatible Frameworks */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Compatible Frameworks</h3>
                <div className="flex flex-wrap gap-3">
                  {agent.metadata.compatible_frameworks?.map((framework) => (
                    <a
                      key={framework}
                      href={getFrameworkUrl(framework)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2 bg-muted rounded-md hover:bg-muted/80 transition-colors group"
                    >
                      <div className="provider-icon-container-large">
                        <Image
                          src={getProviderIconUrl(framework)}
                          alt={framework}
                          width={18}
                          height={18}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            const container = target.parentElement;
                            if (container) {
                              container.innerHTML = '<div class="w-4 h-4 bg-primary/20 rounded-full flex items-center justify-center"><span class="text-sm text-primary font-bold">?</span></div>';
                            }
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium flex-1">{framework}</span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>

              {/* System Prompt */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  System Prompt
                </h3>
                <div className="bg-muted p-4 rounded-md">
                  <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
                    {agent.prompt.system_prompt}
                  </pre>
                </div>
              </div>

              {/* Example Prompts */}
              {agent.prompt.user_prompt_examples && agent.prompt.user_prompt_examples.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Example User Prompts</h3>
                  <div className="space-y-2">
                    {agent.prompt.user_prompt_examples.map((example, index) => (
                      <div key={index} className="bg-muted p-3 rounded-md">
                        <p className="text-sm text-foreground">{example}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools */}
              {(agent.tools.required_tools || agent.tools.recommended_tools) && ((agent.tools.required_tools && agent.tools.required_tools.length > 0) || (agent.tools.recommended_tools && agent.tools.recommended_tools.length > 0)) && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Recommended Tools
                  </h3>
                  <div className="space-y-3">
                    {(agent.tools.required_tools || agent.tools.recommended_tools || []).map((tool, index) => (
                      tool.provider.url ? (
                        <a
                          key={index}
                          href={tool.provider.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block border border-border rounded-md p-4 hover:bg-muted/50 hover:border-primary/50 transition-all duration-200 cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-foreground">{tool.name}</h4>
                            <span className={cn(
                              "px-2 py-1 text-xs rounded-full",
                              tool.provider.type === 'Official' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                              tool.provider.type === 'Community' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                              'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                            )}>
                              {tool.provider.type}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{tool.description}</p>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 relative flex items-center justify-center bg-muted rounded-sm border border-border/20">
                              <Image
                                src={tool.provider.type === 'Community' ? getProviderIconUrl('community') : getProviderIconUrl(tool.provider.name)}
                                alt={tool.provider.name}
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
                            <span className="text-sm font-medium">{tool.provider.name}</span>
                          </div>
                        </a>
                      ) : (
                        <div key={index} className="border border-border rounded-md p-4 opacity-60">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-foreground">{tool.name}</h4>
                            <span className={cn(
                              "px-2 py-1 text-xs rounded-full",
                              tool.provider.type === 'Official' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                              tool.provider.type === 'Community' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                              'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                            )}>
                              {tool.provider.type}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{tool.description}</p>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 relative flex items-center justify-center bg-muted rounded-sm border border-border/20">
                              <Image
                                src={tool.provider.type === 'Community' ? getProviderIconUrl('community') : getProviderIconUrl(tool.provider.name)}
                                alt={tool.provider.name}
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
                            <span className="text-sm font-medium">{tool.provider.name}</span>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Author Hints */}
              {agent.metadata.hints && agent.metadata.hints.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Author's Tips & Hints
                  </h3>
                  <div className="bg-muted/50 rounded-md p-4">
                    <ul className="space-y-2">
                      {agent.metadata.hints.map((hint, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-foreground">{hint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* MCP Servers */}
              {agent.tools.recommended_mcp_servers && agent.tools.recommended_mcp_servers.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Recommended MCP Servers
                  </h3>
                  <div className="space-y-3">
                    {agent.tools.recommended_mcp_servers.map((server, index) => (
                      <a
                        key={index}
                        href={server.provider.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block border border-border rounded-md p-4 hover:bg-muted/50 hover:border-primary/50 transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-foreground">{server.name}</h4>
                          <span className={cn(
                            "px-2 py-1 text-xs rounded-full",
                            server.provider.type === 'Official' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          )}>
                            {server.provider.type}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{server.description}</p>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 relative flex items-center justify-center bg-muted rounded-sm border border-border/20">
                            <Image
                              src={server.provider.type === 'Community' ? getProviderIconUrl('community') : getProviderIconUrl(server.provider.name)}
                              alt={server.provider.name}
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
                          <span className="text-sm font-medium">{server.provider.name}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6">
              <div className="bg-muted rounded-md p-4">
                <pre className="text-sm text-foreground font-mono overflow-x-auto">
                  {yamlContent}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
