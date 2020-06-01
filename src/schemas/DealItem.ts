import { createSchema, typedModel, Type, ExtractDoc, ExtractProps } from 'ts-mongoose'
import { ProductSchema } from './Product'

export const DealItemSchema = createSchema({
  idPipedrive: Type.number({ required: true }),
  quantity: Type.number({ required: true }),
  product: Type.schema({ required: true }).of(ProductSchema)
}, {
  timestamps: true
})

export const DealItem = typedModel('DealItem', DealItemSchema)
export type DealItemDoc = ExtractDoc<typeof DealItemSchema>;
export type DealItemProps = ExtractProps<typeof DealItemSchema>;
