// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var formBlocks = document.querySelectorAll('.form-content-block');


document.addEventListener('DOMContentLoaded', () => {
    let addContentBtn = document.getElementById("add_block"); 
    let formcontentDiv = document.getElementById('mainform');
    let formContentBlockTemplate = document.getElementById('form-content-block-template').content.cloneNode(true);

    let initialBlock = formContentBlockTemplate.cloneNode(true);
    let initialBlockId = generateGuid();
    initialBlock.querySelector('.form-content-block').dataset.blockId = initialBlockId;
    initialBlock.querySelector('.remove-block').dataset.blockId = initialBlockId;
    formcontentDiv.appendChild(initialBlock);

    addContentBtn.addEventListener("click", () => {
        console.log("Btn clicked");
        let blockId = generateGuid();
        let newBlock = formContentBlockTemplate.cloneNode(true);
        newBlock.querySelector('.form-content-block').dataset.blockId = blockId;
        newBlock.querySelector('.remove-block').dataset.blockId = blockId;
        //newBlock.querySelector('.remove-block').addEventListener('click', function () {
        //    removeBlock(this.dataset.blockId);
        //});
        formcontentDiv.appendChild(newBlock);
    })
    function generateGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    //window.removeBlock = function (blockId) {
    //    console.log('Removing block with ID:', blockId);

    //    var blockToRemove = formcontentDiv.querySelector(`[data-block-id="${blockId}"]`);
    //    blockToRemove.remove();
    //};
})

function removeBlock(blockid) {
    var formBlocks = document.querySelectorAll('.form-content-block');
    if (formBlocks.length == 1) {
        alert("You shouild atleat have 2 blocks")
    } else {
        let formcontentDiv = document.getElementById('mainform');
        var blockToRemove = formcontentDiv.querySelector(`[data-block-id="${blockid}"]`);
        blockToRemove.remove();
    }
}
