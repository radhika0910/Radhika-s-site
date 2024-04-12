import { allAbouts, allArticles, allProjects } from 'contentlayer/generated'
import { MetadataRoute } from 'next'
import { allActivity } from './coding-activity/allActivities'

import { ENV } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const WEBSITE_URL = ENV.NEXT_PUBLIC_WEBSITE_URL

  const routes = ['', '/guest-book'].map(route => ({
    url: `${WEBSITE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0]
  }))

  const abouts = allAbouts.map(about => ({
    url: `${WEBSITE_URL}/about/${about.title}`,
    lastModified: new Date().toISOString().split('T')[0]
  }))

  const projects = allProjects.map(project => ({
    url: `${WEBSITE_URL}/projects/${project.title.toLowerCase()}`,
    lastModified: new Date().toISOString().split('T')[0]
  }))

  const activities = allActivity.map(activity => ({
    url: `${WEBSITE_URL}/coding-activity/${activity.slug.toLowerCase()}`,
    lastModified: new Date().toISOString().split('T')[0]
  }))

  const articles = allArticles.map(article => ({
    url: `${WEBSITE_URL}/articles/${article.slug.toLowerCase()}`,
    lastModified: new Date().toISOString().split('T')[0]
  }))

  return [...routes, ...abouts, ...projects, ...activities, ...articles]
  // return [...abouts, ...projects, ...activities, ...articles]
}
