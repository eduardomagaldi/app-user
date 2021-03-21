import './style.scss';

export default function Component({ children, className, onClick, type }) {
	return (
		<button className={`button ${className}`} onClick={onClick} type={type}>
			{children}
		</button>
	);
}
