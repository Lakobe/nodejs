const setUserInfo = () => {
  let userInfo = sessionStorage.getItem("userInfo");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    $("#userInfo img").attr("src", userInfo.avatar);
    $("#userInfo span").html(userInfo.username);
  } else {
    location.href = "/login.html";
  }
};

$(function() {
  setUserInfo();
});
