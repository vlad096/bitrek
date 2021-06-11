$(document).ready(function() {

  $('.mobile-wrap').on('click', function() {
    $('.line-burger').toggleClass('line-active');
    $('.main-header__list').slideToggle();
  });

  $(window).resize(function() {
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

      var id = goods__gallery.slick("slickCurrentSlide");
      overlay_gallery_slider.slick('slickGoTo', id, true);
    });


    goods__single.on('click', function() {
      overlay_gallery.addClass('overlay-active');
    });

    $('.overlay-close').click(function() {
      var overlay = $(this).parents('.overlay');
      overlay.removeClass('overlay-active');
      if (overlay.hasClass('overlay-gallery')) {
        setTimeout(function() {
          var id = goods__gallery.slick("slickCurrentSlide");
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


  validate('#c_name', 1, regName, '.call__fail-name');
  validate('#c_email', 1, regEmail, '.call__fail-email');
  validate('#c_address', 1, regName, '.call__fail-address');
  validate('#c_type', 1, regName, '.call__fail-type');
  disBtn('#c_name, #c_email, #c_address, #c_type', '.call__btn');




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

    if ((exitPointY >= topEdge) && (exitPointY <= bottomEdge) && (exitPointX > (leftEdge + reasonableWidth))) {
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

  $("#rating").on('mousemove', function(e) {
    let width = $(this).width();
    let left = $(this).offset().left;
    let goPercentage = (e.clientX - left) / width * 100;
    goPercentage = Math.max(Math.ceil(goPercentage / 20) * 20, 20);

    let startPercentage = 100 - goPercentage;

    function constrain(n, min, max) {
      return Math.max(Math.min(n, max), min);
    }

    if (goPercentage === 0) {
      goPercentage = 20;
      constrain(+$('.stars__count').text(), 1, 5);

    }

    $("#go-rect, #ov-go-rect").attr('width', goPercentage + '%');

    $("#start-rect, #ov-start-rect").attr('x', goPercentage + '%');
    $("#start-rect, #ov-start-rect").attr('width', startPercentage + '%');
  });

  $('.basket__input').on('change, input', function() {
    $(this).val(
      $(this).val().replace(/^0|\D/, '') || 1
    );
  })

  $('.basket__input').on('focus', function() {
    $(this).data("before", $(this).val())
  })

  $('input[data-together-input]').on('change, input', function() {
  $('input[data-together-input]').val($(this).val());
})


  $('.basket__input').on('blur', function() {
    let v = /\d+/.exec($(this).val())
    if (!v || !parseInt(v)) v = $(this).data("before")
    $(this).val(v)
    $(this).trigger('input')
  })

  function InitProduct() {

    //basket

    $('.basket__item').each(function(i, e) {
      e = $(e);

      let quantity = e.find('.basket__input');

      var recount = new RecountProduct({
        summ: e.find('.basket__single span'),
        quantity: quantity,
        price: e.find('.basket__input').attr('data-price'),
        fun: updateTotalSumm,
        decimalSeparator: ','
      })

      quantity.on('input', function() {
        recount.updateSumm()
      })

      e.find('.basket__arrow--decrement').click(function() {
        recount.update('minus')
      });

      e.find('.basket__increment').click(function() {
        recount.update('plus')
      });

      e.find('.basket__close').click(function() {
        e.remove();
        recount.updateSumm()
      });

      recount.updateSumm(false)
    });

    updateTotalSumm()
  }



  // summ - jq узел общей стоимости продуктов
  // quantity - jq узел количества продукта
  // price - стоимости продукта
  // after - строка, которая прибавится к общей стоимости
  // fun - функция, которая вызывается после пересчета стоимости

  function RecountProduct(param) {
    this.summ = param.summ;
    this.quantity = param.quantity;
    this.price = parseFloat(param.price);
    this.after = param.after || "";
    this.fun = param.fun;
    this.decimalSeparator = param.decimalSeparator;

    // обновления количества товара
    // action - флаг: 'plus' || 'minus'

    this.update = function(action) {
      var value = this.getQuantity();
      var together = this.quantity.data('together-input');
      console.log(together);

      if (action == 'plus') {
        value += 1;
      } else if (action == 'minus' && value != 1) {
        value -= 1;
      }

      if(together!==undefined) {
        $('[data-together-input="'  + together + '"]').val(value).trigger('input');
      }

      this.quantity.val(value);
      this.updateSumm()
    }

    // обновление общей стоимости товара
    // если total == true будет запущен пересчёт общей суммы

    this.updateSumm = function(total = true) {
      var num = (this.getQuantity() * this.price).toFixed(2)
      if (this.decimalSeparator) num = num.replace('.', this.decimalSeparator)
      num = this.format(num)

      this.summ.text(num);
      if (total && typeof this.fun === "function") this.fun()
    }

    // возвращает количество товара

    this.getQuantity = function() {
      return parseInt(this.quantity.val()) || 0
    }

    this.format = function(v) {
      return String(v).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
    }
  }


  // Пересчёт общей суммы

  function updateTotalSumm() {
    var val = 0;

    $('.basket__single span').each(function(i, e) {
      val += parseFloat($(e).text().replace(/ /g, "").replace(',', ".") || 0);
    })

    val = val.toFixed(2).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
    $('.basket__sum span').text(val.replace('.', ","));
  }


  InitProduct();



});

$(document).on('DOMContentLoaded', function loading() {
  $('.progress__item').each(function() {
    const $this = $(this);
    const $progressBar = $this.find('.progress__bar');
    const $value = $this.find('.progress__value');
    const value = $progressBar.data('progress-value');

    $progressBar.width(`${value}%`);

    $({
      value: 0
    }).animate({
      value,
    }, {
      duration: 1000,
      step: function load_animate(val) {
        $value.text(`${val.toFixed(1)} %`);
      },
    });
  });
});