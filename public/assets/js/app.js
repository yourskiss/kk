// page refresh on orientation change === START 
$(window).on('orientationchange', function () 
{
    location.reload(true);
});
// page refresh on orientation change === END 

// page refresh on orientation change === START 
$(window).on('load', function () 
{
   setTimeout(function(){  $("#pageloader").fadeOut(500); }, 1000);
   setTimeout(function(){ if(sessionStorage.getItem('walkthrough') != 'isactive') { showhidewalkthrough('show'); }  }, 4000);
   
});
// page refresh on orientation change === END 




 
// only number validation === start
function isNumber(e) 
{
    var regex = new RegExp("^[0-9]+$");
    var strigChar = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(strigChar)) {
        return true;
    }
    return false
}
// only number validation === end





// only Letter validation === start
function isLetter(e) 
{
    var regex = new RegExp("^[a-zA-Z ]+$");
    var strigChar = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(strigChar)) {
        return true;
    }
    return false
}
// only Letter validation === end




 // only AlphaNumeric  === start
function isAlphaNumeric(e) 
{
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var strigChar = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(strigChar)) {
        return true;
    }
    return false
}
// only AlphaNumeric  === end
    




 // disable enter key  === start
$(document).on('keyup keypress', 'input[type="text"], input[type="submit"]', function(e) {
  if(e.keyCode == 13) 
  {
    e.preventDefault();
    return false;
  }
});
 // disable enter key  === end



    
 // get ipAddress === start 
    var getIpAddress = '';
    $.getJSON("https://api.ipify.org?format=json", function(data) { 
        getIpAddress = data.ip;
    });
 // get ipAddress === end 




// get osName === start 
    var getOs = 'Unknown';
    if (navigator.appVersion.indexOf("Win") != -1) { getOs = 'Windows' }
    if (navigator.appVersion.indexOf("Mac") != -1) { getOs = 'Mac' }
    if (navigator.appVersion.indexOf("X11") != -1) {  getOs = 'UNIX' }
    if (navigator.appVersion.indexOf("Linux") != -1) { getOs = 'Linux' }
 // get osName === end 




// get browserName === start 
    var getBrowser = 'Unknown';
    const userAgent = window.navigator.userAgent.toLowerCase();
    userAgent.indexOf('edge') > -1 ? getBrowser = 'edge'
      : userAgent.indexOf('edg') > -1 ? getBrowser = 'edge'
      : userAgent.indexOf('opr') > -1 && !!window.opr ? getBrowser ='opera'
      : userAgent.indexOf('chrome') > -1 && !!window.chrome ?  getBrowser ='chrome'
      : userAgent.indexOf('trident') > -1 ? getBrowser = 'ie'
      : userAgent.indexOf('firefox') > -1 ? getBrowser = 'firefox'
      : userAgent.indexOf('safari') > -1 ? getBrowser = 'safari'
      : getBrowser = 'other';
 // get browserName === end 

  

 // show hide menu  === start
 $("#header_dp").click(function(e)
 {
    e.preventDefault();
    e.stopPropagation();
    if($(this).hasClass('showhidemenu'))
    {
        $(this).removeClass('showhidemenu');
        $("#header_menu").slideUp(300);
    }
    else
    {
        $(this).addClass('showhidemenu');
        $("#header_menu").slideDown(300);
    }
});
$('body').click(function(e) // close on click body
{    
        if (e.target != $('#header_dp') || e.target != $('#header_menu') || e.target != $('#header_menu li')) 
        {
            $("#header_dp").removeClass("showhidemenu");
            $("#header_menu").slideUp(500);
        }
});
// show hide menu  === end


 // show hide Prompt  === start
 function showHidePwaPrompt(val)
 {
    // debugger;
    if(val == 'hide')
    {
        $("#pwaPrompt").fadeOut(300);
    }
    else
    {
        $("#pwaPrompt").fadeIn(300);
    }
 }
// show hide Prompt  === end

 

