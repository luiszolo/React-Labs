const dbInteract = require('./../middlewares/db-interact');
const asyncForEach = require('./../middlewares/miscs').asyncForEach;
const capitalizeWord = require('./../middlewares/miscs').capitalizeWord;
const getDuplication = require('./../middlewares/miscs').getDuplications;
const removeDuplication = require('./../middlewares/miscs').removeDuplications;
const notNumberField = require('./../middlewares/regex').notNumber;
const validateSampleName = require('./../middlewares/regex').validateSampleName;

async function addTest(req, res) {
    const newTest = req.body.test;

    if (await getTest({
        params: {
            value: newTest.name
        }
    }, res) !== false) {
        res.status(403).send({
            message: 'The test is already exists'
        });
        return;
    }

    if (newTest.samplesLength <= 0) {
        res.status(403).send({
			message: 'The Test can\'t be saved!'
		});
		return;
    }

    if (!newTest.postStates) {
        res.status(403).send({
            message: 'Missing Status!'
        });
        return;
    }

    const auxTestName = capitalizeWord(newTest.name.toUpperCase());

    await require('./StatusController').addStatus({
        body: {
            status: {
                name: `Sample Passed ${auxTestName}`,
                actived: 1
            }
        },
        params: {
            aux: false
        }
    }, res);

    const initialStateId = await dbInteract.isExists(
        `SELECT id FROM State 
        WHERE name='Sample Passed ${capitalizeWord(newTest.name.toUpperCase())}'`
    );
    if (initialStateId === false) {
        res.status(403).send({
            message: `Error saving the new test: 
            status ${newTest.initialState.toUpperCase()} doesn't exists`
        });
        return;
    }

    let insertion = undefined;

    if (newTest.requiredState === undefined) {
        insertion = await dbInteract.manipulateData(
            `INSERT INTO Test SET
            name='${newTest.name.toUpperCase()}',
            samplesLength=${newTest.samplesLength},
            require_State=${null},
            initial_State=${initialStateId.result[0].id},
            actived=${newTest.actived}`
        );
    } else {
        const requiredStateId = await dbInteract.isExists(
            `SELECT id FROM State WHERE name='${newTest.requiredState.toUpperCase()}'`
        );
        insertion = await dbInteract.manipulateData(
            `INSERT INTO Test SET
            name='${newTest.name.toUpperCase()}',
            samplesLength=${newTest.samplesLength},
            require_State=${requiredStateId.result[0].id},
            initial_State=${initialStateId.result[0].id},
            actived=${newTest.actived}`
        );
    }

    if (insertion === false) {
        res.status(503).send({
            message: 'Something is wrong in INSERT method'
        });
        return;
    }

    const testId = await dbInteract.isExists(
        `SELECT * FROM Test 
        WHERE name='${newTest.name.toUpperCase()}'`
    );

    if (newTest.attributes !== undefined) {
        for await (const attr of newTest.attributes) {
            const validateExistence =  await dbInteract.isExists(
                `SELECT * FROM Attribute 
                WHERE name='${attr.toUpperCase()}' 
                AND actived=1`
            );
            if (validateExistence === false) {
                await restoreProcess(testId, hasAttr=true)
                res.status(403).send({
                    message: `Error saving the new test: ${attr.toUpperCase()} 
                    doesn't exists`
                })
                return;
            }
            await dbInteract.manipulateData(`INSERT INTO TestAttributes SET 
                test_Id=${testId.result[0].id},
                attribute_Id=${validateExistence.result[0].id}`
            );
        }
    }

    for await (const postStatus of newTest.postStates) {
        const postStatusId = await dbInteract.isExists(
            `SELECT id FROM State WHERE name='${postStatus.toUpperCase()}'`
        );
        if (postStatusId === false) {
            await restoreProcess(testId, hasAttr=(newTest.attributes !== undefined), hasStatus=true)
            res.status(403).send({
                message: `Error saving the new test: 
                status ${postStatus.toUpperCase()} doesn't exists`
            });
            return;
        }
        await dbInteract.manipulateData(`INSERT INTO TestStatus SET
            test_Id=${testId.result[0].id},
            result_State=${postStatusId.result[0].id}`
        );
    }

    res.status(200).send({
        message: 'Insertion completed'
    });
    return;
}

