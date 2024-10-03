// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAdsR_hHUR3-eiVoDVQ8zvHd4q9v7j8Pzc",
  authDomain: "learnify-71314.firebaseapp.com",
  projectId: "learnify-71314",
  storageBucket: "learnify-71314.appspot.com",
  messagingSenderId: "585016177509",
  appId: "1:585016177509:web:edd8a22bfbd3ffb11c678c",
  measurementId: "G-K5WC8GPBHD",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Get UI elements
const loginButton = document.getElementById("login_button");
const registerButton = document.getElementById("register_button");
const switchButton = document.getElementById("switch_to_register");
const formHeader = document.getElementById("form_header");
const registerFields = document.getElementById("register_fields");
const forgotPasswordContainer = document.getElementById(
  "forgot_password_container"
);
const forgotPasswordLink = document.getElementById("forgot_password");

// PDF preloading functionality
const pdfCache = new Map();
const criticalPDFs = [
  "./home/subjects/asp/a1.pdf",
  "./home/subjects/asp/a2.pdf",
  "./home/subjects/asp/a3.pdf",
  "./home/subjects/asp/a4.pdf",
  "./home/subjects/mis/m1.pdf",
  "./home/subjects/mis/m2.pdf",
  "./home/subjects/mis/m3.pdf",
  "./home/subjects/mis/m4.pdf",
  "./home/subjects/os/os1.pdf",
  "./home/subjects/os/os2.pdf",
  "./home/subjects/os/os3.pdf",
  "./home/subjects/os/os4.pdf",
  "./home/subjects/stats/stats.pdf",
  "./home/subjects/stats/statsf.pdf",
  "./home/subjects/stats/statsqp.pdf",
  // Add more PDF URLs as needed
];

function preloadCriticalPDFs() {
  criticalPDFs.forEach((url) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const objectURL = URL.createObjectURL(blob);
        pdfCache.set(url, objectURL);
        console.log(`Preloaded critical PDF: ${url}`);
      })
      .catch((error) => console.error(`Error preloading PDF ${url}:`, error));
  });
}

// Start preloading critical PDFs when the page loads
window.addEventListener("load", preloadCriticalPDFs);

// Get modal elements
var modal = document.getElementById("error_modal");
var span = document.getElementsByClassName("close")[0];
var errorMessage = document.getElementById("error_message");

// Close modal when clicking on 'x'
span.onclick = function () {
  modal.style.display = "none";
};

// Close modal when clicking outside of it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Function to show error in modal
function showError(message) {
  errorMessage.textContent = message;
  modal.style.display = "block";
}

// Function to switch between login and register
switchButton.addEventListener("click", function () {
  if (formHeader.textContent === "Login") {
    // Switch to Register view
    formHeader.textContent = "Register";
    registerFields.style.display = "block";
    loginButton.style.display = "none";
    registerButton.style.display = "block";
    switchButton.textContent = "Switch to Login";
    forgotPasswordContainer.style.display = "none"; // Hide forgot password link
  } else {
    // Switch to Login view
    formHeader.textContent = "Login";
    registerFields.style.display = "none";
    loginButton.style.display = "block";
    registerButton.style.display = "none";
    switchButton.textContent = "Switch to Register";
    forgotPasswordContainer.style.display = "block"; // Show forgot password link
  }
});

// Add this function to generate JWT
function generateJWT(uid) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({ uid: uid, exp: Date.now() + 24 * 60 * 60 * 1000 })
  ); // 24 hours expiration
  const signature = btoa(
    CryptoJS.HmacSHA256(header + "." + payload, "your-secret-key").toString()
  );
  return `${header}.${payload}.${signature}`;
}

function register() {
  // Get all our input fields
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  full_name = document.getElementById("full_name").value;
  access_code = document.getElementById("access_code").value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    showError("Email or Password is Outta Line!!");
    return;
  }
  if (
    validate_field(full_name) == false ||
    validate_field(access_code) == false
  ) {
    showError("One or More Fields is Outta Line!!");
    return;
  }

  //

  // Check access code
  checkAccessCode(access_code)
    .then(() => {
      // Access code is valid and unused, proceed with registration
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(function () {
          // Store the pdfCache in localStorage
          localStorage.setItem(
            "pdfCache",
            JSON.stringify(Array.from(pdfCache.entries()))
          );

          // Declare user variable
          var user = auth.currentUser;

          // Add this user to Firebase Database
          var database_ref = database.ref();

          // Create User data
          var user_data = {
            email: email,
            full_name: full_name,
            access_code: access_code,
            last_login: Date.now(),
          };

          // Push to Firebase Database
          database_ref.child("users/" + user.uid).set(user_data);

          // Mark access code as used
          return markAccessCodeAsUsed(access_code, user.uid);
        })
        .then(() => {
          //
          // Done
          alert("User Created!!");

          // Redirect to home page
          window.location.href = "./home/index.html";
        })
        .catch(function (error) {
          //
          // Firebase will use this to alert of its errors
          showError(error.message);
        });
    })
    .catch((error) => {
      showError(error);
    });
}

