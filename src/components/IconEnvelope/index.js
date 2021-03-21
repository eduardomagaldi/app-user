import './style.scss';
import tab from './tab.svg';
import tabBack from './tab-back.svg';

export default function Component({ children }) {
	return (
		<>
			<span className="envelope">
				<img className="tab tab--folded" src={tab} alt="" />
				{/* <img className="tab" src={tab} alt="" /> */}
				<img className="tab tab--back" src={tabBack} alt="" />

				{/* <div className="card card3">
					<div className="card__face card__face--front">

					</div>
					<div className="card__face card__face--back"></div>
				</div> */}

				{/* <div className="card active">
					<div className="card__face card__face--front"></div>
					<div className="card__face card__face--back"></div>
				</div>

				<div className="card active card2">
					<div className="card__face card__face--front"></div>
					<div className="card__face card__face--back"></div>
				</div> */}
				{/*

				<div id="f1_container">
					<div id="f1_card" class="shadow">
						<div class="front face">
							<img src="/images/Cirques.jpg" />
						</div>
						<div class="back face center">
							<p>This is nice for exposing more information about an image.</p>
							<p>Any content can go here.</p>
						</div>
					</div>
				</div> */}
			</span>
		</>
	);
}