async function getTest(req, res) {
    const testId = req.params.value;
    const validateExistence = await dbInteract
        .isExists(`SELECT * FROM Test ${(typeof testId === 'number') ? 
            (`WHERE id=${testId};`) : 
            ( typeof testId === 'string' ?
                (`WHERE name='${testId}';`) :
                (';')
            )
        }`);
    if (validateExistence === false) return false;
    let testInterpretation = validateExistence.result[0];
    testInterpretation.name = capitalizeWord(testInterpretation.name);
    testInterpretation.require_State = await require('./StatusController').getStatus({
        params: {
            value: +testInterpretation.require_State
        }
    });
    if (testInterpretation.require_State) {
        testInterpretation.require_State = capitalizeWord(testInterpretation.require_State.name);
    }
    testInterpretation.initial_State = await require('./StatusController').getStatus({
        params: {
            value: +testInterpretation.initial_State
        }
    });
    testInterpretation.initial_State = capitalizeWord(testInterpretation.initial_State.name);

    const testStatus = await dbInteract.isExists(`
        SELECT State.name
        FROM State, TestStatus
        WHERE TestStatus.test_Id=${testInterpretation.id} 
        AND TestStatus.result_State=State.id
    `);
    testInterpretation['result_States'] = testStatus.result.map((stt) => {
        return capitalizeWord(stt.name);
    });

    const testAttributes = await dbInteract.isExists(`
        SELECT * 
        FROM Attribute, TestAttributes 
        WHERE TestAttributes.test_Id=${testInterpretation.id} 
        AND TestAttributes.attribute_Id=Attribute.id
    `);
    testInterpretation['attributes'] = testAttributes.result;
    if (testInterpretation['attributes'] !== undefined | null) {
        for await (const attr of testInterpretation['attributes']) {
            attr.name = capitalizeWord(attr.name);
        }
    }
    return testInterpretation;
}

async function getTestById(req, res) {
    const searchMethod = await getTest({
        params: {
            value: +req.params.id
        }
    }, res);
    if (searchMethod === false) {
        res.status(404).send({
            message: "The test doesn't exists"
        });
        return;
    }
    res.status(200).send({
        test: searchMethod
    });
    return;
}

