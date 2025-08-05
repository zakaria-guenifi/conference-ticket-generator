const uploadSection = document.querySelector(".upload-section");
const formSection = document.querySelector(".form-section");
const customInputField = document.querySelector(".custom-file-input");
const inputFile = document.getElementById("file-input");
const infoIcon = document.getElementById("info-icon");
const uploadFeedback = document.getElementById("upload-feedback");
const uploadImg = document.getElementById("upload-img");
const uploadInstruction = document.getElementById("upload-instruction");
const imgBtns = document.querySelector(".img-buttons");
const removeImg = document.getElementById("remove-img");
const changeImg = document.getElementById("change-img");
const fullName = document.getElementById("full-name");
const emailAddress = document.getElementById("email-address");
const emailInfo = document.getElementById("email-info");
const githubUsername = document.getElementById("github-username");
const submitBtn = document.getElementById("submit-button");
const ticketSection = document.querySelector(".ticket-generated");
const emailSpan = document.getElementById("email-span");
const nameOneSpan = document.getElementById("name-1-span");
const nameTwoSpan = document.getElementById("name-2-span");
const ticketDate = document.getElementById("ticket-date");
const ticketName = document.getElementById("ticket-name");
const ticketGithub = document.getElementById("ticket-github");
const ticketAvatar = document.getElementById("ticket-avatar");
const ticketCode = document.getElementById("ticket-code");


// Upload Avatar logic
inputFile.addEventListener("change", ()=> {
    const fileSize = (inputFile.files[0].size / 1024);
    
    if ( fileSize > 500) {
        uploadFeedback.textContent = "File too large. Please upload a photo under 500KB";
        uploadFeedback.classList.add("error-message");
        infoIcon.classList.add("error-message");
        
        uploadImg.src = "./assets/images/icon-upload.svg";
        uploadImg.style.padding = "var(--sp-300)";
        
        uploadInstruction.style.display = "block";
        imgBtns.style.display = "none";
        inputFile.value = "";

    } else {
        uploadFeedback.textContent = "Upload your photo (JPG or PNG, max size: 500KB).";
        uploadFeedback.classList.remove("error-message");
        infoIcon.classList.remove("error-message");

        uploadImg.src = URL.createObjectURL(inputFile.files[0]);
        uploadImg.style.padding = "0";

        uploadInstruction.style.display = "none";

        imgBtns.style.display = "flex";
    }
    
});

customInputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        inputFile.click();
    }
});

removeImg.addEventListener("click", ()=> {
    inputFile.value = "";

    uploadInstruction.style.display = "block";
    imgBtns.style.display = "none";

    uploadImg.src = "./assets/images/icon-upload.svg";
    uploadImg.style.padding = "var(--sp-300)";
});

changeImg.addEventListener("click", ()=> {
    inputFile.click();
});

// Form validation logic
emailAddress.addEventListener("input", ()=> {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress.value.trim());
    if (!emailValid) {
        emailInfo.style.display = "flex";
        emailAddress.style.marginBlockEnd = "var(--sp-400)";
    } else {
        emailInfo.style.display = "none";
        emailAddress.style.marginBlockEnd = "";

    }
});





// Generated ticket logic
submitBtn.addEventListener("click", (e)=> {
    
    if ( 
        fullName.value.trim() === "" 
        || emailAddress.value.trim() === "" 
        || githubUsername.value.trim() === "" ) {
        e.preventDefault();
    } else {
        uploadSection.style.display = "none";
        formSection.style.display = "none";
        ticketSection.style.display = "block";
        
        emailSpan.textContent = emailAddress.value.trim();
        nameOneSpan.textContent = `${fullName.value.trim().split(" ")[0]} `;
        nameTwoSpan.textContent = fullName.value.trim().split(" ")[1];
        

        ticketDate.textContent = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toDateString().slice(4);
        ticketName.textContent = fullName.value.trim();
        ticketGithub.textContent = githubUsername.value.trim();
        ticketAvatar.src = URL.createObjectURL(inputFile.files[0]);
        ticketCode.textContent = Math.floor(10000 + Math.random() * 90000);

    };
});