// showHideAlert === start 
function showHideAlert(val, msg)
{
    $("#alertmsg").html(msg);
    if(val == 'show')
    {
        $("#alertPopup").fadeIn(300);
    }
    else if(val == 'hide')
    {
        $("#alertPopup").fadeOut(300);
    }
    else
    {
        // nothing
    }
}
// showHideAlert === end 


// showhide walkthrough   === start
function showhidewalkthrough(val)
{
    if(val == 'show')
    {
        sessionStorage.setItem('walkthrough','isactive');
        $("#walkthrough").fadeIn(300);
        $(".wt_slider").slick("refresh");
    }
    else if(val == 'hide')
    {
        $("#walkthrough").fadeOut(300);
    }
    else
    {
        // nothing
    }
}
// showhide walkthrough    === end  
 

 
 var screenLS = localStorage.getItem('screen'); // selected screen
 var logintoken = localStorage.getItem('logintoken'); // selected screen
 var baseurl = "https://kerakollapi.zeroprompts.com/api/"; // baseurl
 

// change screen === start 
function showScreens(val)
{
    // debugger;
    localStorage.setItem('screen', val);
    $('.screencontainer').slideUp(300);
    $("#"+val+"_screen").slideDown(300);

    if(val == 'registerapproval')
    {
        showregisterinfo();
    }
}
// change screen === end 



// logout === start 
function logout()
{
    showScreens('login');
    localStorage.removeItem('logintoken');
    localStorage.removeItem('registername');
    localStorage.removeItem('profilepicture');
    $("#mainheader").removeClass('login');
    $("#login_mobile, #register_mobile, #register_otp").prop("disabled", false);
}
// logout === end 


// set screen === start 
 function setScreens()
 {
    // debugger;
    $('.screencontainer').slideUp(300);

    if(logintoken == null)
    {
        $("#mainheader").removeClass('login');
    }
    else 
    {
        $("#mainheader").addClass('login');
    }

    if(screenLS == null || screenLS == 'login')
    {
        localStorage.removeItem('registername');
        localStorage.removeItem('profilepicture');
    }

    if(screenLS == null)
    {
        $("#login_screen").slideDown(300);
    }
    else
    {
        $("#"+screenLS+"_screen").slideDown(300);
        
        if(screenLS == 'dashboard' &&  logintoken != null)
        {
            showuserdetails(); 
        }
    }

    if(screenLS == 'registerapproval')
    {
        showregisterinfo();
    }
 }
 setScreens();
// set screen === end 




