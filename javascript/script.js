if (document.querySelectorAll(".carousel").length > 0) {
    let carousels = document.querySelectorAll(".carousel");
    carousels.forEach(carousel => newCarousel(carousel));
  
    function newCarousel(carousel) {
      let carouselChildren = document.querySelector(
        `.carousel[data-carousel="${carousel.dataset.carousel}"]`
      ).children;
      let speed = carousel.dataset.speed;
      let carouselContent = document.querySelectorAll(`.carousel-content`)[
        carousel.dataset.carousel - 1
      ];
      const carouselLength = carouselContent.children.length;
      let width = window.innerWidth;
      let count = width;
      let counterIncrement = width;
      let int = setInterval(timer, speed);
  
      // initial transform
      carouselContent.style.transform = `translateX(-${width}px)`;
  
      function timer() {
        if (count >= (counterIncrement - 2) * (carouselLength - 2)) {
          count = 0;
          carouselContent.style.transform = `translateX(-${count}px)`;
        }
        count = count + counterIncrement;
        carouselContent.style.transform = `translateX(-${count}px)`;
      }
  
      function carouselClick() {
        // left click
        carouselChildren[0].addEventListener("click", function() {
          count = count - width;
          carouselContent.style.transform = `translateX(-${count - 100}px)`;
          if (count < counterIncrement) {
            count = counterIncrement * (carouselLength - 2);
            carouselContent.style.transform = `translateX(-${count - 100}px)`;
          }
        });
        // right click
        carouselChildren[1].addEventListener("click", function() {
          count = count + width;
          carouselContent.style.transform = `translateX(-${count + 100}px)`;
          if (count >= counterIncrement * (carouselLength - 1)) {
            count = counterIncrement;
            carouselContent.style.transform = `translateX(-${count + 100}px)`;
          }
        });
      }
  
      function carouselHoverEffect() {
        // left hover effect events
        carouselChildren[0].addEventListener("mouseenter", function() {
          carouselContent.style.transform = `translateX(-${count - 100}px)`;
          clearInterval(int);
        });
        carouselChildren[0].addEventListener("mouseleave", function() {
          carouselContent.style.transform = `translateX(-${count}px)`;
          int = setInterval(timer, speed);
        });
  
        // right hover effect events
        carouselChildren[1].addEventListener("mouseenter", function() {
          carouselContent.style.transform = `translateX(-${count + 100}px)`;
          clearInterval(int);
        });
        carouselChildren[1].addEventListener("mouseleave", function() {
          carouselContent.style.transform = `translateX(-${count}px)`;
          int = setInterval(timer, speed);
        });
      }
  
      carouselHoverEffect();
      carouselClick();
    }
  }





//fullscreen image on click

$(".ls_galerie_main > .ls_galerie_btnSuiv").click(function() {
  let max = $(".ls_galerie_content").children(".ls_galerie_item").length;
  if((max-1) > $(".ls_galerie_content").attr("data-id-affiche"))
  {
    $(".ls_galerie_content").children(".ls_galerie_item").each(function(index) {
      let posInScreen = this.getBoundingClientRect();
      if(posInScreen.x > window.innerWidth || (posInScreen.x + posInScreen.width) > window.innerWidth)
      {
        $(".ls_galerie_content").attr("data-id-affiche", index);
        let pos = findPos(this);
        let m = parseInt($(this).css("margin-left").replace('px', ''));
        $(".ls_galerie_content").animate({
          scrollLeft: pos.x - (window.innerWidth - (posInScreen.width + m))
        });
        return false;
      }
    });
  }
  else
  {
    $(".ls_galerie_content").attr("data-id-affiche", 0);
    $(".ls_galerie_content").animate({
      scrollLeft: 0
    });
  }
});
$(".ls_galerie_main > .ls_galerie_btnPrec").click(function() {
  let listImg = $(".ls_galerie_content").children(".ls_galerie_item");
  let id = $(".ls_galerie_content").attr("data-id-affiche");
  if(0 < id && id <= listImg.length)
  {
    id -= 1;
    $(".ls_galerie_content").attr("data-id-affiche", id);
    let pos = findPos(listImg[id]);
    let m = parseInt($(listImg[id]).css("margin-left").replace('px', ''));
    $(".ls_galerie_content").animate({ scrollLeft: pos.x - m });
  }
  else
  {
    id = listImg.length-1;
    $(".ls_galerie_content").attr("data-id-affiche", id);
    let pos = findPos(listImg[id]);
    let m = parseInt($(listImg[id]).css("margin-left").replace('px', ''));
    $(".ls_galerie_content").animate({ scrollLeft: pos.x - m });
  }
});

