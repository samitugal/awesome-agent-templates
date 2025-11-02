import { AGENT_CONSTANTS } from '../lib/constants';
import * as fs from 'fs';
import * as path from 'path';

// Generate the agent schema with constants
const generateAgentSchema = () => {
  const schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Agent Template Schema v1.0",
    "description": "Schema for defining framework-agnostic AI Agent templates",
    "type": "object",
    "required": [
      "identity",
      "prompt", 
      "tools",
      "settings",
      "metadata"
    ],
    "properties": {
      "identity": {
        "type": "object",
        "required": [
          "name",
          "description", 
          "author"
        ],
        "properties": {
          "name": {
            "type": "string",
            "description": "Agent name (e.g., 'WebSearchAgent')",
            "maxLength": AGENT_CONSTANTS.NAME_MAX_LENGTH
          },
          "description": {
            "type": "string", 
            "description": "Brief description of what the agent does",
            "maxLength": AGENT_CONSTANTS.DESCRIPTION_MAX_LENGTH
          },
          "author": {
            "type": "string",
            "description": "Author or organization name",
            "maxLength": AGENT_CONSTANTS.AUTHOR_MAX_LENGTH
          },
          "tags": {
            "type": "array",
            "items": {
              "type": "string",
              "maxLength": AGENT_CONSTANTS.TAG_MAX_LENGTH
            },
            "description": "Tags for categorization (e.g., 'search', 'web', 'data')"
          },
          "license": {
            "type": "string",
            "default": "MIT",
            "description": "License type"
          }
        }
      },
      "prompt": {
        "type": "object",
        "required": [
          "system_prompt"
        ],
        "properties": {
          "system_prompt": {
            "type": "string",
            "description": "Main system prompt defining agent behavior"
          },
          "user_prompt_examples": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Example user prompts to demonstrate usage"
          }
        }
      },
      "tools": {
        "type": "object",
        "properties": {
          "recommended_tools": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "name",
                "description",
                "provider"
              ],
              "properties": {
                "name": {
                  "type": "string"
                },
                "description": {
                  "type": "string"
                },
                "provider": {
                  "type": "object",
                  "required": [
                    "name",
                    "type"
                  ],
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "type": {
                      "type": "string",
                      "enum": ["Official", "Community", "Custom"]
                    },
                    "url": {
                      "type": "string",
                      "format": "uri"
                    }
                  }
                }
              }
            }
          },
          "recommended_builtin_tools": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "List of recommended built-in tools"
          },
          "recommended_mcp_servers": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "name",
                "description",
                "provider"
              ],
              "properties": {
                "name": {
                  "type": "string"
                },
                "description": {
                  "type": "string"
                },
                "provider": {
                  "type": "object",
                  "required": [
                    "name",
                    "type",
                    "url"
                  ],
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "type": {
                      "type": "string",
                      "enum": ["Official", "Community"]
                    },
                    "url": {
                      "type": "string",
                      "format": "uri"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "settings": {
        "type": "object",
        "properties": {
          "reasoning_level": {
            "type": "string",
            "enum": ["none", "optional", "recommended", "mandatory"],
            "default": "optional"
          },
          "reasoning_strategy": {
            "type": "string",
            "enum": ["react", "chain-of-thought", "tree-of-thought", "reflection"],
            "default": "react"
          },
          "memory_policy": {
            "type": "string",
            "enum": ["none", "short-term", "long-term"],
            "default": "short-term"
          },
          "state_storage": {
            "type": "string",
            "enum": ["in-memory", "local", "remote"],
            "default": "in-memory"
          }
        }
      },
      "hints": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Practical tips and best practices from the author's experience"
      },
      "metadata": {
        "type": "object",
        "required": [
          "template_version",
          "schema_compatibility"
        ],
        "properties": {
          "template_version": {
            "type": "string",
            "description": "Template version (e.g., '1.0.0')"
          },
          "last_updated": {
            "type": "string",
            "format": "date",
            "description": "Last update date (YYYY-MM-DD)"
          },
          "schema_compatibility": {
            "type": "string",
            "description": "Compatible schema version (e.g., 'v1.0')"
          },
          "related_agents": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Names of related agent templates"
          },
          "compatible_frameworks": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Compatible frameworks (e.g., 'langchain', 'semantic-kernel')"
          },
          "author": {
            "type": "string",
            "description": "GitHub profile URL of the author (e.g., https://github.com/username)"
          }
        }
      }
    }
  };

  return schema;
};

// Generate and save the schema
const schema = generateAgentSchema();
const schemaPath = path.join(__dirname, '../schemas/agent.schema.json');
fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2));

console.log(`Schema generated with constants:
- Description max length: ${AGENT_CONSTANTS.DESCRIPTION_MAX_LENGTH}
- Name max length: ${AGENT_CONSTANTS.NAME_MAX_LENGTH}
- Author max length: ${AGENT_CONSTANTS.AUTHOR_MAX_LENGTH}
- Tag max length: ${AGENT_CONSTANTS.TAG_MAX_LENGTH}
`);

export { generateAgentSchema };
