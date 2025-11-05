// Agent Template Constants
export const AGENT_CONSTANTS = {
  // Description field limits
  DESCRIPTION_MAX_LENGTH: 150,
  
  // Other potential limits
  NAME_MAX_LENGTH: 100,
  TAG_MAX_LENGTH: 50,
  AUTHOR_MAX_LENGTH: 100,
  
  // Display limits
  MAX_TAGS_DISPLAY: 4,
  MAX_FRAMEWORKS_DISPLAY: 5,
} as const;

// Category definitions with colors
export const AGENT_CATEGORIES = {
  Development: {
    color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    hoverColor: 'hover:bg-emerald-500/20',
    activeColor: 'bg-emerald-500 text-white border-emerald-500'
  },
  Creative: {
    color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    hoverColor: 'hover:bg-purple-500/20',
    activeColor: 'bg-purple-500 text-white border-purple-500'
  },
  'Data Analysis': {
    color: 'bg-green-500/10 text-green-500 border-green-500/20',
    hoverColor: 'hover:bg-green-500/20',
    activeColor: 'bg-green-500 text-white border-green-500'
  },
  'Customer Support': {
    color: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    hoverColor: 'hover:bg-orange-500/20',
    activeColor: 'bg-orange-500 text-white border-orange-500'
  },
  Productivity: {
    color: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
    hoverColor: 'hover:bg-pink-500/20',
    activeColor: 'bg-pink-500 text-white border-pink-500'
  },
  Research: {
    color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
    hoverColor: 'hover:bg-indigo-500/20',
    activeColor: 'bg-indigo-500 text-white border-indigo-500'
  },
  Automation: {
    color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    hoverColor: 'hover:bg-cyan-500/20',
    activeColor: 'bg-cyan-500 text-white border-cyan-500'
  }
} as const;

export type CategoryName = keyof typeof AGENT_CATEGORIES;

// Type for the constants
export type AgentConstants = typeof AGENT_CONSTANTS;
