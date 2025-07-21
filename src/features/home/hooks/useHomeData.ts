import { homeData } from "../data/homeData"
import type { HomeData } from "../types/home.types"

export const useHomeData = (): HomeData => {
  return homeData
}
