function toggleMenu() {
    const menu = document.getElementById('menuItems');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}

setTimeout(function() {
    // 원의 애니메이션을 멈추고 페이드 아웃
    const circles = document.querySelectorAll('.circle');
    circles.forEach(function(circle) {
        circle.style.animation = 'fadeAndShrink 1s forwards'; // 원 축소와 사라짐 효과
    });

    // 원이 사라진 후 중앙 문구를 보여줌
    setTimeout(function() {
        document.querySelector('.bottom-text').style.display = 'none'; // 하단 문구를 숨김
        const centralText = document.getElementById('central-text');
        centralText.classList.remove('hidden-text'); // 중앙 텍스트가 나타남
        centralText.style.opacity = '1'; // 문구를 페이드 인
    }, 1000); // 원이 사라지는데 1초 소요
}, 3000);
