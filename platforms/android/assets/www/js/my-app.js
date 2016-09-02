// Initialize your app
var myApp = new Framework7({
    upscroller: {text : 'Yukarı'},
    domCache: true,
    template7Pages: true,
    swipePanel: 'left'
});
// Export selectors engine
var $$ = Dom7;


var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});


window.localStorage.setItem('page',1);


$(document).on('click','.tab-link',function(){
    var id = $(this).attr('id');

    if(id === 'soru-detay-page') {

      var icerik_id = $(this).attr('data-detay-id');
      $('.detay-icerik').text(icerik_id);

    }

    if(id === 'icerik-detay-page') {
      var icerik_id = $(this).attr('data-detay-id');
      $('.detay-icerik').text(icerik_id);


    }

    window.localStorage.setItem('page',id);

});

$(document).on('click','.soru-detay-back',function() {
  $('.soru-back').addClass('active');
})

$(document).on('click','.icerik-detay-back',function() {
  $('.icerik-back').addClass('active');
})

// Base url.
var base_url = 'http://gider.xyz/hackingfest/web/app.php/api/';

var token;

if ( !localStorage.getItem('access_token'))
{
    // myApp.loginScreen();
}

token = localStorage.getItem('access_token');

$(document).on('click','.giris_yap',function(){

    var url = base_url + 'login';

    var form = $('#giris_formu');
    var buton = $(this);

    buton.text('Giriş işlemi yapılıyor bekleyiniz...');

    $.ajax({
        url: url,
        data: form.serialize(),
        type: 'post',
        dataType: 'json',
        success: function (yanit) {

            if(yanit.status_code == 200)
            {
                initOdaAndKategori();

                localStorage.setItem('access_token',yanit.token_degeri);
                token = yanit.token_degeri;
                anasayfaYenile();

                form.slideUp('slow');

                buton.text("Devam Et");
                buton.removeClass('giris_yap');

                buton.addClass('close-login-screen');

            }else
            {
                myApp.addNotification({
                    title: 'Gider.XYZ',
                    message: 'Yanlış kullanıcı adı veya şifre girildi !'
                });

                buton.text("Giriş Yap");

            }


        }
    });

});

$(document).on('click','.cikis_yap',function () {
    var form = $('#giris_formu');

    form.slideDown("fast");

    var buton = $('.close-login-screen');

    buton.text("Giriş Yap");

    buton.addClass('giris_yap');

    buton.removeClass('close-login-screen');

    window.localStorage.clear();
    myApp.loginScreen();
});


$(document).on('click', '.kayit_ol',function(){

    var url = base_url + 'register';
    var form = $('#kayit_formu');
    var buton = $(this);

    buton.text('Kayıt olunuyor lütfen bekleyiniz..');

    $.ajax({
        url: url,
        data: form.serialize(),
        type: 'post',
        dataType: 'json',
        success: function (yanit) {

            if(yanit.status_code == 200)
            {
                initOdaAndKategori();

                localStorage.setItem('access_token',yanit.token_degeri);
                localStorage.setItem('username',yanit.kullanici_adi);

                token = yanit.token_degeri;

                anasayfaYenile();

                buton.text('Devam Et');
                form.slideUp('slow');

                buton.removeClass('kayit_ol');

                buton.addClass('close-login-screen');
            }else
            {
                myApp.addNotification({
                    title: 'Gider.XYZ',
                    message: 'İşler kötü gitti :( Bir daha denemelisiniz .'
                });

                buton.text("Kayıt Ol");
            }


        }
    });

});

$( document ).ready(function() {
    anasayfaYenile();
});


$(document).on('click','.sosyal', function () {
    var message = {
        text: "Sende bütçeni tüm platformlardan takip etmek ister misin ? ",
        url: "http://gider.xyz"
    };
    window.socialmessage.send(message);
});
// Loading flag
var loading = false;

// Last loaded index
var lastIndex = $$('.list-block li').length;

// Max items to load
var maxItems = 1000;

// Append items per load
var itemsPerLoad = 20;

// Attach 'infinite' event handler
// $$('.infinite-scroll').on('infinite', function () {
//
//     // Exit, if loading in progress
//     if (loading) return;
//
//     // Set loading flag
//     loading = true;
//
//     // Emulate 1s loading
//     setTimeout(function () {
//         // Reset loading flag
//         loading = false;
//
//         if (lastIndex >= maxItems) {
//             // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
//             myApp.detachInfiniteScroll($$('.infinite-scroll'));
//             // Remove preloader
//             $$('.infinite-scroll-preloader').remove();
//             return;
//         }
//
//         // Generate new items HTML
//         var html = '';
//         for (var i = lastIndex + 1; i <= lastIndex + itemsPerLoad; i++) {
//             html += '' +
//                 '<li class="accordion-item"> <a href="#" class="item-content item-link"> <div class="item-media"> <span class="fa fa-smile-o fa-2x color-green"></span> </div> <div class="item-inner" > <div class="item-title-row"> <div class="item-title ">Gelir</div> <div class="item-after" > 15₺ </div> </div> <div class="item-subtitle"><span class="fa fa-credit-card" style="margin-right: 30px;"></span></div> </div> </a> <div class="accordion-item-content"> <div class="content-block"> <p>Babam sağolsun.. </p> </div> </div> </li>' +
//                 '';
//         }
//
//         // Append new items
//         $$('.anasayfa').append(html);
//
//         // Update last loaded index
//         lastIndex = $$('.list-block li').length;
//     }, 1000);
// });
// Pull to refresh content
var ptrContent = $('.pull-to-refresh-content');

// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {
    // Emulate 2s loading
    setTimeout(function () {


        var yazi = '';
        if (window.localStorage.getItem('page') == 1)
        {
            yazi = "Anasayfa güncellendi";
            anasayfaYenile();

        }
        if (window.localStorage.getItem('page') == 2)
        {
            yazi = "Odalar ve kategoriler güncellendi." ;
            $.ajax({
                url: base_url + 'oda/listele-baslik',
                data: 'access_token=' + token,
                type: 'post',
                dataType: 'json',
                success: function (yanit) {


                    if (yanit.status_code == 200) {
                        $.each(yanit.odalar, function (index, value) {

                            $('.odalar_select').append('<option value="' + value.key + '">' + value.baslik + '</option>');
                            //alert(value.key);

                        });


                    }
                    else {

                    }
                }
            });

        }
        if (window.localStorage.getItem('page') == 3)
        {
            alacakYenile();
            yazi =  "Alacak & Verecek güncellendi." ;
        }
        if (window.localStorage.getItem('page') == 4)
        {
            odaYenile();
            yazi =  "Odalar güncellendi." ;
        }
        if (window.localStorage.getItem('page') == 5)
        {
            alacakYenile();
            yazi =  "Alacaklar güncellendi" ;
        }
        if (window.localStorage.getItem('page') == 6)
        {
            verecekYenile();
            yazi =  "Verecekler güncellendi" ;
        }

        myApp.addNotification({
            title: 'Gider.XYZ',
            message: yazi,
            onClose: function () {
                console.log('Notification closed');
            }
        });

        myApp.pullToRefreshDone();
    }, 1000);
});
