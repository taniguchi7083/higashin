/* ハンバーガーボタン */
/* ------------------------------------------------------------- */
const menuHam = document.querySelector('#js_ham');
const menuNav = document.querySelector('#js_nav');
const menuLogo = document.querySelector('#js_logo');
const menuBody = document.querySelector('#js_body');

menuHam.addEventListener('click', () => {
	menuHam.classList.toggle('is_active');
	menuNav.classList.toggle('is_active');
	menuLogo.classList.toggle('is_active');
	menuBody.classList.toggle('is_active');
});

/* アコーディオンパーツ */
/* ------------------------------------------------------------- */
"use strict";
// アコーディオンパーツ全体と、開閉ボタンとなる部分のDOMを変数に格納。
const accordionItems = document.getElementsByClassName("bl_footerNav_item");
const accordionBtns = document.getElementsByClassName("bl_footerNav_ttl");

// HTMLCollectionを配列に変換
const accordionItemsArray = Array.from(accordionItems);
const accordionBtnsArray = Array.from(accordionBtns);

// 開閉ボタンがクリックされたときの処理。
// 開閉ボタンの数だけ処理できるようforEach文を回す。
accordionBtnsArray.forEach((btn, index) => {
	btn.addEventListener("click", function () {
		accordionItemsArray[index].classList.toggle("is_active");
	});
});


/* ヘッダーアニメーション スイッチ */
/* ------------------------------------------------------------- */
window.addEventListener("scroll", () => {
	const header = document.querySelector("header");
	header.classList.toggle("is_header", window.scrollY > 1);
});


/* テキストアニメーション */
/* ------------------------------------------------------------- */
// 監視対象が選択範囲内に入ったら実行する動作
const animateFade = (entries, obs) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.animate(
				{
					opacity: [0, 1],
					translate: ['0 56rem', 0],
				},
				{
					duration: 1000,
					easing: 'ease',
					fill: 'forwards',
				}
			);
			obs.unobserve(entry.target);
		}
	});
};

// 監視設定
const fadeObserver = new IntersectionObserver(animateFade);

// js_fadeinを監視するよう指示
const fadeElements = document.querySelectorAll('.js_fadein');
fadeElements.forEach((fadeElement) => {
	fadeObserver.observe(fadeElement);
});


/* ローディングから画面遷移 */
/* ------------------------------------------------------------- */
// const loadingAreaGrey = document.querySelector('#bl_loading');
// const loadingAreaGreen = document.querySelector('#bl_loading_screen');
// const loadingText = document.querySelector('#bl_loading p');

// window.addEventListener('load', () => {
// 	// ローディング中（グレースクリーン）
// 	loadingAreaGrey.animate(
// 		{
// 			opacity: [1, 0],
// 			visibility: 'hidden',
// 		},
// 		{
// 			duration: 2000,
// 			delay: 1200,
// 			easing: 'ease',
// 			fill: 'forwards',
// 		}
// 	);

// 	const keyframes = {
// 		opacity: [1, 0],
// 		visibility: 'hidden',
// 	};
// 	const options = {
// 		duration: 2000,
// 		delay: 1200,
// 		easing: 'ease',
// 		fill: 'forwards',
// 	};

// 	loadingAreaGrey.animate(keyframes, options);

// 	// ローディング中（薄緑スクリーン）
// 	loadingAreaGreen.animate(
// 		{
// 			translate: ['0 100vh', '0 0', '0 -100vh']
// 		},
// 		{
// 			duration: 2000,
// 			delay: 800,
// 			easing: 'ease',
// 			fill: 'forwards',
// 		}
// 	);

// 	// ローディング中テキスト
// 	loadingText.animate(
// 		[
// 			{
// 				opacity: 1,
// 				offset: .8  //80%
// 			},
// 			{
// 				opacity: 0,
// 				offset: 1  //100%
// 			},
// 		],
// 		{
// 			duration: 1200,
// 			easing: 'ease',
// 			fill: 'forwards',
// 		}
// 	);
// });
const loadingArea = document.querySelector('#bl_loading');

window.addEventListener('load', () => {
	// ローディング終了後のフェードアウトアニメーション
	loadingArea.animate(
		{
			opacity: [1, 0] // 透明度を1から0に変更
		},
		{
			duration: 2000, // 2秒間でアニメーション
			easing: 'ease', // イージングカーブを使用
			fill: 'forwards' // アニメーション終了後にスタイルを保持
		}
	).onfinish = () => {
		loadingArea.style.visibility = 'hidden'; // アニメーション終了後に非表示にする
	};
});


