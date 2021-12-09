
// include
function includeHTML(){
  var z, i, elmnt, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++){
    elmnt = z[i];
    file = elmnt.getAttribute("include-html");
    if (file){
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
          elmnt.innerHTML = this.responseText;
          elmnt.removeAttribute("include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
}

$(function(){
  includeHTML();
})

$(window).on('load',function(){
  // responsive menu
  $(".hamburger").click(function() {
    $(".nav_slidenav").addClass("active");
    $("body").addClass("over")
  });
  var embed = $("iframe.video")
  $(".show_v").click(function(){
    $("body").addClass("over");
    $(".show_v_pop").addClass("active");
    $(".v_wrap").append(embed);
  });
  $(".close_sidenav").click(function(){
    $(".nav_slidenav").removeClass("active");
    $("body").removeClass("over");
    $(".show_v_pop").removeClass("active");
    $(".v_wrap").empty();
  })
  $(".close").click(function() {
    $(".nav_slidenav").removeClass("active");
    $("body").removeClass("over");
    $(".show_v_pop").removeClass("active");
    $(".v_wrap").empty();
  });
  $(".back_img").click(function(){
    $("body").removeClass('over');
    $(".pop_up").removeClass('active');
    $(".nav_slidenav").removeClass('active');
    $(".show_v_pop").removeClass("active");
    $(".term_pop").hide(200);
    $(".v_wrap").empty();
  })
})

// custom select
$(document).ready(function(){
  $(".select_custom > a").click(function() {
    $(this).next("ul").toggle();
    return false;
  });
  $(".select_custom > ul > li").click(function() {
      $(this).parent().hide().parent(".select_custom").children("a").text($(this).text());
      $(this).prependTo($(this).parent());
  });
  // pop_up  
  $(".detail, [class*='term_0]").click(function(){
    $("body").toggleClass('over');
    $(".back_img").toggleClass('active');
    $(".pop_up").toggleClass('active');
  })
  $(".p_close").click(function(){
    $("body").removeClass('over');
    $(".back_img").removeClass('active');
    $(".pop_up").removeClass('active');
  })
})

// 탭패널
function tabOpen($target){
  var $wrap = $target.closest("[data-tab]");
  $wrap.find("[data-tablink]").each(function(){
    $(this).parent().removeClass("on");
    $($(this).attr("data-tablink")).addClass("hidden");
  });
  $target.parent().addClass("on");
  $($target.attr("data-tablink")).removeClass("hidden");
}

function tabSet(){
  $("[data-tab]").each(function(){
    var $tab = $(this).find("[data-tablink]");
    if ($tab.filter(".on").length){
      tabOpen($tab.filter(".on").eq(0));
    } else {
      tabOpen($tab.eq(0));
    }
  });
}
// 날짜계산
function dayCalculate(num, day) {
  var stVal = $('#stDate').val();
  var stDate = new Date(stVal);
  moment(stDate).format('YYYY-MM-DD');
  $('#endDate').val(moment(stDate.getTime()).add(num, day).format('YYYY-MM-DD'));
}
function customRange(input) {
  if (input.id == 'endDate') {
      var minDate = new Date($('#stDate').val());
      minDate.setDate(minDate.getDate() + 1)
      return {
          minDate: minDate
      };
  }
  return {}
}

$(document).ready(function(){
    $('a[href="#"]').on('click', function(e){
      e.preventDefault();
  });
  tabSet(); // 텝메뉴
  $(document).on("click", "[data-tablink]", function(e){
    e.preventDefault();
    tabOpen($(this));
  })
})

// 헤더고정
$(window).on('load',function(){
  window.onscroll = function() {myFunction()};
    var header = document.getElementById("cont_hd");
    var sticky = header.offsetTop;
  function myFunction() {
    if (window.pageYOffset > sticky) {
      header.parentNode.classList.add("on");
    } else {
      header.parentNode.classList.remove("on");
    }
  }
  // SNS 준비중  
  $(".sns_box a").click(function(){
    alert("오픈 준비 중입니다.")
  })
})