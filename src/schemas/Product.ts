import { createSchema, typedModel, Type, ExtractDoc, ExtractProps } from 'ts-mongoose'

export const ProductSchema = createSchema({
  description: Type.string({ required: true }),
  code: Type.string({ required: true }),
  price: Type.number({ required: true }),
  unit: Type.string({ required: true })
}, {
  timestamps: true
})

// export default model<ProductInterface>('Product', ProductSchema)
export const Product = typedModel('Product', ProductSchema)
export type ProductDoc = ExtractDoc<typeof ProductSchema>
export type ProductProps = ExtractProps<typeof ProductSchema>
