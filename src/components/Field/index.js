import './style.scss';

export default function Component({ children }) {
	return (
		<div className="field">
			{children}
		</div>
	);
}
