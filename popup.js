//initialize
function initialize(){
  if (localStorage.getItem('key') === "undefined" || 
    localStorage.getItem('key') === null ) 
  {
    toggleLoginUI(false);
  } else {
    toggleLoginUI(true);
  }
}
initialize()

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

// login_admin_password_api_data
function getLoginFormValues() {
  var account = document.querySelector("#accountinput");
  var password = document.querySelector("#passwordinput");

  return { email: account.value, password: password.value }
}

// login_admin_password_api
document.querySelector("#inputadmin").addEventListener("click", loginjson);

function loginjson(e){
  e.preventDefault();
  postData('http://localhost:3000/api/v1/login', getLoginFormValues())
    .then(
      function(data){
        localStorage.setItem('key', data['auth_token']);
        if (data['message'] === "ok") {
          toggleLoginUI(true);
        } 

        // data array to hash  
        let setboxselect = document.querySelector("#setboxselect");
        let current_setboxes = data['setboxes'].reduce(
          function(setbox, obj){ 
            setbox[obj.id] = obj.title; 
            return setbox; 
          }, {}
        );

        localStorage.setItem('setboxeslist',JSON.stringify(current_setboxes));
        let getsetboxeslist = JSON.parse(localStorage.getItem('setboxeslist'));

        setboxselect.innerHTML = Object.keys(getsetboxeslist).map(function(key) {
          return `<option id="${key}">${getsetboxeslist[key]}</option>`;
        });
        alert('歡迎登入HelloWord');
      }
    ) // JSON from `response.json()` call
    .catch(
      function(error){
        alert('帳號密碼錯誤喔！');
      }
    )
}

// add_setbox_word_api_data
function getSetboxFormValues() {
  var token = localStorage.getItem('key');
  var setboxselect = document.querySelector("#setboxselect");
  var word = document.querySelector("#wordinput");

  return { auth_token: token, title: setboxselect.value, card_word: word.value }
}

// add_setbox_word_api
document.querySelector("#inputjson").addEventListener("click", addwordjson);

function addwordjson(e){
  e.preventDefault();
  postData('http://localhost:3000/api/v1/addsetbox', getSetboxFormValues())
    .then(function(data){
      console.log(data);
      alert('新增成功！');
    } 
    ) // JSON from `response.json()` call
    .catch(error => console.error(error))
}

// toggleLoginUI
function toggleLoginUI(isLogin) {
  let admin = document.getElementById("admin");
  let newword = document.getElementById("newword");
  if (isLogin) {
    admin.classList.add("displaynone");
    newword.classList.remove("displaynone");
    
    // 登入狀態重開 extension 會爆炸 確保localStorage有東西才執行
    let list = localStorage.getItem('setboxeslist');
    if (list != null) {
      let getsetboxeslist = JSON.parse(list);
      setboxselect.innerHTML = Object.keys(getsetboxeslist).map(function(key) {
        return `<option id="${key}">${getsetboxeslist[key]}</option>`;
      });
    }
  } else {
    localStorage.clear();
    admin.classList.remove("displaynone");
    newword.classList.add("displaynone");
  }
}

let inputadmin = document.getElementById("inputadmin");
inputadmin.addEventListener("click", function(){ 
  // console.log('－－－－－');
  // toggleLoginUI(true);
});

let logout = document.getElementById("logout");
logout.addEventListener("click", function(e){
  // console.log('－－－－－');
  logoutjson(e);
  // toggleLoginUI(false);
});

// logout_token_data
function getLogoutFormValues(){
  var logouttoken = localStorage.getItem('key');
  return { auth_token: logouttoken }
}

// logout_token_data_api
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