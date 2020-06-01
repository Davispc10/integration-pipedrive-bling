import EasyXml from 'easyxml'
import axios from 'axios'

import { Deal, DealProps } from '../schemas/Deal'

class BlingService {
  async sendOrder () {
    const deals: Array<DealProps> = await Deal.find({ createdOrder: false })

    deals.forEach(async deal => {
      const serializer = new EasyXml({
        singularize: true,
        rootElement: 'pedido',
        dateFormat: 'ISO',
        manifest: true
      })

      const order = {
        cliente: {
          nome: deal.client.name,
          email: deal.client.email,
          celular: deal.client.phone
        },
        items:
          deal.products.map(Dealitem => (
            {
              codigo: Dealitem.product.code,
              descricao: Dealitem.product.description,
              un: Dealitem.product.unit,
              qtde: Dealitem.quantity,
              vlr_unit: Dealitem.product.price
            })
          )
      }

      let xmlData: string = serializer.render(order)

      xmlData = xmlData.replace(/items/gi, 'itens')

      try {
        await axios.post(`https://bling.com.br/Api/v2/pedido/json/?xml=${xmlData}&apikey=${process.env.BLING_TOKEN}`)

        await Deal.updateOne({ _id: deal._id }, { createdOrder: true })
      } catch (err) {
        console.log(err)
      }
    })
  }
}

export default new BlingService()
