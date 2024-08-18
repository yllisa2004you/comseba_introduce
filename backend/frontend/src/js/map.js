// const mapContainer = document.getElementById("map");

// const mapOptions = {
//   center: new kakao.maps.LatLng(37.3978, 126.6478),
//   level: 3,
// };

const mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(37.3978, 126.6478), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
  };

const map = new kakao.maps.Map(mapContainer, mapOption);
// ---------------------------------------------------------------

const imageSrc =
    "https://as2.ftcdn.net/v2/jpg/06/43ch/55/53/1000_F_643555345_5XfYmGBwmkkWAWsVbz3RuwLAVq6INIhw.jpg", // 마커이미지의 주소입니다
  imageSize = new kakao.maps.Size(42, 40), // 마커이미지의 크기입니다
  imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다

const markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption
  ),
  markerPosition = new kakao.maps.LatLng(37.3978, 126.6479); // 마커가 표시될 위치입니다

const marker = new kakao.maps.Marker({
  position: markerPosition,
  image: markerImage, //이미지 설정
});

marker.setMap(map);
