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

// Type for the constants
export type AgentConstants = typeof AGENT_CONSTANTS;
