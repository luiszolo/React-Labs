const dbInteract = require('./../middlewares/db-interact');
const asyncForEach = require('./../middlewares/miscs').asyncForEach;
const capitalizeWord = require('./../middlewares/miscs').capitalizeWord;
const getDuplication = require('./../middlewares/miscs').getDuplications;
const removeDuplication = require('./../middlewares/miscs').removeDuplications;
const notNumberField = require('./../middlewares/regex').notNumber;

async function addAttribute(req, res) {
    const newAttribute = req.body.attribute;

    if (await getAttributeByName(req, res) != false) {
        res.status(403).send({
            message: 'The attribute is already exists'
        })
    }
}

async function getAttributeByName(req, res) {
    const options = req.body.options;
    const attribute = req.body.attribute;

    const validateExistence =  await dbInteract
        .isExists(`SELECT * FROM Attribute WHERE 
            name='${attribute.name.toUpperCase()}`);
    if (validateExistence.pass) { 
        return {
            attributes: validateExistence.result[0]
        };
    } else return false;
}

async function getOperatorList(req, res) {
    const options = req.body.options;
    
    if (options != null) {
        const operators = await dbInteract.isExists(`SELECT * FROM Operator ORDER BY id ASC`);
        if (operators == false) {
            res.status(404).send({
                message: 'Add some operators first!'
            });
            return;
        }
    }

    const operators = await dbInteract.isExists(`SELECT * FROM Operator ORDER BY id ASC`);
    if (operators == false) {
        res.status(404).send({
            message: 'Add some operators first!'
        });
        return;
    }

    res.status(200).send({
        operators: operators.result
    });
}

async function removeOperator(req, res) {
    const operator = req.body.operator

    if (operator.name === undefined && operator.id === undefined) {
        res.status(404).send({
            message: 'There is no data to search the operator'
        });
        return;
    }

    if (getOperatorById(req, res) == false) {
        res.status(404).send({
            message: 'The operator doesn\'t exists'
        });
        return;
    }

    const deleted = await dbInteract.manipulateData(`UPDATE Operator SET status=0 WHERE id=${operator.id}`);
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

async function updateOperator(req, res) {
    const newOperator = req.body.operator;
    if (newOperator.id > 99999) {
        res.status(403).send({
            message: 'The operator id exceeds the limit'
        });
        return;
    }
    if (getOperatorById(req, res) === false) {
        res.status(403).send({
            message: 'The operator is doesn\'t exists'
        });
        return;
    }

    if (!notNumberField(newOperator.name)) {
        res.status(403).send({
            message: 'The name can\'t have numbers'
        });
        return;
    }

    const update = await dbInteract.manipulateData(`UPDATE Operator SET 
        name='${newOperator.name}', 
        status=${newOperator.status}, 
        type=${newOperator.type} 
        WHERE id=${newOperator.id}`);
    if (update == false) {
        res.status(503).send({
            message: 'Something is wrong in UPDATE method'
        });
        return;
    }

    res.status(200).send({
        message: 'Updated completed'
    });
}

module.exports = {
    addOperator: addOperator,
    getOperatorById: getOperatorById,
    getOperatorList: getOperatorList,
    removeOperator: removeOperator,
    updateOperator: updateOperator
};