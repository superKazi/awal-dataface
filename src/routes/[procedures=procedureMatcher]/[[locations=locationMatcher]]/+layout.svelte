<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Footer from '$lib/components/Footer.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import type { LayoutProps } from './$types';
	import type { ChangeEventHandler } from 'svelte/elements';

	let { children, data }: LayoutProps = $props();
	let { locations } = $derived(data);

	let selectCallback: ChangeEventHandler<HTMLSelectElement> = (e): void => {
		goto(`/${page.params.procedures}/${e.currentTarget.value}`);
	};
</script>

<Nav selectionOptions={locations} {selectCallback} />
{@render children()}
<Footer />
