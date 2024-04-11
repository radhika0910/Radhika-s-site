'use server'

import * as Wakatime from '@/types/wakatimeResponse'


export const weeklyCodingActivity = async () => {
  const res = await fetch('https://wakatime.com/share/@Wiscaksono/27bef61d-5377-441a-b326-c868eb825328.json', {
    cache: 'no-store'
  })
  return res.json() as Promise<Wakatime.WeeklyCodingActivity>
}

export const weeklyCodingLanguanges = async () => {
  const res = await fetch('https://wakatime.com/share/@Wiscaksono/bcd5d5b7-4aa6-48cb-83ee-4de7b6815f2d.json', {
    cache: 'no-store'
  })
  return res.json() as Promise<Wakatime.WeeklyCodingLanguanges>
}

export const weeklyCodeEditor = async () => {
  const res = await fetch('https://wakatime.com/share/@Wiscaksono/298a9b88-69ae-49ed-9572-602035f1af30.json', {
    cache: 'no-store'
  })
  return res.json() as Promise<Wakatime.WeeklyCodeEditor>
}

export const weeklyOperatingSystems = async () => {
  const res = await fetch('https://wakatime.com/share/@Wiscaksono/5aff6824-e4f8-45ba-b949-7f08d14bf047.json', {
    cache: 'no-store'
  })
  return res.json() as Promise<Wakatime.WeeklyCodeEditor>
}
