const pool = require('./connect');
const tableColumns = require('./columns');
// const log = require('../log');
const fs = require('fs');
const path = require('path');
const directoryPath = path.join(__dirname);

const db = {
    query,
    insert,
    update,
};

module.exports = {
    ...db,
    users: {
        get: async function (email, password) {
            const data = getDatabase();
            const found = data.users.find((user) => {
                if (user.email === email && user.password === password) {
                    return user;
                }
            })
            return found;
        },
    },
    sessions: {
        get: async function (email, password) {
            const data = getDatabase();
            const found = data.users.find((user) => {
                if (user.email === email && user.password === password) {
                    return user;
                }
            })
            return found;
        },
    },
};

function getDatabase() {
    let rawdata = fs.readFileSync(directoryPath + '/../db.json');
    let data = JSON.parse(rawdata);
    return data;
}

async function query(query, values) {
    const verbose = false;

    if (verbose) {
        console.info();
        const yellow = '\x1b[33m';
        console.info(yellow + '%s\x1b[0m', query.replace(/\t/g, ''));
    }

    try {
        const res = await pool.query(query, values);

        return res.rows;
    } catch (err) {
        const red = '\x1b[31m';
        console.info(red + '%s\x1b[0m', err);

        throw new Error(err.stack);
    }
}

async function insert(table, columns, valuesObjArray) {
    const data = getDatabase();

    //TODO make a hash out of the password

    valuesObjArray.forEach((obj) => {
        data[table].push(obj);
    });

    fs.writeFileSync(directoryPath + '/../db.json', JSON.stringify(data));

    return true;

    // more of my code:

    // const originalColumns = extractNames(tableColumns[table].columns);
    // columns = columns || originalColumns;
    // const types = extractTypes(tableColumns[table].columns);

    // const singleValueArr = [];
    // const indexesMatrix = [];

    // valuesObjArray.forEach((obj, i) => {
    //     columns.forEach((column) => {
    //         singleValueArr.push(obj[column]);

    //         indexesMatrix[i] = indexesMatrix[i] || [];

    //         if (types[column] && types[column].includes('DATE')) {
    //             indexesMatrix[i].push(`to_date($${singleValueArr.length}, 'YYYY-MM-DD')`);
    //         } else {
    //             indexesMatrix[i].push(`$${singleValueArr.length}`);
    //         }
    //     });
    // });

    // const str = `INSERT INTO "${table}"
    // 	("${columns.join('", "')}")
    // 	VALUES(${indexesMatrix.join('), (')})
    // 	RETURNING id`;

    // try {
    //     return await db.query(
    //         str,
    //         singleValueArr,
    //     );
    // } catch (e) {
    //     return e;
    // }
}

async function update(table, columns, valuesObjArray, where) {
    const originalColumns = extractNames(tableColumns[table].columns);
    columns = columns || originalColumns;
    const types = extractTypes(tableColumns[table].columns);

    const singleValueArr = [];
    const indexesMatrix = [];
    const setArr = [];
    const columnsArr = [];

    columns.forEach((column) => {
        if (column !== 'id') {
            setArr.push(`"${column}" = tmp."${column}"`);
        }

        columnsArr.push(column);
    });

    valuesObjArray.forEach((obj, i) => {
        columns.forEach((column) => {
            if (column.indexOf('date') > -1) {
                singleValueArr.push(obj[column]);
            } else {
                singleValueArr.push(obj[column]);
            }

            indexesMatrix[i] = indexesMatrix[i] || [];

            let cast = '';

            if (
                typeof obj[column] === 'number'
            ) {
                if (obj[column].toString().indexOf('.') === -1) {
                    cast = '::int';
                } else {
                    cast = '::float';
                }
            }

            if (column === 'reportEmailList' || column === 'parts') {
                cast = '::varchar[]';
            }

            if (column === 'reportDay') {
                cast = '::smallint';
            }

            if (column === 'deleted') {
                cast = '::boolean';
            }

            if (types[column] && types[column].includes('INT ')) {
                cast = '::int';
            }

            if (column.includes('date')) {
                cast = '::date';
            }

            if (column.includes('Date') || column.includes('date')) {
                indexesMatrix[i].push(`to_date($${singleValueArr.length}, 'YYYY-MM-DD')`);
            } else {
                indexesMatrix[i].push(`$${singleValueArr.length}${cast}`);
            }
        });
    });

    const str = `
		UPDATE "${table}"
		SET
			${setArr.join(', \n')}
		FROM (
			values
			(${indexesMatrix.join('),\n (')})
		) AS tmp ("${columnsArr.join('", "')}")
		WHERE "${table}"."${where || 'id'}" = tmp."${where || 'id'}";
	`;

    return await db.query(
        str,
        singleValueArr,
    );
}

