<footer>
	<div class="footer-content">
		<div class="title-container">
			<span class="title serif">Medical Costs</span>
			<span class="description">
				Copyright ©2025. All rights reserved. Website for personal, non-commercial use only.
			</span>
		</div>
		<div class="furniture-container">
			<span>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam malesuada ac nunc vel auctor.
				Integer convallis tristique laoreet. Sed purus leo, feugiat sit amet dui luctus, congue
				feugiat tortor. Aliquam tempus vitae arcu nec dictum.
			</span>
			<div>
				<a href="#">Email us</a><a href="#">Privacy Policy</a><a href="#">Terms & Conditions</a>
			</div>
		</div>
	</div>
</footer>

<style>
	footer {
		block-size: 220px;
		padding: 1rem;
		color: var(--main-text-color);
		margin-block-start: 4rem;
	}

	.footer-content {
		inline-size: min(100%, 1350px);
		margin-inline: auto;
		padding-block-start: 60px;
		border-block-start: 1px solid var(--border-color);
		display: grid;
		gap: 1rem;
		grid-template-columns: 25fr 75fr;
	}

	.title-container span {
		display: block;
	}

	.title {
		font-size: 1.125rem;
	}

	.description {
		font-size: 0.75rem;
		max-width: 35ch;
		color: var(--accent-text-color);
	}

	.furniture-container div {
		display: flex;
		gap: 1rem;
		margin-block-start: 0.5rem;
	}

	a {
		text-decoration: none;
		color: var(--main-text-color);
	}
</style>
