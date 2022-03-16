const schedule = require('node-schedule');
const UpdateStoreUseCase = require('../Application/UpdateStoreUseCase');

module.exports = {
    start: () => {
        schedule.scheduleJob('* * * * *', async () => {
            console.log('Minute has passed');
            await UpdateStoreUseCase.execute();
        });
    }
}