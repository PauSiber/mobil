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
    //
    // if(id === 'soru-detay-page') {
    //   var icerik_id = $(this).attr('data-detay-id');
    //   $.each(sorular.data, function(index,val) {
    //     if(val.key == icerik_id) {
    //       $('.detay-baslik').html(val.baslik);
    //       // $('.detay-icerik').html(val.icerik);
    //     }
    //   });
    // }

    if(id === 'icerik-detay-page') {
      var icerik_id = $(this).attr('data-detay-id');
      alert(icerik_id);
      $.each(yazilar, function(index,val) {
        if(val.link == icerik_id) {
          alert('biz bize benzeriz :)');
          $('.detay-baslik').html(val.title);
          $('.detay-icerik').html(val.content);
          // $('img').data( "foo", $('img').attr('src') );
          // $('img').attr('src','http://icons.iconarchive.com/icons/icons8/ios7/256/Computer-Hardware-Left-Click-icon.png');
          // $('img').height('128px');
          $('img').width('100%');
          // $('img').css("widht","%100");
          var foto = $('.detay-icerik img');

          $.each(foto, function(index, value) {
            console.log($(value).attr('src'));
            $(value).attr( "data-href", $(value).attr('src') );
            // $(value).attr('src','http://icons.iconarchive.com/icons/icons8/ios7/256/Computer-Hardware-Left-Click-icon.png');

          })
        }
      });

    }

    window.localStorage.setItem('page',id);

});

$(document).on('click', 'img', function() {
  var ref = cordova.InAppBrowser.open($(this).attr('data-href'), '_self');
})
//
// $(document).on('click','.soru-detay-back',function() {
//   $('.soru-back').addClass('active');
// })

$(document).on('click','.icerik-detay-back',function() {
  $('.icerik-back').addClass('active');
  $('.detay-baslik').html('');
  $('.detay-icerik').html('');
})

// // Base url.
var base_url = 'http://178.62.240.171:3000/api/';
//

// var token;
//
// if ( !localStorage.getItem('access_token'))
// {
//     // myApp.loginScreen();
// }
//
// token = localStorage.getItem('access_token');
// //
// // $(document).on('click','.giris_yap',function(){
// //
// //     var url = base_url + 'login';
// //
// //     var form = $('#giris_formu');
// //     var buton = $(this);
// //
// //     buton.text('Giriş işlemi yapılıyor bekleyiniz...');
// //
// //     $.ajax({
// //         url: url,
// //         data: form.serialize(),
// //         type: 'post',
// //         dataType: 'json',
// //         success: function (yanit) {
// //
// //             if(yanit.status_code == 200)
// //             {
// //                 initOdaAndKategori();
// //
// //                 localStorage.setItem('access_token',yanit.token_degeri);
// //                 token = yanit.token_degeri;
// //                 anasayfaYenile();
// //
// //                 form.slideUp('slow');
// //
// //                 buton.text("Devam Et");
// //                 buton.removeClass('giris_yap');
// //
// //                 buton.addClass('close-login-screen');
// //
// //             }else
// //             {
// //                 myApp.addNotification({
// //                     title: 'Pausiber.XYZ',
// //                     message: 'Yanlış kullanıcı adı veya şifre girildi !'
// //                 });
// //
// //                 buton.text("Giriş Yap");
// //
// //             }
// //
// //
// //         }
// //     });
// //
// // });
// // //
// // // $(document).on('click','.cikis_yap',function () {
// // //     var form = $('#giris_formu');
// // //
// // //     form.slideDown("fast");
// // //
// // //     var buton = $('.close-login-screen');
// // //
// // //     buton.text("Giriş Yap");
// // //
// // //     buton.addClass('giris_yap');
// // //
// // //     buton.removeClass('close-login-screen');
// // //
// // //     window.localStorage.clear();
// // //     myApp.loginScreen();
// // // });

