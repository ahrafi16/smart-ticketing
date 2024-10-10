const seatArray = [];
// initial discount price
let grandTotalAmount = document.getElementById('grendTotal');
function getSeat(element) {
    if (element.classList.contains('selected')) {
        return;
    }
    const previouslySelected = document.querySelector('.selected');
    if (previouslySelected) {
        previouslySelected.classList.remove('selected');
    }

    // Select the clicked seat
    element.classList.add('selected');
    element.style.pointerEvents = 'none';

    const seatId = element.id;
    const seatText = element.innerText;


    if (seatArray.length > 3) {
        alert("Maximum 4 seats can be selected.");
        return;
    }
    seatArryMake(seatId, seatArray);



    // set bg of selected seat
    const elemnts = document.getElementById(seatId);
    elemnts.classList.add('bg-[#1DD100]');
    elemnts.classList.add('text-white');
    


    // set how many seat selected
    const seatCount = document.getElementById('seatNumberCount');
    seatCount.innerText = seatArray.length;
    // How many seats lefts
    const seatLefts = document.getElementById('seat-lefts');
    seatLefts.innerText = (40 - (seatArray.length));
    // set total price
    const totalAmount = document.getElementById('total');
    const totalPrice = ((seatArray.length) * 550);
    totalAmount.innerText = totalPrice;



    // check either selected 4 seats for apply cupon
    if (seatArray.length === 4) {
        const cuponSection = document.getElementById('cuponApplySection');
        cuponSection.classList.remove('hidden');
        applyCupon(cuponSection, totalPrice);

    }

    // set grand total price
    grandTotalAmount.innerText = totalPrice;

    // set selected seat info
    let seatInfo = document.getElementById('seat-info');
    let newSeatInfo = makeNewSeatInfo(seatText);
    seatInfo.appendChild(newSeatInfo);
}

function seatArryMake(seatId, seatArray) {
    seatArray.push(seatId);
}

// make new seat informatoion
function makeNewSeatInfo(seatText) {
    let newDiv = document.createElement('div');
    newDiv.classList.add('flex', 'justify-between');

    let seatname = document.createElement('p');
    seatname.innerText = seatText;
    newDiv.appendChild(seatname);

    let seatClass = document.createElement('p');
    seatClass.innerText = 'Economy';
    newDiv.appendChild(seatClass);

    let price = document.createElement('p');
    price.innerText = '550';
    newDiv.appendChild(price);
    return newDiv;
}

// enable next button if minimum 1 seat selected & phone number given in 11 digit
document.getElementById('next').disabled = true;
const phoneNum = document.getElementById('phoneNumber');
phoneNum.addEventListener('input', function () {
    const phone_num = phoneNum.value;
    const phoneLen = phone_num.length;
    if (seatArray.length >= 1 && phoneLen === 11) {
        document.getElementById('next').disabled = false;
    } else {
        document.getElementById('next').disabled = true;
    }
});



//Handle cupon and calculate price
function applyCupon(cuponSection, totalPrice) {
    const cupon_code = document.getElementById('cuponCode');
    cupon_code.addEventListener('input', function () {
        cuponCodeGiven = cupon_code.value;
        const applyButton = document.getElementById('applyBtn');
        applyButton.addEventListener('click', function () {
            if (cuponCodeGiven === 'NEW15') {
                applyCuponButton(cuponSection);
                addDiscountSection('NEW15', totalPrice);
            }
            else if (cuponCodeGiven === 'Couple20') {
                applyCuponButton(cuponSection);
                addDiscountSection('Couple20', totalPrice);
            }
            else {
                cupon_code.value = '';
            }
        })
    })
};

// press apply button for discount
function applyCuponButton(cuponSection) {
    cuponSection.classList.add('hidden');
}

// discount section added
function addDiscountSection(discountToken, totalPrice) {
    const discount_section = document.getElementById('discount');
    discount_section.classList.remove('hidden');

    const disTotal = document.getElementById('discountTotal');
    let discountPrice;
    if (discountToken === 'NEW15') {
        discountPrice = totalPrice * 15 / 100;
        disTotal.innerText = discountPrice;
    }
    else if (discountToken === 'Couple20') {
        discountPrice = totalPrice * 20 / 100;
        disTotal.innerText = discountPrice;
    }

    grandTotalAmount.innerText = totalPrice - discountPrice;
}









