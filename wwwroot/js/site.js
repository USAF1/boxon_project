// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
let radioValue = 0
document.addEventListener('DOMContentLoaded', () => {
    const formModeRadios = document.querySelectorAll('input[name="form-mode"]');
    const englishFormBlock = document.getElementById('english-content-block').content.cloneNode(true);
    const arabicFormBlock = document.getElementById('arabic-content-block').content.cloneNode(true);
    const englishFromContent = document.getElementById('english-form-container');
    const arabicFromContent = document.getElementById('arabic-form-container');
    const addArabicBlockBtn = document.getElementById('add-arabic-block-btn');
    const addEnglishBlockBtn = document.getElementById('add-english-block-btn');
    const submitBtn = document.getElementById('submit-btn');
    const englishTabBtn = document.getElementById('english-tab');
    const arabicTabBtn = document.getElementById('arabic-tab');
    const englishTab = document.getElementById('english')
    const arabicTab = document.getElementById('arabic')

   


    arabicTabBtn.addEventListener('click', () => {
        englishTabBtn.classList.remove('active');
        arabicTabBtn.classList.add('active');

        englishTab.classList.remove('fade')
        englishTab.classList.remove('show')
        englishTab.classList.remove('active')

        arabicTab.classList.add('active');
        arabicTab.classList.add('show')
    })

    englishTabBtn.addEventListener('click', () => {
        englishTabBtn.classList.add('active');
        arabicTabBtn.classList.remove('active');

        arabicTab.classList.remove('fade')
        arabicTab.classList.remove('show')
        arabicTab.classList.remove('active')

        englishTab.classList.add('active');
        englishTab.classList.add('show')
    })

    generateBlocks(englishFormBlock, arabicFormBlock, englishFromContent, arabicFromContent, "both")

    formModeRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            formMode = this.value;
            if (formMode == "1") {
                addArabicBlockBtn.classList.remove('d-none');
                disEnableArabicRemoveBtn(true)
                radioValue = 1
            } else {
                addArabicBlockBtn.classList.add('d-none');
                disEnableArabicRemoveBtn(false)
                radioValue = 0
            }
        });
    });

    addEnglishBlockBtn.addEventListener('click', () => {
        if (radioValue == 0) {
            generateBlocks(englishFormBlock, arabicFormBlock, englishFromContent, arabicFromContent, "both")
        } else {
            generateBlocks(englishFormBlock, arabicFormBlock, englishFromContent, arabicFromContent, "english")
        }
    })

    addArabicBlockBtn.addEventListener('click', () => {
        generateBlocks(englishFormBlock, arabicFormBlock, englishFromContent, arabicFromContent, "arabic")
    })

    submitBtn.addEventListener('click', () => {
        debugger;
        if (checkFormValidation()) {
            let data = getFormData()
            const jsonData = JSON.stringify(data);
            console.log(jsonData)
            fetch('home/AddArticle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            })
                .then(response => {
                    debugger;
                    // Check if the response is a redirect
                    if (response.redirected) {
                        // Redirect the user to the new location
                        window.location.href = response.url;
                    } else {
                        // Parse the response as JSON
                        return response.json();
                    }
                })
                .then(data => {
                    debugger;
                    if (typeof data === 'object') {
                        // Handle the response data
                        if (data.status === 200) {
                            console.log('Data sent successfully');
                        } else {
                            // Display the error message in the modal
                            const modal = document.getElementById('exampleModal');
                            const modalTitle = modal.querySelector('.modal-title');
                            const modalBody = modal.querySelector('.modal-body');

                            modalTitle.textContent = 'Error';
                            modalBody.textContent = data.message;

                            // Show the modal
                            $(modal).modal('show');
                        }
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }


    })
});


let generateBlocks = (englishFormBlock, arabicFormBlock, englishContnetBlock, arabicContentBlock, key) => {
    let initialBlockId = generateGuid();
    let initialBlockEnglish = englishFormBlock.cloneNode(true);
    let initialBlockArabic = arabicFormBlock.cloneNode(true);
    switch (key) {
        case "both":
            initialBlockEnglish.querySelector('.english-form-block').dataset.blockId = initialBlockId;
            initialBlockArabic.querySelector('.arabic-form-block').dataset.blockId = initialBlockId;
            initialBlockArabic.querySelector('.remove-arabic-block-btn').dataset.blockId = initialBlockId;
            initialBlockEnglish.querySelector('.remove-english-block-btn').dataset.blockId = initialBlockId;
            englishContnetBlock.appendChild(initialBlockEnglish);
            arabicContentBlock.appendChild(initialBlockArabic);
            disEnableArabicRemoveBtn(false);
            break;
        case "english":
            initialBlockEnglish.querySelector('.english-form-block').dataset.blockId = initialBlockId;
            initialBlockEnglish.querySelector('.remove-english-block-btn').dataset.blockId = initialBlockId;
            englishContnetBlock.appendChild(initialBlockEnglish);
            break;
        case "arabic":
            initialBlockArabic.querySelector('.arabic-form-block').dataset.blockId = initialBlockId;
            initialBlockArabic.querySelector('.remove-arabic-block-btn').dataset.blockId = initialBlockId;
            arabicContentBlock.appendChild(initialBlockArabic);
            disEnableArabicRemoveBtn(true)
            break;
        default:
            alert("Error");
            break;
    }


}

let generateGuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

let disEnableArabicRemoveBtn = (isEnable) => {
    const arabicFromContent = document.querySelectorAll('.arabic-form-block');
    if (arabicFromContent.length > 0) {
        if (isEnable == true) {
            arabicFromContent.forEach((block) => {
                block.querySelector('.remove-arabic-block-btn').classList.remove('d-none')
            })
        } else {
            arabicFromContent.forEach((block) => {
                block.querySelector('.remove-arabic-block-btn').classList.add('d-none')
            })
        }

    }


}

let removeBlock = (blockId, key) => {
    const arabicFromContent = document.querySelectorAll('.arabic-form-block');
    const englishFromContent = document.querySelectorAll('.english-form-block');

    let mainblock = document.getElementById('myTabContent');

    if (arabicFromContent.length == 1 && englishFromContent.length == 1) {
        // Display the error message in the modal
        const modal = document.getElementById('exampleModal');
        const modalTitle = modal.querySelector('.modal-title');
        const modalBody = modal.querySelector('.modal-body');

        modalTitle.textContent = 'Error';
        modalBody.textContent = "You atleast should have 1 code block in English and Arabic";

        // Show the modal
        $(modal).modal('show');
    } else {
        if (radioValue == 0) {
            let blocksToRemove = mainblock.querySelectorAll(`[data-block-id="${blockId}"]`);
            blocksToRemove.forEach((block) => {
                block.remove();
            })
        } else {
            switch (key) {
                case "english":
                    let blockToremove = document.getElementById('english-form-container').querySelector(`[data-block-id="${blockId}"]`);
                    blockToremove.remove();
                    break;
                case "arabic":
                    let arabicBlock = document.getElementById('arabic-form-container').querySelector(`[data-block-id="${blockId}"]`);
                    arabicBlock.remove();
                    break;
                default:
                    alert("Some Error Occur");
                    break;
            }
        }

    }


}

let checkFormValidation = () => {
    let isValid = true;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneRegex = /^[0-9]+$/;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const arabicFromContent = document.querySelectorAll('.arabic-form-block');
    const englishFromContent = document.querySelectorAll('.english-form-block');

    // Validate Arabic form blocks
    arabicFromContent.forEach((block) => {
        const name = block.querySelector('.arabic-name');
        const email = block.querySelector('.arabic-email');
        const phone = block.querySelector('.arabic-phone');

        if (!name.value || !nameRegex.test(name.value)) {
            name.classList.add('error');
            document.getElementById('arabic-name-error').classList.remove("d-none");
            isValid = false;
        } else {
            name.classList.remove('error');
            document.getElementById('arabic-name-error').classList.add("d-none");
        }

        if (!email.value || !emailRegex.test(email.value)) {
            email.classList.add('error');
            document.getElementById('arabic-email-error').classList.remove("d-none");
            isValid = false;
        } else {
            email.classList.remove('error');
            document.getElementById('arabic-email-error').classList.add("d-none");
        }

        if (!phone.value || !phoneRegex.test(phone.value)) {
            phone.classList.add('error');
            document.getElementById('arabic-phone-error').classList.remove("d-none");
            isValid = false;
        } else {
            phone.classList.remove('error');
            document.getElementById('arabic-phone-error').classList.add("d-none");
        }
    });

    // Validate English form blocks
    englishFromContent.forEach((block) => {
        const name = block.querySelector('.english-name');
        const email = block.querySelector('.english-email');
        const phone = block.querySelector('.english-phone');

        if (!name.value || !nameRegex.test(name.value)) {
            name.classList.add('error');
            document.getElementById('english-name-error').classList.remove("d-none");
            isValid = false;
        } else {
            document.getElementById('english-name-error').classList.add("d-none");
            name.classList.remove('error');
        }

        if (!email.value || !emailRegex.test(email.value)) {
            email.classList.add('error');
            document.getElementById('english-email-error').classList.remove("d-none");
            isValid = false;
        } else {
            email.classList.remove('error');
            document.getElementById('english-email-error').classList.add("d-none");
        }

        if (!phone.value || !phoneRegex.test(phone.value)) {
            phone.classList.add('error');
            document.getElementById('english-phone-error').classList.remove("d-none");
            isValid = false;
        } else {
            phone.classList.remove('error');
            document.getElementById('english-phone-error').classList.add("d-none");
        }
    });

    return isValid;
};

let getFormData = () => {
    let articleId = generateGuid()
        let modelData = []

        const arabicFromContent = document.querySelectorAll('.arabic-form-block');
        const englishFromContent = document.querySelectorAll('.english-form-block');


        arabicFromContent.forEach((block) => {
            var name = block.querySelector('.arabic-name');
            var email = block.querySelector('.arabic-email');
            var phone = block.querySelector('.arabic-phone');

            let blockData = {
                articleId: articleId,
                name: name.value,
                email: email.value,
                phone: phone.value,
                language: 'ar'
            }
            modelData.push(blockData)
        })

        englishFromContent.forEach((block) => {
            var name = block.querySelector('.english-name');
            var email = block.querySelector('.english-email');
            var phone = block.querySelector('.english-phone');
            let blockData = {
                articleId: articleId,
                name: name.value,
                email: email.value,
                phone: phone.value,
                language: 'en'
            }
            modelData.push(blockData)
        })

    return modelData;
}


let closeModel = () => {
    const modal = document.getElementById('exampleModal');
    $(modal).modal('hide');
}