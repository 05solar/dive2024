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

    alert(`Route generated with ${transportation} to ${kind}!`);
});
