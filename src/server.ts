import cron from 'node-cron'

import app from './app'
import IntegrationService from './services/IntegrationService'

// schedule tasks to be run on the server
cron.schedule('* * * * *', async () => {
  console.log('Start running integrationService now...')
  await IntegrationService.run()
  console.log('Finishing running integrationService now...')
})

app.listen(3334)
