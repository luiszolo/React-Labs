const dbInteract = require('./../middlewares/db-interact');
const asyncForEach = require('./../middlewares/miscs').asyncForEach;
const capitalizeWord = require('./../middlewares/miscs').capitalizeWord;
const getDuplication = require('./../middlewares/miscs').getDuplications;
const removeDuplication = require('./../middlewares/miscs').removeDuplications;
const notNumberField = require('./../middlewares/regex').notNumber;
const validateSample = require('./../middlewares/regex').validateSampleName;

async function addOperator(req, res) {
    const newOperator = req.body.operator;
    if (newOperator.id > 99999) {
        res.status(403).send({
            message: 'The operator id exceeds the limit'
        });
        return;
    }

    if (await getOperatorById(req, res) !== false) {
        res.status(403).send({
            message: 'The operator is already exists'
        });
        return;
    }

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

async function getOperatorById(req, res) {
    const operatorId = req.body.operator.id;
    const validateExistence = await dbInteract
        .isExists(`SELECT * FROM Operator WHERE id=${operatorId}`);
    if (validateExistence.pass) {
        return {
            operators: validateExistence.result[0]
        };
    } else return false;
}

async function getOperatorList(req, res) {
    const options = req.body.options;
    
    if (options != null) {
        if (options.byId === true) {
            const operators = await dbInteract.isExists(`SELECT * FROM Operator ORDER BY id ASC`);
            if (operators == false) {
                res.status(404).send({
                    message: 'Add some operators first!'
                });
                return;
            }
        } else if (options.byName === true) {
            const operators = await dbInteract.isExists(`SELECT * FROM Operator ORDER BY name ASC`);
            if (operators == false) {
                res.status(404).send({
                    message: 'Add some operators first!'
                });
                return;
            }
        } else {
            res.status(503).send({
                message: 'The option selected doesn\'t exists'
            });
            return;
        }
    } else {
        const operators = await dbInteract.isExists(`SELECT * FROM Operator ORDER BY id ASC`);
        if (operators == false) {
            res.status(404).send({
                message: 'Add some operators first!'
            });
            return;
        }
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