function extractNames(array) {
    return array.map((obj) => {
        return obj.name;
    });
}

function extractTypes(array) {
    const result = {};

    array.forEach((obj) => {
        result[obj.name] = obj.type;
    });

    return result;
}

// to check more of my code

// (async function() {
// 	const result = await db.query(
// 		`
// 		UPDATE "trials"
// 		SET
// 			"mainTrial" = tmp."mainTrial",
// "oposingPart1" = tmp."oposingPart1",
// "decisions" = tmp."decisions"
// 		FROM (
// 			values
// 			($1::int,$2::int,$3::int,$4::int)
// 		) AS tmp ("id", "mainTrial", "oposingPart1", "decisions")
// 		WHERE "trials"."id" = tmp."id";
// 		`,
// 		[55, 1, 1, 347],
// 	);
// }());

//     groups: {
//         selectList: [
//             'selectAll()',
//         ],
//         selectAll: async function () {
//             return await db.query(
//                 `SELECT *
// 				FROM groups
// 				WHERE deleted = false
// 				ORDER BY "name" ASC`,
//             );
//         },
//     },
//     subjects: {
//         selectList: [
//             'selectAll()',
//         ],
//         selectAll: async function () {
//             return await db.query(
//                 `SELECT *
// 				FROM subjects
// 				WHERE deleted = false
// 				ORDER BY "name" ASC`,
//             );
//         },
//     },
//     clients: {
//         selectList: [
//             'select(1)',
//             'selectAllShort()',
//             'selectAll()',
//             'selectByLetter("0")',
//             'selectForReport()',
//         ],
//         selectAllShort: async function () {
//             return await db.query(
//                 `SELECT "id", "name"
// 				FROM clients
// 				WHERE deleted = false
// 				ORDER BY clients."name" ASC`,
//             );
//         },
//         selectByLetter: async function (letter) {
//             let letterArray = [letter + '%'];

//             if (letter === '0') {
//                 letterArray = letterArray.concat(['1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%']);
//             }

//             return await db.query(
//                 `SELECT "id", "name"
// 				FROM clients
// 				WHERE unaccent("name") ILIKE ANY ($1) AND deleted = false
// 				ORDER BY clients."name" ASC`,
//                 [letterArray],
//             );
//         },
//         select: async function (clientId) {
//             const data = await db.query(
//                 `SELECT clients.*,
// 					json_agg(DISTINCT groups.*)->0 AS "group",
// 					json_agg(DISTINCT users.*)->0 AS "responsibleLawyer",
// 					COALESCE(
// 						json_agg(contacts) FILTER (WHERE contacts.id IS NOT NULL),
// 						'[]'
// 					) AS "contactList"
// 				FROM clients

// 				LEFT JOIN groups ON groups."id" = clients."group"
// 				LEFT JOIN users ON users."id" = clients."responsibleLawyer"
// 				LEFT JOIN contacts ON contacts."client" = clients."id"

// 				WHERE clients.id = $1 AND clients."deleted" = false

// 				GROUP BY clients.id
// 				ORDER BY clients."name" ASC`,
//                 [clientId],
//             );

//             return data[0];
//         },
//         selectForReport: async function (clientId) {
//             let queryWhere = '';

//             if (clientId) {
//                 queryWhere = 'clients.id = $1 AND';
//             }

