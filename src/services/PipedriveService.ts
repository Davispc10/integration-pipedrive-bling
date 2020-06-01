/* eslint-disable @typescript-eslint/no-explicit-any */
import lib from 'pipedrive'

interface PipedriveService {
  getDealsWon(): Promise<Response>
  getProductsByDeal(idDeal: number): Promise<Response>
  getProductById(id: number): Promise<Response>
}

class PipedriveService implements PipedriveService {
  private addToken (): void {
    lib.Configuration.apiToken = process.env.PIPEDRIVE_TOKEN
  }

  async getDealsWon (): Promise<Response> {
    this.addToken()

    const input: any = []
    input.status = 'won'

    const deals = await lib.DealsController.getAllDeals(input, (error: any, response: any, context: any) => {})

    return deals
  }

  async getProductsByDeal (idDeal: number): Promise<Response> {
    this.addToken()

    const input: any = []
    input.id = idDeal

    const products = await lib.DealsController.listProductsAttachedToADeal(input, (error: any, response: any, context: any) => {})

    return products
  }

  async getProductById (id: number): Promise<Response> {
    this.addToken()

    const product = lib.ProductsController.getOneProduct(id, (error: any, response: any, context: any) => {})

    return product
  }
}

export default new PipedriveService()