//
// $(document).on('click', '.kayit_ol',function(){
//
//     var url = base_url + 'register';
//     var form = $('#kayit_formu');
//     var buton = $(this);
//
//     buton.text('Kayıt olunuyor lütfen bekleyiniz..');
//
//     $.ajax({
//         url: url,
//         data: form.serialize(),
//         type: 'post',
//         dataType: 'json',
//         success: function (yanit) {
//
//             if(yanit.status_code == 200)
//             {
//                 initOdaAndKategori();
//
//                 localStorage.setItem('access_token',yanit.token_degeri);
//                 localStorage.setItem('username',yanit.kullanici_adi);
//
//                 token = yanit.token_degeri;
//
//                 anasayfaYenile();
//
//                 buton.text('Devam Et');
//                 form.slideUp('slow');
//
//                 buton.removeClass('kayit_ol');
//
//                 buton.addClass('close-login-screen');
//             }else
//             {
//                 myApp.addNotification({
//                     title: 'pausiber.XYZ',
//                     message: 'İşler kötü gitti :( Bir daha denemelisiniz .'
//                 });
//
//                 buton.text("Kayıt Ol");
//             }
//
//
//         }
//     });
//
// });

// localStorage keywords
var yazilar;
var sorular;
var etkinlikler;
//
// var sorulari_getir = function() {
//
//   $.ajax({
//       url: base_url+ 'soru-listele',
//       type: 'post',
//       dataType: 'json',
//       success: function (yanit) {
//         console.log('foksiyonum');
//         // console.log(yanit);
//         if(yanit.data) {
//           window.localStorage.setItem('sorular', JSON.stringify(yanit));
//
//         }
//         console.log(JSON.parse(localStorage.getItem("sorular")));
//         sorular = JSON.parse(localStorage.getItem("sorular"));
//
//         $('#sorular').html('');
//         $.each(sorular.data, function(index, value) {
//
//           $('#sorular').append(''+
//           '<div class="list-block media-list " style="margin-top:5px;margin-bottom:5px;" id="soru-key"'+value.key+'>'+
//             '<ul>'+
//               '<li>'+
//                 '<a href="#soru-detay" id="soru-detay-page" data-detay-id='+value.key+' class="tab-link active item-link item-content detay-id"> '+
//                   '<div class="item-media"><img src="https://pbs.twimg.com/profile_images/765679093228695552/4QWEC5lQ_bigger.jpg" width="44"></div>'+
//                   '<div class="item-inner">'+
//                     '<div class="item-title-row">'+
//                       '<div class="item-title">'+value.baslik+'</div>'+
//                     '</div>'+
//                     '<div class="item-subtitle">Barisesen</div>'+
//                   '</div>'+
//                 '</a>'+
//               '</li>'+
//             '</ul>'+
//           '</div>');
//
//         })
//
//
//       }
//     });
//
// }
//
// $(document).on('click', '#soru-detay-page', function() {
//   // alert($(this).attr('data-detay-id'));
//   var soru_key = $(this).attr('data-detay-id');
//   if(soru_key) {
//     // soru göster
//     soru_goster(soru_key);
//     cevap_listele(soru_key);
//   }
// })
//
// var soru_goster = function(soru_key) {
//   $.ajax({
//       url: base_url+ 'soru-goster',
//       data: 'soru_key='+soru_key,
//       type: 'post',
//       dataType: 'json',
//       success: function (yanit) {
//
//         // error handling ???
//         if(yanit.icerik) {
//           $('.detay-icerik').html(yanit.icerik);
//
//         }else {
//           // error
//         }
//
//       }
//     });
// }
//
// var soru_ekle = function(user_key, soru_baslik, soru_icerik) {
//   $.ajax({
//       url: base_url+ 'soru-ekle',
//       data: {user_key: user_key, baslik: soru_baslik, icerik: soru_icerik},
//       type: 'post',
//       dataType: 'json',
//       success: function (yanit) {
//         console.log('foksiyonum');
//         console.log(yanit);
//       }
//     });
// }
//
// var kullanici_ekle = function(isim, soyisim, username, password, telefon) {
//   $.ajax({
//       url: base_url+ 'user-ekle',
//       data: {isim: isim, soyisim: soyisim, username: username, password: password, telefon: telefon},
//       type: 'post',
//       dataType: 'json',
//       success: function (yanit) {
//         console.log('user ekle');
//         alert(yanit);
//         console.log(yanit);
//       }
//     });
// }
//
// var cevap_ekle = function(icerik, soru_key, user_key) {
//   $.ajax({
//       url: base_url+ 'cevap-ekle',
//       data: {icerik: icerik, soru_key: soru_key, user_key: user_key},
//       type: 'post',
//       dataType: 'json',
//       success: function (yanit) {
//         console.log('cevap ekle');
//         console.log(yanit);
//       }
//   });
// }
//
// var cevap_listele = function(soru_key) {
//   $.ajax({
//       url: base_url+ 'cevap-listele',
//       data: {soru_key: soru_key},
//       type: 'post',
//       dataType: 'json',
//       success: function (yanit) {
//         if(yanit.data) {
//           console.log('cevap listele');
//           console.log(yanit);
//           $('.cevaplar').html('');
//             $.each(yanit.data, function(index, value) {
//               $('.cevaplar').append('<div class="content-block">'+
//               '<div class="card">'+
//                 '<div class="card-content">'+
//                   '<div class="card-content-inner">'+
//                   '<div class="row">'+
//                     '<div class="col-20">'+
//                       '<img src="https://pbs.twimg.com/profile_images/765679093228695552/4QWEC5lQ_bigger.jpg" style="border-radius:100%; margin:auto;width: 50px; margin-top:10%;"  alt="" />'+
//                       '<span><b class="cevap-user">Barış Esen</b></span>'+
//                       '</div>'+
//                       '<div class="col-80 cevap-icerik">'+value.baslik+'</div>'+
//                   '</div>'+
//                   '</div>'+
//                   '</div>'+
//                 '</div>'+
//               '</div>');
//           });
//         }
//       }
//   });
// }

