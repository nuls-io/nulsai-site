/* eslint-disable prettier/prettier */
/* eslint-disable no-multi-spaces */
export enum MessageType {
  Unknown = 0,

  Attachment  = 1,    // Attach(6),
  Audio       = 2,    // Audio(1), Voice(34)
  Contact     = 3,    // ShareCard(42)
  ChatHistory = 4,    // ChatHistory(19)
  Emoticon    = 5,    // Sticker: Emoticon(15), Emoticon(47)
  Image       = 6,    // Img(2), Image(3)
  Text        = 7,    // Text(1)
  Location    = 8,    // Location(48)
  MiniProgram = 9,    // MiniProgram(33)
  GroupNote   = 10,   // GroupNote(53)
  Transfer    = 11,   // Transfers(2000)
  RedEnvelope = 12,   // RedEnvelopes(2001)
  Recalled    = 13,   // Recalled(10002)
  Url         = 14,   // Url(5)
  Video       = 15,   // Video(4), Video(43)
  Post        = 16,   // Moment, Channel, Tweet, etc
}

export interface BindedUser {
  id: string
  name: string
}

export interface WxBotStatus {
  logined: boolean
  user: BindedUser | null | undefined
}

// socket
export interface WXUser {
  id: string
  name: string
}

export interface WXRoom {
  id: string
  topic: string
  members: WXUser[]
}

export interface WXMessage {
  id: string
  text: string
  content: any
  type: MessageType
  sender: WXUser
  room: WXRoom
  timestamp: number
  monitored: boolean
}
