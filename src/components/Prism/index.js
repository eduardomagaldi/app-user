import './style.scss';
import ImgGoogleSpring from '../ImgGoogleSpring';
import Button from '../Button';
import FormCreate from '../FormCreate';
import FormLogin from '../FormLogin';
import fetch from '../../helpers/fetch';

import React, { useState } from 'react';

export default function Component() {
	const [user, setUser] = useState({});

	return (
		<div className="app">
			<ul className="nav">
				<li><button onClick={showLogin}>Register (1)</button></li>
				<li><button id="nav_login" onClick={showSignup}>Login (2)</button></li>
				<li><button onClick={showForgotPassword}> (3)</button></li>
				<li><button onClick={showContactUs}>(4)</button></li>
				<li><button onClick={showSubscribe}>Happy Spring (Top)</button></li>
				<li><button onClick={showThankYou}>(Bottom)</button></li>
			</ul>

			<div className="wrapper">
				<div className="rec-prism">
					<div className="face face-top">
						<div className="content text--center">
							<ImgGoogleSpring />

							<h2>Happy Spring!!!</h2>
							<h2>Fröhlichen Frühling!!!</h2>
						</div>
					</div>
					<div className="face face-front">
						<div className="content">
							<h1>Create an Account</h1>
							<FormCreate onSuccess={onSuccess} />

							<div className="wrapper_nav">
								<Button onClick={showSignup} className="button--nav">
									LOGIN
								</Button>
							</div>
						</div>
					</div>
					<div className="face face-back">
						<div className="content">
							<h1 id="message_welcome">Welcome {user && user.fullname}!</h1>
							<p>To logout click <button id="logout" onClick={logout}>here</button>.</p>
						</div>
					</div>
					<div className="face face-right">
						<div className="content">
							<h1>Login</h1>
							<FormLogin onSuccess={onSuccess} />

							<div className="wrapper_nav wrapper_nav--left">
								<Button className="button--block" onClick={showLogin}>
									REGISTER
								</Button>
							</div>
						</div>
					</div>

					<div className="face face-left">
						<div className="content">
							<iframe
								width="270"
								src="https://www.youtube.com/embed/hFZFjoX2cGg"
								title="YouTube video player"
								frameBorder="0"
								allow="accelerometer;
									autoplay;
								clipboard-write;
								encrypted-media;
								gyroscope;
								picture-in-picture"
								allowFullScreen></iframe>
						</div>
					</div>

					<div
						className="face face-bottom">
						<div className="content">
							<div className="thank-you-msg">
								<p>Thank you! You've logged out successfuly. Have a nice day! :-)</p>

								<a rel="noopener" targe="_blank" href="https://codepen.io/nourabusoud/pen/BxJbjJ">Inspiration</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div >
	);

	async function logout() {
		const data = await fetch.delete('/api/v1/session', user);

		if (data && !data.error) {
			setUser(null);
			showThankYou();
		}
	}

	function onSuccess(user) {
		setUser(user);
		showForgotPassword();
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
}
