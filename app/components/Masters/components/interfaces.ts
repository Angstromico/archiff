import type { MasterListInfo } from '../../../data/MastersData'

export interface MasterList {
  item: MasterListInfo
  frameNumbers: number[]
  frames: number[]
  index: number
}
