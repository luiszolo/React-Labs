const dbInteract = require('./../middlewares/db-interact');
const asyncForEach = require('./../middlewares/miscs').asyncForEach;
const capitalizeWord = require('./../middlewares/miscs').capitalizeWord;
const getDuplication = require('./../middlewares/miscs').getDuplications;
const removeDuplication = require('./../middlewares/miscs').removeDuplications;
const notNumberField = require('./../middlewares/regex').notNumber;
const validateSampleName = require('./../middlewares/regex').validateSampleName;

async function addSample(req, res) {
    const newSample = req.body.sample;

    if (await getSampleById(req, res) !== false) {
        res.status(403).send({
            message: 'The sample is already exists'
        });
        return;
    }
    if (validateSampleName(newSample.barcode) === false) {
        res.status(403).send({
            message: 'The sample sintax is incorrect (SA-##-#####)'
        });
        return;
    }

    const insertion = await dbInteract.manipulateData(
        `INSERT INTO Sample SET ?`,
        [newSample]
    );
    if (insertion === false) {
        res.status(503).send({
            message: 'Something is wrong in INSERT method'
        });
        return;
    }
    res.status(200).send({
        message: 'Insertion completed'
    });
    return;
}

async function getSampleById(req, res) {
    const sample = req.params;

    const validateExistence =  await dbInteract.isExists(`SELECT * FROM Sample WHERE id=${sample.id}`);
    if (validateExistence.pass) {
        res.status(200).send({
            sample: validateExistence.result[0]
        });
        return {
            sample: validateExistence.result[0]
        };
    } else {
        res.status(404).send({
            message: 'The sample doesn\'t exists'
        });
        return false;
    }
}

async function getSampleList(req, res) {
    const option = req.params.option;
    let query = "";
    if (option != null) {
        if (option === "id") {
            query = `SELECT * FROM Sample ORDER BY id ASC`;
        } else if (option === "barcode") {
            query = `SELECT * FROM Sample ORDER BY barcode ASC`;
        } else {
            res.status(404).send({
                message: 'The option doesn\'t exists'
            });
            return;
        }
    } else {
        query =  `SELECT * FROM Sample ORDER BY id ASC`;
    }

    const samples = await dbInteract.isExists(query);
    if (samples == false) {
        res.status(404).send({
            message: 'Add some samples first!'
        });
        return;
    }
    res.status(200).send({
        samples: samples.result
    });
}

async function removeSample(req, res) {
    const sample = req.params;

    if (sample.id === undefined) {
        res.status(404).send({
            message: 'There is no data to search the sample'
        });
        return;
    }

    if (await getSampleById(req, res) === false) {
        res.status(404).send({
            message: 'The sample doesn\'t exists'
        });
        return;
    }

    const deleted = await dbInteract.manipulateData(`UPDATE Sample SET status=0 WHERE id=${sample.id}`);
    if (deleted === false) {
        res.status(503).send({
            message: 'Something is wrong in DELETE method'
        });
        return;
    }

    res.status(200).send({
        message: 'Deactivation completed'
    });
}

async function updateSample(req, res) {
    const id = req.params.id;
    const newSample = req.body.sample;

    if (await getSampleById(req, res) !== false) {
        res.status(403).send({
            message: 'The sample is already exists'
        });
        return;
    }

    const update = await dbInteract.manipulateData(
        `UPDATE Sample SET ?
        barcode='${newSample.barcode}',
        status='${newSample.status}'
        WHERE id=${id}`
    );
    if (update === false) {
        res.status(503).send({
            message: 'Something is wrong in INSERT method'
        });
        return;
    }
    res.status(200).send({
        message: 'Insertion completed'
    });
    return;
}

module.exports = {
    addSample: addSample,
    getSampleById: getSampleById,
    getSampleList: getSampleList,
    removeSample: removeSample,
    updateSample: updateSample
};