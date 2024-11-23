"use client"

import { create } from 'zustand'

interface SidebarStore {
  isCollapsed: boolean
  toggleSidebar: () => void
}

export const useSidebar = create<SidebarStore>((set) => ({
  isCollapsed: false,
  toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}))