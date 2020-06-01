import PipedriveService from './PipedriveService'

import { Product } from '../schemas/Product'
import { DealItem, DealItemProps } from '../schemas/DealItem'

class ProductService {
  async setProductsByDeal (idDeal: number) {
    const dealItems: DealItemProps[] = []
    const productsDeal = await PipedriveService.getProductsByDeal(idDeal)

    if (productsDeal) {
      for (const productDeal of productsDeal.data) {
        const productInfo = await PipedriveService.getProductById(productDeal.product_id)

        const { name, code, prices, unit } = productInfo.data

        const productExists = await Product.findOne({ code })

        if (productExists) {
          const dealItem = {
            idPipedrive: idDeal,
            quantity: productDeal.quantity,
            product: {
              description: productExists.description,
              code: productExists.code,
              price: productExists.price,
              unit: productExists.unit
            }
          }

          dealItems.push(await DealItem.create(dealItem))
        } else {
          const dealItem = {
            idPipedrive: idDeal,
            quantity: productDeal.quantity,
            product: {
              description: name,
              code,
              price: prices[0].price,
              unit
            }
          }

          const product = {
            description: name,
            code,
            price: prices[0].price,
            unit
          }

          await Product.create(product)
          dealItems.push(await DealItem.create(dealItem))
        }
      }
    }

    return dealItems
  }
}

export default new ProductService()
