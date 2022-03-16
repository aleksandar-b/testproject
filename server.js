const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Scheduler = require("./Infrastructure/Scheduler");
const getFileMetadataUseCase = require("./Application/GetFileMetadataUseCase");
const UnauthorizedMiddleware = require("./Infrastructure/UnauthorizedMiddleware");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(UnauthorizedMiddleware);

Scheduler.start();

app.get('/api/file/:id', async function(req, res) {
    const id = req.params.id;
    const currentOrganizationId = req.header('organizationId');
    try {
        const response  = await getFileMetadataUseCase.execute(id, currentOrganizationId);

        res.json(response);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

const port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('Server started on port ' + port);
});