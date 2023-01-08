export interface IOptionsContextState {
  options?: {
    jira?: {
      organizationName?: string
    },
    github?: {
      deemphasizeTextList?: string[]
    }
  }
}