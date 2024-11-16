// DOM Elements
const registerBtn = document.getElementById('registerBtn');
const loginBtn = document.getElementById('loginBtn');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const statusDiv = document.getElementById('status');

// Register user
registerBtn.addEventListener('click', () => {
    const email = emailField.value;
    const password = passwordField.value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const userId = userCredential.user.uid; // Unique User ID
            const userData = {
                email: email,
                batch: '',
                semester: ''
            };

            // User data save to Firebase
            database.ref('users/' + userId).set(userData)
                .then(() => {
                    statusDiv.innerText = "Registration successful!";
                })
                .catch((error) => {
                    statusDiv.innerText = "Error saving data: " + error.message;
                });
        })
        .catch((error) => {
            statusDiv.innerText = "Error: " + error.message;
        });
});

// Login user
loginBtn.addEventListener('click', () => {
    const email = emailField.value;
    const password = passwordField.value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const userId = userCredential.user.uid;
            database.ref('users/' + userId).once('value')
                .then((snapshot) => {
                    const userData = snapshot.val();
                    console.log("User Data:", userData);
                    statusDiv.innerText = "Login successful!";
                })
                .catch((error) => {
                    statusDiv.innerText = "Error fetching data: " + error.message;
                });
        })
        .catch((error) => {
            statusDiv.innerText = "Error: " + error.message;
        });
});
