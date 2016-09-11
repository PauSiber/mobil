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
      $.each(sorular.kayitlar, function(index,val) {
        if(val.id == icerik_id) {
          $('.detay-baslik').html(val.baslik);
          $('.detay-icerik').html(val.icerik);
        }
      });
    }

    if(id === 'icerik-detay-page') {
      var icerik_id = $(this).attr('data-detay-id');
      $.each(yazilar.kayitlar, function(index,val) {
        if(val.id == icerik_id) {
          $('.detay-baslik').html(val.baslik);
          $('.detay-icerik').html(val.icerik);
        }
      });

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
var base_url = 'http://178.62.240.171:3000/api/';

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
                    title: 'Pausiber.XYZ',
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
                    title: 'pausiber.XYZ',
                    message: 'İşler kötü gitti :( Bir daha denemelisiniz .'
                });

                buton.text("Kayıt Ol");
            }


        }
    });

});

// localStorage keywords
var yazilar;
var sorular;

var sorulari_getir = function() {

  $.ajax({
      url: base_url+ 'soru-listele',
      type: 'post',
      dataType: 'json',
      success: function (yanit) {
        console.log('foksiyonum');
        // console.log(yanit);

        window.localStorage.setItem('sorular', JSON.stringify(yanit));
        console.log(JSON.parse(localStorage.getItem("sorular")));
        sorular = JSON.parse(localStorage.getItem("sorular"));

        $.each(sorular.data, function(index, value) {

          $('#sorular').append(''+
          '<div class="list-block media-list " style="margin-top:5px;margin-bottom:5px;" id="soru-id"'+value.id+'>'+
            '<ul>'+
              '<li>'+
                '<a href="#soru-detay" id="soru-detay-page" data-detay-id='+value.id+' class="tab-link active item-link item-content detay-id"> '+
                  '<div class="item-media"><img src="https://pbs.twimg.com/profile_images/765679093228695552/4QWEC5lQ_bigger.jpg" width="44"></div>'+
                  '<div class="item-inner">'+
                    '<div class="item-title-row">'+
                      '<div class="item-title">'+value.baslik+'</div>'+
                    '</div>'+
                    '<div class="item-subtitle">Barisesen</div>'+
                  '</div>'+
                '</a>'+
              '</li>'+
            '</ul>'+
          '</div>');

        })


      }
    });

}

var soru_goster = function(soru_key) {
  $.ajax({
      url: base_url+ 'soru-goster',
      data: 'soru_key='+soru_key,
      type: 'post',
      dataType: 'json',
      success: function (yanit) {
        console.log('foksiyonum');
        console.log(yanit);
      }
    });
}

var soru_ekle = function(user_key, soru_baslik, soru_icerik) {
  $.ajax({
      url: base_url+ 'soru-ekle',
      data: {user_key: user_key, baslik: soru_baslik, icerik: soru_icerik},
      type: 'post',
      dataType: 'json',
      success: function (yanit) {
        console.log('foksiyonum');
        console.log(yanit);
      }
    });
}

var kullanici_ekle = function(isim, soyisim, username, password, telefon) {
  $.ajax({
      url: base_url+ 'user-ekle',
      data: {isim: isim, soyisim: soyisim, username: username, password: password, telefon: telefon},
      type: 'post',
      dataType: 'json',
      success: function (yanit) {
        console.log('user ekle');
        alert(yanit);
        console.log(yanit);
      }
    });
}

var cevap_ekle = function(icerik, soru_key, user_key) {
  $.ajax({
      url: base_url+ 'cevap-ekle',
      data: {icerik: icerik, soru_key: soru_key, user_key: user_key},
      type: 'post',
      dataType: 'json',
      success: function (yanit) {
        console.log('cevap ekle');
        console.log(yanit);
      }
  });
}

var cevap_listele = function(soru_key) {
  $.ajax({
      url: base_url+ 'cevap-listele',
      data: {soru_key: soru_key},
      type: 'post',
      dataType: 'json',
      success: function (yanit) {
        console.log('cevap listele');
        console.log(yanit);
      }
  });
}

var etkinlik_listele = function() {
  $.ajax({
      url: base_url+ 'etkinlik-listele',
      type: 'post',
      dataType: 'json',
      success: function (yanit) {
        console.log('etkinlik listele');
        console.log(yanit);
      }
  });
}

