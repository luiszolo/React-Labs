const dbInteract = require('./../middlewares/db-interact');
const asyncForEach = require('./../middlewares/miscs').asyncForEach;
const capitalizeWord = require('./../middlewares/miscs').capitalizeWord;
const getDuplication = require('./../middlewares/miscs').getDuplications;
const removeDuplication = require('./../middlewares/miscs').removeDuplications;
const notNumberField = require('./../middlewares/regex').notNumber;
const validateSampleName = require('./../middlewares/regex').validateSampleName;

async function addLog(req, res) {
    const operator = await require('./OperatorController')
        .getOperator({
            params: {
                value: +req.body.operator
            }
        }, res);
    const sample = await require('./SampleController')
        .getSample({
            params: {
                value: req.body.sample
            }
        }, res);
    const test = await require('./TestController')
        .getTest({
            params: {
                value: req.body.test
            }
        }, res);
    const status = await require('./StatusController')
        .getStatus({
            params: {
                value: req.body.status
            }
        }, res);

    if (operator === undefined) {
        res.status(404).send({
            message: 'The operator doesn\'t exists'
        });
        return;
    }

    if (sample === undefined) {
        res.status(404).send({
            message: 'The sample doesn\'t exists'
        });
        return;
    }

    if (test === undefined) {
        res.status(404).send({
            message: 'The test doesn\'t exists'
        });
        return;
    }

    if (status === undefined) {
        res.status(404).send({
            message: 'The status doesn\'t exists'
        });
        return;
    }
    console.log(status)
    const insertion = await dbInteract.manipulateData(
        `INSERT INTO Log SET 
        operator_Id = ${operator.id},
        test_Id = ${test.id},
        sample_Id = ${sample.id},
        status_Id = ${status.id},
        onCreated = '${require('moment')().tz("America/Los_Angeles").format().slice(0,19).replace('T', ' ')}'`
    );

    if (insertion === false) {
        res.status(503).send({
            message: 'Something is wrong in INSERT method'
        });
        return;
    }
    return true;
}

async function getLogsBySample(req, res) {
    const sampleId = await require('./SampleController')
        .getSample({
            params: {
                value: req.params.id
            }
        }, res);
    if (sampleId === false) {
        res.status(404).send({
			message: 'The sample doesn\'t exists'
		});
		return;
    }

    const generalLogs = await dbInteract.isExists(`
		SELECT Operator.id AS 'UserID',Sample.barcode AS 'Sample', State.name AS 'State', Test.name AS 'Test', Log.onCreated AS 'On Created' FROM Log
		JOIN State ON State.id = Log.status_Id 
		JOIN Test ON Test.id = Log.test_Id
		JOIN Operator ON Operator.id = Log.operator_Id 
		JOIN Sample ON Sample.id = Log.sample_Id 
		WHERE Log.sample_Id=${sampleId.id} ORDER BY Log.OnCreated ASC
    `);

    if (generalLogs === false) {
        res.status(404).send({
			message: 'This sample doesn\'t have logs'
		});
		return;
    }
    
    const testAttributes = await dbInteract.isExists(`
		SELECT Test.name AS 'Test', Attribute.name AS 'Attribute', SampleValue.value AS 'Value' FROM SampleValue
		JOIN Test ON Test.id=SampleValue.test_Id
		JOIN Attribute ON  Attribute.id=SampleValue.attribute_Id
		WHERE SampleValue.sample_Id=${sampleId.id} ORDER BY SampleValue.sample_Id ASC
    `);
    
    for await (const result of generalLogs.result) {
        result['On Created'] = result['On Created']
            .toISOString()
            .slice(0,19)
            .replace('T', ' ');
        result['Test'] = capitalizeWord(result['Test']);
        result["State"] = capitalizeWord(result["State"]);
    }

    if (testAttributes !== false) {
        for await (const result of testAttributes.result) {
            result['Test'] = capitalizeWord(result['Test']);
        }
    }

    res.status(200).send({
        Logs: generalLogs.result,
        Attributes: testAttributes.result
    });
}



module.exports = {
    addLog: addLog,
    getLogsBySample: getLogsBySample
};