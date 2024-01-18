import { priceFormat } from "@/lib/utils"
import dayjs from "dayjs"

export const DATA_CURRENT = [357, 284, 266, 343, 168, 175, 195]
export const DATA_PREVIOUS = [137, 80, 227, 196, 222, 228, 274]

export const ORDERS = DATA_CURRENT.map((value, index) => ({
    id: `#289${index}`,
    date: dayjs().subtract(index, 'day').format('DD MMM YY'),
    items: index + 1,
    total: priceFormat(value),
    status: index === 3 ? 'unfulfilled' : 'fulfilled'
}))