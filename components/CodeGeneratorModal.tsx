import { AgentTemplate } from '@/types/agent'
import { Framework, FrameworkTemplate, GeneratedCode } from '@/types/framework'
import { cn, getProviderIconUrl } from '@/lib/utils'
import { X, Copy, Check, Code, Terminal, ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import frameworksData from '@/frameworks/frameworks.json'

interface CodeGeneratorModalProps {
  agent: AgentTemplate | null
  isOpen: boolean
  onClose: () => void
}

export default function CodeGeneratorModal({ agent, isOpen, onClose }: CodeGeneratorModalProps) {
  const [selectedFramework, setSelectedFramework] = useState<Framework | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<FrameworkTemplate | null>(null)
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(null)
  const [copiedDeps, setCopiedDeps] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)
  const [isFrameworkDropdownOpen, setIsFrameworkDropdownOpen] = useState(false)

  const frameworks: Framework[] = frameworksData.frameworks

  useEffect(() => {
    if (isOpen && frameworks.length > 0) {
      // Reset state when modal opens
      setSelectedFramework(null)
      setSelectedTemplate(null)
      setGeneratedCode(null)
      setCopiedDeps(false)
      setCopiedCode(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (selectedFramework && selectedFramework.templates.length > 0) {
      setSelectedTemplate(selectedFramework.templates[0])
    }
  }, [selectedFramework])

  useEffect(() => {
    if (selectedFramework && selectedTemplate && agent) {
      generateCode()
    }
  }, [selectedFramework, selectedTemplate, agent])

  const generateCode = () => {
    if (!selectedFramework || !selectedTemplate || !agent) return

    const agentName = agent.identity.name
    const systemPrompt = agent.prompt.system_prompt
    const modelName = selectedFramework.defaultModel

    // Replace placeholders in template
    let code = selectedTemplate.template
      .replace(/\{\{AGENT_NAME\}\}/g, agentName)
      .replace(/\{\{SYSTEM_PROMPT\}\}/g, systemPrompt)
      .replace(/\{\{MODEL_NAME\}\}/g, modelName)

    const dependencies = `pip install ${selectedFramework.defaultDependencies.join(' ')}`

    setGeneratedCode({
      fileName: selectedTemplate.fileName,
      dependencies,
      code
    })
  }

  const handleCopyDeps = async () => {
    if (!generatedCode) return
    try {
      await navigator.clipboard.writeText(generatedCode.dependencies)
      setCopiedDeps(true)
      setTimeout(() => setCopiedDeps(false), 2000)
    } catch (error) {
      console.error('Failed to copy dependencies:', error)
    }
  }

  const handleCopyCode = async () => {
    if (!generatedCode) return
    try {
      await navigator.clipboard.writeText(generatedCode.code)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  const handleDownload = () => {
    if (!generatedCode) return
    const blob = new Blob([generatedCode.code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = generatedCode.fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!isOpen || !agent) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-card border border-border rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Code className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">
                Generate Code
              </h2>
            </div>
            <p className="text-muted-foreground">
              Generate runnable Python code for <span className="font-medium text-foreground">{agent.identity.name}</span>
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
          {/* Framework Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Select Framework</label>
            
            {/* Custom Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsFrameworkDropdownOpen(!isFrameworkDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-muted border border-border rounded-lg hover:border-primary/50 transition-colors"
              >
                {selectedFramework ? (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 relative flex items-center justify-center bg-white/10 rounded">
                      <Image
                        src={getProviderIconUrl(selectedFramework.displayName)}
                        alt={selectedFramework.displayName}
                        width={20}
                        height={20}
                        className="object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    <span className="font-medium">{selectedFramework.displayName}</span>
                    <span className="text-xs text-muted-foreground px-2 py-0.5 bg-secondary rounded">
                      {selectedFramework.language}
                    </span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">Choose a framework...</span>
                )}
                <ChevronDown className={cn(
                  "w-5 h-5 text-muted-foreground transition-transform",
                  isFrameworkDropdownOpen && "rotate-180"
                )} />
              </button>

              {/* Dropdown Menu */}
              {isFrameworkDropdownOpen && (
                <div className="absolute z-10 w-full mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
                  {frameworks.map((framework) => (
                    <button
                      key={framework.id}
                      onClick={() => {
                        setSelectedFramework(framework)
                        setIsFrameworkDropdownOpen(false)
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left",
                        selectedFramework?.id === framework.id && "bg-primary/10"
                      )}
                    >
                      <div className="w-6 h-6 relative flex items-center justify-center bg-white/10 rounded">
                        <Image
                          src={getProviderIconUrl(framework.displayName)}
                          alt={framework.displayName}
                          width={20}
                          height={20}
                          className="object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{framework.displayName}</div>
                        <div className="text-xs text-muted-foreground">
                          {framework.templates[0]?.description}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground px-2 py-0.5 bg-secondary rounded">
                        {framework.language}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Generated Code Display */}
          {generatedCode && (
            <div className="space-y-6">
              {/* Dependencies Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-primary" />
                    <h3 className="font-medium">Install Dependencies</h3>
                  </div>
                  <button
                    onClick={handleCopyDeps}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
                  >
                    {copiedDeps ? (
                      <>
                        <Check className="w-4 h-4 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <code className="text-foreground">{generatedCode.dependencies}</code>
                </div>
              </div>

              {/* Code Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-primary" />
                    <h3 className="font-medium">{generatedCode.fileName}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors"
                    >
                      Download
                    </button>
                    <button
                      onClick={handleCopyCode}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-4 h-4 text-green-500" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Code
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto max-h-[400px] overflow-y-auto">
                  <pre className="text-foreground whitespace-pre-wrap">{generatedCode.code}</pre>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Note:</span> Make sure to set your <code className="px-1.5 py-0.5 bg-muted rounded text-xs">OPENAI_API_KEY</code> environment variable before running the script.
                </p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!selectedFramework && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Code className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Select a Framework</h3>
              <p className="text-muted-foreground max-w-md">
                Choose a framework from the dropdown above to generate runnable Python code for this agent.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
