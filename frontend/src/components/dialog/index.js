import { h } from 'preact';
import style from './style.css';

const Dialog = ({children, isOpen = true}) => (
	<div class={style.wrapper} open={isOpen ? 'open' : undefined}>
		<div class={style.background}></div>
		<dialog open class={style.outer}>
			<div class={style.inner}>
				{children}
			</div>
		</dialog>
	</div>
);

export default Dialog;
