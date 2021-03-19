import './style.css';

function Component({ children }) {
	return (
		<div className="box">
			{children}
		</div>
	);
}

export default Component;
