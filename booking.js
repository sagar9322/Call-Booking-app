
function printUserDetail(event) {
  event.preventDefault();
  // Get form input values
  const name = document.getElementById("fname").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  // converting userdetail into object
  var userDetail = { name: name, email: email, phone: phone, date: date, time: time };

  //now uploding post to server
  axios.post("http://localhost:3000/submit", userDetail)
    .then(() => {
      console.log("POSTED DONE");
      getUserDetailsFromServer(); // Fetch user details after successful POST request
    })

  //calling getuserdetail function to show user detail when we click button

  var itemList = document.getElementById('items');
  var displayDetail = userDetail.Name + '-' + userDetail.Email + '-' + userDetail.Phone + '-' + userDetail.Date + '-' + userDetail.Time;

  var li = document.createElement('li');
  li.className = 'list-group-item';
  li.appendChild(document.createTextNode(displayDetail));

  var deleteBtn = document.createElement('button');
  var editBtn = document.createElement('button');

  deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
  editBtn.className = 'btn btn-primary btn-sm float-right edit';

  deleteBtn.style.float = 'right';
  editBtn.style.float = 'right';
  editBtn.style.marginRight = '5px';
  editBtn.style.marginLeft = '5px';

  deleteBtn.appendChild(document.createTextNode('Delete'));
  editBtn.appendChild(document.createTextNode('Edit'));

  deleteBtn.onclick = (event) => {
    event.preventDefault();
    deleteFromServer(uniqId);
    itemList.removeChild(li);
  }
  editBtn.onclick = (event) => {
    event.preventDefault();
    deleteFromServer(uniqId);
    itemList.removeChild(li);
    // filling all value in input field to edit
    document.getElementById("fname").value = userDetail.name;
    document.getElementById("email").value = userDetail.email;
    document.getElementById("phone").value = userDetail.phone;
    document.getElementById("date").value = userDetail.date;
    document.getElementById("time").value = userDetail.time;
  }


  li.appendChild(deleteBtn);
  li.appendChild(editBtn);

  itemList.appendChild(li);

  document.getElementById("fname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("date").value = "";
  document.getElementById("time").value = "";

}

function deleteFromServer(uniqId) {
  axios.delete(`http://localhost:3000/${uniqId}`)
    .then(() => {
      getUserDetailsFromServer();
    })
}

function getUserDetailsFromServer() {
  axios.get("http://localhost:3000/")
    .then((res) => {
      var itemList = document.getElementById('items');
      itemList.innerHTML = ""; // Clear the current list
      for (let i = 0; i < res.data.length; i++) {
        const userDetail = res.data[i];
        uniqId = res.data[i]['id'];
        var displayDetail = userDetail.name + '-' + userDetail.email + '-' + userDetail.phone + '-' + userDetail.date + '-' + userDetail.time;

        var li = document.createElement('li');
        li.className = 'list-group-item';
        li.appendChild(document.createTextNode(displayDetail));

        var deleteBtn = document.createElement('button');
        var editBtn = document.createElement('button');

        deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
        editBtn.className = 'btn btn-primary btn-sm float-right edit';

        deleteBtn.style.float = 'right';
        editBtn.style.float = 'right';
        editBtn.style.marginRight = '5px';
        editBtn.style.marginLeft = '5px';

        deleteBtn.appendChild(document.createTextNode('Delete'));
        editBtn.appendChild(document.createTextNode('Edit'));

        function deleteList(li, uniqId) {
          deleteBtn.onclick = (event) => {
            event.preventDefault();
            deleteFromServer(uniqId);
            itemList.removeChild(li);
          }
        }
        deleteList(li, uniqId);
        editBtn.onclick = (event) => {
          event.preventDefault();
          deleteFromServer(uniqId);
          itemList.removeChild(li);
          // filling all value in input field to edit
          document.getElementById("fname").value = userDetail.name;
          document.getElementById("email").value = userDetail.email;
          document.getElementById("phone").value = userDetail.phone;
          document.getElementById("date").value = userDetail.date;
          document.getElementById("time").value = userDetail.time;
        }


        li.appendChild(deleteBtn);
        li.appendChild(editBtn);

        itemList.appendChild(li);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// Call getUserDetailsFromServer() when the page is loaded
window.addEventListener("DOMContentLoaded", getUserDetailsFromServer);