async function getTestList(req, res) {
    const option = req.params.option;
    let query = "";
    if (option != null) {
        if (option === "id") {
            query = `SELECT * FROM Test WHERE Test.actived=1 ORDER BY id ASC`;
        } else if (option === "name") {
            query = `SELECT * FROM Test WHERE Test.actived=1 ORDER BY name ASC`;
        } else {
            res.status(404).send({
                message: 'The option doesn\'t exists'
            });
            return;
        }
    } else {
        query =  `SELECT * FROM Test WHERE Test.actived=1 ORDER BY id ASC`;
    }

    const activedTests = await dbInteract.isExists(query);
    if (activedTests === false) {
        res.status(404).send({
            message: 'Add some tests first!'
        });
        return;
    }
    for await ( const testInterpretation of activedTests.result) {
        testInterpretation.name = capitalizeWord(testInterpretation.name);
        testInterpretation.require_State = await require('./StatusController').getStatus({
            params: {
                value: +testInterpretation.require_State
            }
        });
        if (testInterpretation.require_State) {
            testInterpretation.require_State = capitalizeWord(testInterpretation.require_State.name);
        }
        testInterpretation.initial_State = await require('./StatusController').getStatus({
            params: {
                value: +testInterpretation.initial_State
            }
        });
        testInterpretation.initial_State = capitalizeWord(testInterpretation.initial_State.name);

        const testStatus = await dbInteract.isExists(`
            SELECT State.name
            FROM State, TestStatus
            WHERE TestStatus.test_Id=${testInterpretation.id} 
            AND TestStatus.result_State=State.id
        `);
        testInterpretation['result_States'] = testStatus.result.map((stt) => {
            return capitalizeWord(stt.name);
        });

        const testAttributes = await dbInteract.isExists(`
            SELECT * 
            FROM Attribute, TestAttributes 
            WHERE TestAttributes.test_Id=${testInterpretation.id} 
            AND TestAttributes.attribute_Id=Attribute.id
        `);
        testInterpretation['attributes'] = testAttributes.result;
        if (testInterpretation['attributes'] !== undefined | null) {
            for await (const attr of testInterpretation['attributes']) {
                attr.name = capitalizeWord(attr.name);
            }
        }
    }


    if (option != null) {
        if (option === "id") {
            query = `SELECT * FROM Test WHERE Test.actived=0 ORDER BY id ASC`;
        } else if (option === "name") {
            query = `SELECT * FROM Test WHERE Test.actived=0 ORDER BY name ASC`;
        } else {
            res.status(404).send({
                message: 'The option doesn\'t exists'
            });
            return;
        }
    } else {
        query =  `SELECT * FROM Test WHERE Test.actived=0 ORDER BY id ASC`;
    }

    const inactivedTests = await dbInteract.isExists(query);
    if (inactivedTests !== false) {
        for await ( const testInterpretation of inactivedTests.result) {
            testInterpretation.name = capitalizeWord(testInterpretation.name);
            testInterpretation.require_State = await require('./StatusController').getStatus({
                params: {
                    value: +testInterpretation.require_State
                }
            });
            if (testInterpretation.require_State) {
                testInterpretation.require_State = capitalizeWord(testInterpretation.require_State.name);
            }
            testInterpretation.initial_State = await require('./StatusController').getStatus({
                params: {
                    value: +testInterpretation.initial_State
                }
            });
            testInterpretation.initial_State = capitalizeWord(testInterpretation.initial_State.name);

            const testStatus = await dbInteract.isExists(`
                SELECT State.name
                FROM State, TestStatus
                WHERE TestStatus.test_Id=${testInterpretation.id} 
                AND TestStatus.result_State=State.id
            `);

            testInterpretation['result_States'] = testStatus.result.map((stt) => {
                return capitalizeWord(stt.name);
            });

            const testAttributes = await dbInteract.isExists(`
                SELECT * 
                FROM Attribute, TestAttributes 
                WHERE TestAttributes.test_Id=${testInterpretation.id} 
                AND TestAttributes.attribute_Id=Attribute.id
            `);
            testInterpretation['attributes'] = testAttributes.result;
            if (testInterpretation['attributes'] !== undefined | null) {
                for await (const attr of testInterpretation['attributes']) {
                    attr.name = capitalizeWord(attr.name);
                }
            }
        }
    }



    res.status(200).send({
        tests: {
            actived: activedTests.result,
            inactived: inactivedTests.result
        }
    });
}

