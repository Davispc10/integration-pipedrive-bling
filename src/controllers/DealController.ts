import { Request, Response } from 'express'

import { Deal } from '../schemas/Deal'

class DealController {
  public async index (req: Request, res: Response): Promise<Response> {
    const group = (req.query.group === 'true')

    if (group) {
      const dealsGrouped = await Deal.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%d-%m-%Y', date: '$createdAt' } },
            totalValueOfDeals: {
              $sum: '$value'
            },
            count: { $sum: 1 }
          }
        }
      ])

      return res.json(dealsGrouped)
    } else {
      const allDeals = await Deal.find()

      return res.json(allDeals)
    }
  }
}

export default new DealController()
