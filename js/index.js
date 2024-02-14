const hamburger = document.getElementById('hamburger');
const cross = document.getElementById('cross')
const mobileNav = document.getElementById('mobile__nav');

const handleOpenNav = () => {
    console.log('opened')
    hamburger.classList.remove('hamburger');
    cross.classList.remove('hidden');
    mobileNav.classList.remove('hidden')
}

const handleCloseNav = () => {
    console.log('closed')
    cross.classList.add('hidden')
    hamburger.classList.add('hamburger')
    mobileNav.classList.add('hidden')
}