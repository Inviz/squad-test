import { h } from 'preact';
import style from './style.css';

const Participant = ({children, data, ...props}) => (
	<div class={`participant ${style.participant}`} {...props}>
		<video autoPlay="autoplay" loop muted="muted" playsInline="playsinline" playsinline="playsinline" srcObject={data.srcObject}>
			{data.src && <source src={data.src} type="video/mp4" />}
		</video>
		{children}
	</div>
);

export default Participant;