var etkinlik_listele = function() {
  $.ajax({
      url: base_url+ 'etkinlik-listele',
      type: 'post',
      dataType: 'json',
      success: function (yanit) {
        console.log('etkinlik listele');
        console.log(yanit);

        if(yanit.data) {

           window.localStorage.setItem('etkinlikler', JSON.stringify(yanit));

         }
           etkinlikler = JSON.parse(localStorage.getItem("etkinlikler"));

          $('.etkinlik-liste').html('');
          $.each(etkinlikler.data, function(index, value) {
            var date = new Date(value.yapilacak_tarih);
            date = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
            $('.etkinlik-liste').append('<li>'+
            '<a href="#" class="item-link item-content" data-detay-key="'+value.key+'">'+
            '<div class="item-inner">'+
            '<div class="item-title-row">'+
            '<div class="item-title">'+value.baslik+'</div>'+
            '<div class="item-after">'+date+'</div>'+
            '</div>'+
            '<div class="item-subtitle">'+value.yapilacak_yer+'</div>'+
            '<div class="item-text">Lorem ipsum dolor sit amet...</div>'+
            '</div>'+
            '</a>'+
            '</li>');

          });
      }
  });
}
//
// $(document).on('click', '.soru-ekle', function() {
//   alert("baga basttiinn")
//   $('.soru-ekle-form').show();
//   $('#sorular').hide();
// })

// $(document).on('click', '.sor', function() {
//   var soru = $('#soru').val();
//   var soru_baslik = $('#soru-baslik').val();
//
//   soru_ekle('fLNn8Sod', soru_baslik, soru);
//
//   $('.soru-ekle-form').hide();
//   $('#sorular').show();
//
//   // yeni soruyu locale basıp locali güncelle
//
// });

// $(document).on('click', '.soru-vazgec', function() {
//   $('.soru-ekle-form').hide();
//   $('#sorular').show();
// })


// $(document).on('error', 'img', function () {
//   // $('img').data( "foo", $('img').attr('src') );
//     $(this).data("foo", $(this).attr('src'));
//     alert($(this).data("foo"));
// });
var lastIndex;

