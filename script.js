const forms = document.querySelectorAll('form');

const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...',
};

forms.forEach(item => {
    postData(item);
})

function postData(form){
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        
        form.insertAdjacentElement('afterend', statusMessage);

        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        
        request.setRequestHeader('Content-type', 'application/json');
        const formData = new FormData(form);

        const obj = {};
        formData.forEach(function (value, key){
            obj[key] = value;
        });

        const json = JSON.stringify(obj);


        request.send(json);
        request.addEventListener('load', () => {
            if (request.status === 200){
                console.log(request.response);
                showThanksModal(message.success);
                form.reset();
                statusMessage.remove();
                
            } else {
                showThanksModal(message.failure);
            }
        });
    });
}

function showThanksModal(message){
    const pervModalDialog = document.querySelector('.modal__dialog');
    pervModalDialog.classList.add('hide');
    showModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class = "modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
        </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        pervModalDialog.classList.add('show');
        pervModalDialog.classList.remove('hide');
        hideModal();
    }, 4000);
}
