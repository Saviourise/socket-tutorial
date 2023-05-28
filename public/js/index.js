const form = document.querySelector("form");
const alertMsg = document.querySelector(".alertMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.username.value || !form.roomname.value) {
    alertMsg.style.display = "block";
    alertMsg.style.backgroundColor = "red";
    alertMsg.textContent = "Please fill all fields";
    setTimeout(() => {
      alertMsg.style.display = "none";
    }, 3000);
  } else {
    const username = form.username.value;
    const roomname = form.roomname.value;
    window.location.href = `/room.html?username=${username}&roomname=${roomname}`;
  }
});
