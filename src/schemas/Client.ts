import { createSchema, typedModel, Type, ExtractDoc, ExtractProps } from 'ts-mongoose'

export const ClientSchema = createSchema({
  name: Type.string({ require: true }),
  email: Type.string({ require: true }),
  phone: Type.string()
}, {
  timestamps: true
})

export const Client = typedModel('Client', ClientSchema)
export type ClientDoc = ExtractDoc<typeof ClientSchema>;
export type ClientProps = ExtractProps<typeof ClientSchema>;
