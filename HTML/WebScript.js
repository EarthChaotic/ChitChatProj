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

    const response = await fetch("http://localhost:3000/friend/send", {
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
    console.error(error);
  }
}

async function fetchPendingUsernames() {
  try {
    let email = sessionStorage.getItem("email");
    const response = await fetch("http://localhost:3000/friend/pending", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function displayPendingUsernames() {
  const pendingUserContainer = document.getElementById("pendingUserContainer");
  const pendingUsernames = await fetchPendingUsernames();

  // Clear the container before adding new elements (if needed)
  pendingUserContainer.innerHTML = "";

  pendingUsernames.forEach((username) => {
    const newUsernameBlock = document.createElement("div");
    newUsernameBlock.className = "input-group mb-3";
    newUsernameBlock.innerHTML = `
      <span>
      <label id="receiver">
        ${username}
        </label>
        <button class="button" onclick="Cancel()">Cancel</button>
      </span>
    `;
    pendingUserContainer.appendChild(newUsernameBlock);
  });
}

async function fetchIncomingUsernames() {
  try {
    let email = sessionStorage.getItem("email");
    const response = await fetch("http://localhost:3000/friend/incoming", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function displayIncomingUsernames() {
  const incomingUserContainer = document.getElementById(
    "incomingUserContainer"
  );
  const incomingUsernames = await fetchIncomingUsernames();

  // Clear the container before adding new elements (if needed)
  incomingUserContainer.innerHTML = "";

  incomingUsernames.forEach((username) => {
    const newUsernameBlock = document.createElement("div");
    newUsernameBlock.className = "input-group mb-3";
    newUsernameBlock.innerHTML = `
      <span>
      <label id="sender">
        ${username}
      </label>
        <button class="button" onclick="Accept()">Accept</button>
        <button class="button" onclick="Decline()">Decline</button>
      </span>
    `;
    incomingUserContainer.appendChild(newUsernameBlock);
  });
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

async function fetchincFriendlist() {
  try {
    let email = sessionStorage.getItem("email");
    const response = await fetch("http://localhost:3000/friend/incfriendlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function displayincfriendlist() {
  const incfriendlistcontainer = document.getElementById(
    "incfriendlistcontainer"
  );
  const incfriendUsernames = await fetchincFriendlist();

  // Clear the container before adding new elements (if needed)
  incfriendlistcontainer.innerHTML = "";

  incfriendUsernames.forEach((username) => {
    const newUsernameBlock = document.createElement("div");
    newUsernameBlock.className = "input-group mb-3";
    newUsernameBlock.innerHTML = `
      <span>
      <label id="sender">
        ${username}
      </label>
        <button class="button" onclick="">MSG</button>
      </span>
    `;
    incfriendlistcontainer.appendChild(newUsernameBlock);
  });
}

async function fetchpenFriendlist() {
  try {
    let email = sessionStorage.getItem("email");
    const response = await fetch("http://localhost:3000/friend/penfriendlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function displaypenfriendlist() {
  const penfriendlistcontainer = document.getElementById(
    "penfriendlistcontainer"
  );
  const penfriendUsernames = await fetchpenFriendlist();

  // Clear the container before adding new elements (if needed)
  penfriendlistcontainer.innerHTML = "";

  penfriendUsernames.forEach((username) => {
    const newUsernameBlock = document.createElement("div");
    newUsernameBlock.className = "input-group mb-3";
    newUsernameBlock.innerHTML = `
      <span>
      <label id="sender">
        ${username}
      </label>
        <button class="button">MSG</button>
      </span>
    `;
    penfriendlistcontainer.appendChild(newUsernameBlock);
  });
}

async function Cancel(){

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

displayincfriendlist();
displaypenfriendlist();
displayIncomingUsernames();
displayPendingUsernames();
