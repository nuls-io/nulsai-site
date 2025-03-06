import moment, { MomentInput } from 'moment'
import 'moment-timezone'

const second = 1_000
const minute = 60 * second
const hour = 60 * minute
const day = 24 * hour
const week = 7 * day
const month = 30 * day
const year = 365 * day
const timeNumber = {
  second,
  minute,
  hour,
  day,
  week,
  month,
  year,
}

export { timeNumber }

export function addTime(start: Date, add: number): Date {
  const t = start.getTime()
  return new Date(t + add)
}

export function getNextRandomDatetime(start: Date, max: number, min = 0): Date {
  const diff = max - min
  const add = Math.random() * diff
  return addTime(start, add)
}

export function scaleTime(
  target: Date,
  scale: number,
  from = new Date()
): Date {
  if (scale === 1) return target
  const diff = Math.floor((target.getTime() - from.getTime()) * scale)
  return addTime(from, diff)
}

export function formatMomentInput(
  date: MomentInput,
  formatter: string,
  timezone?: string
): string {
  const n = moment(date)
  if (timezone) {
    return n.tz(timezone).format(formatter)
  }
  return n.format(formatter)
}

export function formatTime(time: MomentInput, timezone?: string): string {
  return formatMomentInput(time, 'HH:mm:ss', timezone)
}

export function formatDate(datetime: MomentInput, timezone?: string): string {
  return formatMomentInput(datetime, 'YYYY-MM-DD', timezone)
}

export function formatDateTime(
  datetime: MomentInput,
  timezone?: string
): string {
  return formatMomentInput(datetime, 'YYYY/MM/DD HH:mm:ss', timezone)
}

export function findDayStart(inp: MomentInput): Date {
  const n = moment(inp).tz('UTC')
  n.millisecond(0)
  n.second(0)
  n.minute(0)
  n.hour(0)
  return n.toDate()
}

export function fromNow(inp: MomentInput): string {
  return moment(inp).fromNow()
}