async function removeTest(req, res) {
    const id = +req.params.id;

    if (id === undefined) {
        res.status(404).send({
            message: 'There is no data to search the status'
        });
        return;
    }

    if (await getTest(req, res) === false) {
        res.status(404).send({
            message: 'The status doesn\'t exists'
        });
        return;
    }

    const deleted = await dbInteract.manipulateData(`UPDATE Test SET actived=0 WHERE id=${id}`);
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

async function restoreProcess (testId, hasAttr=false, hasStatus=false, hasUpdate=false) {
    if (hasAttr === true) {
        await dbInteract.manipulateData(
            `DELETE FROM TestAttributes WHERE test_Id=${testId}`
        );
    }
    if (hasStatus === true) {
        await dbInteract.manipulateData(
            `DELETE FROM TestStatus WHERE test_Id=${testId}`
        );
    }

    if (hasUpdate === false) {
        await dbInteract.manipulateData(
            `DELETE FROM Test WHERE id=${testId}`
        );
    }
}

async function updateTest(req, res) {
    const id = +req.params.id;
    const newTest = req.body.test;
    console.log(newTest)
    const oldTest = await getTest({
        params: {
            value: +id
        }
    }, res);
    if (oldTest.name !== newTest.name) {
        const newInput = await getTest({
            params: {
                value: newTest.name
            }
        }, res);
        if (newInput === false) {
            res.status(403).send({
                message: 'The test is already exists'
            });
            return;
        }
    }

    if (newTest.samplesLength <= 0) {
        res.status(403).send({
			message: 'The Test can\'t be saved!'
		});
		return;
    }

    if (!newTest.postStates) {
        res.status(403).send({
            message: 'Missing Status!'
        });
        return;
    }

    const auxTestName = capitalizeWord(newTest.name.toUpperCase());

    await require('./StatusController').addStatus({
        body: {
            status: {
                name: `Sample Passed ${auxTestName}`,
                actived: 1
            }
        },
        params: {
            aux: false
        }
    }, res);

    const initialStateId = await dbInteract.isExists(
        `SELECT id FROM State 
        WHERE name='Sample Passed ${capitalizeWord(newTest.name.toUpperCase())}'`
    );
    if (initialStateId === false) {
        res.status(403).send({
            message: `Error saving the new test: 
            status ${newTest.initialState.toUpperCase()} doesn't exists`
        });
        return;
    }

    let insertion = undefined;

    if (newTest.requiredState === undefined) {
        insertion = await dbInteract.manipulateData(
            `UPDATE Test SET
            name='${newTest.name.toUpperCase()}',
            samplesLength=${newTest.samplesLength},
            require_State=${null},
            initial_State=${initialStateId.result[0].id},
            actived=${newTest.actived}
            WHERE id = ${id}`
        );
    } else {
        const requiredStateId = await dbInteract.isExists(
            `SELECT id FROM State WHERE name='${newTest.requiredState.toUpperCase()}'`
        );
        insertion = await dbInteract.manipulateData(
            `UPDATE Test SET
            name='${newTest.name.toUpperCase()}',
            samplesLength=${newTest.samplesLength},
            require_State=${requiredStateId.result[0].id},
            initial_State=${initialStateId.result[0].id},
            actived=${newTest.actived}
            WHERE id = ${id}`
        );
    }

    if (insertion === false) {
        res.status(503).send({
            message: 'Something is wrong in UPDATE method'
        });
        return;
    }
    await restoreProcess(+id, hasAttr=true, hasStatus=true, hasUpdate=true);
    if (newTest.attributes !== undefined) {
        for await (const attr of newTest.attributes) {
            const validateExistence =  await dbInteract.isExists(
                `SELECT * FROM Attribute 
                WHERE name='${attr.toUpperCase()}' 
                AND actived=1`
            );
            if (validateExistence === false) {
                await restoreProcess(testId, hasAttr=true)
                res.status(403).send({
                    message: `Error saving the new test: ${attr.toUpperCase()} 
                    doesn't exists`
                })
                return;
            }
            await dbInteract.manipulateData(`INSERT INTO TestAttributes SET 
                test_Id=${testId.result[0].id},
                attribute_Id=${validateExistence.result[0].id}`
            );
        }
    }

    for await (const postStatus of newTest.postStates) {
        const postStatusId = await dbInteract.isExists(
            `SELECT id FROM State WHERE name='${postStatus.toUpperCase()}'`
        );
        if (postStatusId === false) {
            await restoreProcess(id, hasAttr=(newTest.attributes !== undefined), hasStatus=true)
            res.status(403).send({
                message: `Error saving the new test: 
                status ${postStatus.toUpperCase()} doesn't exists`
            });
            return;
        }
        await dbInteract.manipulateData(`INSERT INTO TestStatus SET
            test_Id=${id},
            result_State=${postStatusId.result[0].id}`
        );
    }

    res.status(200).send({
        message: 'Insertion completed'
    });
    return;
}

module.exports = {
    addTest: addTest,
    getTest: getTest,
    getTestById: getTestById,
    getTestList: getTestList,
    removeTest: removeTest,
    updateTest: updateTest
};