import './style.scss';
// import Box from './../Box';
import ImgGoogleSpring from './../ImgGoogleSpring';
import Button from './../Button';
import IconLock from '../IconLock';
import IconEnvelope from '../IconEnvelope';
import Field from './../Field';
import fetch from './../../helpers/fetch';

// import React, { useState, useEffect } from 'react';

export default function Component() {
	// useEffect(() => {
	// 	// Update the document title using the browser API
	// 	// document.title = `You clicked ${count} times`;
	// });

	async function submitCreateAccount(e) {
		e.preventDefault();
		console.log('submit');

		console.log('fetch', fetch);

		const data = await fetch.get('/api/login');
		console.log('data', data);
	}

	function showSignup() {
		let prism = document.querySelector(".rec-prism");

		if (prism) {
			prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
		}
	}

	function showLogin() {
		let prism = document.querySelector(".rec-prism");

		if (prism) {
			prism.style.transform = "translateZ(-100px)";
		}
	}

	function showForgotPassword() {
		let prism = document.querySelector(".rec-prism");

		if (prism) {
			prism.style.transform = "translateZ(-100px) rotateY( -180deg)";
		}
	}

	function showSubscribe() {
		let prism = document.querySelector(".rec-prism");

		if (prism) {
			prism.style.transform = "translateZ(-100px) rotateX( -90deg)";
		}
	}

	function showContactUs() {
		let prism = document.querySelector(".rec-prism");

		if (prism) {
			prism.style.transform = "translateZ(-100px) rotateY( 90deg)";
		}
	}

	function showThankYou() {
		let prism = document.querySelector(".rec-prism");

		if (prism) {
			prism.style.transform = "translateZ(-100px) rotateX( 90deg)";
		}
	}

	// function submit(event) {
	// 	event.preventDefault();
	// }

	return (
		<div className="app">
			<ul className="nav">
				<li onClick={showLogin}>Register (1)</li>
				<li onClick={showSignup}>Login (2)</li>
				<li onClick={showForgotPassword}> (3)</li>
				<li onClick={showContactUs}>(4)</li>
				<li onClick={showSubscribe}>Happy Spring (Top)</li>
				<li onClick={showThankYou}>(Bottom)</li>
			</ul>
			<div className="wrapper">
				<div className="rec-prism">
					<div className="face face-top">
						<div className="content">
							{/* <h2>Subscribe</h2>
							<small>Enter your email so we can send you the latest updates!</small>
							<form >


								<div className="field-wrapper">
									<input type="text" name="email" placeholder="email" />
									<label>e-mail</label>
								</div>
								<div className="field-wrapper">
									<input type="submit" onClick={showThankYou} />
								</div>
							</form> */}

							<ImgGoogleSpring />

							<h1>Happy Spring!!!</h1>
							<h1>Fröhlichen Frühling!!!</h1>
						</div>
					</div>
					<div className="face face-front">
						<div className="content">

							<h1>Create an Account</h1>

							<form onSubmit={submitCreateAccount}>
								<Field>
									<input className="input" type="text" />
									<div className="icon">
										<IconEnvelope className="mr-2" />
									</div>
								</Field>

								<Field>
									<input className="input" type="text" />
									<div className="icon">
										<IconEnvelope className="mr-2" />
									</div>
								</Field>

								<Field>
									<input className="input" type="text" />
									<div className="icon">
										<IconLock className="mr-2" />
									</div>
								</Field>

								<Button className="button--filled" type="submit">REGISTER</Button>
							</form>

							<div className="wrapper_nav">
								<Button onClick={showSignup} className="blaaaaaaa">
									LOGIN ->
								</Button>
							</div>

							{/* <h2>Sign in</h2>
							<form onSubmit={submit}>
								<div className="field-wrapper">
									<input type="text" name="username" placeholder="username" />
									<label>username</label>
								</div>
								<div className="field-wrapper">
									<input type="password" name="password" placeholder="password" autoComplete="new-password" />
									<label>password</label>
								</div>
								<div className="field-wrapper">
									<input type="submit" onClick={showThankYou} />
								</div>
								<span className="psw" onClick={showForgotPassword}>Forgot Password? </span>
								<span className="signup" onClick={showSignup}>Not a user? Sign up</span>
							</form> */}
						</div>
					</div>
					<div className="face face-back">
						<div className="content">
							{/* <h2>Forgot your password?</h2>
							<small>Enter your email so we can send you a reset link for your password</small>
							<form onSubmit={submit}>
								<div className="field-wrapper">
									<input type="text" name="email" placeholder="email" />
									<label>e-mail</label>
								</div>
								<div className="field-wrapper">
									<input type="submit" onClick={showThankYou} />
								</div>
							</form> */}

							3
						</div>
					</div>
					<div className="face face-right">
						<div className="content">
							{/* <h2>Sign up</h2>
							<form onSubmit={submit}>
								<div className="field-wrapper">
									<input type="text" name="email" placeholder="email" />
									<label>e-mail</label>
								</div>
								<div className="field-wrapper">
									<input type="password" name="password" placeholder="password" autoComplete="new-password" />
									<label>password</label>
								</div>
								<div className="field-wrapper">
									<input type="password" name="password2" placeholder="password" autoComplete="new-password" />
									<label>re-enter password</label>
								</div>
								<div className="field-wrapper">
									<input type="submit" onClick={showThankYou} />
								</div>
								<span className="singin" onClick={showLogin}>Already a user? Sign in</span>
							</form> */}

							2

							<div className="wrapper_nav wrapper_nav--left">
								<Button onClick={showLogin}>
									<span>&amp;<span>-</span></span> Register
								</Button>
							</div>
						</div>
					</div>
					<div className="face face-left">
						<div className="content">
							{/* <h2>Contact us</h2>
							<form onSubmit={submit}>
								<div className="field-wrapper">
									<input type="text" name="name" placeholder="name" />
									<label>Name</label>
								</div>
								<div className="field-wrapper">
									<input type="text" name="email" placeholder="email" />
									<label>e-mail</label>
								</div>
								<div className="field-wrapper">
									<textarea placeholder="your message"></textarea>
									<label>your message</label>
								</div>
								<div className="field-wrapper">
									<input type="submit" onClick={showThankYou} />
								</div>
							</form> */}

							4
						</div>
					</div>
					<div className="face face-bottom">
						bottom

						{/* <div className="content">
							<div className="thank-you-msg">
								Thank you!
                				</div>
						</div> */}
					</div>
				</div>
			</div>
		</div >
	);
}


