const dbInteract = require('./../middlewares/db-interact');
const asyncForEach = require('./../middlewares/miscs').asyncForEach;
const capitalizeWord = require('./../middlewares/miscs').capitalizeWord;
const getDuplication = require('./../middlewares/miscs').getDuplications;
const removeDuplication = require('./../middlewares/miscs').removeDuplications;
const notNumberField = require('./../middlewares/regex').notNumber;

// Not tested
async function addOperator(req, res) {
    const newOperator = req.body.operator;
    if (newOperator.id > 99999) {
        res.status(403).send({
            message: 'The operator id exceeds the limit'
        });
        return;
    }
    if (getOperatorById(req, res).operators.length === 1) {
        res.status(403).send({
            message: 'The operator is already exists'
        });
        return;
    } else if (getOperatorById(req, res) == false) { }

    if (!notNumberField(newOperator.name)) {
        res.status(403).send({
            message: 'The name can\'t have numbers'
        });
        return;
    }

    const insertion = await dbInteract.manipulateData(
        `INSERT INTO Operator SET ?`, 
        [newOperator]
    );
    if (insertion == false) {
        res.status(503).send({
            message: 'Something is wrong in INSERT method'
        });
        return;
    }

    res.status(200).send({
        message: 'Insertion completed'
    });
}

// Not tested
async function getOperatorById(req, res) {
    const operatorId = req.body.operator;
    const validateExistence = await dbInteract
        .isExists(`SELECT * FROM Operator WHERE id=${operatorId}`);
    if (validateExistence.pass) {
        return {
            operators: validateExistence.result[0]
        };
    } else return false;
}

// Not tested
async function getOperatorList(req, res) {
    const operators = await dbInteract.isExists(`SELECT * FROM Operator ORDER BT id ASC`);
    if (operators == false) {
        res.status(404).send({
            message: 'Add some operators first!'
        });
        return;
    }

    res.status(200).send({
        operators = operators.result
    });
}

// Not tested
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

    const deleted = await dbInteract.manipulateData(`UPDATE Operator SET status=${operator.status} WHERE id=${operator.id}`);
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

// Not tested
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

    const insertion = await dbInteract.manipulateData(`UPDATE Operator SET 
        name='${newOperator.name.toUpperCase()}', 
        status=${newOperator.status}, 
        type=${newOperator.type} 
        WHERE id=${newOperator.id}`);
    if (insertion == false) {
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