//             const data = await db.query(
//                 `SELECT clients.*
// 				FROM clients
// 				WHERE ${queryWhere} clients."deleted" = false
// 				GROUP BY clients.id
// 				`,
//                 clientId ? [clientId] : undefined,
//             );

//             return data;
//         },
//         selectForReportSending: async function (today) {
//             const data = await db.query(
//                 `SELECT clients.name, clients.id, clients."reportType", clients."reportEmailList", clients."reportDay"
// 				FROM clients
// 				WHERE clients."deleted" = false AND clients."reportDay" = $1
// 				GROUP BY clients.id`,
//                 [today],
//             );

//             return data;
//         },
//     },
//     courts: {
//         selectList: [
//             'selectAll()',
//         ],
//         selectAll: async function () {
//             return await db.query(
//                 `SELECT *
// 				FROM courts
// 				WHERE deleted = false
// 				ORDER BY "name" ASC`,
//             );
//         },
//     },
//     situations: {
//         selectList: [
//             'selectAll()',
//         ],
//         selectAll: async function () {
//             return await db.query(
//                 `SELECT *
// 				FROM situations
// 				WHERE deleted = false
// 				ORDER BY "name" ASC`,
//             );
//         },
//     },
//     parts: {
//         selectList: [
//             'selectAll()',
//         ],
//         selectAll: async function () {
//             return await db.query(
//                 `SELECT *
// 				FROM parts
// 				WHERE deleted = false
// 				ORDER BY "name" ASC`,
//             );
//         },
//     },
//     decisions: {
//         selectList: [
//             'select(1)',
//         ],
//         select: async function (decisionId) {
//             const data = await db.query(
//                 `SELECT *
// 				FROM decisions
// 				WHERE "id" = $1 AND deleted = false`,
//                 [decisionId],
//             );

//             return data[0];
//         },
//     },
//     trials: {
//         selectList: [
//             'createTrialsShortView()',
//             'selectAllShort()',
//             'selectAllShort(true)',
//             'select(1)',
//             'select(17)',
//             'selectAllShortMain()',
//             'selectAllByClient(1)',
//         ],
//         createTrialsShortView: async function () {
//             await db.query('DROP VIEW IF EXISTS "trialsShort";');

//             await db.query(`
// 				CREATE OR REPLACE VIEW "trialsShort" AS
// 				SELECT
// 					trials."id",
// 					trials."cnj",
// 					date_trunc('day', trials."distributionDate") as "distributionDate",
// 					trials."status",
// 					false as "closed",
// 					trials."originCourt",
// 					trials."lawsuitType",
// 					trials."decisions",
// 					trials."procedure",
// 					trials."mainTrial",

// 				${trialsShortAggFunctions().columns}

// 				FROM trials

// 				${trialsShortAggFunctions().joins}

// 				WHERE trials.deleted = false

// 				GROUP BY trials.id

// 				ORDER BY trials."distributionDate" DESC
// 			`);
//         },
//         selectAllShort: async function (unfoldingsOnly, offset = 0) {
//             let query = `
// 				SELECT *
// 				FROM "trialsShort"
// 				LIMIT 300 OFFSET ${offset}
// 			`;

//             if (unfoldingsOnly) {
//                 query = `
// 					SELECT
// 						mt.*,
// 						date_trunc('day', mt."distributionDate") as "distributionDate",
// 						json_agg(ct.*) AS "unfoldings"

// 					FROM "trialsShort" mt
// 					INNER JOIN "trialsShort" ct
// 					ON ct."mainTrial" = mt.id

// 					WHERE mt."mainTrial" IS NULL

// 					GROUP BY
// 						mt."id",
// 						mt."cnj",
// 						mt."distributionDate",
// 						mt."status",
// 						mt."closed",
// 						mt."originCourt",
// 						mt."lawsuitType",
// 						mt."decisions",
// 						mt."procedure",
// 						mt."mainTrial",