$( document ).ready(function() {
  //
  sorulari_getir();
  //
  // soru_goster('J3OtVPgsvvNeuBHe1Feq');

  // soru_ekle('fLNn8Sod', 'Merhaba cordova', 'icerik test cordova app');

  // kullanici_ekle('cordova', 'app', 'crdvpp12', 'pass', '05314265487');
  // cevap_ekle('merhaba soru ben cevap', 'J3OtVPgsvvNeuBHe1Feq', 'fLNn8Sod');

  // cevap_listele('J3OtVPgsvvNeuBHe1Feq');

  // etkinlik_listele();


  // yazilar = JSON.parse(localStorage.getItem("yazilar"));
  // sorular = JSON.parse(localStorage.getItem("sorular"));

  $.each(yazilar.kayitlar, function(index,value) {

    $('#blogIcerik').append(''+
    '<div class="card demo-card-header-pic" id="blog-icerik-"'+value.id+'>'+
      '<div style="background-image:url(https://pbs.twimg.com/profile_banners/762376797635960833/1471388019/1500x500)" valign="bottom" class="card-header color-white no-border">'+value.baslik+'</div>'+
          '<div class="card-content">'+
              '<div class="card-content-inner">'+
                  '<p class="color-gray">Posted on '+value.tarih+'</p>'+
                  '<p>'+value.icerik+'</p>'+
              '</div>'+
          '</div> '+
       '<div class="card-footer"> '+
          '<a href="#" class="link">Like</a>'+
          '<a href="#icerik-detay" id="icerik-detay-page" data-detay-id="'+value.id+'" class="tab-link active item-link item-content detay-id">Read more</a>'+
      '</div>'+
    '</div>');

  });

  // $.each(sorular.data, function(index, value) {
  //
  //   $('#sorular').append(''+
  //   '<div class="list-block media-list " style="margin-top:5px;margin-bottom:5px;" id="soru-id"'+value.id+'>'+
  //     '<ul>'+
  //       '<li>'+
  //         '<a href="#soru-detay" id="soru-detay-page" data-detay-id='+value.id+' class="tab-link active item-link item-content detay-id"> '+
  //           '<div class="item-media"><img src="https://pbs.twimg.com/profile_images/765679093228695552/4QWEC5lQ_bigger.jpg" width="44"></div>'+
  //           '<div class="item-inner">'+
  //             '<div class="item-title-row">'+
  //               '<div class="item-title">'+value.baslik+'</div>'+
  //             '</div>'+
  //             '<div class="item-subtitle">Barisesen</div>'+
  //           '</div>'+
  //         '</a>'+
  //       '</li>'+
  //     '</ul>'+
  //   '</div>');
  //
  // })



});

$(document).on('click', '#logla', function() {
  var yaziObj = {
  "kayitlar":[
      {
        id: 1,
        baslik: 'lorem',
        icerik: 'test icerik Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        tarih: '01.01.2016'
      },
      {
        id: 2,
        baslik: 'test2',
        icerik: '2test icerik Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        tarih: '02.01.2016'
      },
      {
        id: 3,
        baslik: 'test3',
        icerik: 'test icerik3 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        tarih: '03.01.2016'
      },
      {
        id: 4,
        baslik: 'Paü Siber Hakkında !',
        icerik: 'Siber güvenlik farkındalığı oluşturma ve ülkenin ihtiyacı olan nitelikli iş gücünü üretme güdüsüyle birleşmiş insan topluluğuyuz.<b>Barış Esen</b>',
        tarih: '03.03.2016'
      }
    ]
  };

  var soruObj = {
    "kayitlar":[
      {
        id:1,
        baslik:"Test soru 1",
        icerik:"Test soru icerik 1<br> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        tarih :"01.01.1996"
      },
      {
        id:2,
        baslik:"Test soru 2",
        icerik:"Test soru icerik 2 <br> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        tarih :"01.01.1996"
      },
      {
        id:3,
        baslik:"Test soru 3",
        icerik:"Test soru icerik 3 <br> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem",
        tarih :"01.01.1996"
      },
    ]
  }
  window.localStorage.setItem('yazilar', JSON.stringify(yaziObj));
  window.localStorage.setItem('sorular', JSON.stringify(soruObj));

  alert('ok')
})

$(document).on('click','.sosyal', function () {
    var message = {
        text: "Paüsiber mobil app ",
        url: "http://pausiber.xyz"
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
            title: 'Pausiber.XYZ',
            message: yazi,
            onClose: function () {
                console.log('Notification closed');
            }
        });

        myApp.pullToRefreshDone();
    }, 1000);
});
