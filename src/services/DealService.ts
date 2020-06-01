import { Deal } from '../schemas/Deal'
import { ClientProps } from '../schemas/Client'
import { DealItemProps } from '../schemas/DealItem'

interface DealDataInterface {
  idPipedrive: number,
  title: string,
  value: number,
  productsCount: number,
  createdOrder: boolean,
  client: ClientProps,
  products: DealItemProps[]
}

class DealService {
  async setDeal (deal: DealDataInterface) {
    const dealExists = await Deal.findOne({ idPipedrive: deal.idPipedrive })

    if (dealExists) {
      return dealExists
    }

    return await Deal.create(deal)
  }
}

export default new DealService()
