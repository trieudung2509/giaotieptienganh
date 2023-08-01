$(document).ready(function () {
  // call api here

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_REGEX = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
  const options = {
    1: "Học thử 1 buổi miễn phí",
    2: "Khóa học nhanh (Giảm 30%): 599.000đ",
    3: " Khóa 1 tháng (giảm 40%): 1.590.000đ",
  };
  const values = {
    1: "Học thử 1 buổi miễn phí",
    2: "Khóa học nhanh (Giảm 30%)",
    3: " Khóa 1 tháng (giảm 40%)",
  };
  const BASE_URL = "https://api.stg.bituclub.com/v1.2";

  const requiredMessage = "Xin vui lòng điền thông tin";
  const emailInValid = "Địa chỉ email không hợp lệ";
  const phoneInValid = "Số điện thoại không hợp lệ";

  function showToast(message, time) {
    Toastify({
      text: message,
      className: "info",
      style: {
        background: "linear-gradient(to right, #ff6d03, #96c93d)",
      },
      duration: time,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
    }).showToast();
  }
  function callApi(phone, email, username, demand) {
    fetch(`${BASE_URL}/user-leads/record`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        phone: phone,
        email: email,
        country: "VN",
        source: "Web giaotieptienganh",
        name: username,
        demand,
      }),
    })
      .then((response) => {
        if (response?.status === 200) {
          $(".error-message").each(function () {
            $(this).hide();
          });
          showToast(
            "Chúc mừng bạn đã đăng ký học thử thành công. Bitu sẽ liên hệ lại trong thời gian sớm nhất!",
            6000
          );

          $('input:not([type="button"])').each(function () {
            $(this).val("");
          });
          $(".dropdown-register-type").text(values[1]);
          $(".dropdown-register-type").attr("value", "1");
        } else {
          showToast(
            "Đã xảy ra lỗi. Vui lòng kiểm tra lại thông tin trước khi bấm đăng ký!",
            3000
          );
        }
      })
      .catch(function (err) {
        showToast(
          "Đã xảy ra lỗi. Vui lòng kiểm tra lại thông tin trước khi bấm đăng ký!",
          3000
        );
      });
  }

  $("#banner-register-btn").on("click", function () {
    const username = $("#banner-username").val();
    const phone = $("#banner-phone").val();
    const email = $("#banner-email").val();
    const type = $(".dropdown-register-type").attr("value");

    $(".error-message").each(function () {
      $(this).hide();
    });
    let isExistError = false;
    if (!username) {
      isExistError = true;
      $(".input-wrapper-username")
        .find(".input-wrapper")
        .css("margin-bottom", "0px");
      $(".input-wrapper-username").append(
        `<p class="error-message">${requiredMessage}</p>`
      );
    } else {
      isExistError = false;
      $(".input-wrapper-username")
        .find(".input-wrapper")
        .css("margin-bottom", "16px");
    }
    if (!phone) {
      isExistError = true;
      $(".input-wrapper-phone")
        .find(".input-wrapper")
        .css("margin-bottom", "0px");
      $(".input-wrapper-phone").append(
        `<p class="error-message">${requiredMessage}</p>`
      );
    } else if (!PHONE_REGEX.test(phone)) {
      isExistError = true;
      $(".input-wrapper-phone")
        .find(".input-wrapper")
        .css("margin-bottom", "0px");
      $(".input-wrapper-phone").append(
        `<p class="error-message">${phoneInValid}</p>`
      );
    } else {
      isExistError = false;
      $(".input-wrapper-phone")
        .find(".input-wrapper")
        .css("margin-bottom", "16px");
    }
    if (!email) {
      isExistError = true;
      $(".input-wrapper-email")
        .find(".input-wrapper")
        .css("margin-bottom", "0px");
      $(".input-wrapper-email").append(
        `<p class="error-message">${requiredMessage}</p>`
      );
    } else if (!EMAIL_REGEX.test(email)) {
      isExistError = true;
      $(".input-wrapper-email")
        .find(".input-wrapper")
        .css("margin-bottom", "0px");
      $(".input-wrapper-email").append(
        `<p class="error-message">${emailInValid}</p>`
      );
    } else {
      isExistError = false;
      $(".input-wrapper-email")
        .find(".input-wrapper")
        .css("margin-bottom", "16px");
    }

    console.log("isExistError", isExistError);
    if (!isExistError) {
      const demand = options[+type];
      callApi(phone, email, username, demand);
    }
  });

  $("#languageDropdown").on("click", function () {
    console.log("dropdown-icon");
    $(this).find(".dropdown-icon").toggleClass("rotate");
  });

  $(".dropdown-register-type-item").on("click", function () {
    const text = $(this).text();
    const currentValue = $(this).attr("value");
    $(".dropdown-register-type").text(values[+currentValue]);
    $(".dropdown-register-type").attr("value", currentValue);
  });

  $("#program-register-btn").on("click", function () {
    const username = $("#register-username").val();
    const phone = $("#register-phone").val();
    const email = $("#register-email").val();

    $(".error-message").each(function () {
      $(this).hide();
    });
    let isExistError = false;
    if (!username) {
      isExistError = true;
      $(".register-username-wrapper")
        .parent()
        .append(`<p class="error-message">${requiredMessage}</p>`);
    } else {
      isExistError = false;
    }
    if (!phone) {
      isExistError = true;
      $(".register-phone-wrapper")
        .parent()
        .append(`<p class="error-message">${requiredMessage}</p>`);
    } else if (!PHONE_REGEX.test(phone)) {
      isExistError = true;
      $(".register-phone-wrapper")
        .parent()
        .append(`<p class="error-message">${phoneInValid}</p>`);
    } else {
      isExistError = false;
    }
    if (!email) {
      isExistError = true;
      $(".register-email-wrapper")
        .parent()
        .append(`<p class="error-message">${requiredMessage}</p>`);
    } else if (!EMAIL_REGEX.test(email)) {
      isExistError = true;
      $(".register-email-wrapper")
        .parent()
        .append(`<p class="error-message">${emailInValid}</p>`);
    } else {
      isExistError = false;
    }

    if (!isExistError) {
      callApi(phone, email, username);
    }
  });
});
