function toggleMenu() {
    const menu = document.getElementById('menuItems');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

document.getElementById('generate-route').addEventListener('click', function() {
    const markerPositions = [{ lat: 37.481590, lng: 126.955834 },
        { lat: 37.482490, lng: 126.953844},
        { lat: 37.488350, lng: 126.951514 },
        { lat: 37.484980, lng: 126.954624 }
    ];  // 이 좌표는 예시입니다. 실제로 사용자가 선택한 좌표를 입력해야 합니다.

    // LocalStorage에 저장
    localStorage.setItem('customRouteMarkers', JSON.stringify(markerPositions));

    // Map 페이지로 이동
    window.location.href = 'map_html.html';  // 이동할 map 페이지의 경로로 변경
});
