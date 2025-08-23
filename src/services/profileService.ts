import { SITE_CONFIG, SOCIAL_LINKS } from '../utils/constants'

export interface ProfileData {
  name: string
  title: string
  description: string
  currentRole: string
  location: string
  linkedin: string
  email: string
}

export const getProfileData = (): ProfileData => {
  return {
    name: SITE_CONFIG.author,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    currentRole: SITE_CONFIG.currentRole,
    location: SITE_CONFIG.location,
    linkedin: SOCIAL_LINKS.linkedin,
    email: SOCIAL_LINKS.email
  }
}
