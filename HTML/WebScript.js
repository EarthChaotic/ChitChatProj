async function Register() {
  var email = document.getElementById("email").value;
  var uname = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        uname,
        password,
      }),
    });

    if (response.status === 400) {
      const data = await response.json();
      alert(data.message);
    } else if (response.ok) {
      alert("Registration successful");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function Login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      alert("Invalid Email or Password");
      throw new Error("Login failed");
    }
    sessionStorage.setItem("email", email);

    alert("Login successful");
    window.location.href = "main.html";
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getCurrentUsername() {
  let data = sessionStorage.getItem("email");
  const response = await fetch("http://localhost:3000/users/Session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data,
    }),
  });

  const username = await response.json();
  return username;
}

async function Accept() {
  const email = sessionStorage.getItem("email");
  const sender = document.getElementById("sender").textContent.trim();

  const response = await fetch("http://localhost:3000/friend/accept", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      senderuname: sender,
    }),
  });

  if (response.ok) {
    alert("Friend Request Accepted");
  }
}

async function Decline() {
  const email = sessionStorage.getItem("email");
  const sender = document.getElementById("sender").textContent.trim();

  const response = await fetch("http://localhost:3000/friend/decline", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      senderuname: sender,
    }),
  });
  if (response.ok) {
    alert("Friend Request Declined");
  }
}

async function Cancel() {
  const email = sessionStorage.getItem("email");
  const receiver = document.getElementById("receiver").textContent.trim();

  const response = await fetch("http://localhost:3000/friend/cancel", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      receiver: receiver,
    }),
  });
  if (response.ok) {
    alert("Friend Request Cancel");
  }
}