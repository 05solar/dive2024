// divemain_js.js 파일

// form이 제출될 때 실행되는 함수
document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 제출 동작을 막음
    // Sign in 버튼을 눌렀을 때 mainmap 페이지로 이동
    window.location.href = 'mainmap_html.html'; // 이동할 페이지 설정
});
