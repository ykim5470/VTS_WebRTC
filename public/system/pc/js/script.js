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

// 실시간 채팅버튼 유무
function realChatBtn(){
  var $targetBtn = $('.chat_box'),
      $targetBtnW = $targetBtn.outerWidth();
  var $targetDiv = $('.header .navbar .right_align');

  if ($targetBtn.is(':visible')) {
    $targetDiv.css('padding-right', $targetBtnW + 20);
  }
}

(function($) {
  $(document).ready(function () {
    // 브라우저, os 체크 클래스 추가
    var userAgentCheck = function(){
      var ua = navigator.userAgent.toString().toLowerCase();
      var agent =  {
        ie : (/msie/i).test(ua) || (/trident/i).test(ua),
        edge : (/edge/i).test(ua),
        firefox: (/firefox/i).test(ua),
        webkit: (/applewebkit/i).test(ua),
        chrome: (/chrome/i).test(ua),
        opera: (/opera/i).test(ua),
        ios: (/ip(ad|hone|od)/i).test(ua),
        android: (/android/i).test(ua)
      };

      agent.safari = agent.webkit && !agent.chrome;
      agent.mobile = document.ontouchstart !== undefined && ( agent.ios || agent.android );
      agent.desktop = !(agent.ios || agent.android);

      // ie 버전체크
      if(agent.ie){
      var _ieversion = ua.match(/(msie |trident.*rv[ :])([0-9]+)/)[2];
      _ieversion = Math.floor(_ieversion);
      agent.ie = "ie"+_ieversion;
      }

      agent.os = (navigator.appVersion).match(/(mac|win|linux)/i);
      agent.os =  agent.os ? agent.os[1].toLowerCase() : '';

      var _html = document.getElementsByTagName('html')[0];
      var _class = '';
      for (var value in agent) {
        if(agent[value]){
          if(value == 'os'){
            _class += agent.os;
          }else if(value == 'ie'){
            _class += agent[value]+' ';
          }else{
            _class += value+' ';
          }
        }
      }
      _html.className += _class;
    }();

    tabSet(); // 텝메뉴
    realChatBtn(); //실시간 채팅버튼 유무

    // 메뉴
    $('.gnb li.active').addClass('open').children('ul').show();
    $('.gnb li.has_sub>a').on('click', function () {
        $(this).removeAttr('href');
        var element = $(this).parent('li');
        if (element.hasClass('open')) {
            element.removeClass('open');
            element.find('li').removeClass('open');
            element.find('ul').slideUp(200);
        } else {
            element.addClass('open');
            element.children('ul').slideDown(200);
            element.siblings('li').children('ul').slideUp(200);
            element.siblings('li').removeClass('open');
            element.siblings('li').find('li').removeClass('open');
            element.siblings('li').find('ul').slideUp(200);
        }
    });
    //menu slide(left open)
    $('.open_menu').click(function () {
        $(this).toggleClass('menu_close');
        $('.wrap').toggleClass('menu_close');
    });

    // 헤더 알림등 팝업
    $('[data-navpopOpen]').on('click', function(e){
        var poptarget = $(this).attr('data-navpopOpen');
        if ($('[data-navpopCont="'+poptarget+'"]').hasClass('open')) {
            $('[data-navpopCont="'+poptarget+'"]').removeClass('open');
            $(this).removeClass('on');
        } else {
          $('[data-navpopCont]').removeClass('open');
          $('[data-navpopCont="'+poptarget+'"]').addClass('open');
          $('[data-navpopOpen]').removeClass('on');
          $(this).addClass('on');

          // 내정보팝업 이름 길이
          var myInfo = $('.profile_box .navpop_cont'),
          myInfoName = $('.profile_box .navpop_cont.open .pop_head strong').outerWidth();
          myInfo.css('width', myInfoName + 158);
        }
    });
    $('[data-navpopClose]').on('click', function(e){
        var poptarget = $(this).attr('data-navpopClose');
        $('[data-navpopCont="'+poptarget+'"]').removeClass('open');
        $('[data-navpopOpen]').removeClass('on');
        e.preventDefault();
    });

    //tab
    $(document).on("click", "[data-tablink]", function(e){
      e.preventDefault();
      tabOpen($(this));
    });

    //treeview
    $('li:not(:has(ul))').css({ cursor: 'default', 'list-style-image':'none'});

    $('.tree_img .tree_in:has(ul)')
        .css({cursor: 'pointer', 'list-style-image':'url(../img/icon/box_plus_icon.png)'})
        .children().hide();
    $('.tree_img .tree_in:has(ul)').click(function(event){
        if(this == event.target){
            if ($(this).children().is(':hidden')) {
                $(this).css('list-style-image', 'url(../img/icon/box_minus_icon.png)').children().slideDown();
            }
            else {
                $(this).css('list-style-image', 'url(../img/icon/box_plus_icon.png)').children().slideUp();
            }
        }
        return false;
    });

    $('.tree_basic .tree_in:has(ul)')
        .css({cursor: 'pointer', 'list-style-image':'url(../img/icon/plus_icon.gif)'})
        .children().hide();
    $('.tree_basic .tree_in:has(ul)').click(function(event){
        if(this == event.target){
            if ($(this).children().is(':hidden')) {
                $(this).css('list-style-image', 'url(../img/icon/minus_icon.gif)').children().slideDown();
            }
            else {
                $(this).css('list-style-image', 'url(../img/icon/plus_icon.gif)').children().slideUp();
            }
        }
        return false;
    });

    /* time picker (toast) / MOCKUP 편의상 통합코드 */
    $('[data-toastTime]').each(function(){
      var tpSelectbox = new tui.TimePicker(this, {
          initialHour: 3,
          initialMinute: 3,
          disabledHours: [1, 2, 14],
          inputType: 'selectbox'
      });

      var timePickerClass = tpSelectbox._$container;
      if (timePickerClass.hasClass('disabled')) {
        timePickerClass.find('select').attr('disabled',true);
      }
    });

    // date picker / MOCKUP 편의상 통합코드
    var picker = new ax5.ui.picker();
    $('[data-ax5picker]').each(function(){
      picker.bind({
          target: $(this),
          direction: "top",
          content: {
              width: 270,
              margin: 10,
              type: 'date',
              config: {
                  control: {
                      left: '<i class="fa fa-chevron-left"></i>',
                      yearTmpl: '%s',
                      monthTmpl: '%s',
                      right: '<i class="fa fa-chevron-right"></i>'
                  },
                  lang: {
                      yearTmpl: "%s년",
                      months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                      dayTmpl: "%s"
                  },
                  marker: (function () {
                      var marker = {};
                      marker[ax5.util.date(new Date(), {'return': 'yyyy-MM-dd', 'add': {d: 0}})] = true;

                      return marker;
                  })()
              },
              formatter: {
                  pattern: 'date'
              }
          },
          onStateChanged: function () {
              if (this.state == "open") {
                  //console.log(this.item);
                  var selectedValue = this.self.getContentValue(this.item["$target"]);
                  if (!selectedValue) {
                      this.item.pickerCalendar[0].ax5uiInstance.setSelection([ax5.util.date(new Date(), {'add': {d: 1}})]);
                  }
              }
          }
      });
    });
    
    if ($('select').is('[multiple]')) {
      $('#type01').multiSelect();
      $('#type02').multiSelect();
      $('#type03').multiSelect({
        noneText: 'All categories',
        presets: [
          {
            name: '모든 카테고리',
            options: []
          },
          {
            name: 'My categories',
            options: ['a', 'c']
          }
        ]
      });
      $('#modal-example').multiSelect({
        'modalHTML': '<div class="multi-select-modal">'
      });
    }

    // iframe 관련 CSS 변경
    // 팝업
    $(".popup").parent('body').css({"background":"#fff"});
    // 컨텐츠 - 텝메뉴
    $(".tab").find('iframe').load( function() {
      $('iframe').contents().find("body").css({"background":"#fff"})
        .find(".content_wrap").css({"padding":0+"px"})
        .find("section").css({"padding":0+"px","box-shadow":"none"})
        .find(".tabs").attr("data-tab","tabwrap").parent(".row").css({"border":"1px solid red"})
    });
    // 컨텐츠 - 분할레이아웃
    $(".divi_body").find('iframe').load( function() {
      $('iframe').contents().find("body").css({"background":"#fff"})
        .find(".content_wrap").css({"padding":10+"px"})
        .find("section").css({"box-shadow":"none"})
    });
  });
})(jQuery);