$( document ).ready(function() {

  $.ajax({
    url      : 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent('https://canyoupwn.me/feed'),
    dataType : 'json',
    success  : function (data) {
      // console.log(data);
      if (data.responseData.feed && data.responseData.feed.entries) {
        yazilar = data.responseData.feed.entries;
        $.each(data.responseData.feed.entries, function (i, e) {
          $('#blogIcerik').append(''+
            '<div class="card demo-card-header-pic" id="blog-icerik-"'+e.link+'>'+
              '<div style="background-image:url(https://pbs.twimg.com/profile_banners/762376797635960833/1471388019/1500x500)" valign="bottom" class="card-header color-white no-border">'+e.title+'</div>'+
                  '<div class="card-content">'+
                      '<div class="card-content-inner">'+
                          '<p class="color-gray">Posted on '+e.publishedDate+'</p>'+
                          '<p>'+e.contentSnippet+'</p>'+
                      '</div>'+
                  '</div> '+
               '<div class="card-footer"> '+
                  '<a href="#" class="link">Like</a>'+
                  '<a href="#icerik-detay" id="icerik-detay-page" data-detay-id="'+e.link+'" class="tab-link active item-link item-content detay-id">Read more</a>'+
              '</div>'+
            '</div>');
        });
        // lastIndex = $(data.responseData.feed.entries).length;
        // alert(lastIndex);


      }else {
        alert('Error :(');
      }
    },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr);
        alert(thrownError);
      }
  });


  // $.ajax({
  //   url      : 'https://raw.githubusercontent.com/barisesen/test/master/README.md',
  //   success  : function (data) {
  //     // console.log(data);
  //     var mark = data.replace(/\r/g, "").replace(/\n/g, "");
  //
  //     //  var mark = data;
  //      console.log(mark);
  //      markdownToHtml(mark, function(v) {
  //        console.log(v);
  //      })
  //   }
  // })

  $.ajax({
    url      : 'https://raw.githubusercontent.com/samiozbatmaz/test/master/test.json',
    success  : function (data) {
      // alert(data);
      // console.log(data);
      data = JSON.parse(data);


      $.each(data.etkinlikler, function(index, value) {
        // alert(value.name)
          var date = new Date(value.yapilacakTarih);
          date = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
          $('.etkinlik-liste').append('<li>'+
          '<a href="#" class="item-link item-content">'+
          '<div class="item-inner">'+
          '<div class="item-title-row">'+
          '<div class="item-title">'+value.baslik+'</div>'+
          '<div class="item-after">'+date+'</div>'+
          '</div>'+
          '<div class="item-subtitle">'+value.yapilacakYer+'</div>'+
          '<div class="item-text">'+value.icerik+'</div>'+
          '</div>'+
          '</a>'+
          '</li>');

        });


    }
  })

  $.ajax({
    url      : 'https://barisesen.github.io/test-ghp/user.json',
    // headers: {
    //         'Content-Type':'application/json; charset=utf-8'
    //     },
    success  : function (data) {
      // alert(data);
      console.log(data);
      data = JSON.parse(data);
    }
})
// console.log(mark);
  // markdownToHtml(mark, function(html) {
  //   console.log(mark);
  //   console.log("****************************");
  //   console.log(html);
  // });

/**** Markadown to html kullanımı *******/
  // markdownToHtml('', function(html) {
  //   console.log(html);
  //   alert(html)
  // });


  // $.each(etkinlikListesi, function(index, value) {
  //     var date = new Date(value.yapilacakTarih);
  //     date = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
  //     $('.etkinlik-liste').append('<li>'+
  //     '<a href="#" class="item-link item-content">'+
  //     '<div class="item-inner">'+
  //     '<div class="item-title-row">'+
  //     '<div class="item-title">'+value.baslik+'</div>'+
  //     '<div class="item-after">'+date+'</div>'+
  //     '</div>'+
  //     '<div class="item-subtitle">'+value.yapilacakYer+'</div>'+
  //     '<div class="item-text">'+value.icerik+'</div>'+
  //     '</div>'+
  //     '</a>'+
  //     '</li>');
  //
  //   });

// etkinlikler = JSON.parse(localStorage.getItem("etkinlikler"));
//
//   $.each(etkinlikler.data, function(index, value) {
//     var date = new Date(value.yapilacak_tarih);
//     date = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
//     $('.etkinlik-liste').append('<li>'+
//     '<a href="#" class="item-link item-content" data-detay-key="'+value.key+'">'+
//     '<div class="item-inner">'+
//     '<div class="item-title-row">'+
//     '<div class="item-title">'+value.baslik+'</div>'+
//     '<div class="item-after">'+date+'</div>'+
//     '</div>'+
//     '<div class="item-subtitle">'+value.yapilacak_yer+'</div>'+
//     '<div class="item-text">Lorem ipsum dolor sit amet...</div>'+
//     '</div>'+
//     '</a>'+
//     '</li>');
//
//   });

  // sorulari_getir();
  // etkinlik_listele();


});

