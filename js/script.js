// Модуль работы с меню (бургер) =======================================================================================================================================================================================================================
/*
Документация по работе в шаблоне: https://template.fls.guru/template-docs/menu-burger.html
Сниппет (HTML): menu
*/
function menuInit() {
	if (document.querySelector(".icon-menu")) {
		document.addEventListener("click", function (e) {
			document.documentElement.classList.toggle("menu-open");
		});
	};
}
function menuOpen() {
	bodyLock();
	document.documentElement.classList.add("menu-open");
}
function menuClose() {
	bodyUnlock();
	document.documentElement.classList.remove("menu-open");
}

menuInit();

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}
	setTimeout(() => {
		animOnScroll();
	}, 300);
}

function animNum(num, value, sign) {
	$(function () {
		var target_block = $(`.advantages__column:nth-child(${num})._anim-items`); // Ищем блок
		var blockStatus = true;
		$(window).scroll(function () {
			var scrollEvent = ($(window).scrollTop() > (target_block.position().top - $(window).height()));
			if (scrollEvent && blockStatus) {
				blockStatus = false;
				$({ numberValue: 0 }).animate({ numberValue: value }, {
					duration: 2000, // Скорость анимации, где 500 - 0.5 одной секунды, то есть 500 миллисекунд 
					easing: "linear",
					step: function (val) {
						$(`.advantages__column:nth-child(${num})._anim-items .advantages__value`).html(Math.ceil(val) + ` ${sign}`); // Блок, где необходимо сделать анимацию 
					}
				});
			}
		});
		var scrollEvent = ($(window).scrollTop() > (target_block.position().top - $(window).height()));
		if (scrollEvent && blockStatus) {
			blockStatus = false;
			$({ numberValue: 0 }).animate({ numberValue: value }, {
				duration: 2000, // Скорость анимации, где 500 - 0.5 одной секунды, то есть 500 миллисекунд 
				easing: "linear",
				step: function (val) {
					$(`.advantages__column:nth-child(${num})._anim-items .advantages__value`).html(Math.ceil(val) + ` ${sign}`); // Блок, где необходимо сделать анимацию 
				}
			});
		}
	});
}

animNum(1, 972, "+");
animNum(2, 181, "+");
animNum(3, 98, "%");
animNum(4, 746, "+");

var sections = $('.page').children()
	, nav = $('nav')
	, nav_height = nav.outerHeight();

console.log(sections);

$(window).on('scroll', function () {
	var cur_pos = $(this).scrollTop();

	sections.each(function () {
		var top = $(this).offset().top - nav_height,
			bottom = top + $(this).outerHeight();

		if (cur_pos >= top && cur_pos <= bottom) {
			nav.find('a').removeClass('active');
			sections.removeClass('active');

			$(this).addClass('active');
			nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
		}
	});
});

nav.find('a').on('click', function () {
	var $el = $(this)
		, id = $el.attr('href');

	$('html, body').animate({
		scrollTop: $(id).offset().top
	}, 500);

	return false;
});
