$(function(){
// 마커를 담을 배열입니다
var markers = [];

var mapContainer = document.getElementById('map'), // 지도를 표시할 div
  mapOption = {
      center: new kakao.maps.LatLng(37.57951494764003, 126.97710537122235), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
  };

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);
var positions = [
  {
      title: '흥례문',
      latlng: new kakao.maps.LatLng(37.57690944920589, 126.97693131784962)
  },
  {
      title: '근정전',
      latlng: new kakao.maps.LatLng(37.57853380762938, 126.97702333332576)
  },
  {
      title: '경회루',
      latlng: new kakao.maps.LatLng(37.579721439104475, 126.97596855272012)
  },
  {
      title: '강녕전',
      latlng: new kakao.maps.LatLng(37.57953954116729, 126.97706517078431)
  },
  {
      title: '교태전',
      latlng: new kakao.maps.LatLng(37.57992322310129, 126.97710138060195)
  }
];
var imageSrc = "http://nexcoretech.co.kr/vts/img/markerStar.png";
for (var i = 0; i < positions.length; i ++) {

  // 마커 이미지의 이미지 크기 입니다
  var imageSize = new kakao.maps.Size(24, 35);

  // 마커 이미지를 생성합니다
  var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: positions[i].latlng, // 마커를 표시할 위치
      title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      image: markerImage
  });
  daum.maps.event.addListener(marker, 'click', (function(marker, i) {
     return function() {
       infowindow.setContent('<div style="padding:5px;font-size:12px;">' + positions[i].title + '</div>');
       infowindow.open(map, marker);
     }
 })(marker, i));
}
var linePath = [
positions[0].latlng,
positions[1].latlng,
positions[2].latlng,
positions[3].latlng,
positions[4].latlng
];

var polyline = new kakao.maps.Polyline({
path: linePath, // 선을 구성하는 좌표배열 입니다
strokeWeight: 5, // 선의 두께 입니다
strokeColor: '#FFAE00', // 선의 색깔입니다
strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
strokeStyle: 'solid' // 선의 스타일입니다
});
polyline.setMap(map);
// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();
// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

// 키워드로 장소를 검색합니다
function searchPlaces(keyword) {
ps.keywordSearch(keyword, placesSearchCB);
}
searchPlaces('광화문 관광');

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {

    var bounds = new kakao.maps.LatLngBounds();

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();

    for ( var i=0; i<data.length; i++ ) {

        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(data[i].y, data[i].x),
            marker = addMarker(placePosition, i);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        (function(marker, title) {
          kakao.maps.event.addListener(marker, 'click', function() {
              displayInfowindow(marker, title);
          });
      })(marker, data[i].place_name);
    }

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
  }
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
  var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
      imgOptions =  {
          spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
          marker = new kakao.maps.Marker({
          position: position
      });

  marker.setMap(map); // 지도 위에 마커를 표출합니다
  markers.push(marker);  // 배열에 생성된 마커를 추가합니다

  return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
  for ( var i = 0; i < markers.length; i++ ) {
      markers[i].setMap(null);
  }
  markers = [];
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
  var content = '<div style="padding:5px;font-size:12px;">' + title + '</div>';

  infowindow.setContent(content);
  infowindow.open(map, marker);
}

// 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {
  while (el.hasChildNodes()) {
      el.removeChild (el.lastChild);
  }
}

$('.filter input[type="radio"]').on('click', function() {
  var fKeyword = $(this).siblings('strong').data('key');
  ps.keywordSearch('광화문 '+fKeyword, placesSearchCB);
  $('[data-navpopCont="filterOpt"]').removeClass('open');
});
});
