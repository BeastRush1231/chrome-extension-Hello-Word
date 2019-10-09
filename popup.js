// postdata
function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'include', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // 輸出成 json
}

// 回傳帳號密碼
function getLoginFormValues() {
  var account = document.querySelector("#accountinput");
  var password = document.querySelector("#passwordinput");

  return { email: account.value, password: password.value }
}

// 輸入帳號密碼
document.querySelector("#inputadmin").addEventListener("click", loginjson);

function loginjson(e){
  e.preventDefault();
  postData('http://localhost:3000/api/v1/login', getLoginFormValues())
    .then(
      function(data){
        console.log(data);
        localStorage.setItem('key', data['auth_token']);
        if (data['message'] === "ok") {
          toggleLoginUI(true);
        }
      }
    ) // JSON from `response.json()` call
    .catch(
      function(error){
        console.log(error); 
      }
    )
}

// 回傳學習集單字
function getSetboxFormValues() {
  var word = document.querySelector("#wordinput");
  var setbox = document.querySelector("#setboxinput");

  return { setboxes_title: word.value, card_word: setbox.value }
}

// 輸入學習集、單字
document.querySelector("#inputjson").addEventListener("click", addwordjson);

function addwordjson(e){
  e.preventDefault();
  postData('http://localhost:3000/helloword/json', getSetboxFormValues())
    .then(data => console.log(data)) // JSON from `response.json()` call
    .catch(error => console.error(error))
}

// toggleLoginUI
function toggleLoginUI(isLogin) {
  let admin = document.getElementById("admin");
  let newword = document.getElementById("newword");
  if (isLogin) {
    admin.classList.add("displaynone");
    newword.classList.remove("displaynone");
  } else {
    localStorage.clear();
    admin.classList.remove("displaynone");
    newword.classList.add("displaynone");
  }
}

let inputadmin = document.getElementById("inputadmin");
inputadmin.addEventListener("click", function(){ 
  console.log('－－－－－');
  // toggleLoginUI(true);
});

let logout = document.getElementById("logout");
logout.addEventListener("click", function(e){
  console.log('－－－－－');
  logoutjson(e);
  // toggleLoginUI(false);
});

// -----------------------------------------------------
// 回傳token
function getLogoutFormValues(){
  var logouttoken = localStorage.getItem('key');
  return { auth_token: logouttoken }
}

// logoutapi
function logoutjson(e){
  e.preventDefault();
  postData('http://localhost:3000/api/v1/logout', getLogoutFormValues())
    .then(
      function(data){
        console.log(data);
        toggleLoginUI(false);
      }
    ) // JSON from `response.json()` call
    .catch(
      function(error){
        console.log(error); 
      }
    )
}