const dbInteract = require('./../middlewares/db-interact');
const asyncForEach = require('./../middlewares/miscs').asyncForEach;
const capitalizeWord = require('./../middlewares/miscs').capitalizeWord;
const getDuplication = require('./../middlewares/miscs').getDuplications;
const removeDuplication = require('./../middlewares/miscs').removeDuplications;
const notNumberField = require('./../middlewares/regex').notNumber;
const validateSampleName = require('./../middlewares/regex').validateSampleName;

async function addStatus(req, res) {
    const newStatus = req.body.status;

    if (await getStatusById(req, res) !== false) {
        res.status(403).send({
            message: 'The status is already exists'
        });
        return;
    }

    if (!notNumberField(newStatus.name)) {
        res.status(403).send({
            message: 'The status can\'t have numbers'
        });
        return;
    }

    const insertion = await dbInteract.manipulateData(
        `INSERT INTO Status SET ?`,
        [newStatus]
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

async function getStatus(req, res) {
    const statusId = req.params.id | req.body.status.name;
    const validateExistence = await dbInteract
        .isExists(`SELECT * FROM Sample WHERE id=${statusId} OR name='${statusId}'`);
    if (validateExistence.pass) {
        return {
            status: validateExistence.result[0]
        };
    } else return false;
}

async function getStatusById(req, res) {
    const searchMethod = await getStatusById(req, res);
    if (searchMethod === false) {
        res.status(404).send({
            message: "The status doesn't exists"
        });
        return;
    }
    res.status(200).send({
        status: searchMethod.status
    });
    return;
}

async function getStatusList(req, res) {
    const option = req.params.option;
    let query = "";
    if (option != null) {
        if (option === "id") {
            query = `SELECT * FROM Status ORDER BY id ASC`;
        } else if (option === "name") {
            query = `SELECT * FROM Status ORDER BY name ASC`;
        } else {
            res.status(404).send({
                message: 'The option doesn\'t exists'
            });
            return;
        }
    } else {
        query =  `SELECT * FROM Status ORDER BY id ASC`;
    }

    const status = await dbInteract.isExists(query);
    if (status == false) {
        res.status(404).send({
            message: 'Add some status first!'
        });
        return;
    }
    res.status(200).send({
        status: status.result
    });
}

async function removeStatus(req, res) {
    const status = req.params;

    if (status.id === undefined) {
        res.status(404).send({
            message: 'There is no data to search the status'
        });
        return;
    }

    if (await getStatusById(req, res) === false) {
        res.status(404).send({
            message: 'The status doesn\'t exists'
        });
        return;
    }

    const deleted = await dbInteract.manipulateData(`UPDATE Status SET actived=0 WHERE id=${status.id}`);
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

async function updateStatus(req, res) {
    const id = req.params.id;
    const newStatus = req.body.status;

    if (await getStatusById(req, res) !== false) {
        res.status(403).send({
            message: 'The status is already exists'
        });
        return;
    }

    const update = await dbInteract.manipulateData(
        `UPDATE Status SET ?
        name='${newStatus.name}',
        actived='${newStatus.actived}'
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
    addStatus: addStatus,
    getStatusById: getStatusById,
    getStatusList: getStatusList,
    removeStatus: removeStatus,
    updateStatus: updateStatus
};