// 						mt."client",
// 						mt."group",
// 						mt."subjectList",
// 						mt."subjectData",
// 						mt."currentCourt",
// 						mt."currentSituation"
// 				`;
//             }

//             const promises = [
//                 db.query('SELECT COUNT(*) FROM "trialsShort"'),
//                 db.query(query),
//             ];

//             const result = await Promise.all(promises);

//             return {
//                 total: +result[0][0].count,
//                 trials: result[1],
//             };
//         },
//         selectAllShortMain: async function () {
//             const trials = await db.query(`
// 				SELECT t."id", t."cnj"
// 				FROM trials t
// 				WHERE t."mainTrial" IS NULL
// 			`);

//             return trials;
//         },
//         select: async function (trialId, closed) {
//             const tableName = closed ? 'trialsClosed' : 'trials';

//             const query =
//                 `SELECT
// 					trials.*,
// 					date_trunc('day', trials."distributionDate") as "distributionDate",
// 					${!!closed} as "closed",

// 					json_agg(DISTINCT parts1.*)->0 AS "oposingPart1",
// 					json_agg(DISTINCT parts2.*)->0 AS "oposingPart2",
// 					json_agg(DISTINCT parts3.*)->0 AS "oposingPart3",
// 					json_agg(DISTINCT parts4.*)->0 AS "oposingPart4",

// 					json_agg(DISTINCT "depositsOrWarranties".*)->0 AS "depositOrWarranty",

// 					json_agg(DISTINCT "courts2".*)->0 AS "originVara",

// 					jsonb_agg(DISTINCT "situations".*)->0 AS "currentSituation",

// 					COALESCE(
// 						jsonb_agg(
// 							jsonb_build_object(
// 								'id', mt.id,
// 								'cnj', mt.cnj
// 							)
// 						) FILTER (WHERE mt."id" IS NOT NULL),
// 						NULL
// 					)->0 AS "mainTrial",

// 					COALESCE(
// 						trials.amount,
// 						0
// 					) AS "amount",

// 					${trialsShortAggFunctions().columns}

// 				FROM ${tableName}

// 				${trialsShortAggFunctions().joins}

// 				LEFT JOIN parts parts1
// 				ON trials."oposingPart1" = parts1."id"

// 				LEFT JOIN parts parts2
// 				ON trials."oposingPart2" = parts2."id"

// 				LEFT JOIN parts parts3
// 				ON trials."oposingPart3" = parts3."id"

// 				LEFT JOIN parts parts4
// 				ON trials."oposingPart4" = parts4."id"

// 				LEFT JOIN "depositsOrWarranties"
// 				ON trials."depositOrWarranty" = "depositsOrWarranties"."id"

// 				LEFT JOIN courts courts2
// 				ON trials."originVara" = courts2."id"

// 				LEFT JOIN trials mt
// 				ON trials."mainTrial" = mt.id

// 				LEFT JOIN "situations"
// 				ON trials."currentSituation" = situations."id"

// 				WHERE trials.deleted = false AND trials."id" = $1

// 				GROUP BY trials.id,
// 					trials.amount

// 				ORDER BY trials."distributionDate" DESC`;

//             return await db.query(
//                 query,
//                 [trialId],
//             );
//         },
//         selectAllByClient: async function (clientId) {
//             const query = `
// 				SELECT trials.*,
// 					json_agg(DISTINCT parts1.*)->0 AS "oposingPart1",
// 					json_agg(DISTINCT parts2.*)->0 AS "oposingPart2",
// 					json_agg(DISTINCT parts3.*)->0 AS "oposingPart3",
// 					json_agg(DISTINCT parts4.*)->0 AS "oposingPart4",

// 					COALESCE(
// 						jsonb_agg("subjects".*),
// 						'[]'
// 					) AS "subjectList",

// 					COALESCE(
// 						jsonb_agg("subjectsRelation".*) FILTER (WHERE "subjectsRelation"."id" IS NOT NULL),
// 						'[]'
// 					) AS "subjectData",

// 					jsonb_agg(DISTINCT "courts1".*)->0 AS "currentCourt",

