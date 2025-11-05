import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { AgentTemplate } from '@/types/agent'
import { slugify } from './utils'

export interface AgentWithSlug extends AgentTemplate {
  slug: string
}

export function getAllAgents(): AgentWithSlug[] {
  const templatesDirectory = path.join(process.cwd(), 'templates')
  
  if (!fs.existsSync(templatesDirectory)) {
    return []
  }

  const agents: AgentWithSlug[] = []
  
  // Read all category folders
  const entries = fs.readdirSync(templatesDirectory, { withFileTypes: true })
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      // This is a category folder
      const category = entry.name
      const categoryPath = path.join(templatesDirectory, category)
      const files = fs.readdirSync(categoryPath)
      const yamlFiles = files.filter(name => name.endsWith('.yaml') || name.endsWith('.yml'))
      
      for (const filename of yamlFiles) {
        const filePath = path.join(categoryPath, filename)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        
        try {
          const agent = yaml.load(fileContents) as AgentTemplate
          const slug = slugify(agent.identity.name)
          
          // Auto-assign category from folder name
          agent.identity.category = category
          
          agents.push({
            ...agent,
            slug
          })
        } catch (error) {
          console.error(`Error parsing ${category}/${filename}:`, error)
          throw new Error(`Failed to parse agent template: ${category}/${filename}`)
        }
      }
    }
  }

  return agents.sort((a, b) => {
    // Sort by last_updated date in descending order (newest first)
    const dateA = new Date(a.metadata.last_updated || '1970-01-01')
    const dateB = new Date(b.metadata.last_updated || '1970-01-01')
    return dateB.getTime() - dateA.getTime()
  })
}

export function getAgentBySlug(slug: string): AgentWithSlug | null {
  const agents = getAllAgents()
  return agents.find(agent => agent.slug === slug) || null
}

export function getAgentRawYaml(slug: string): string | null {
  const templatesDirectory = path.join(process.cwd(), 'templates')
  const agents = getAllAgents()
  const agent = agents.find(a => a.slug === slug)
  
  if (!agent) return null

  // Read from category folders
  const entries = fs.readdirSync(templatesDirectory, { withFileTypes: true })
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const categoryPath = path.join(templatesDirectory, entry.name)
      const files = fs.readdirSync(categoryPath)
      const yamlFiles = files.filter(name => name.endsWith('.yaml') || name.endsWith('.yml'))
      
      for (const filename of yamlFiles) {
        const filePath = path.join(categoryPath, filename)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        
        try {
          const parsedAgent = yaml.load(fileContents) as AgentTemplate
          if (slugify(parsedAgent.identity.name) === slug) {
            return fileContents
          }
        } catch (error) {
          continue
        }
      }
    }
  }
  
  return null
}

export function getAllTags(): string[] {
  const agents = getAllAgents()
  const allTags = agents.flatMap(agent => agent.identity.tags)
  return Array.from(new Set(allTags)).sort()
}

export function getAllFrameworks(): string[] {
  const agents = getAllAgents()
  const allFrameworks = agents.flatMap(agent => agent.metadata.compatible_frameworks || [])
  return Array.from(new Set(allFrameworks)).sort()
}

export function getAllReasoningLevels(): string[] {
  return ['none', 'optional', 'recommended', 'mandatory']
}
