const dbInteract = require('./../middlewares/db-interact');
const asyncForEach = require('./../middlewares/miscs').asyncForEach;
const capitalizeWord = require('./../middlewares/miscs').capitalizeWord;
const getDuplication = require('./../middlewares/miscs').getDuplications;
const removeDuplication = require('./../middlewares/miscs').removeDuplications;
const notNumberField = require('./../middlewares/regex').notNumber;
const validateSample = require('./../middlewares/regex').validateSampleName;

async function addAttribute(req, res) {
    const newAttribute = req.body.attribute;

    if (await getAttribute(req, res) !== false) {
        res.status(403).send({
            message: 'The attribute is already exists'
        });
        return;
    }

    console.log(newAttribute)

    const insertion = await dbInteract.manipulateData(
        `INSERT INTO Attribute SET 
            name='${newAttribute.name}',
            unit='${newAttribute.unit}',
            placeholder='${newAttribute.placeholder}',
            regex='${newAttribute.regex}',
            active=${newAttribute.actived}
        `
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

async function getAttribute(req, res) {
    const attributeId = req.params.id | req.body.attribute.name;

    const validateExistence =  await dbInteract
        .isExists(`SELECT * FROM Attribute WHERE 
            id=${attributeId} OR name='${attributeId}'`);
    if (validateExistence.pass) {
        return {
            attribute: validateExistence.result[0]
        };
    } else return false;
}

async function getAttributeById(req, res) {
    const searchMethod = await getOperator(req, res);
    if (searchMethod === false) {
        res.status(404).send({
            message: "The attribute doesn't exists"
        });
        return;
    }
    res.status(200).send({
        attribute: searchMethod.attribute
    });
    return;
}

async function getAttributeList(req, res) {
    const option = req.params.option;
    let query = "";
    if (option != null) {
        if (option === "id") {
            query = `SELECT * FROM Attribute ORDER BY id ASC`;
        } else if (option === "name") {
            query = `SELECT * FROM Attribute ORDER BY name ASC`;
        } else {
            res.status(404).send({
                message: 'The option doesn\'t exists'
            });
            return;
        }
    } else {
        query =  `SELECT * FROM Attribute ORDER BY id ASC`;
    }

    const attributes = await dbInteract.isExists(query);
    if (attributes === false) {
        res.status(404).send({
            message: 'Add some attributes first!'
        });
        return;
    }
    res.status(200).send({
        attributes: attributes.result
    });
}

async function removeAttribute(req, res) {
    const attribute = req.params

    if (attribute.id === undefined) {
        res.status(404).send({
            message: 'There is no data to search the attribute'
        });
        return;
    }

    if (await getAttribute(req, res) === false) {
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
    const id = req.params.id;
    const newAttribute = req.body.attribute;

    if (await getAttribute(req, res) === false) {
        res.status(403).send({
            message: 'The attribute doesn\'t exists'
        });
        return;
    }

    const update = await dbInteract.manipulateData(
        `UPDATE Attribute SET ?
        name='${newAttribute.name}',
        placeholder='${newAttribute.placeholder}',
        unit='${newAttribute.unit}',
        regex='${newAttribute.regex}'
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
    addAttribute: addAttribute,
    getAttribute: getAttribute,
    getAttributeById: getAttributeById,
    getAttributeList: getAttributeList,
    removeAttribute: removeAttribute,
    updateAttribute: updateAttribute
};