function checkAccessCode(code) {
  return new Promise((resolve, reject) => {
    const unusedCodesRef = database.ref("accessCodes/unused");
    unusedCodesRef.once("value", (snapshot) => {
      const unusedCodes = snapshot.val() || {};
      if (unusedCodes.hasOwnProperty(code)) {
        resolve(true);
      } else {
        const usedCodesRef = database.ref("accessCodes/used");
        usedCodesRef.once("value", (snapshot) => {
          const usedCodes = snapshot.val() || {};
          if (usedCodes.hasOwnProperty(code)) {
            reject(
              "This code is used by another user! Please enter your own code."
            );
          } else {
            reject("Invalid access code. Please try again.");
          }
        });
      }
    });
  });
}

function markAccessCodeAsUsed(code, userId) {
  const updates = {};
  updates[`accessCodes/unused/${code}`] = null;
  updates[`accessCodes/used/${code}`] = userId;
  return database.ref().update(updates);
}

// ===========================================================
function generateDeviceId() {
  const nav = window.navigator;
  const screen = window.screen;
  const guid = function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  };

  let deviceId =
    guid() +
    "|" +
    nav.userAgent +
    "|" +
    screen.height +
    "|" +
    screen.width +
    "|" +
    screen.colorDepth;

  return btoa(deviceId); // Base64 encode the device ID
}

function checkActiveSession(userId) {
  return new Promise((resolve, reject) => {
    const sessionRef = database.ref(`activeSessions/${userId}`);
    sessionRef.once("value", (snapshot) => {
      if (snapshot.exists()) {
        const sessionData = snapshot.val();
        const currentDeviceId = generateDeviceId();
        if (sessionData.deviceId !== currentDeviceId) {
          reject(new Error("You are already logged in on another device"));
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    });
  });
}

function clearOldSessions(userId) {
  const sessionsRef = database.ref("activeSessions");
  const now = Date.now();
  const cutoff = now - 24 * 60 * 60 * 1000; // 24 ghante pehle

  return sessionsRef
    .once("value")
    .then((snapshot) => {
      const updates = {};
      snapshot.forEach((child) => {
        const sessionData = child.val();
        if (sessionData.timestamp < cutoff && child.key !== userId) {
          updates[child.key] = null;
        }
      });
      return sessionsRef.update(updates);
    })
    .catch((error) => {
      console.error("Error clearing old sessions:", error);
    });
}

function logout() {
  localStorage.removeItem("auth_token");
  //
  var user = auth.currentUser;
  if (user) {
    var database_ref = database.ref();
    database_ref
      .child(`activeSessions/${user.uid}`)
      .remove()
      .then(() => {
        return auth.signOut();
      })
      .then(() => {
        //
        alert("Logged out successfully");
        window.location.href = "../index.html"; // Redirect to login page
      })
      .catch((error) => {
        //
        showError("Error logging out: " + error.message);
      });
  }
}

// =============================================
// Set persistence to LOCAL
auth
  .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    console.log("Persistence set to LOCAL");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

// Check if user is already logged in
auth.onAuthStateChanged(function (user) {
  if (user && localStorage.getItem("auth_token")) {
    // User is signed in and has a token, redirect to home page if not already there
    if (!window.location.href.includes("/home/index.html")) {
      window.location.replace("./home/index.html");
    }
  }
});

// ================================================

function login() {
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;

  if (validate_email(email) == false || validate_password(password) == false) {
    showError("Email या Password galat hai!!");
    return;
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      var user = auth.currentUser;
      var jwt = generateJWT(user.uid);
      localStorage.setItem("auth_token", jwt);
      // Store the pdfCache in localStorage
      localStorage.setItem(
        "pdfCache",
        JSON.stringify(Array.from(pdfCache.entries()))
      );
      return checkActiveSession(user.uid);
    })
    .then(function () {
      var user = auth.currentUser;
      var deviceId = generateDeviceId();
      var database_ref = database.ref();

      var user_data = {
        last_login: Date.now(),
        deviceId: deviceId,
      };

      return Promise.all([
        database_ref.child(`users/${user.uid}`).update(user_data),
        database_ref.child(`activeSessions/${user.uid}`).set({
          deviceId: deviceId,
          timestamp: Date.now(),
        }),
        clearOldSessions(user.uid),
      ]);
    })
    .then(() => {
      alert("User Logged In!!");
      window.location.href = "./home/index.html";
    })
    .catch(function (error) {
      showError(error.message);
    });
}

// Add event listener for forgot password link
forgotPasswordLink.addEventListener("click", function (e) {
  e.preventDefault();
  const email = prompt("Enter your email address:");
  if (email) {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert(
          "If an account exists with this email, a password reset link has been sent. Please check your inbox."
        );
      })
      .catch((error) => {
        console.error("Error sending password reset email:", error);
        alert("An error occurred. Please try again later.");
      });
  }
});

// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    // Email is good
    return true;
  } else {
    // Email is not good
    return false;
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}

// ====================================================
function checkAuthAndCleanSessions() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      clearOldSessions(user.uid)
        .then(() => {
          console.log("Old sessions cleaned");
        })
        .catch((error) => {
          console.error("Error cleaning old sessions:", error);
        });
    }
  });
}

checkAuthAndCleanSessions();
