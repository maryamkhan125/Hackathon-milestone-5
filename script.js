// Get refrences to the form and display area
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
//handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); //prevent page reload
    //collect input values
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    //Save form data in localStorage with the username as the key
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); //saving the data locally
    //Generate the resume content dynamically
    var resumeHTML = "\n<h2>Editable Resume</h2>\n<h3>Personal Information</h3>\n<p><b>Name</b> <span contenteditable=\"true\">".concat(name, "</span></p>\n<p><b>email</b> <span contenteditable=\"true\">").concat(email, "</span></p>\n<p><b>phone</b> <span contenteditable=\"true\">").concat(phone, "</span></p>\n\n<h3>education</h3>\n<p contenteditable=\"true\">").concat(education, "</P>\n\n<h3>experience</h3>\n<p contenteditable=\"true\">").concat(experience, "</P>\n\n\n<h3>slills</h3>\n<p contenteditable=\"true\">").concat(skills, "</P>\n");
    //Display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;
    //Generate a shareable URL with the username only
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    //Display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
//Handle PDF download
downloadPdfButton.addEventListener('click', function () {
    window.print(); //This will open the print dialog and allow the user to save as PDF
});
//prefill the form based on the username in the URL
window.addEventListener('DOMContentLoded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        //Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
});
