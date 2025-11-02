import { AGENT_CONSTANTS } from './constants';

export interface ValidationError {
  field: string;
  message: string;
  maxLength?: number;
  currentLength?: number;
}

export class AgentValidator {
  static validateDescription(description: string): ValidationError | null {
    if (description.length > AGENT_CONSTANTS.DESCRIPTION_MAX_LENGTH) {
      return {
        field: 'description',
        message: `Description exceeds maximum length of ${AGENT_CONSTANTS.DESCRIPTION_MAX_LENGTH} characters`,
        maxLength: AGENT_CONSTANTS.DESCRIPTION_MAX_LENGTH,
        currentLength: description.length
      };
    }
    return null;
  }

  static validateName(name: string): ValidationError | null {
    if (name.length > AGENT_CONSTANTS.NAME_MAX_LENGTH) {
      return {
        field: 'name',
        message: `Name exceeds maximum length of ${AGENT_CONSTANTS.NAME_MAX_LENGTH} characters`,
        maxLength: AGENT_CONSTANTS.NAME_MAX_LENGTH,
        currentLength: name.length
      };
    }
    return null;
  }

  static validateAuthor(author: string): ValidationError | null {
    if (author.length > AGENT_CONSTANTS.AUTHOR_MAX_LENGTH) {
      return {
        field: 'author',
        message: `Author exceeds maximum length of ${AGENT_CONSTANTS.AUTHOR_MAX_LENGTH} characters`,
        maxLength: AGENT_CONSTANTS.AUTHOR_MAX_LENGTH,
        currentLength: author.length
      };
    }
    return null;
  }

  static validateTag(tag: string): ValidationError | null {
    if (tag.length > AGENT_CONSTANTS.TAG_MAX_LENGTH) {
      return {
        field: 'tag',
        message: `Tag exceeds maximum length of ${AGENT_CONSTANTS.TAG_MAX_LENGTH} characters`,
        maxLength: AGENT_CONSTANTS.TAG_MAX_LENGTH,
        currentLength: tag.length
      };
    }
    return null;
  }

  static validateTags(tags: string[]): ValidationError[] {
    const errors: ValidationError[] = [];
    tags.forEach((tag, index) => {
      const error = this.validateTag(tag);
      if (error) {
        errors.push({
          ...error,
          field: `tags[${index}]`
        });
      }
    });
    return errors;
  }

  static validateAgentIdentity(identity: {
    name: string;
    description: string;
    author: string;
    tags?: string[];
  }): ValidationError[] {
    const errors: ValidationError[] = [];

    const nameError = this.validateName(identity.name);
    if (nameError) errors.push(nameError);

    const descError = this.validateDescription(identity.description);
    if (descError) errors.push(descError);

    const authorError = this.validateAuthor(identity.author);
    if (authorError) errors.push(authorError);

    if (identity.tags) {
      const tagErrors = this.validateTags(identity.tags);
      errors.push(...tagErrors);
    }

    return errors;
  }
}

// Helper function to truncate text to max length
export const truncateToMaxLength = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

// Helper functions for specific fields
export const truncateDescription = (description: string): string => 
  truncateToMaxLength(description, AGENT_CONSTANTS.DESCRIPTION_MAX_LENGTH);

export const truncateName = (name: string): string => 
  truncateToMaxLength(name, AGENT_CONSTANTS.NAME_MAX_LENGTH);

export const truncateAuthor = (author: string): string => 
  truncateToMaxLength(author, AGENT_CONSTANTS.AUTHOR_MAX_LENGTH);
