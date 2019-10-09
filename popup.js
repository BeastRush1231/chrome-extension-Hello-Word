// 輸入帳號密碼

function accountinput() {
  var inputText = document.querySelector("#accountinput");
  return inputText.value;
}

function passwordinput() {
  var inputText = document.querySelector("#passwordinput");
  return inputText.value;
}

document.querySelector("#inputadmin").addEventListener("click", loginjson);

function loginjson(e){
  e.preventDefault();
  postData('http://localhost:3000/api/v1/login', {email: accountinput(),password: passwordinput()})
    .then(
      function(data){
        console.log(data);
        localStorage.setItem('key', data['auth_token']);
        // if (data['message'] === "ok") {
        //   admin.classList.add("displaynone");
        //   newword.classList.remove("displaynone");
        // }
      }
    ) // JSON from `response.json()` call
    .catch(
      function(error){
        console.log(error); 
      }
    )

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
}

// 輸入學習集、單字

function wordinput() {
  var inputText = document.querySelector("#wordinput");
  return inputText.value;
}

function setboxinput() {
  var inputText = document.querySelector("#setboxinput");
  return inputText.value;
}

document.querySelector("#inputjson").addEventListener("click", addwordjson);

function addwordjson(e){
  // e.preventDefault();
  postData('http://localhost:3000/helloword/json', {setboxes_title: setboxinput(),card_word: wordinput()})
    .then(data => console.log(data)) // JSON from `response.json()` call
    .catch(error => console.error(error))

  function postData(url, data) {
    // Default options are marked with *
    return fetch(url, {
      body: JSON.stringify(data), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, same-origin, *omit
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
}

// 判斷 localStorage value token 存在

let admin = document.getElementById("admin");
let newword = document.getElementById("newword");

let inputadmin = document.getElementById("inputadmin");

inputadmin.addEventListener("click", loginfunction);

function loginfunction(){
  admin.classList.add("displaynone");
  newword.classList.remove("displaynone");
}

let logout = document.getElementById("logout");

logout.addEventListener("click", logoutfunction);

function logoutfunction(){
  localStorage.clear();
  admin.classList.remove("displaynone");
  newword.classList.add("displaynone");
}