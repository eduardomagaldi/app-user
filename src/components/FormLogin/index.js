import './style.scss';
import Field from './../Field';
import fetch from './../../helpers/fetch';
import React, { useState } from "react";
import Button from './../Button';

export default function Component({ children, onSuccess }) {
	const [dataForm, setDataForm] = useState(null);
	const [error, setError] = useState(null);

	async function submitLogin(e) {
		e.preventDefault();

		const result = validate(dataForm);

		if (result === true) {
			const data = await fetch.post('/api/v1/session', dataForm);
			if (data && !data.error) {
				onSuccess(data);
			}
		}
	}

	function validate(dataForm) {
		setError(null);
		const result = isValid(dataForm);

		if (result === true) {
			return result;
		} else {
			setError({ ...error, ...result });
		}

		return error;
	}

	function handleChange(e) {
		const newDataForm = { ...dataForm };
		newDataForm[e.target.name] = e.target.value;
		setDataForm(newDataForm);
		validate(dataForm);
	}

	return (
		<form onSubmit={submitLogin}>
			<Field>
				<div className="wrapper_inner__field">
					<input
						className="input"
						type="email"
						name="email"
						onChange={handleChange}
						placeholder="Email"
					/>
				</div>

				{error && error.email && <small className="error">{error.email}</small>}
			</Field>

			<Field>
				<div className="wrapper_inner__field">
					<input
						className="input"
						type="password"
						name="password"
						onChange={handleChange}
						placeholder="Password"
					/>
				</div>

				{error && error.password && <small className="error">{error.password}</small>}
			</Field>

			<Button className="button--filled button--block" type="submit">LOGIN</Button>
		</form>
	);
}

function isValid(dataForm) {
	if (!dataForm) {
		return {};
	}

	const fields = [
		'email',
		'password',
	];
	let error = null;

	fields.every((field) => {
		if (dataForm && (dataForm[field] === null || dataForm[field] === undefined || dataForm[field] === '')) {
			error = error || {};
			error[field] = `Please enter ${field}.`;
		}
		return true;
	});

	if (error) {
		return error;
	}

	return true;
}
