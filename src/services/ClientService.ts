import { Client } from '../schemas/Client'

interface PersonRequestInterface {
  name: string,
  email: [
    { label: string, value: string, primary: boolean }
  ],
  phone: [
    { label: string, value: string, primary: boolean }
  ],
  value: number
}

class ClientService {
  async setClient (deal: PersonRequestInterface) {
    const { name, email, phone } = deal

    const clientExists = await Client.findOne({ email: email[0].value })

    if (clientExists) {
      return clientExists
    }

    const dataClient = {
      name,
      email: email[0].value,
      phone: phone[0].value
    }

    return await Client.create(dataClient)
  }
}

export default new ClientService()
