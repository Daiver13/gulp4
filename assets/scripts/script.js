$(document).ready(function(){
  $('.main__slider-list').slick({
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    arrows: false,
  });

  $('.main__our-projects-titles a').click(function(e) {
    e.preventDefault();
    var tab = $(this).attr('data-value'),
        li = $(".main__our-projects-list [data-value=" + tab + "]");

    $('.main__our-projects-titles a').removeClass('active');
    $(this).addClass('active');

    if(li) {
      $('.main__our-projects-item').removeClass('active')
      li.addClass('active')
    };
  });

  function slideDown(_this, targetClass) {
    if (!_this.hasClass('active')) {
      _this.addClass('active');
      $(targetClass).slideDown("slow", "linear");
    } else {
      _this.removeClass('active');
      $(targetClass).slideUp("slow", "linear");
    }
  }

  $('#capital-button').click(function(e) {
    e.preventDefault();

    slideDown($(this), '.main__capital-content_slide_down');
  });

  $('#questionary_apply').click(function(e){
    e.preventDefault();
    slideDown($(this), '.main__questionary-form');
  });

  // validate signup form on keyup and submit
  $(".form_questionary").validate({
    rules: {
      first_name: "required",
      last_name: "required",
      phone_number: "required",
      physical_address: "required",
      mailing_address: "required",
      email_address: {
        required: true,
        email: true
      },
    },
  });

  $(".form_signup").validate({
    rules: {
      signup_email: {
        required: true,
        email: true
      },
    },
    submitHandler: function (form) {
      console.log('submit form');
      // $.ajax({
      //   type: "POST",
      //   url: "form_handler.php",
      //   data: $(this).serialize(),
      //   success: function() {
      //     console.log('success')
      //   }
      // })
      // $.ajax({
      //   type: "POST",
      //   url: "formfiles/submit.php",
      //   data: $(form).serialize(),
      //   success: function () {
      //     $(form).html("<div id='message'></div>");
      //     $('#message').html("<h2>Your request is on the way!</h2>")
      //       .append("<p>someone</p>")
      //       .hide()
      //       .fadeIn(1500, function () {
      //         $('#message').append("<img id='checkmark' src='images/ok.png' />");
      //       });
      //   }
      // });
      return false; // required to block normal submit since you used ajax
    }
  });


  // moveto
  function moveto(elementId, duration) {
    const moveTo = new MoveTo({
      tolerance: 25,
      duration: duration,
      easing: 'easeOutQuart'
    });
    const target = document.getElementById(elementId);

    return moveTo.move(target);
  };

  function clickTrigger(clas, elementId, duration) {
    var duration = duration ? duration : 1000;
    $(clas).click(function(e){
      e.preventDefault();
      moveto(elementId, duration);
    });
  };

  clickTrigger('.nav-about-us', 'about-us');
  clickTrigger('.nav-portfolio', 'portfolio', 2000);
  clickTrigger('.nav-our-projects', 'our-projects', 2000);
  clickTrigger('.nav-roboadivsor', 'roboadivsor', 2000);
  clickTrigger('.nav-partners', 'partners', 2000);
  clickTrigger('.nav-questionary', 'questionary', 2000);

  // Mobile menu
  (function() {
    var animationIn = 'animated fadeInUp';
    var animationOut = 'animated fadeOutUp';
    var transitionend = 'transitionend webkitTransitionEnd oTransitionEnd';

    $(".mobile-button").on('click', function() {
      $(this).toggleClass('open');

      if($('.mobile-menu').hasClass("mobile-menu--open")) {
        $('.mobile-menu__link').removeClass('mobile-menu__link--anim').addClass('mobile-menu__link--reverse');

        setTimeout( function() {
          $('.mobile-menu').removeClass("mobile-menu--open");
          $('.mobile-menu__list').addClass('mobile-menu__list--hidden');
          $('.mobile-menu__link').removeClass('mobile-menu__link--reverse');
          $('.mobile-button').removeClass("mobile-button--active");
        }, 600);

      } else {
        $('.mobile-menu__list').removeClass('mobile-menu__list--hidden');
        $('.mobile-button').addClass("mobile-button--active");

        $('.mobile-menu').addClass("mobile-menu--open").one(transitionend, function() {
          $('.mobile-menu__link').addClass('mobile-menu__link--anim');
        });
      };
    });

    $(".mobile-menu__link").on("click", function() {
      $(".mobile-button").removeClass("open");
      $('.mobile-menu__link').removeClass('mobile-menu__link--anim').addClass('mobile-menu__link--reverse');

      setTimeout( function() {
        $('.mobile-menu').removeClass("mobile-menu--open");
        $('.mobile-menu__list').addClass('mobile-menu__list--hidden');
        $('.mobile-menu__link').removeClass('mobile-menu__link--reverse');
        $('.mobile-button').removeClass("mobile-button--active");
      }, 600);
    });
  })();
});