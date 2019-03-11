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
            message: 'The sample is already exists'
        });
        return;
    }

    const insertion = await dbInteract.manipulateData(
        `INSERT INTO Attribute SET ?`,
        [newAttribute]
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
    const sample = req.body.sample;

    const validateExistence =  await dbInteract
        .isExists(`SELECT * FROM Sample WHERE 
            name=${attribute.name}`);
    if (validateExistence.pass) { 
        return {
            attributes: validateExistence.result[0]
        };
    } else return false;
}

async function getAttributeList(req, res) {
    const options = req.body.options;

    if (options != null) {
        if (options.byId === true) {
            const operators = await dbInteract.isExists(`SELECT * FROM Operator ORDER BY id ASC`);
            if (operators == false) {
                res.status(404).send({
                    message: 'Add some attributes first!'
                });
                return;
            }
        } else if (options.byName === true) {
            const operators = await dbInteract.isExists(`SELECT * FROM Operator ORDER BY name ASC`);
            if (operators == false) {
                res.status(404).send({
                    message: 'Add some attributes first!'
                });
                return;
            }
        } else {
            res.status(404).send({
                message: 'The option selected doesn\'t exists'
            });
            return;
        }
    } else {
        const operators = await dbInteract.isExists(`SELECT * FROM Operator ORDER BY id ASC`);
        if (operators == false) {
            res.status(404).send({
                message: 'Add some attributes first!'
            });
            return;
        }
    }
}

async function removeAttribute(req, res) {
    const attribute = req.body.attribute

    if (attribute.name === undefined && attribute.id === undefined) {
        res.status(404).send({
            message: 'There is no data to search the attribute'
        });
        return;
    }

    if (getAttributeById(req, res) == false) {
        res.status(404).send({
            message: 'The attribute doesn\'t exists'
        });
        return;
    }

    const deleted = await dbInteract.manipulateData(`UPDATE Attribute SET status=0 WHERE id=${attribute.id}`);
    if (deleted == false) {
        res.status(503).send({
            message: 'Something is wrong in DELETE method'
        });
        return;
    }

    res.status(200).send({
        message: 'Deactivation completed'
    });
}

async function updateAttribute(req, res) {
    const newAttribute = req.body.attribute;

    if (await getAttributeById(req, res) !== false) {
        res.status(403).send({
            message: 'The attribute is already exists'
        });
        return;
    }

    const update = await dbInteract.manipulateData(
        `UPDATE Attribute SET ?
        name='${newAttribute.name}',
        placeholder='${newAttribute.pplaceholder}',
        unit='${newAttribute.unit}',
        regex='${newAttribute.regex}'
        WHERE id=${newAttribute.id}`
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
    addAttribute: addAttribute,
    getAttributeById: getAttributeById,
    getAttributeList: getAttributeList,
    removeAttribute: removeAttribute,
    updateAttribute: updateAttribute
};