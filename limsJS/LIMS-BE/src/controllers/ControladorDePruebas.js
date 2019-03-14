const dbInteract = require('./../middlewares/db-interact');
const asyncForEach = require('./../middlewares/miscs').asyncForEach;
const capitalizeWord = require('./../middlewares/miscs').capitalizeWord;
const getDuplication = require('./../middlewares/miscs').getDuplications;
const removeDuplication = require('./../middlewares/miscs').removeDuplications;
const notNumberField = require('./../middlewares/regex').notNumber;
const validateSampleName = require('./../middlewares/regex').validateSampleName;

async function addLog(req, res) {
    const operator = await require('./OperatorController')
        .getOperator(req, res);
    const sample = await require('./SampleController')
        .getSample(req, res);
    const test = await require('./TestController')
        .getTest(req, res);
    const status = await require('./StatusController')
        .getStatus(req, res);

    if (operator.operators === undefined) {
        res.status(404).send({
            message: 'The operator doesn\'t exists'
        });
        return;
    }

    if (sample.sample === undefined) {
        res.status(404).send({
            message: 'The sample doesn\'t exists'
        });
        return;
    }

    if (test.test === undefined) {
        res.status(404).send({
            message: 'The test doesn\'t exists'
        });
        return;
    }

    if (status.status === undefined) {
        res.status(404).send({
            message: 'The status doesn\'t exists'
        });
        return;
    }

    const insertion = await dbInteract.manipulateData(
        `INSERT INTO Log SET 
        operator_Id = ${operator.operators.id},
        test_Id = ${test.test.id},
        sample_Id = ${sample.sample.id},
        status_Id = ${status.status.id}`
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
}

async function getLogsBySample(req, res) {
    const sample = req.params.id;
    const sampleId = await require('./SampleController')
        .getSample(req, res);
    if (sampleId === false) {
        res.status(404).send({
			message: 'The sample doesn\'t exists'
		});
		return;
    }

    const generalLogs = await dbInteract.isExists(`
		SELECT Operator.id AS 'UserID',Sample.name AS 'Sample', Status.name AS 'State', Test.name AS 'Test', Log.onCreated AS 'On Created' FROM Log
		JOIN Status ON Status.id = Log.status_Id 
		JOIN Test ON Test.id = Log.test_Id
		JOIN Operator ON Operator.id = Log.operator_Id 
		JOIN Sample ON Sample.id = Log.sample_Id 
		WHERE Log.sample_Id=${sampleId.sample.id}
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
		WHERE SampleValue.sample_Id=${sampleId.sample.id} ORDER BY SampleValue.id ASC
    `);
    
    for await (const result of generalLogs.result) {
        result['On Created'] = result['On Created']
            .toISOString()
            .slice(0,19)
            .replace('T', ' ');
        result['Test'] = capitalizeWord(result['Test']);
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