const dbInteract = require('./../middlewares/db-interact');
const asyncForEach = require('./../middlewares/miscs').asyncForEach;
const capitalizeWord = require('./../middlewares/miscs').capitalizeWord;
const getDuplication = require('./../middlewares/miscs').getDuplications;
const removeDuplication = require('./../middlewares/miscs').removeDuplications;
const notNumberField = require('./../middlewares/regex').notNumber;
const validateSampleName = require('./../middlewares/regex').validateSampleName;

async function addSample(req, res) {
    const newSample = req.body.sample;

    if (await getSample({
        params: {
            value: newSample.barcode.toUpperCase()
        }
    }, res) !== false) {
        res.status(403).send({
            message: 'The sample is already exists'
        });
        return;
    }
    // if (validateSampleName(newSample.barcode) === false) {
    //     res.status(403).send({
    //         message: 'The sample sintax is incorrect (SA-##-#####)'
    //     });
    //     return;
    // }

    const insertion = await dbInteract.manipulateData(
        `INSERT INTO Sample SET
        barcode='${newSample.barcode}'`
    );
    if (insertion === false) {
        res.status(503).send({
            message: 'Something is wrong in INSERT method'
        });
        return;
    }
    return true;
}

async function getSample(req, res) {
    const sampleId = req.params.value;
    const validateExistence = await dbInteract
        .isExists(`SELECT * FROM Sample ${typeof sampleId === 'number' ? 
            (`WHERE id=${sampleId};`) : 
            ( typeof sampleId === 'string' ?
                (`WHERE barcode='${sampleId}';`) :
                (';')
            )
        }`);
    if (validateExistence === false ) return false;
    return validateExistence.result[0];
    // const lastState = await require('./StatusController').getStatus({
    //     params: {
    //         value: sampleInterpretation.state
    //     }
    // });

    // sampleInterpretation.state = capitalizeWord(lastState.status.name);
}

async function getSampleByBarcode(req, res) {
    let searchMethod = await getSample({
        params: {
            value: req.params.id
        }
    }, res);
    if (searchMethod === false) {
        res.status(403).send({
            sample: {
                barcode: req.params.id,
                state: "New Sample"
            }
        });
        return;
    }
    const lastLog = await dbInteract.isExists(
        `SELECT State.name 
        FROM Log, State 
        WHERE Log.status_Id=State.id AND 
        Log.sample_Id=${searchMethod.id} GROUP BY Log.onCreated ORDER BY Log.id DESC`);
    searchMethod['state'] = lastLog.result
    console.log(searchMethod)
    res.status(200).send({
        sample: searchMethod
    });
    return;
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

    if (await getSample({
        params: {
            value: req.params.id
        }
    }, res) === false) {
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

    if (await getSample({
        parmas: {
            value: +id
        }
    }, res) !== false) {
        res.status(403).send({
            message: 'The sample is already exists'
        });
        return;
    }

    const update = await dbInteract.manipulateData(
        `UPDATE Sample SET
        barcode='${newSample.barcode}'
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
    getSample: getSample,
    getSampleById: getSampleByBarcode,
    getSampleList: getSampleList,
    removeSample: removeSample,
    updateSample: updateSample
};