// 					jsonb_agg(DISTINCT "situations".*)->0 AS "currentSituation",

// 					json_agg(DISTINCT "depositsOrWarranties".*)->0 AS "depositOrWarranty"

// 				FROM "trials"

// 				LEFT JOIN parts parts1
// 				ON trials."oposingPart1" = parts1."id"

// 				LEFT JOIN parts parts2
// 				ON trials."oposingPart2" = parts2."id"

// 				LEFT JOIN parts parts3
// 				ON trials."oposingPart3" = parts3."id"

// 				LEFT JOIN parts parts4
// 				ON trials."oposingPart4" = parts4."id"

// 				LEFT JOIN "subjectsRelation"
// 				ON trials."id" = "subjectsRelation"."trial"

// 				LEFT JOIN "subjects"
// 				ON subjects."id" = "subjectsRelation"."subject"

// 				LEFT JOIN courts courts1
// 				ON trials."currentCourt" = courts1."id"

// 				LEFT JOIN "situations"
// 				ON trials."currentSituation" = situations."id"

// 				LEFT JOIN "depositsOrWarranties"
// 				ON trials."depositOrWarranty" = "depositsOrWarranties"."id"

// 				WHERE client = $1

// 				GROUP BY trials.id
// 			`;

//             const result = await db.query(query, [clientId]);

//             return result;
//         },
//     },
//     movements: {
//         selectList: [
//             'selectAllFromTrial(1)',
//             'selectVisibleFromTrial(1)',
//         ],
//         selectAllFromTrial: async function (trialId) {
//             return await db.query(
//                 `SELECT *
// 				FROM movements
// 				WHERE "trial" = $1 AND deleted = false
// 				ORDER BY "date" DESC`,
//                 [trialId],
//             );
//         },
//         selectVisibleFromTrial: async function (trialId) {
//             return await db.query(
//                 `SELECT *
// 				FROM movements
// 				WHERE "trial" = $1 AND deleted = false AND visible = true
// 				ORDER BY "date" DESC`,
//                 [trialId],
//             );
//         },
//     },
// };

// async function query(query, values) {
//     const verbose = false;

//     if (verbose) {
//         console.info();
//         const yellow = '\x1b[33m';
//         console.info(yellow + '%s\x1b[0m', query.replace(/\t/g, ''));
//     }

//     try {
//         const res = await pool.query(query, values);

//         return res.rows;
//     } catch (err) {
//         const red = '\x1b[31m';
//         console.info(red + '%s\x1b[0m', err);

//         throw new Error(err.stack);
//     }
// }

// async function insert(table, columns, valuesObjArray) {
//     const originalColumns = extractNames(tableColumns[table].columns);
//     columns = columns || originalColumns;
//     const types = extractTypes(tableColumns[table].columns);

//     const singleValueArr = [];
//     const indexesMatrix = [];

//     valuesObjArray.forEach((obj, i) => {
//         columns.forEach((column) => {
//             singleValueArr.push(obj[column]);

//             indexesMatrix[i] = indexesMatrix[i] || [];

//             if (types[column].includes('DATE')) {
//                 indexesMatrix[i].push(`to_date($${singleValueArr.length}, 'YYYY-MM-DD')`);
//             } else {
//                 indexesMatrix[i].push(`$${singleValueArr.length}`);
//             }
//         });
//     });

//     const str = `INSERT INTO "${table}"
// 		("${columns.join('", "')}")
// 		VALUES(${indexesMatrix.join('), (')})
// 		RETURNING id`;

//     try {
//         return await db.query(
//             str,
//             singleValueArr,
//         );
//     } catch (e) {
//         return e;
//     }
// }

// async function update(table, columns, valuesObjArray, where) {
//     const originalColumns = extractNames(tableColumns[table].columns);
//     columns = columns || originalColumns;
//     const types = extractTypes(tableColumns[table].columns);

//     const singleValueArr = [];
//     const indexesMatrix = [];
//     const setArr = [];
//     const columnsArr = [];

