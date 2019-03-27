

$(document).ready(function () {

  var menu =   document.getElementsByClassName("nav__list");
  var burger =  document.getElementsByClassName("burger");
  var doc = $(document);
  var l = $('.scrolly');
  var panel = $('.panel');
  var vh = $(window).height();

  var openMenu = function() {

    burger[0].classList.toggle('burger--active');
    menu[0].classList.toggle('nav__list--active');
  };

// reveal content of first panel by default
  panel.eq(0).find('.panel__content').addClass('panel__content--active');

  var scrollFx = function() {
    var ds = doc.scrollTop();
    var of = vh / 4;

    // if the panel is in the viewport, reveal the content, if not, hide it.
    for (var i = 0; i < panel.length; i++) {
      if (panel.eq(i).offset().top < ds+of) {
        panel
          .eq(i)
          .find('.panel__content')
          .addClass('panel__content--active');
      } else {
        panel
          .eq(i)
          .find('.panel__content')
          .removeClass('panel__content--active')
      }
    }
  };

  var scrolly = function(e) {
    e.preventDefault();
    var target = this.hash;
    var $target = $(target);

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 300, 'swing', function () {
      window.location.hash = target;
    });
  }
  burger[0].addEventListener('click', openMenu, false);
  window.addEventListener('scroll', scrollFx, false);
  window.addEventListener('load', scrollFx, false);
  $('a[href^="#"]').on('click',scrolly);

});