// registerValidation === start 
function registerValidation()
{
/*
register_container_mobile
register_container_form
register_container_otp

register_mobile error_register_mobile
register_photo error_register_photo
register_firstname error_register_firstname
register_lastname error_register_lastname
register_emailid error_register_emailid
register_gender error_register_gender
register_city error_register_city
register_aadhaar error_register_aadhaar
register_otp error_register_otp
*/

    // debugger;
    let emailReg = new RegExp('[a-z0-9._-]+@[a-z0-9]+\.[a-z]{2,7}');
    let adhaarRegex = new RegExp(/^[2-9]{1}[0-9]{11}$/);
    $(".registerError").hide().html('');
    if($("#register_mobile").val() == '')
    {
        $("#error_register_mobile").show().html('Please enter your mobile number');
        return false;
    }
    else if ($("#register_mobile").val().length !== 10) 
    {
        $("#error_register_mobile").show().html('Please enter 10 digit mobile number');
        return false;
    }
    else if (($("#register_mobile").val().indexOf('9')) != 0 && ($("#register_mobile").val().indexOf('8')) != 0 && ($("#register_mobile").val().indexOf('7')) != 0 && ($("#register_mobile").val().indexOf('6')) != 0) 
    {
        $("#error_register_mobile").show().html('Mobile number start with digits like 9, 8, 7, 6');
        return false;
    }
    else
    {
        $("#register_container_otp").slideDown(200);
        $("#register_mobile").prop("disabled", true);
        if($("#register_otp").val() == '')
        {
            $("#error_register_otp").show().html('Please enter OTP');
            return false;
        }
        else if ($("#register_otp").val().length !== 6) 
        {
            $("#error_register_otp").show().html('Please enter valid OTP');
            return false;
        }
        else 
        { 
            $("#register_container_mobile").slideUp(200);
            $("#register_container_otp").slideUp(200);
            $("#register_container_form").slideDown(200);
            $("#register_otp").prop("disabled", true);
            
            if($("#register_photo").val() == '')
            {
                $("#error_register_photo").show().html('Please select profile photo');   
                return false;
            } 
            else if($("#register_firstname").val() == '')
            {
                $("#error_register_firstname").show().html('Please enter your first name');
                return false;
            }
            else if($("#register_lastname").val() == '')
            {
                $("#error_register_lastname").show().html('Please enter your last name');
                return false;
            }
            else if($("#register_emailid").val() == '')
            {
                $("#error_register_emailid").show().html('Please enter your email address');
                return false;
            }
            else if (!emailReg.test($("#register_emailid").val())) 
            {
                $("#error_register_emailid").show().html('Please enter valid email address');
                return false;
            }
            else if($("#register_gender").val() == '' || $("#register_gender").val() == 0)
            {
                $("#error_register_gender").show().html('Please select gender');
                return false;
            }
            else if($("#register_city").val() == '')
            {
                $("#error_register_city").show().html('Please enter city name');
                return false;
            }
            else if($("#register_aadhaar").val() == '')
            {
                $("#error_register_aadhaar").show().html('Please enter aadhaar number');
                return false;
            }
            else if ($("#register_aadhaar").val().length !== 12) 
            {
                $("#error_register_aadhaar").show().html('Please enter 12 digit aadhaar number');
                return false;
            }
            else if (!adhaarRegex.test($("#register_aadhaar").val())) 
            {
                $("#error_register_aadhaar").show().html('Please enter valid aadhaar number');
                return false;
            }
            else 
            {
                $(".registerError").hide().html('');
                getRegister();
                return true;
            }
        }
    }
}
// registerValidation === end 
 


 


// loginValidation === start 
function loginValidation()
{
/*
    login_container_mobile
    login_container_otp

    login_mobile error_login_mobile
    login_otp error_login_otp
*/
    debugger;
    $(".registerError").hide().html('');
    if($("#login_mobile").val() == '')
    {
        $("#error_login_mobile").show().html('Please enter mobile number');
        return false;
    }
    else if($("#login_mobile").val().length != 10)
    {
        $("#error_login_mobile").show().html('Please enter valid mobile number');
        return false;
    }
    else if (($("#login_mobile").val().indexOf('9')) != 0 && ($("#login_mobile").val().indexOf('8')) != 0 && ($("#login_mobile").val().indexOf('7')) != 0 && ($("#login_mobile").val().indexOf('6')) != 0) 
    {
        $("#error_login_mobile").show().html('Mobile number start with digits like 9, 8, 7, 6');
        return false;
    }
    else 
    { 
        // $("#login_container_mobile").slideUp(200);
        $("#login_container_otp").slideDown(200);
        $("#login_mobile").prop("disabled", true);
        if($("#login_otp").val() == '')
        {
            $("#error_login_otp").show().html('Please enter OTP');
            return false;
        }
        else if ($("#login_otp").val().length !== 6) 
        {
            $("#error_login_otp").show().html('Please enter valid OTP');
            return false;
        }
        else 
        {
            $(".registerError").hide().html('');
            getLogin();
            return true;
        }
    }
}
// loginValidation === end 




