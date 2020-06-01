import { createSchema, typedModel, Type, ExtractDoc, ExtractProps } from 'ts-mongoose'
import { ClientSchema } from './Client'
import { DealItemSchema } from './DealItem'

export const DealSchema = createSchema({
  idPipedrive: Type.number({ required: true }),
  title: Type.string({ required: true }),
  value: Type.number({ required: true }),
  productsCount: Type.number({ required: true }),
  createdOrder: Type.boolean({ required: true }),
  client: Type.schema({ required: true }).of(ClientSchema),
  products: Type.array({ required: true }).of(DealItemSchema)
}, {
  timestamps: true
})

export const Deal = typedModel('Deal', DealSchema)
export type DealDoc = ExtractDoc<typeof DealSchema>;
export type DealProps = ExtractProps<typeof DealSchema>;
