export interface FrameworkTemplate {
  id: string
  fileName: string
  description: string
  template: string
}

export interface Framework {
  id: string
  displayName: string
  language: string
  packageManager: string
  defaultDependencies: string[]
  defaultModel: string
  templates: FrameworkTemplate[]
}

export interface FrameworksConfig {
  frameworks: Framework[]
}

export interface GeneratedCode {
  fileName: string
  dependencies: string
  code: string
}
