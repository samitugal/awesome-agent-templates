import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function getReasoningLevelColor(level: string): string {
  switch (level) {
    case 'none':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    case 'optional':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'recommended':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'mandatory':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
  }
}

export function getProviderIcon(providerName: string): string {
  // Return CSS class names for proper logos
  const iconClasses: Record<string, string> = {
    'langchain': 'provider-langchain',
    'semantic-kernel': 'provider-semantic-kernel', 
    'crewai': 'provider-crewai',
    'autogen': 'provider-autogen',
    'agno': 'provider-agno',
    'mcp': 'provider-mcp',
    'openai': 'provider-openai',
    'anthropic': 'provider-anthropic',
    'huggingface': 'provider-huggingface',
    'custom': 'provider-custom',
    'builtin': 'provider-builtin',
    'community': 'provider-community'
  }
  
  return iconClasses[providerName.toLowerCase()] || 'provider-default'
}

export function getProviderIconUrl(providerName: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/awesome-agent-templates' : ''
  const iconUrls: Record<string, string> = {
    'langchain': `${basePath}/icons/langchain.png`,
    'semantic kernel': `${basePath}/icons/semantic-kernel.png`,
    'semantic-kernel': `${basePath}/icons/semantic-kernel.png`,
    'crewai': `${basePath}/icons/crewai.png`, 
    'autogen': `${basePath}/icons/autogen.png`,
    'agno': `${basePath}/icons/agno.png`,
    'upsonic': `${basePath}/icons/upsonic.png`,
    'mcp': `${basePath}/icons/mcp.png`,
    'tavily': `${basePath}/icons/tavily.png`,
    'brave': `${basePath}/icons/brave.png`,
    'baidu': `${basePath}/icons/baidu.png`,
    'beautifulsoup': `${basePath}/icons/beautifulsoup.png`,
    'openai': `${basePath}/icons/openai.png`,
    'anthropic': `${basePath}/icons/anthropic.png`,
    'huggingface': `${basePath}/icons/huggingface.png`,
    'custom': `${basePath}/icons/custom.png`,
    'builtin': `${basePath}/icons/builtin.png`,
    'community': `${basePath}/icons/github.png`
  }
  
  return iconUrls[providerName.toLowerCase()] || `${basePath}/icons/default.png`
}

export function getFrameworkUrl(frameworkName: string): string {
  const frameworkUrls: Record<string, string> = {
    'langchain': 'https://github.com/langchain-ai/langchain',
    'semantic kernel': 'https://github.com/microsoft/semantic-kernel',
    'semantic-kernel': 'https://github.com/microsoft/semantic-kernel',
    'crewai': 'https://github.com/crewAIInc/crewAI',
    'autogen': 'https://github.com/microsoft/autogen',
    'agno': 'https://github.com/agno-agi/agno',
    'upsonic': 'https://github.com/Upsonic/Upsonic',
    'llamaindex': 'https://github.com/run-llama/llama_index',
    'transformers': 'https://github.com/huggingface/transformers',
    'prefect': 'https://github.com/PrefectHQ/prefect'
  }
  
  return frameworkUrls[frameworkName.toLowerCase()] || 'https://github.com'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
