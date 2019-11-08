import { h } from 'preact';
import style from './style';
import Dialog from '../../components/dialog';

const Home = () => (
	<Dialog>
		<header>
			<h2>Welcome!</h2>
			Squad app by Yaroslaff Fedin
		</header>
		<form action="/invite/secretId">
			<p>This implements a single endpoint in form of <strong>/invite/:secretId</strong> </p>
			<button>Proceed to endpoint</button>
		</form>
	</Dialog>
);

export default Home;
