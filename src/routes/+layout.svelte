<script lang="ts">
	import type { LayoutProps } from './$types';
	import './reset.css'; // https://www.joshwcomeau.com/css/custom-css-reset/

	let { children }: LayoutProps = $props();
</script>

{@render children()}
