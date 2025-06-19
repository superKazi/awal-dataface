<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { SplitText } from 'gsap/SplitText';
	import type { Attachment } from 'svelte/attachments';

	gsap.registerPlugin(ScrollTrigger, SplitText);

	let animation: Attachment<HTMLParagraphElement> = (element) => {
		// function wrapWordsInSpan(element: HTMLElement): void {
		// 	let text = element.textContent;
		// 	if (text) {
		// 		element.innerHTML = text
		// 			.split(' ')
		// 			.map((word) => `<span class="word">${word}</span>`)
		// 			.join(' ');
		// 	}
		// }

		// wrapWordsInSpan(element);

		// let words: NodeListOf<HTMLSpanElement> = element.querySelectorAll('.word');
		// // We will have an array of lines that contain an array of words
		// let lines: HTMLSpanElement[][] = [[]];
		// let lineIndex = 0;

		// for (let i = 0; i < words.length; i++) {
		// 	const word = words[i];
		// 	// Distance of the top outer border of the word to to the top edge of its parent
		// 	const offsetTop = word.offsetTop;

		// 	// If distance is different from previous word we start a new line
		// 	if (i > 0 && offsetTop !== words[i - 1].offsetTop) {
		// 		// We start a new line
		// 		lines.push([]);
		// 		lineIndex++;
		// 	}

		// 	lines[lineIndex].push(word);
		// }

		// let masterTl = gsap.timeline({
		// 	scrollTrigger: {
		// 		trigger: element,
		// 		pin: true,
		// 		start: 'clamp(top top)',
		// 		end: () => `clamp(${window.innerHeight * 3}px)`,
		// 		scrub: 1
		// 	}
		// });

		// lines.forEach((lineWords, index) => {
		// 	let tween = gsap.to(lineWords, {
		// 		autoAlpha: 1,
		// 		x: 0,
		// 		stagger: 0.1,
		// 		ease: 'power1.inOut'
		// 	});
		// 	masterTl.add(tween, gsap.utils.random(index * 0.05, index * 0.15));
		// });

		// SPLIT TEXT VERSION

		let split = SplitText.create(element, {
			type: 'words, lines',
			wordsClass: 'word',
			autoSplit: true,
			onSplit: (self) => {
				let masterTl = gsap.timeline({
					scrollTrigger: {
						trigger: element,
						pin: true,
						start: 'clamp(top top)',
						end: () => `clamp(${window.innerHeight * 3}px)`,
						scrub: 1
					}
				});
				self.lines.forEach((line, index) => {
					let lineWords = [...line.querySelectorAll('.word')];
					let tween = gsap.to(lineWords, {
						autoAlpha: 1,
						x: 0,
						stagger: 0.1,
						ease: 'power1.inOut'
					});
					masterTl.add(tween, gsap.utils.random(index * 0.05, index * 0.15));
				});
				console.log(self);
				return masterTl;
			}
		});

		return () => {
			// masterTl.revert();
			split.revert();
		};
	};
</script>

<main>
	<p class="scroll">Scroll</p>
	<p {@attach animation} class="paragraph">
		David Hockney (1937) is a British artist renowned for his vibrant use of color and innovative
		exploration of perspective. He is best known for his paintings of California swimming pools
		which capture light and atmosphere with striking simplicity.
	</p>
</main>

<style>
	main {
		background: #121212;
		color: #f1f1f1;
		font-family: Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif;
		font-weight: normal;
		min-block-size: 100vh;
	}

	.scroll {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		inline-size: max-content;
		position: fixed;
		mix-blend-mode: difference;
		left: 50%;
		top: 1rem;
		transform: translateX(-50%);
	}

	.paragraph {
		font-size: clamp(2.4883rem, 2.0922rem + 1.9804vw, 5.2609rem);
		line-height: 0.9;
		inline-size: min(100%, 1200px);
		letter-spacing: -0.03em;
		padding-block-start: 20vh;
		padding-inline: 1rem;
		text-wrap: intial;
	}

	.paragraph :global(.word) {
		opacity: 0;
		display: inline-block;
		transform: translate(100vw, 0);
	}
</style>
