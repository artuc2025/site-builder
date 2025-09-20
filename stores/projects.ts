// Tracks active project context for the builder (comments in English)
import { defineStore } from 'pinia'

type ProjectId = string

interface ProjectsState {
  activeProjectId: ProjectId | null
  recentProjectIds: ProjectId[]
}

export const useProjectsStore = defineStore('projects', {
  state: (): ProjectsState => ({
    activeProjectId: 'demo-project',
    recentProjectIds: ['demo-project'],
  }),
  getters: {
    currentProjectId: state => state.activeProjectId,
  },
  actions: {
    setActiveProject(projectId: ProjectId) {
      this.activeProjectId = projectId
      if (!this.recentProjectIds.includes(projectId)) {
        this.recentProjectIds.unshift(projectId)
      }
    },
    clearActiveProject() {
      this.activeProjectId = null
    },
  },
})