// login === start 
function getLogin()
{
    $("#sectionloader").fadeIn(300);
    var useridLogin = 0;
    var login_mobile = $("#login_mobile").val()
    $.ajax({
        type: "GET",
        url: baseurl+"Customer/UserInfo?userid="+useridLogin+"&phonenumber="+ login_mobile,  
        dataType: "json",
        headers : { 'Accept' : 'application/json', "Content-Type" : "application/json" },
        success: function (res) {
                         console.log("Login === ", res);
                        if(res.result_Code == 0)
                        {
                           localStorage.setItem('logintoken', login_mobile)
                            showScreens('dashboard');
                            showuserdetails();
                            $("#mainheader").addClass('login');
                            setTimeout(function() { 
                                $(".registerInput, .registerOtp input[type='text']").val(''); 
                                $("#login_container_mobile").show();
                                $("#login_container_otp").hide();
                                $("#login_mobile").prop("disabled", false);
                            }, 1000);
                        }
                        else
                        {
                            showHideAlert('show', res.result_Status);
                        }
                        $("#sectionloader").fadeOut(300);
        },
        error: function (err) {
            showHideAlert('show', err);
            $("#sectionloader").fadeOut(300);
        }
    });
}
// login === end 
 


// Register === start 
function getRegister()
{
    $("#sectionloader").fadeIn(300);
    var userlist = {
        first_Name: $("#register_firstname").val(),
        last_Name: $("#register_lastname").val(),
        full_Name: $("#register_firstname").val() + ' ' + $("#register_lastname").val(),
        phone_Number: $("#register_mobile").val(),
        email_Address: $("#register_emailid").val(),
        aadhaar_Info: $("#register_aadhaar").val(),
        address_Line1: "Test Address",
        language_Preference: "English",
        location_Page: window.location.pathname,
        iP_Address: getIpAddress,
        oS_Details: getOs,
        browser_Details: getBrowser
    }
        $.ajax({
            type: "POST",
            url: baseurl + "Customer/SaveUser", 
            data: JSON.stringify(userlist),
            headers: { 'Accept' : 'application/json', "Content-Type" : "application/json" },
            dataType: "json",
            success: function (res) {
                         console.log("Register === ", res);
                        if(res.result_Code == 0)
                        {
                            localStorage.setItem('registername', res.result.full_Name);
                            showScreens('registerapproval');
                            
                            setTimeout(function() { 
                                $("#register_container_mobile").show();
                                $("#register_container_form").hide();
                                $("#register_container_otp").hide();
                                $(".registerInput, .registerSelect, .registerOtp input[type='text']").val(''); 
                                $("#register_mobile, #register_otp").prop("disabled", false);
                                $("#register_photo").val('');
                              //  $("#register_photo_name").show();
                            }, 1000);
                        }
                        else
                        {
                            showHideAlert('show', res.result_Status);
                        }
                        $("#sectionloader").fadeOut(300);
            },
            error: function (err) 
            {
                showHideAlert('show', err);
                $("#sectionloader").fadeOut(300);
            }
      });
}
// Register === end 





// show register info === start 
function showregisterinfo()
{
    // debugger;
    var registerphoto = localStorage.getItem('profilepicture');
    var registername = localStorage.getItem('registername');
    $("#register_info_photo").attr("src",registerphoto);
    $("#register_info_name").text(registername);
}
//  show register info === end 


// show user info === start 
function showuserdetails()
{
    // debugger;
    $("#sectionloader").fadeIn(300);
    var storedata = '';
    var useridLogin = 0;
    var logintoken = localStorage.getItem('logintoken');
    $.ajax({
        type: "GET",
        url: baseurl+"Customer/UserInfo?userid="+useridLogin+"&phonenumber="+ logintoken,  
        dataType: "json",
        headers : { 'Accept' : 'application/json', "Content-Type" : "application/json" },
        success: function (res) {
                         console.log("showuserdetails === ", res);
                        if(res.result_Code == 0)
                        {
                            storedata += `<h2>${res.result.first_Name}</h2><p>${res.result.phone_Number}</p></div>`;     
                            $("#datacontainer").html(storedata); 
                            $("#userfullname").text(res.result.first_Name);
                        }
                        else
                        {
                            showHideAlert('show', res.result_Status);
                        }
                        $("#sectionloader").fadeOut(300);
        },
        error: function (err) {
            showHideAlert('show', err);
            $("#sectionloader").fadeOut(300);
        }
    });

}
//  show user info === end 



