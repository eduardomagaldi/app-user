//more of my code:

// const deletedColumns = [
// 	{ name: 'deleted', type: 'BOOLEAN DEFAULT false NOT NULL' },
// ];

// const tables = {
// 	users: {
// 		deletedColumns,
// 		columns: [
// 			{ name: 'id', type: 'VARCHAR(255) PRIMARY KEY' },
// 			{ name: 'name', type: 'VARCHAR(255) NOT NULL' },
// 			{ name: 'email', type: 'VARCHAR(255) NOT NULL' },
// 			{ name: 'imageUrl', type: 'TEXT' },
// 		],
// 	},
// 	groups: {
// 		createColumns: [
// 			{ name: 'id', type: 'INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY' },
// 		],
// 		columns: [
// 			{ name: 'name', type: 'VARCHAR(255) UNIQUE NOT NULL' },
// 		],
// 		deletedColumns,
// 	},
// 	subjects: {
// 		createColumns: [
// 			{ name: 'id', type: 'INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY' },
// 		],
// 		columns: [
// 			{ name: 'name', type: 'VARCHAR(255) NOT NULL' },
// 		],
// 		deletedColumns,
// 	},
// 	clients: {
// 		createColumns: [
// 			{ name: 'id', type: 'INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY' },
// 		],
// 		columns: [
// 			{ name: 'CNPJOrCPF', type: 'VARCHAR(15) NOT NULL' },
// 			{ name: 'name', type: 'VARCHAR(255) NOT NULL' },
// 			{ name: 'email', type: 'VARCHAR(255)' },
// 			{ name: 'group', type: 'INT REFERENCES groups(id)' },
// 			{ name: 'reportType', type: 'CHAR(3)' },
// 			{ name: 'reportEmailList', type: 'VARCHAR(255)[]' },
// 			{ name: 'reportDay', type: 'SMALLINT' },
// 			{ name: 'responsibleLawyer', type: 'VARCHAR(255) REFERENCES users(id)' },
// 			{ name: 'obs', type: 'TEXT' },
// 		],
// 		deletedColumns,
// 	},
// 	contacts: {
// 		createColumns: [
// 			{ name: 'id', type: 'INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY' },
// 		],
// 		columns: [
// 			{ name: 'name', type: 'VARCHAR(255) NOT NULL' },
// 			{ name: 'role', type: 'VARCHAR(255)' },
// 			{ name: 'client', type: 'INT REFERENCES clients(id)' },
// 			{ name: 'email', type: 'VARCHAR(255)' },
// 			{ name: 'phone', type: 'CHAR(11)' },
// 			{ name: 'whatsapp', type: 'CHAR(11)' },
// 		],
// 		deletedColumns,
// 	},
// 	courts: {
// 		createColumns: [
// 			{ name: 'id', type: 'INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY' },
// 		],
// 		columns: [
// 			{ name: 'name', type: 'VARCHAR(255) NOT NULL' },
// 		],
// 		deletedColumns,
// 	},
// 	parts: {
// 		createColumns: [
// 			{ name: 'id', type: 'INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY' },
// 		],
// 		columns: [
// 			{ name: 'name', type: 'VARCHAR(255) NOT NULL' },
// 		],
// 		deletedColumns,
// 	},
// 	depositsOrWarranties: {
// 		createColumns: [
// 			{ name: 'id', type: 'INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY' },
// 		],
// 		columns: [
// 			{ name: 'type', type: 'VARCHAR(255)' },
// 			{ name: 'amount', type: 'NUMERIC(1000, 2)' },
// 			{ name: 'dueDate', type: 'DATE' },
// 		],
// 		deletedColumns,
// 	},
// 	decisions: {
// 		createColumns: [
// 			{ name: 'id', type: 'INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY' },
// 			{ name: 'modified', type: 'TIMESTAMPTZ NOT NULL DEFAULT NOW()' },
// 		],
// 		columns: [
// 			{ name: 'liminar', type: 'VARCHAR(255)' },
// 			{ name: 'sentenca', type: 'VARCHAR(255)' },
// 			{ name: 'trf', type: 'VARCHAR(255)' },
// 			{ name: 'tj', type: 'VARCHAR(255)' },
// 			{ name: 'stj', type: 'VARCHAR(255)' },
// 			{ name: 'stf', type: 'VARCHAR(255)' },
// 			{ name: 'transitoEmJulgado', type: 'VARCHAR(255)' },
// 			{ name: 'habilitacaoDeCredito', type: 'VARCHAR(255)' },
// 		],
// 		deletedColumns,
// 	},
// 	situations: {
// 		createColumns: [
// 			{ name: 'id', type: 'INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY' },
// 		],
// 		columns: [
// 			{ name: 'name', type: 'VARCHAR(255)' },
// 		],
// 		deletedColumns,
// 	},
// 	trials: {
// 		createColumns: [
// 			{ name: 'id', type: 'INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY' },
// 		],
// 		columns: [
// 			{ name: 'cnj', type: 'VARCHAR(20) UNIQUE NOT NULL' },
// 			{ name: 'secId', type: 'VARCHAR(255)' },
// 			{ name: 'client', type: 'INTEGER NULL, FOREIGN KEY(client) REFERENCES clients(id)' },
// 			{ name: 'distributionDate', type: 'DATE' },
// 			{ name: 'parts', type: 'VARCHAR(255)[]' },
// 			{ name: 'status', type: 'VARCHAR(255)' },
// 			{ name: 'originCourt', type: 'CHAR(5)' },
// 			{ name: 'originVara', type: 'INT NULL REFERENCES courts(id)' },
// 			{ name: 'currentCourt', type: 'INT NULL REFERENCES courts(id)' },
// 			{ name: 'city', type: 'VARCHAR(255)' },
// 			{ name: 'state', type: 'CHAR(2)' },
// 			{ name: 'mainTrial', type: 'INT NULL REFERENCES trials(id)' },
// 			{ name: 'lawsuitType', type: 'VARCHAR(255)' },
// 			{ name: 'clientPosition', type: 'VARCHAR(255)' },
// 			{ name: 'oposingPart1', type: 'INT NULL REFERENCES parts(id)' },
// 			{ name: 'oposingPart2', type: 'INT NULL REFERENCES parts(id)' },
// 			{ name: 'oposingPart3', type: 'INT NULL REFERENCES parts(id)' },
// 			{ name: 'oposingPart4', type: 'INT NULL REFERENCES parts(id)' },
// 			{ name: 'amount', type: 'NUMERIC(1000, 2)' },
// 			{ name: 'depositOrWarranty', type: 'INT NULL REFERENCES "depositsOrWarranties"(id)' },
// 			{ name: 'currentSituation', type: 'INT NULL REFERENCES "situations"(id)' },
// 			{ name: 'currentSituationDate', type: 'DATE' },
// 			{ name: 'decisions', type: 'INT REFERENCES decisions(id) NOT NULL' },
// 			{ name: 'procedure', type: 'VARCHAR(255)' },
// 			{ name: 'showTimeline', type: 'BOOLEAN' },
// 			{ name: 'subjectObs', type: 'TEXT' },
// 		],
// 		deletedColumns,
// 	},
// 	movements: {
// 		createColumns: [
// 			{ name: 'id', type: 'INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY' },
// 		],
// 		columns: [
// 			{ name: 'trial', type: 'INT REFERENCES trials(id)' },
// 			{ name: 'text', type: 'TEXT NOT NULL' },
// 			{ name: 'visible', type: 'BOOLEAN NOT NULL' },
// 			{ name: 'date', type: 'DATE' },
// 		],
// 		deletedColumns,
// 	},
// 	subjectsRelation: {
// 		createColumns: [
// 			{ name: 'id', type: 'INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY' },
// 			{ name: 'loosingChanceModDate', type: 'TIMESTAMPTZ NOT NULL DEFAULT NOW()' },
// 		],
// 		columns: [
// 			{ name: 'trial', type: 'INT REFERENCES trials(id)' },
// 			{ name: 'subject', type: 'INT REFERENCES subjects(id)' },
// 			{ name: 'loosingChance', type: 'VARCHAR(255)' },
// 		],
// 		deletedColumns,
// 	},
// };

// tables.trialsClosed = tables.trials;

// module.exports = tables;