/* スムーズスクロール */
/* ------------------------------------------------------------- */
const easeInOutQuad = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

const smoothScrollTo = (element, headerHeight = 0, duration = 600) => {
	const start = window.scrollY;
	const target = element.offsetTop - headerHeight;
	const startTime = performance.now();

	const animateScroll = currentTime => {
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / duration, 1);
		window.scrollTo(0, (target - start) * easeInOutQuad(progress) + start);
		if (progress < 1) requestAnimationFrame(animateScroll);
	};
	requestAnimationFrame(animateScroll);
};

const linkButton = (btnId, sectId) => {
	const button = document.getElementById(btnId);
	const section = document.getElementById(sectId);
	const header = document.querySelector('header');
	const headerHeight = header ? header.offsetHeight : 0;

	if (button && section) {
		button.addEventListener('click', event => {
			event.preventDefault();
			smoothScrollTo(section, headerHeight);
		});
	}
};

document.addEventListener('DOMContentLoaded', () => {
	linkButton('scrollTop', 'scrollTop_sect');
});

// URLからハッシュを取得
document.addEventListener('DOMContentLoaded', () => {
	const header = document.querySelector('header');
	const headerHeight = header ? header.offsetHeight : 0;

	const hash = window.location.hash;
	if (hash) {
		const targetElement = document.querySelector(hash);
		if (targetElement) {
			smoothScrollTo(targetElement, headerHeight, 600);
		}
	}
});


/* おためし */
/* ------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
	const imgWrap = document.querySelector('.img-wrap');

	imgWrap.addEventListener('animationend', (event) => {
		// アニメーションの実際の終了を確認
		if (event.animationName === 'img-wrap') {
			imgWrap.style.position = 'static';
		}
	});
});

// document.addEventListener("DOMContentLoaded", () => {
// 	const imgWrap = document.querySelector('.img-wrap');

// 	// 秒数を指定（例えば3秒後に発火）
// 	const delaySeconds = 3;

// 	setTimeout(() => {
// 			imgWrap.style.position = 'static';
// 	}, delaySeconds * 1000); // ミリ秒に変換
// });


/* swiper */
/* ------------------------------------------------------------- */
const swiper = new Swiper(".swiper", {
	loop: true,
	simulateTouch: false,
	effect: 'fade', // フェード効果を追加
	fadeEffect: {
		crossFade: true // スムーズなフェードを確保
	},
	speed: 800, // トランジションの速度を調整
	// ページネーション
	pagination: {
		el: ".swiper-pagination",
		type: "fraction", // 枚数表示
		renderFraction: function (currentClass, totalClass) {
			return '<span class="' + currentClass + '"></span><span class="' + totalClass + '"></span>';
		}
	},
	// 前後の矢印
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
});


/* gsap */
/* ------------------------------------------------------------- */
var repeatAnime = gsap.timeline({
	repeat: -1,
});
repeatAnime.to('.bl_anime_floating__right , .bl_anime_floating__left',
	{
		keyframes: [
			{ duration: 2, x: 100, y: 100, ease: 'power4.Out' },
			{ duration: 2, x: 0, y: 0, ease: 'power4.Out' },
			{ duration: 2, x: -100, y: 100, ease: 'power4.Out' },
			{ duration: 2, x: -100, y: 0, ease: 'power4.Out' },
			{ duration: 2, x: 0, y: 100, ease: 'power4.Out' },
			{ duration: 2, x: 100, y: 0, ease: 'power4.Out' },
			{ duration: 2, x: 100, y: 100, ease: 'power4.Out' },
			{ duration: 2, x: 0, y: 0, ease: 'power4.Out' },
			{ duration: 2, x: -100, y: 100, ease: 'power4.Out' },
			{ duration: 2, x: 0, y: 0, ease: 'power4.Out' }
		]
	}
);


/* テキストアニメーション */
/* ------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
	const textContainer = document.querySelector('.js_MVanime');
	// Simulating the addition of the .js_fadein class for demo purposes
	setTimeout(() => {
		textContainer.classList.add('.js_MVanime');
	}, 1000);
});




// const startAnime = document.querySelector('.bl_startAnime');

// window.addEventListener('load', () => {
// 	// アニメーションの追加
// 	startAnime.style.transition = 'opacity 1s ease 3s';
// 	startAnime.style.opacity = '0';

// 	// アニメーション終了後に操作不能にする
// 	setTimeout(() => {
// 		startAnime.style.pointerEvents = 'none';
// 		startAnime.style.visibility = 'hidden';
// 	}, 4000); // 4秒後に実行 (3秒の遅延 + 1秒のフェードアウト)
// });
