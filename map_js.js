// 메뉴바 열기 및 닫기
function toggleMenu() {
    const menuItems = document.getElementById('menuItems');
    menuItems.style.display = menuItems.style.display === 'block' ? 'none' : 'block';
}

// 지도 초기화
let map;
let markers = {};

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
    'point': [{ lat: 37.485952, lng: 126.957415, title: 'Point Spot' },
        { lat: 37.471563, lng: 126.954632, title: 'Point Spot' },
        { lat: 37.484152, lng: 126.964963, title: 'Point Spot' }
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
}

// 마커 추가 함수 (커스텀 아이콘 포함)
function addMarker(position, map, color) {
    const marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: {
            url: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`, // Google Maps에서 제공하는 기본 마커 색상 URL
        },
        title: 'Marker'
    });
    return marker;
}

// 마커 표시 토글 함수
function toggleMarkers(type) {
    clearMarkers(); // 기존 마커 제거

    const colorMapping = {
        'tour': 'blue',
        'event': 'red',
        'historic': 'green',
        'point': 'yellow'
    };

    const markerColor = colorMapping[type];

    markers[type] = markerData[type].map(data => {
        return addMarker({ lat: data.lat, lng: data.lng }, map, markerColor);
    });
}

// 기존 마커를 제거하는 함수
function clearMarkers() {
    Object.keys(markers).forEach(type => {
        if (markers[type]) {
            markers[type].forEach(marker => marker.setMap(null));
        }
    });
    markers = {};
}

// 페이지 로드 시 initMap 함수 호출
window.onload = initMap;
