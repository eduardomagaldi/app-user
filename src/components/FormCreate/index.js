import './style.scss';
import IconPass from '../IconPass';
import Field from './../Field';
import IconFail from './../IconFail';
import fetch from './../../helpers/fetch';
import React, { useState, useEffect } from "react";
import Button from './../Button';

export default function Component({ children, onSuccess }) {
	const [dataForm, setDataForm] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		console.log('use effect');
	});

	async function submitCreateAccount(e) {
		e.preventDefault();

		const result = validate(dataForm);

		if (result === true) {
			const data = await fetch.post('/api/v1/user', dataForm);
			console.log('data', data);
			onSuccess(data);
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
		<form onSubmit={submitCreateAccount}>
			<Field>
				<div className="wrapper_inner__field">
					<input
						className="input"
						type="text"
						name="fullname"
						onChange={handleChange}
						placeholder="Full Name"
					/>
				</div>

				{error && error.fullname && <small className="error">{error.fullname}</small>}
			</Field>

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

			<Field>
				<div className="wrapper_inner__field">
					<input
						className="input"
						type="password"
						name="passwordRepeat"
						onChange={handleChange}
						placeholder="Repeat Password"
					/>
				</div>

				{error && error.passwordRepeat && <small className="error">{error.passwordRepeat}</small>}
			</Field>

			<ul className="list_requirements">
				<li><IconPass /> Minimum 8 characters</li>
				<li><IconFail /> At least one number.</li>
				<li><IconFail /> At least one characters</li>
			</ul>

			<Button className="button--filled button--block" type="submit">REGISTER</Button>
		</form>
	);
}

function isValid(dataForm) {
	if (!dataForm) {
		return {};
	}

	const fields = [
		'fullname',
		'email',
		'password',
		'passwordRepeat',
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
