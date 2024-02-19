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

// contact-us
const nameErrorBox = document.getElementById('name__error');
const mobileErrorBox = document.getElementById('mobile__error');
const emailErrorBox = document.getElementById('email__error');
const msgErrorBox = document.getElementById('msg__error');

// get the reference of the sections
const contactForm = document.getElementById('contact-us')
const thanksSection = document.getElementById('form__submitted')

const handleToggleThanks = () => {
    contactForm.classList.add('hidden');
    thanksSection.classList.remove('hidden')
}

const validateInput = (fullname, mobile, email, msg) => {
    // re-adding the hidden property
    nameErrorBox.classList.add('hidden');
    mobileErrorBox.classList.add('hidden');
    emailErrorBox.classList.add('hidden');
    msgErrorBox.classList.add('hidden');

    // mobile and email validations
    const isValidMobileNumber = /^\d{10}$/.test(mobile);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!fullname || !isValidMobileNumber || !isValidEmail || !msg) {
        if (!fullname) nameErrorBox.classList.remove('hidden');
        if (!isValidMobileNumber) mobileErrorBox.classList.remove('hidden');
        if (!isValidEmail) emailErrorBox.classList.remove('hidden');
        if (!msg) msgErrorBox.classList.remove('hidden');
        return false;
    }
    return true;

}

const handleContactSubmit = async () => {
    // getting the values
    const fullname = document.getElementById('name__input').value;
    const mobile = document.getElementById('mobile__input').value;
    const email = document.getElementById('email__input').value;
    const msg = document.getElementById('msg__input').value;

    if (!validateInput(fullname, mobile, email, msg)) return;

    // TODO:
    // 1. integrate the api

    // requesting to backend server
    const data = {
        star: 5,
        client: 'web',
        roomId: 'f560ed62-7f32-4029-bc89-d38892444d0c',
        userName: fullname,
        timestamp: new Date(),
        reason: msg,
        description: '',
        mobile: mobile,
        email: email
    };
    const dataSecond = {
        "eventCategory": "Feedback",
        "eventAction": "Post Call Feedback",
        "eventType": "app_event",
        "userId": "u-532edb8c-eee3-453b-9eec-0868e51b1394",
        "endpoint": "",
        "status": "success",
        "data": { "rating": 5 }
    };

    try {
        // api for customer support
        const response = await fetch('https://translate.jio/api/feedback/capture', {
            method: "POST",
            headers: {
                'deviceid': '5c73630d-89a3-4403-93c0-52bce17ad7c0',
                'deviceType': 'web',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        const responseSecond = await fetch('https://translate.jio/api/diagnostic', {
            method: "POST",
            headers: {
                'deviceid': '5c73630d-89a3-4403-93c0-52bce17ad7c0',
                'X-Jm-ApiSecret': '020e86573ab900f245a4b46c5fce063df0fee684d094df5c784ff20243ad',
                'deviceType': 'web',
                'X-Jm-ApiKey': '8f7022f4-2d52-473e-938d-26c062b3caf5',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataSecond)
        })
        if (!response.ok || !responseSecond.ok) return alert('Something bad happened!');
        handleToggleThanks();
    } catch (error) {
        console.log(error)
        return alert('Something went wrong!');
    }

}