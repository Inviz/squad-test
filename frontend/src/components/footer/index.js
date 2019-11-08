import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Footer = () => (
	<footer class={style.footer}>
		<a href="#">
			<img src="/assets/sample/squad/icon-3-x.png"
			     srcset="/assets/sample/squad/icon-3-x@2x.png 2x,
			             /assets/sample/squad/icon-3-x@3x.png 3x"
			    class={style.avatar} />
		</a>
		<p class={style.text}>Squad works best in our iPhone app</p>
		<a href="#" class={style.get_app_button}>Get</a>
	</footer>
);

export default Footer;
