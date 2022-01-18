
$(function(){
  // $(window).on('load', function(){
  //   $('#liveVideo').get(0).play();
  // });      
  var isScrollUp = false;
  var lastScrollTop;
  var like_num = 0
  $(".on_main video").on('click',function(){
    $("section").toggleClass("only_video")
  })
  $(".like").on('click',()=>{
    const { room_id } = getUrlParams();
    socket.emit('like-clicked', room_id)
  })
  socketChat.on('like-count-total', async(data)=>{
    const likeCount = data
    // $(".like_num .cnt").text(likeCount); // 더한 것 다시 Node에 replace
    document.querySelector('#like-cnt').innerText = likeCount
    $(".like").html("<span>Liked!</span><i class='fas fa-heart'></i>");
    $(".like span").addClass("press");
    $('#div_chat').prepend('<strong class="like_txt"><span>ウギさん</span> が好きですを押しました。</strong>')
    $(".like_txt").addClass("press");
    setTimeout(function(){
      $('#div_chat strong.like_txt').remove();
    },5000);
  })

  $("button.chat").on('click',function(){
    $(".chatting").addClass('act');
  });
  $("button.map").on('click',function(){
    $('.shoplist').addClass('act');
  });
  $(".shoplist .bg, video").on('click',function(){
    $('.act').removeClass('act');
  })
  $("#div_chat").on('click',function(){
    $('.chatting').removeClass('act');
  })
 
  $(".send-button").on('click', function(){
    $('.chat_cont').animate({
      scrollTop: $('.chat_cont').prop('scrollHeight') - $('.chat_cont').innerHeight() + 100
    }, 100);
  })

  $(".on_bottom").droppable({
    drop: function( event, ui ) {
      $('.cart').addClass("action");
    }
  });

  
  // shop list
  function shopList(){
    $.ajax({
      url : '../js/mo/webrtc/shoplist.json',
      type : 'GET',
      dataType : 'json',
      success : function(data) {
        var publicDom = "",
            privateInfo = "";
        $.each(data, function(key, value){
          
          if (key == 'shopList') {
            var publicImg = $(this);
            for (var i = 0; i < publicImg.length; i++) {
              var images = publicImg[i];
              if (i%5 == 0) {
                publicDom += '<li>';
              } else {
                publicDom += '<li>';
              }
              open_div_p = '<div class="list_div"><p>';
              close_div_p ='</p></div>';
              // json의 정보를 화면에 표현
              publicDom += '<h1>' + images.shop_title + '</h1>'; // 상점 이름
              publicDom += '<div class="shop_phone"><center>' + images.shop_phone_number + '</center></div>'; // 상점 전화번호
              publicDom += '<img src="'+ images.url +'" alt="'+ images.alt +'" class="img">'; //이미지 url
              publicDom += '<h2>' + '紹介文' + '</h2>';
              publicDom += '<div id="SynopsisDiv" class="SynopsisText">'+images.shop_info+'</div><a href="javascript:showplay();" class="btn_more" id="synopMore"><i class="fas fa-chevron-circle-down"></i></a><input name="hidTempSynopsis" type="hidden" id="hidTempSynopsis" value="0">'; //상점 정보
              publicDom += '<h2>' + '事業者情報' + '</h2>';
              publicDom += open_div_p + '<b>商号名</b> ' + images.trademark + close_div_p; //상호명
              publicDom += open_div_p+ '<b>代表者</b> ' + images.ceo + close_div_p; //대표자 이름
              publicDom += open_div_p + '<b>通販業者番号</b> ' + images.mail_order_number + close_div_p; //통판등록번호
              publicDom += open_div_p + '<b>企業登録番号</b> ' + images.company_number + close_div_p; //사업자 등록 번호
              publicDom += open_div_p + '<b>事業者住所</b> ' + images.address + close_div_p; //사업지 주소
              publicDom += open_div_p + '<b>メール</b> ' + images.mail + close_div_p; //메일
              publicDom += '</li>';
            }
          }
        });
        $('#shoplist').append(publicDom);
      }
    });
  }
  // shop Item
  function shopItem(){
    $.ajax({
      url : '../js/mo/webrtc/shoplist.json',
      type : 'GET',
      dataType : 'json',
      success : function(data) {
        var publicDom = "",
            privateInfo = "";
        $.each(data, function(key, value){
          
          if (key == 'shopItem') {
            var publicImg = $(this);
            for (var i = 0; i < publicImg.length; i++) {
              var images = publicImg[i];
              if (i%5 == 0) {
                publicDom += '<li><div class="item"><a href="'+ images.view +'">';
              } else {
                publicDom += '<li><div class="item"><a href="'+ images.view +'">';
              }
              // json의 정보를 화면에 표현
              publicDom += '<div class="impact_img"><img src="'+ images.option +'" alt="impact logo" class="img"></div>';
              publicDom += '<div class="img_box"><img src="'+ images.img +'" alt="'+ images.name +'" class="img"></div>';
              publicDom += '<span>'+ images.name +'</span>';
              publicDom += '</a></div></li>';
            }
          }
        });
        $('#ul_shop').append(publicDom);
      }
    });
  }        
  shopList();
  shopItem();
});

function showplay() {
  var flag = $('#hidTempSynopsis');
  var SynopsisDiv = $('#SynopsisDiv');
  var flagValue = flag.val();
  if (flag != null) {
      if (flagValue == "0") {
          /*SynopsisDiv.css("height", "auto");*/
          SynopsisDiv.css("display", "block");
          $("#synopMore").html('<i class="fas fa-chevron-circle-up"></i>');
          flag.val("1");
      }
      else {
          //SynopsisDiv.css("height", "77px");
          SynopsisDiv.css("display", "-webkit-box");
          $("#synopMore").html('<i class="fas fa-chevron-circle-down"></i>');
          flag.val("0");
      }
  }
  else {
      alert("[더보기] 추가 정보가 없습니다.");
  }
}