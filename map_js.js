// 메뉴바 열기 및 닫기
function toggleMenu() {
    const menuItems = document.getElementById('menuItems');
    menuItems.style.display = menuItems.style.display === 'block' ? 'none' : 'block';
}

// 지도 초기화
let map;
let markers = {};
let customRoutePath; // 사용자 정의 경로를 저장할 변수

// 마커 정보
const markerData = {
    'tour': [{ lat: 37.481590, lng: 126.955834, title: 'Tour Spot 1' },
        { lat: 37.482490, lng: 126.953844, title: 'Tour Spot 2' },
        { lat: 37.488350, lng: 126.951514, title: 'Tour Spot 3' },
        { lat: 37.484980, lng: 126.954624, title: 'Tour Spot 4' }
    ],
    'event': [{ lat: 37.485792, lng: 126.953327, title: 'Event Spot1' },
        { lat: 37.481792, lng: 126.954357, title: 'Event Spot2' },
        { lat: 37.499952, lng: 126.942627, title: 'Event Spot3' },
        { lat: 37.483092, lng: 126.951947, title: 'Event Spot4' },
        { lat: 37.474692, lng: 126.967657, title: 'Event Spot5' }
    ],
    'historic': [{ lat: 37.484892, lng: 126.954894, title: 'Historic Spot1' },
        { lat: 37.481234, lng: 126.944123, title: 'Historic Spot2' },
        { lat: 37.494567, lng: 126.964895, title: 'Historic Spot3' }
    ],
    'cathedral': [{ lat: 37.502701, lng: 127.060135, title: 'daechidong cathedral' },
        { lat: 37.508878, lng: 127.040997, title: 'Yeoksamdong cathedral' },
        { lat: 37.498093, lng: 127.022828, title: 'Seochodong cathedral' },
        { lat: 37.524812, lng: 127.050415, title: 'Chungdamdong cathedral' },
        { lat: 37.515459, lng: 126.961063, title: 'Heoseockdong cathedral' },
        { lat: 37.525144, lng: 126.977160, title: 'Hangang cathedral' },
        { lat: 37.541273, lng: 127.006187, title: 'Seoul National cathedral' },
        { lat: 37.546885, lng: 127.014225, title: 'Ocksudong cathedral' },
        { lat: 37.570093, lng: 126.976418, title: 'Seoul cathedral' },
        { lat: 37.580969, lng: 126.986067, title: 'Gaheoudong cathedral' }
    ]
};

// 구글 맵 로드
function initMap() {
    const centerPosition = { lat: 37.485792, lng: 126.954327 }; // 기본 중앙 위치

    // 기본 지도 UI 컨트롤을 모두 숨김
    map = new google.maps.Map(document.getElementById('map'), {
        center: centerPosition,
        zoom: 15,
        zoomControl: false, // 확대/축소 버튼 숨기기
        mapTypeControl: false, // 지도/위성 전환 버튼 숨기기
        fullscreenControl: false, // 전체 화면 버튼 숨기기
        streetViewControl: false, // 스트리트 뷰 버튼 숨기기
    });

    // 사용자 정의 경로 마커 및 경로 표시 (pathrecommend 페이지에서 넘어올 때만 실행)
    const customRouteMarkers = JSON.parse(localStorage.getItem('customRouteMarkers'));
    if (customRouteMarkers) {
        drawCustomRoute(customRouteMarkers);  // 경로 그리기 함수 호출
    }
}

// 마커 추가 함수 (정보창 및 하단 정보 연동 포함)
function addMarker(position, map, color, title, description) {
    const marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: {
            url: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
        },
        title: title
    });

    marker.addListener('click', function() {
        // 마커 클릭 시 정보 창을 업데이트하고 표시
        updateInfoPanel(title, description);
    });

    return marker;
}

// 마커 표시 토글 함수
function toggleMarkers(type) {
    clearMarkers(); // 기존 마커 제거

    const colorMapping = {
        'tour': 'blue',
        'event': 'yellow',
        'historic': 'green',
        'cathedral': 'red'
    };

    const markerColor = colorMapping[type];

    markers[type] = markerData[type].map(data => {
        return addMarker({ lat: data.lat, lng: data.lng }, map, markerColor);
    });
}

// 기존 마커를 제거하는 함수
function clearMarkers() {
    if (customRoutePath) {
        customRoutePath.setMap(null);  // 기존 사용자 정의 경로 제거
    }

    Object.keys(markers).forEach(type => {
        if (markers[type]) {
            markers[type].forEach(marker => marker.setMap(null));
        }
    });
    markers = {};
}

// 추가: 사용자 정의 마커와 경로 그리기 함수
function drawCustomRoute(markerPositions) {
    // 사용자 정의 마커 추가
    const color = 'purple'; // 사용자 정의 경로 마커 색상
    markerPositions.forEach(position => {
        addMarker(position, map, color);
    });

    // 사용자 정의 마커들을 선으로 연결
    customRoutePath = new google.maps.Polyline({
        path: markerPositions.map(pos => ({ lat: pos.lat, lng: pos.lng })),
        geodesic: true,
        strokeColor: '#FF00FF',  // 경로 색상 (보라색)
        strokeOpacity: 1.0,
        strokeWeight: 2          // 경로 두께
    });

    // 경로를 지도에 표시
    customRoutePath.setMap(map);
}

// 페이지 로드 시 initMap 함수 호출
window.onload = initMap;
