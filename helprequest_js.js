function toggleMenu() {
    const menu = document.getElementById('menuItems');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}

document.getElementById('call-for-help').addEventListener('click', function() {
    const helpReason = document.getElementById('help-reason').value;

  
    window.location.href = 'helpwaiting_html.html';  
});