$(document).on('click','.sosyal', function () {
    var message = {
        text: "Paüsiber mobil app ",
        url: "http://pausiber.xyz"
    };
    window.socialmessage.send(message);
});
// Loading flag
// var loading = false;
//
// // Last loaded index
// // var lastIndex = $$('.anasayfa-scroll').length;
//
// // Max items to load
// var maxItems = 60;
//
// // Append items per load
// var itemsPerLoad = 10;
//
// // Attach 'infinite' event handler
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
//         $.ajax({
//           url      : 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent('https://canyoupwn.me/page/2/feed'),
//           dataType : 'json',
//           success  : function (data) {
//             console.log(data);
//             if (data.responseData.feed && data.responseData.feed.entries) {
//               // yazilar = data.responseData.feed.entries;
//               $.each(data.responseData.feed.entries, function (i, e) {
//                 $('#blogIcerik').append(''+
//                   '<div class="card demo-card-header-pic anasayfa-scroll" id="blog-icerik-"'+e.link+'>'+
//                     '<div style="background-image:url(https://pbs.twimg.com/profile_banners/762376797635960833/1471388019/1500x500)" valign="bottom" class="card-header color-white no-border">'+e.title+'</div>'+
//                         '<div class="card-content">'+
//                             '<div class="card-content-inner">'+
//                                 '<p class="color-gray">Posted on '+e.publishedDate+'</p>'+
//                                 '<p>'+e.contentSnippet+'</p>'+
//                             '</div>'+
//                         '</div> '+
//                      '<div class="card-footer"> '+
//                         '<a href="#" class="link">Like</a>'+
//                         '<a href="#icerik-detay" id="icerik-detay-page" data-detay-id="'+e.link+'" class="tab-link active item-link item-content detay-id">Read more</a>'+
//                     '</div>'+
//                   '</div>');
//               });
//               // Update last loaded index
//               lastIndex += $(data.responseData.feed.entries).length;
//             }else {
//               alert('Error :(');
//             }
//           },
//             error: function (xhr, ajaxOptions, thrownError) {
//               alert(xhr);
//               alert(thrownError);
//             }
//         });
//
//         // Generate new items HTML
//         // var html = '';
//         // for (var i = lastIndex + 1; i <= lastIndex + itemsPerLoad; i++) {
//         //     html += '' +
//         //         '<li class="accordion-item"> <a href="#" class="item-content item-link"> <div class="item-media"> <span class="fa fa-smile-o fa-2x color-green"></span> </div> <div class="item-inner" > <div class="item-title-row"> <div class="item-title ">Gelir</div> <div class="item-after" > 15₺ </div> </div> <div class="item-subtitle"><span class="fa fa-credit-card" style="margin-right: 30px;"></span></div> </div> </a> <div class="accordion-item-content"> <div class="content-block"> <p>Babam sağolsun.. </p> </div> </div> </li>' +
//         //         '';
//         // }
//
//         // Append new items
//         // $$('.anasayfa').append(html);
//
//
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
            yazi = "Blog yazıları güncellendi";
            anasayfaYenile();

        }
        if (window.localStorage.getItem('page') == 2)
        {
            yazi = "Sorular güncellendi." ;
            // $.ajax({
            //     url: base_url + 'oda/listele-baslik',
            //     data: 'access_token=' + token,
            //     type: 'post',
            //     dataType: 'json',
            //     success: function (yanit) {
            //
            //
            //         if (yanit.status_code == 200) {
            //             $.each(yanit.odalar, function (index, value) {
            //
            //                 $('.odalar_select').append('<option value="' + value.key + '">' + value.baslik + '</option>');
            //                 //alert(value.key);
            //
            //             });
            //
            //
            //         }
            //         else {
            //
            //         }
            //     }
            // });

        }
        if (window.localStorage.getItem('page') == 3)
        {
            alacakYenile();
            yazi =  "Etkinlik listesi güncellendi" ;
        }
        // if (window.localStorage.getItem('page') == 4)
        // {
        //     odaYenile();
        //     yazi =  "Odalar güncellendi." ;
        // }

        myApp.addNotification({
            title: 'Pausiber.xyz',
            message: yazi,
            onClose: function () {
                console.log('Notification closed');
            }
        });

        myApp.pullToRefreshDone();
    }, 1000);
});
