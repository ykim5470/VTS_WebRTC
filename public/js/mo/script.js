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

  if ($('.main_banner').length > 0) {
    $('.main_banner').owlCarousel({
      autoplay:true,
      loop:true,
      nav:false,
      dots:true,
      responsive:{
        0:{
          items:1
        }
      }
    });
  }

  tabSet(); // 텝메뉴
  $(document).on("click", "[data-tablink]", function(e){
    e.preventDefault();
    tabOpen($(this));
  });

  // 헤더 알림등 팝업
  $('[data-navpopOpen]').on('click', function(e){
      var poptarget = $(this).attr('data-navpopOpen');

      if ($('[data-navpopCont="'+poptarget+'"]').hasClass('open')) {
          if (poptarget != 'cart') {
            $('[data-navpopCont="'+poptarget+'"]').removeClass('open');
            $(this).removeClass('on');
          } else {
            $('[data-navpopcont="recom_prd"]').removeClass('open');
            var cartTxt = $(this).text();
            if (cartTxt.indexOf('장바구니') != -1) {
              $('a[data-tablink=".tabs .tab02"]').click();
            } else if (cartTxt == '구매하기') {
              $('a[data-tablink=".tabs .tab01"]').click();
            }
          }
      } else {
        if (!$('[data-navpopCont="'+poptarget+'"]').hasClass('multi')) {
          $('[data-navpopCont]').removeClass('open');
          $('[data-navpopOpen]').removeClass('on');
        }
        $('[data-navpopCont="'+poptarget+'"]').addClass('open');
        $(this).addClass('on');
        $('body').css('overflow', 'hidden');

        // 내정보팝업 이름 길이
        var guideName = $(this).attr('data-guide');
        var guideExTxt;
        if (guideName == 'jung') {
          $('.guide_comment').text('부산의 감성을 담은 정순환 가이드');
          $('.guide_name').text('정순환');
          guideExTxt = '자타공인 최고의 부산 현지 가이드임을 자부하며 수많은 여행자들에게 아는만큼 보이는 부산의 매력을 전달해드립니다.\n' +
                      '구석구석 부산의 매력을 전하는 최고의 가이드입니다.';
          $('.area_txt').val(guideExTxt);
        } else if(guideName == 'kim') {
          $('.guide_comment').text('서울과 중국의 베테랑 김범석 가이드');
          $('.guide_name').text('김범석');
          guideExTxt = '서울과 중국에 완벽한 로컬여행을 선사하며 여행자들이 가보지 못한 구석구석 작은 골목도 놓치지 않습니다.\n' +
                      '오프라인에서 누적된 베테랑 가이드의 내공을 경험해 보세요.';
          $('.area_txt').val(guideExTxt);
        } else if(guideName == 'han') {
          $('.guide_comment').text('경주 역사의 모든 것 한신희 가이드');
          $('.guide_name').text('한신희');
          guideExTxt = '역사교육 전공을 했으며 경주 문화재 지킴이 천번의 붓질로 발견한 국보의 감동적인 순간을 경험해보세요.\n' +
                      '경주의 전통역사여행의 진면목을 소개해드립니다.';
          $('.area_txt').val(guideExTxt);
        } else if(guideName == 'park') {
          $('.guide_comment').text('혼저옵서예 제주 박가령 가이드');
          $('.guide_name').text('박가량');
          guideExTxt = '에메랄드 빛 바다 그리고 아름다운 제주 생명이 소통하는 아름다운 제주의 자연을 경험해보세요.\n' +
                      '오프라인에서 누적된 베테랑 가이드의 내공을 경험해 보세요.';
          $('.area_txt').val(guideExTxt);
        } else {
          $('.guide_comment').text('젊은 강릉을 선보일 한우철 가이드');
          $('.guide_name').text('한우철');
          guideExTxt = 'K-POP BTS의 앨범자켓의 그곳 강릉.\n' +
                      '누구나 걷고 싶은 거리 공연, 전시가 가득한 매력적인 수많은 젊은이들의 주요 이색 볼거리가 가득한 강릉을 경험해보세요.';
          $('.area_txt').val(guideExTxt);
        }

        var cartTxt = $(this).text();
        if (cartTxt.indexOf('장바구니') != -1) {
          $('a[data-tablink=".tabs .tab02"]').click();
        } else if (cartTxt == '구매하기') {
          $('a[data-tablink=".tabs .tab01"]').click();
        }

        // 장바구니에서 키워드 클릭했을때
        var tabInBtn = $(this).text();
        if (tabInBtn == '#의류') {
          $('[data-navpopcont='+poptarget+'] .pop_head strong > span').text('(의류)');
        }
      }
      e.preventDefault();
  });
  $('[data-navpopClose]').on('click', function(e){
      var poptarget = $(this).attr('data-navpopClose');
      $('[data-navpopCont="'+poptarget+'"]').removeClass('open');
      $('[data-navpopOpen]').removeClass('on');
      $('body').css('overflow', 'auto');

      if (poptarget == 'mypage') {
        $('.popcont.mypage').removeAttr('style');
        $('.popcont.mypage .pop_wrap').removeAttr('style');
      }
      e.preventDefault();
  });

  $('.count_wrap #minusBtn').click(function(e) {
    var $target = $(this).siblings('.num').children().val();
    $target = Number($target);
    $(this).siblings('.num').children().val($target - 1);
    if ($target <= 1) {
      $(this).attr('disabled', true);
    }
  });
  $('.count_wrap #plusBtn').click(function() {
    $('.count_wrap #minusBtn').attr('disabled', false);
    var $target = $(this).siblings('.num').children().val();
    $target = Number($target);
    $(this).siblings('.num').children().val($target + 1);
  });

  // 시간선택
  $('#month').on('click', function(){
    dayCalculate("1","M");
    $('.st_date').text($('#stDate').val());
    $('.end_date').text($('#endDate').val());
  });
  $('#month3').on('click', function(){
    dayCalculate("3","M");
    $('.st_date').text($('#stDate').val());
    $('.end_date').text($('#endDate').val());
  });
  $('#month6').on('click', function(){
    dayCalculate("6","M");
    $('.st_date').text($('#stDate').val());
    $('.end_date').text($('#endDate').val());
  });
});
