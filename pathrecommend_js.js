function toggleMenu() {
    const menu = document.getElementById('menuItems');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}

document.getElementById('generate-route').addEventListener('click', function() {
    const transportation = document.getElementById('transportation').value;
    const kind = document.getElementById('kind').value;

    // 경로 선택 후 Map 페이지로 이동
    window.location.href = 'map_html.html';  // Map 페이지의 실제 파일명 또는 URL로 변경
});
