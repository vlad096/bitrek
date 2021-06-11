$(document).ready(function() {

$('.mobile-wrap').on('click', function() {
   $('.line-burger').toggleClass('line-active');
   $('.main-header__list').slideToggle();
});

$(window).resize(function () {
    if ($(window).width() >= 560) {
        $('.main-header__list').attr('style', '');
        $('.line-burger').removeClass('line-active');
    };

});

 $(".tabs__box").click(function() {
    $(".tabs__box").removeClass("tabs__box--active").eq($(this).index()).addClass("tabs__box--active");
    var index = $(this).index();
    $(".tabs__item").hide().eq(index).fadeIn()
  }).eq(0).addClass("tabs__box--active");

(function() {
 	var goods__single = $('.goods__single');
 	var goods__gallery = $('.goods__gallery');

 	var overlay_gallery = $('.overlay-gallery');
  	var overlay_gallery_slider = $('.overlay-gallery .overlay-slider');
 	

 	// goods__gallery
    goods__gallery.slick({
    	slidesToShow: 11,
    	slidesToScroll: 1,
    	dots: false,
    	draggable: false,
    	prevArrow: '<button type="button" class="slick-prev"></button>',
    	nextArrow: '<button type="button" class="slick-next"></button>',
		focusOnSelect: true,
		responsive: [
		
		{
			breakpoint: 1180,
			settings: {
				slidesToShow: 6,
			}
		},
		{
			breakpoint: 960,
			settings: {
				slidesToShow: 5,
			}
		},
		{
			breakpoint: 560,
			settings: {
				slidesToShow: 3,
			}
		}
		]
	});

	  overlay_gallery_slider.slick({
    	slidesToShow: 1,
    	slidesToScroll: 1,
    	dots: false,
    	draggable: false,
    	prevArrow: '<button type="button" class="slick-prev"></button>',
    	nextArrow: '<button type="button" class="slick-next"></button>'
    });

	  goods__gallery.find('.goods__col').on('click', function() {
    	var img = $(this).find('.goods__box >img').attr('src');
    	goods__single.find('img').attr('src', img);

    	var id =  goods__gallery.slick("slickCurrentSlide");
    	overlay_gallery_slider.slick('slickGoTo', id, true);
    });


	 goods__single.on('click', function() {
    	overlay_gallery.addClass('overlay-active');
    });

    $('.overlay-close').click(function() {
    	var overlay = $(this).parents('.overlay');
    	overlay.removeClass('overlay-active');
    	 if(overlay.hasClass('overlay-gallery')) {
            setTimeout(function() {
               var id =  goods__gallery.slick("slickCurrentSlide");
    			overlay_gallery_slider.slick('slickGoTo', id, true);
            }, 500);
        }
    });

 })();


 function validate(input, length, regExp, error, phone) {

    $(input).on('blur keyup', function() {
      var value = $(this).val();
      var that = $(this);

      regExp = regExp == '' ? /./ : regExp;

      if (phone === true) {
        bool_reg = !regExp.test(value);
      } else {
        bool_reg = regExp.test(value);
      }

      if (value.length > length && value !== '' && bool_reg) {
        that.removeClass('form-fail').addClass('form-done');
        $(error).slideUp();
      } else {
        that.removeClass('form-done').addClass('form-fail');
        $(error).slideDown();
      }
    });

  }

  // деакцивация кнопки если есть поле с ошибкой

  function disBtn(input, btn) {
    var input = $(input);
    input.on('blur keyup', function() {

      if (input.hasClass('form-fail')) {
        $(btn).attr('disabled', 'disabled');
      } else {
        $(btn).removeAttr('disabled');
      }

    });

  }

  // для проверки при нажатии

  function valClick(input, length, regExp, error, btn, phone) {
    var value = $(input).val();

    regExp = regExp == '' ? /./ : regExp;

    if (phone === true) {
      bool_reg = regExp.test(value);
    } else {
      bool_reg = !regExp.test(value);
    }

    if (value.length < length && value === '' && bool_reg) {
      $(input).addClass('form-fail');
      $(error).slideDown();
    }
  }

  //  деакцивация кнопки при нажатии

  function disBtnClick(input, btn) {
    var input = $(input);

    if (input.hasClass('form-fail')) {
      $(btn).attr('disabled', 'disabled');
      return false;
    } else {
      return true;
    }

  }

  var regName = /^[a-zA-Zа-яА-ЯёЁ]+/;
  var regEmail = /[-.\w]+@[-.\w]+\.[-.\w]+/i;
  var regPhone = /[_]/i;

  // пример использования
  validate('#u_name', 1, regName, '.user__fail-name');
  validate('#u_email', 1, regEmail, '.user__fail-email');
  disBtn('#u_name, #u_email', '.user__btn');


  validate('#m_name', 1, regName, '.main-footer__fail-name');
  disBtn('#m_name', '.main-footer__btn');

});



 //stars
  function move(e, obj) {
      var summ = 0;
      var id = obj.next().attr('id').substr(1);
      var progress = e.pageX - obj.offset().left;

      var width = obj.width(),
      leftEdge = obj.offset().left,
      rightEdge = obj.offset().left + width;

      if (e.pageX < leftEdge) {
     progress = 0;
      } else if (e.pageX >= rightEdge) {
     progress = obj.width();
      }
  
      var rating = progress * 5 / width;
      rating = Math.max(Math.ceil(rating), 1);

      $('#param' + id).text(Math.ceil(rating).toFixed(1));

      obj.next().width(progress);
      $('.stars__count').each(function() {
        summ += parseFloat($(this).text());
      });
    };

    $('.stars__data').on('mouseleave', function(e) {
      var summ = 0;
      var id = $(this).next().attr('id').substr(1);

      var width = $(this).width(),
            reasonableWidth = width * 0.1,
            height = $(this).height(),
            leftEdge = $(this).offset().left,
            topEdge = $(this).offset().top,
            bottomEdge = topEdge + height,
            exitPointX = e.pageX,
            exitPointY = e.pageY;

      if ( ( exitPointY >= topEdge ) && ( exitPointY <= bottomEdge ) && ( exitPointX > (leftEdge + reasonableWidth) ) ) {
        $('#param' + id).text("5.0");
        $(this).next().width(width);
        $('.stars__count').each(function() {
          summ += parseFloat($(this).text());
        });
      }
    });

  $('.stars__data').click(function(e) {

    move(e, $(this));
    $(this).parents('.stars').addClass('stars--disabled');
    console.log($('.stars__count').text());
  });

  $('.stars__data').on('mousemove', function(e) {
      move(e, $(this));
  });

 $("#rating, #rating-overlay").on('mousemove', function(e) {
  let width = $(this).width();
  let left = $(this).offset().left;
  let goPercentage = (e.clientX - left)/width * 100;
goPercentage =  Math.max(Math.ceil(goPercentage/20)*20, 20);
 
  let startPercentage = 100 - goPercentage;

  function constrain(n, min, max) {
    return Math.max(Math.min(n, max), min);
  }

  if (goPercentage === 0){
    goPercentage = 20;
    constrain(+$('.stars__count').text(), 1, 5);

  }

  $("#go-rect, #ov-go-rect").attr('width', goPercentage+'%');
  
  $("#start-rect, #ov-start-rect").attr('x', goPercentage+'%');
  $("#start-rect, #ov-start-rect").attr('width', startPercentage+'%');
});

 $(document).on('DOMContentLoaded' , function loading(){
	$('.progress__item').each(function(i, element){
		element = $(element);
		var progress__bar = element.find('.progress__bar');
		textContentVal = element.find('.progress__value');
		progressValue = progress__bar.data('progress-value');


		progress__bar.width(`${progressValue}%`);
		textContentVal.text(`${progressValue} %`);

	})
})