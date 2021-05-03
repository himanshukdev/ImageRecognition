import { h } from 'preact';
import style from './style.css';

const Header = () => (
	<header class={style.header}>
		<h1>Collect Coordinates from Images</h1>
		<nav>
		<a class={style.active} href="assets/images/sample.png" download="sample" >Download sample image</a>
		</nav>
	</header>
);

export default Header;
