import './style.scss';
import IconLock from '../IconLock';
import IconEnvelope from '../IconEnvelope';
import IconPass from '../IconPass';
import Field from './../Field';
import IconFail from './../IconFail';
import fetch from './../../helpers/fetch';
import React, { useState, useEffect } from "react";
import Button from './../Button';

export default function Component({ children }) {
	const [dataForm, setDataForm] = useState(null);
	const [error, setError] = useState(null);
	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	// const [passwordRepeat, setPasswordRepeat] = useState('');

	// const dataForm = {};

	useEffect(() => {
		// Update the document title using the browser API
		// document.title = `You clicked ${count} times`;
		console.log('use effect');

		// console.log('dataForm', dataForm);

		// validate();
	});

	async function submitCreateAccount(e) {
		e.preventDefault();

		const result = validate(dataForm);

		if (result === true) {
			const data = await fetch.post('/api/v1/user', dataForm);
			console.log('data', data);
		}
	}

	function validate(dataForm) {
		console.log('validate');

		setError(null);
		const result = isValid(dataForm);

		console.log('result', result);

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


			{/* <Field>
				<div className="wrapper_inner__field">
					<input
						className="input"
						type="text"
						name="fullname"
						onChange={handleChange}
						placeholder="Full Name"
					/>

					<div className="icon">
						<IconEnvelope className="mr-2" />
					</div>
				</div>

				{error && error.fullname && <small className="error">{error.fullname}</small>}
			</Field> */}

			{/* <Field>






				<input className="input" type="email" name="email" onChange={handleChange} />
				<div className="icon">
					<IconEnvelope className="mr-2" />
				</div>
			</Field>

			<Field>
				<input className="input" type="password" name="password" onChange={handleChange} />
				<div className="icon">
					<IconLock className="mr-2" />
				</div>
			</Field>

			<Field>
				<input className="input" type="password" name="passwordRepeat" onChange={handleChange} />
				<div className="icon">
					<IconLock className="mr-2" />
				</div>
			</Field> */}

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
	console.log('isvalid', dataForm);

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

	// if (!dataForm.name || !dataForm.email || !dataForm.password || !dataForm.passwordRepeat ) {
	// 	return false;
	// }
}