//     columns.forEach((column) => {
//         if (column !== 'id') {
//             setArr.push(`"${column}" = tmp."${column}"`);
//         }

//         columnsArr.push(column);
//     });

//     valuesObjArray.forEach((obj, i) => {
//         columns.forEach((column) => {
//             if (column.indexOf('date') > -1) {
//                 singleValueArr.push(obj[column]);
//             } else {
//                 singleValueArr.push(obj[column]);
//             }

//             indexesMatrix[i] = indexesMatrix[i] || [];

//             let cast = '';

//             if (
//                 typeof obj[column] === 'number'
//             ) {
//                 if (obj[column].toString().indexOf('.') === -1) {
//                     cast = '::int';
//                 } else {
//                     cast = '::float';
//                 }
//             }

//             if (column === 'reportEmailList' || column === 'parts') {
//                 cast = '::varchar[]';
//             }

//             if (column === 'reportDay') {
//                 cast = '::smallint';
//             }

//             if (column === 'deleted') {
//                 cast = '::boolean';
//             }

//             if (types[column] && types[column].includes('INT ')) {
//                 cast = '::int';
//             }

//             if (column.includes('date')) {
//                 cast = '::date';
//             }

//             if (column.includes('Date') || column.includes('date')) {
//                 indexesMatrix[i].push(`to_date($${singleValueArr.length}, 'YYYY-MM-DD')`);
//             } else {
//                 indexesMatrix[i].push(`$${singleValueArr.length}${cast}`);
//             }
//         });
//     });

//     const str = `
// 		UPDATE "${table}"
// 		SET
// 			${setArr.join(', \n')}
// 		FROM (
// 			values
// 			(${indexesMatrix.join('),\n (')})
// 		) AS tmp ("${columnsArr.join('", "')}")
// 		WHERE "${table}"."${where || 'id'}" = tmp."${where || 'id'}";
// 	`;

//     return await db.query(
//         str,
//         singleValueArr,
//     );
// }

// // (async function() {
// // 	const result = await db.query(
// // 		`
// // 		UPDATE "trials"
// // 		SET
// // 			"mainTrial" = tmp."mainTrial",
// // "oposingPart1" = tmp."oposingPart1",
// // "decisions" = tmp."decisions"
// // 		FROM (
// // 			values
// // 			($1::int,$2::int,$3::int,$4::int)
// // 		) AS tmp ("id", "mainTrial", "oposingPart1", "decisions")
// // 		WHERE "trials"."id" = tmp."id";
// // 		`,
// // 		[55, 1, 1, 347],
// // 	);
// // }());

// function trialsShortAggFunctions() {
//     return {
//         columns: `jsonb_agg(
// 				jsonb_build_object(
// 					'id', clients.id,
// 					'name', clients.name
// 				)
// 			)
// 			->0 AS "client",

// 			jsonb_agg(DISTINCT "courts1".*)->0 AS "currentCourt",
// 			jsonb_agg(DISTINCT "groups".*)->0 AS "group",

// 			COALESCE(
// 				jsonb_agg("subjects".*),
// 				'[]'
// 			) AS "subjectList",

// 			COALESCE(
// 				jsonb_agg("subjectsRelation".*) FILTER (WHERE "subjectsRelation"."id" IS NOT NULL),
// 				'[]'
// 			) AS "subjectData"`,
//         joins: `LEFT JOIN clients
// 			ON clients."id" = trials."client"

// 			LEFT JOIN groups
// 			ON clients."group" = groups."id"

// 			LEFT JOIN "subjectsRelation"
// 			ON trials."id" = "subjectsRelation"."trial"

// 			LEFT JOIN "subjects"
// 			ON subjects."id" = "subjectsRelation"."subject"

// 			LEFT JOIN courts courts1
// 			ON trials."currentCourt" = courts1."id"`,
//     }
// }

// function extractNames(array) {
//     return array.map((obj) => {
//         return obj.name;
//     });
// }

// function extractTypes(array) {
//     const result = {};

//     array.forEach((obj) => {
//         result[obj.name] = obj.type;
//     });

//     return result;
// }
