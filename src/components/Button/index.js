import './style.scss';

export default function Component({ children, className, onClick, type, id }) {
	return (
		<button className={`button ${className}`} onClick={onClick} type={type} id={id}>
			{children}
		</button>
	);
}
