/*
Assignement:

HTML: Complete the HTML to have semantic and compliant markups.

JAVASCRIPT: Dynamically add a user to the users list.
- Highlight the email input when a user enters an invalid email address and display following message: "please enter a valid email address" in red.
- Use the add_user function to submit the user's data.
- If the ajax request returns an error, display the error message in red.
- Display the newly added user in the users list when the request was successful.
- Do not use any libraries e.g. bootstrap

Nice to have:
- no jQuery or completely rewrite in jQuery
- add some CSS3 properties
- code cleanup/format
- explain or propose improvements in comments
- remove inline code/styles

*/


// START YOUR CODE HERE

var userList = [];
//SUBMITTING FORM
function submitForm() {
    var userName = document.forms["add-user"]["username"].value
    var userEmail = document.forms["add-user"]["email"].value

    var errors = validateForm(userName, userEmail);
	applyErrors(errors);
    
    if(errors.length === 0) {
        userList.push({
            username: userName,
            email: userEmail
        });

        var usersList = document.getElementById('users'),userTemplate;
        usersList.innerHTML = '';
        for(var i in userList) {
            userTemplate = document.createElement('li');
            userTemplate.className = 'user';
            userTemplate.innerHTML = '<p class="userName"> User:' + userList[i].username + '</p><p class="userEmail"> Email:' + userList[i].email + '</p>';
            usersList.appendChild(userTemplate);
        }
    }
	
}


function validateEmail(email){
	
	var error = [];
	var emailInput = document.getElementById('email');
	if (!RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)) {
        emailInput.classList.add("invalid")
        error.push('please enter a valid email address')
    }
	applyErrors(error);
}

function validateForm(user, email) {
    var errors = []
    var emailInput = document.getElementById('email');
    var nameInput = document.getElementById('name');

    if (user === '') {
        nameInput.classList.add("invalid")
        errors.push('please enter a valid name')
    }
    if (!RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email) || email === '') {
        emailInput.classList.add("invalid")
        errors.push('please enter a valid email address')
    } else if (errors.length === 0) {
        nameInput.classList.remove("invalid")
        emailInput.classList.remove("invalid")
    }

    return errors;
}

function applyErrors(errors) {
    var errorSection = document.getElementById('errors');
    errorSection.innerHTML = " "
    if (errors.length > 0) {
        errors.forEach(function (error) {
            template = document.createElement('div');
            template.className = 'error';
            template.innerHTML = '<p class="errorMessage">' + error + '</p>';
            errorSection.appendChild(template);
        })
    }

}

function applyError(error) {
    var errorSection = document.getElementById('error');
    errorSection.innerHTML = " "
    if (error.length > 0) {
        error.forEach(function (error) {
            template = document.createElement('div');
            template.className = 'error';
            template.innerHTML = '<p class="errorMessage">' + error + '</p>';
            errorSection.appendChild(template);
        })
    }

}
// END YOUR CODE HERE


// Do not modify this function. Add user service wrapper.
function addUser(username, email, callback) {
    var response,
        success = (!!Math.round(Math.random()));

    if (!success) {
        response = JSON.stringify({
            success: success,
            error: "Oups, something went wrong!"
        });
    } else {
        response = JSON.stringify({
            success: success,
            user: {
                username: username,
                email: email
            }
        });
    }

};