// product cateloges slider   === start
$('.pc_slider').slick({
            slidesToShow:1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            fade: true,
            autoplay: true,
            autoplaySpeed: 4000,
            infinite: true,
            adaptiveHeight: false,
            centerMode: false,
            centerPadding: '0',
            initialSlide:0
}); 
// product cateloges  slider   === end  

// walkthrough slider   === start
$('.wt_slider').slick({
    slidesToShow:1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    adaptiveHeight: false,
    centerMode: false,
    centerPadding: '0',
    initialSlide:0
}); 
// walkthrough slider   === end  





// profilepicture update === start 
function profilepicture(val1, val2, val3) 
{
    debugger;
    var fileInput = document.getElementById(val1).files;
    var fsize = fileInput[0].size;
    $("#"+val3).text(fileInput[0].name);
    var file = Math.round((fsize / 1024));
    if (file > 2048) 
    {  
        $("#"+val1).val('');
        $('#'+val2).show().html("Please select a file less than 2 mb");
        $("#"+val3).text('Add Profile Photo');
    }
    else 
    {
        $('#'+val2).hide().html("");
    }
}
//  profilepicture update === end 



	// select file ===== start
    function cropperjsSelectImg(fileSelectInput) 
    {
        if ($("#"+fileSelectInput).val() != '' && parseInt($("#"+fileSelectInput)[0].files[0].size / 1024) > 2048) 
        {  
           // console.log(parseInt($("#"+fileSelectInput)[0].files[0].size / 1024));
            $("#"+fileSelectInput).val('');
            $("#error_register_photo").show().text("Please select a file less than 2 mb");
        }
        else
        {
            $("#sectionloader").fadeIn(300);
            $("#error_register_photo").hide();
           // $("#register_photo_name").hide()
            var filedata = $('#'+fileSelectInput).prop('files')[0];
            $('#cropPopup').fadeIn(300);
            $('#saveButton_1').show();
             if ($("#"+fileSelectInput).val() != '') 
             {
                const reader = new FileReader();
                reader.onload = evt => 
                {
                    if (evt.target.result) 
                    {
                        let img = document.createElement('img');
                        img.id = 'cropFrame';
                        img.src = evt.target.result;
                        $('#cropContainer').html('').append(img);
                        cropper = new Cropper(img);
                    }
                };
                reader.readAsDataURL(filedata);
                console.log(filedata);
                setTimeout(function(){ $("#sectionloader").fadeOut(300); }, 1000); 
            }
            
        }
	}
    // select file ===== end
	 
	// save on click  ===== start
	function cropperjsSaveImg() 
    {
        let imgSrc = cropper.getCroppedCanvas({ width: 300 }).toDataURL();
        $('#cropPopup').fadeOut(300);
        $('#cropContainer').html('');
        $(".cropSaveButton").hide();
        $('#outputImg_1').attr('src',imgSrc).show();
        console.log(imgSrc);
        localStorage.setItem('profilepicture', imgSrc);
	}
    // save on click  ===== end






//  showhideQrCode === start 
function showhideQrCode(val)
{
    if(val == 'show')
    {
        $("#qrscanpopup").fadeIn(300);
    }
    else if(val == 'hide')
    {
        $("#qrscanpopup").fadeOut(300);
    }
    else
    {
        // nothing
    }
}
//  showhideQrCode   === end


//  qr code impliment === start 
function domReady(fn) 
{
    if (document.readyState === "complete" ||document.readyState === "interactive") { setTimeout(fn, 1000); } 
    else { document.addEventListener("DOMContentLoaded", fn); }
}
domReady(function() 
{
    function onScanSuccess(decodeText, decodeResult) 
    {
        alert(decodeText, decodeResult);
    }
    let htmlscanner = new Html5QrcodeScanner("my-qr-reader",{ fps: 10, qrbos: 250 });
    htmlscanner.render(onScanSuccess);
});
// qr code impliment  === end