$(".carouselApercu > .carouselApercu_btnSuiv").click(function(e) {
  e.preventDefault();
  console.log("toto")
  let indice = $(".carouselApercu").attr('data-indice');
  if (indice != undefined)
  {
    indice = parseInt(indice);
    indice++

    console.log($('.ls_galerie_item[data-indice="'+indice+'"'), indice)
    if ($('.ls_galerie_item[data-indice="'+indice+'"').length > 0)
    {
      $('.ls_galerie_item[data-indice="'+indice+'"').click();
    }
    else
    {
      $('.ls_galerie_item[data-indice="'+0+'"').click();
    }
  }
});
$(".carouselApercu > .carouselApercu_btnPrec").click(function(e) {
  e.preventDefault();
  let indice = $(".carouselApercu").attr('data-indice');
  if (indice != undefined)
  {
    indice = parseInt(indice);
    indice--
    if ($('.ls_galerie_item[data-indice="'+indice+'"').length > 0)
    {
      $('.ls_galerie_item[data-indice="'+indice+'"').click();
    }
    else
    {
      $('.ls_galerie_item[data-indice="'+($('.ls_galerie_item').length-1)+'"').click();
    }
  }
});

$(document).on("click", ".ls_galerie_item:not(.externe)", function() {
  let title = $(this).children("p").html();
  let desc = $(this).children("img").attr("description");

  $(".carouselApercu").attr('data-indice', $(this).attr('data-indice'));
  $(".carouselApercu-Content img").attr("src", $(this).children("img").attr("src-original"));
  $(".carouselApercu-Content img").on('load', function(e) {
    let img = $(".carouselApercu-Content img").get(0);
    if(img.complete)
    {
      if (img.naturalHeight > img.naturalWidth) {
        img.classList.add("portrait");
        img.classList.remove("landscape");
        } else {
        img.classList.add("landscape");
        img.classList.remove("portrait");
        }
    }
  });
  
  if(title == undefined && desc == "")
  {
    $(".carouselApercu-info").css("display", "none");
  }
  else
  {
    $(".carouselApercu-info").css("display", "flex");
  }
  if(title == undefined) {
    $(".carouselApercu-info h3").css("display", "none").html("");
  } else {
    $(".carouselApercu-info h3").css("display", "block").html(title);
  }

  if(desc == "") {
    $(".carouselApercu-info p").css("display", "none").html("");
    $(".carouselApercu-info button").css("display", "none");
  } else {
    $(".carouselApercu-info p").css("display", "block").html(desc);
    $(".carouselApercu-info button").css("display", "block");
  }
  $("body").css("overflow", "hidden");
  $(".carouselApercu").css("display", "block");
});
$(document).on("click", ".carouselApercu-close button", function() {
  $(".carouselApercu-Content img").attr("src", "");
  $(".carouselApercu-info h3").html("");
  $(".carouselApercu-info p").html("");
  $("body").css("overflow", "auto");
  $(".carouselApercu").css("display", "none");
});
$(document).on("click", ".carouselApercu .carouselApercu-info button", function() {
  let parent = $(this).parent();
  let lb = $(this).children("span").html();
  if($(parent).children("p").css("display") == "block")
  {
    $(parent).children("p").css("display", "none");
    $(this).children("span").html(lb.replace("Masquer", "Afficher"));
  }
  else
  {
    $(parent).children("p").css("display", "block");
    $(this).children("span").html(lb.replace("Afficher", "Masquer"));
  }
});




// FORM///////////////////////////////////////////

const txt = document.querySelector('#myTextarea');
function setNewSize() {
   this.style.height = "1px";
   this.style.height = this.scrollHeight + "px";
}
txt.addEventListener('keyup', setNewSize);