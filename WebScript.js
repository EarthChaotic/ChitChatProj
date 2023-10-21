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

async function sendFriendRequest() {
  try {
    const sender = await getCurrentUsername();
    const receiver = document.getElementById("Receiver").value;

    const response = await fetch("http://localhost:3000/users/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderuname: sender,
        receiveruname: receiver,
      }),
    });

    if (response.status === 400) {
      const data = await response.json();
      alert(data.message);
    } else if (response.ok) {
      alert("Friend request sent!");
    }
  } catch (error) {
    console.error("Error sending the friend request:", error);
  }
}
