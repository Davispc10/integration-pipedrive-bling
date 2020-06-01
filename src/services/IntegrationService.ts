import PipedriveService from '../services/PipedriveService'

import { Deal } from '../schemas/Deal'

import ClientService from '../services/ClientService'
import ProductService from '../services/ProductService'
import DealService from '../services/DealService'

import BlingService from '../services/BlingService'

class IntegrationService {
  async run () {
    console.log('Start get the Deals')

    const dealsInfo = await PipedriveService.getDealsWon()

    for (const dealInfo of dealsInfo.data) {
      const dealExists = await Deal.findOne({ idPipedrive: dealInfo.id })

      if (!dealExists) {
        const client = await ClientService.setClient(dealInfo.person_id)

        const items = await ProductService.setProductsByDeal(dealInfo.id)

        await DealService.setDeal({
          idPipedrive: dealInfo.id,
          title: dealInfo.title,
          value: dealInfo.value,
          productsCount: dealInfo.products_count,
          createdOrder: false,
          client,
          products: items
        })

        console.log(`Deal ${dealInfo.id} inserted`)
      }
    }

    // Bling
    console.log('Start send deals to bling')
    await BlingService.sendOrder()
  }
}

export default new IntegrationService()
