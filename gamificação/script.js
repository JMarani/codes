const menu = document.getElementById('menu');
const NavMenu = document.getElementById('nav-menu');

menu.addEventListener('click', () => {
    menu.classList.toggle('ativo');
    NavMenu.classList.toggle('ativo');
})

function proximapagina(){
    window.location.href = "./bem-estar/bem-estar.html";
}