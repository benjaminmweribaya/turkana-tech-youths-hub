// Function to toggle between PayPal and Card payment methods in the donation form.
function togglePaymentMethod() {
    const paymentMethod = document.getElementById('payment-method').value;
    const paypalContainer = document.getElementById('paypal-container');
    const cardContainer = document.getElementById('card-container');

    // Hide both containers by default
    paypalContainer.classList.add('hidden');
    cardContainer.classList.add('hidden');

    // Show only the selected payment method
    if (paymentMethod === 'paypal') {
        paypalContainer.classList.remove('hidden');
    } else if (paymentMethod === 'card') {
        cardContainer.classList.remove('hidden');
    }
}

// Script for adding months and years to the expiration date dropdown in the donation form.
document.addEventListener("DOMContentLoaded", function () {
    const expirationMonthDropdown = document.getElementById('expiration-date-month');
    const expirationYearDropdown = document.getElementById('expiration-date-year');

    if (expirationMonthDropdown) {
        for (let month = 1; month <= 12; month++) {
            const option = document.createElement('option');
            option.value = month;
            option.textContent = month;
            expirationMonthDropdown.appendChild(option);
        }
    }

    if (expirationYearDropdown) {
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year <= currentYear + 10; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            expirationYearDropdown.appendChild(option);
        }
    }
});

// Script for slide navigation
let currentSlideIndex = 0;

// Function to show the current slide
function showSlide(sliderId, index) {
    const sliderContainer = document.getElementById(sliderId);
    const slides = sliderContainer.querySelectorAll('.slide');
    const totalSlides = slides.length;

    if (index >= totalSlides) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = totalSlides - 1;
    } else {
        currentSlideIndex = index;
    }

    const offset = -currentSlideIndex * 100;
    sliderContainer.querySelector('.slider-content').style.transform = `translateX(${offset}%)`;
}

// Functions to navigate slides
function nextSlide(sliderId) {
    showSlide(sliderId, currentSlideIndex + 1);
}

function prevSlide(sliderId) {
    showSlide(sliderId, currentSlideIndex - 1);
}

// Initialize the first slide
document.addEventListener("DOMContentLoaded", function () {
    showSlide('awards-slider', currentSlideIndex);
});

// Script for counting words on the contact form
document.getElementById("message")?.addEventListener("input", function () {
    const message = this.value;
    const words = message.trim().split(/\s+/).length;
    const wordCount = document.getElementById("wordCount");

    // Limit words to 400
    wordCount.textContent = words > 400 ? 400 : words;

    if (words > 400) {
        this.value = message.split(/\s+/).slice(0, 400).join(" ");
    }
});

// PayPal Buttons and Hosted Fields setup for PayPal and Card payments
document.addEventListener("DOMContentLoaded", function () {
    // Initialize PayPal Buttons
    paypal.Buttons({
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: document.getElementById("amount").value,
                        },
                    },
                ],
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                alert("Donation completed by " + details.payer.name.given_name);
            });
        },
        onError: function (err) {
            console.error("PayPal error", err);
        },
    }).render("#paypal-button-container");

    // PayPal Hosted Fields for card payment
    paypal.HostedFields.render({
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: document.getElementById("amount").value,
                        },
                    },
                ],
            });
        },
        styles: {
            ".valid": { color: "green" },
            ".invalid": { color: "red" },
        },
        fields: {
            number: { selector: "#card-number", placeholder: "4111 1111 1111 1111" },
            cvv: { selector: "#cvv", placeholder: "123" },
            expirationDate: { selector: "#expiration-date", placeholder: "MM/YY" },
        },
    }).then(function (hostedFieldsInstance) {
        document.getElementById("card-button").addEventListener("click", function () {
            hostedFieldsInstance.submit({
                contingencies: ["3ds"],
            }).then(function (payload) {
                alert("Payment authorized: " + payload.orderID);
            }).catch(function (err) {
                console.error("Payment authorization failed", err);
            });
        });
    });
});

// Swiper slider initialization
document.addEventListener("DOMContentLoaded", function () {
    new Swiper('.swiper-container', {
        spaceBetween: 10,
        slidesPerView: 4,
        loop: true,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    });
});
