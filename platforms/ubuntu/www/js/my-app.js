// Initialize your app
var myApp = new Framework7({
    upscroller: {text : 'Yukarı'}
});
// Export selectors engine
var $$ = Dom7;


var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});


window.localStorage.setItem('page',1);


$(document).on('click','.tab-link',function(){
    var id = $(this).attr('id');
    
    $('.borc_okut').slideUp("slow");
    if( id != 6 )
    {
        $('.verecek_tab').removeClass('active');
        $('.alacak_tab').addClass('active');
    }
    
    window.localStorage.setItem('page',id);
    
});

// Base url.
var base_url = 'http://gider.xyz/hackingfest/web/app.php/api/';

var token;

if ( !localStorage.getItem('access_token'))
{
    myApp.loginScreen();
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

// Oda listeleme - sadece başlıkları
var initOdaAndKategori = function () {
    $.ajax({
        url: base_url + 'oda/listele-baslik',
        data: 'access_token=' + token,
        type: 'post',
        dataType: 'json',
        success: function (yanit) {


            var html = '';

            if (yanit.status_code == 200) {
                $.each(yanit.odalar, function (index, value) {

                    html += '<option value="' + value.key + '">' + value.baslik + '</option>';

                });
                $('.odalar_select').html(html);
            }
            else {

            }
        }
    });


    // Kategorileri Localstroge e basılacak.

    // $.ajax({
    //     url: base_url + 'kategori/listele',
    //     data: 'access_token=' + token,
    //     type: 'post',
    //     dataType: 'json',
    //     success: function (yanit) {
    //
    //
    //         var html = '';
    //         if (yanit.status_code == 200) {
    //             $.each(yanit.kategoriler, function (index, value) {
    //
    //                 html += '<option value="' + value.kategori_id + '">' + value.baslik + '</option>';
    //
    //             });
    //             $('.kategoriler_select').html(html);
    //         }
    //         else {
    //
    //         }
    //     }
    // });
};
// Giriş çıkış

//Anasayfa
function anasayfaYenile() {

    var url = base_url + 'ana-ekran/listele';

    //alert("sayfa yenile çalıştı");
    
    $.ajax({
        url: url,
        data: 'access_token='+token,
        type: 'post',
        dataType: 'json',
        success: function (yanit) {

            //alert(JSON.stringify(yanit));
            //alert(yanit.status_code);
            
            if(yanit.status_code == 200)
            {

                $('.anasayfa').html(" ");
                $('.kartBakiye').text("Kart "+yanit.kart_bakiye);
                $('.nakitBakiye').text("Nakit "+yanit.nakit_bakiye);

                var tur;
                var icon;
                
                $.each(yanit.gelir_gider, function (index, value) {

                    var gelir= "";


                    if(value.tur == 0)
                    {
                        tur = "fa fa-turkish-lira";
                    }
                    else
                    {
                        tur = "fa fa-credit-card";
                    }

                    if(value.gelir_gider == "Gider")
                    {
                        icon ="fa fa-frown-o  fa-2x color-orange";
                    }
                    else
                    {
                        icon = "fa fa-smile-o fa-2x color-green";
                        gelir = "Gelir";
                    }
                    
                    
                    $('.anasayfa').append('' +
                        '<li class="accordion-item"> ' +
                        '<a href="#" class="item-content item-link"> ' +
                        '<div class="item-media"> ' +
                        '<span class="'+icon+'"></span> ' +
                        '</div> ' +
                        '<div class="item-inner" > ' +
                        '<div class="item-title-row"> ' +
                        '<div class="item-title ">'+gelir+''+value.kategori+'</div> ' +
                        '<div class="item-after" > '+value.tutar+'</div> ' +
                        '</div> ' +
                        '<div class="item-subtitle"><span class="'+tur+'" style="margin-right: 30px;"> - Hesap : '+value.oda+'</span></div> ' +
                        '</div> ' +
                        '</a> ' +
                        '<div class="accordion-item-content"> ' +
                        '<div class="content-block"> ' +
                        '<p>'+value.aciklama+' - '+value.time+'' +
                        '</p> ' +
                        '</div> ' +
                        '</div> ' +
                        '</li>' +
                        '');
                    
                });
                yazi = 'Anasayfa başarıyla yüklendi';

            }
            else
            {
                yazi = 'Anasayfa yüklenirken hata oluştu !'
            }
        }
    });

    return yazi;
}
//Anasayfa

function alacakYenile() {
    var url = base_url + 'alacak/listele';


    $.ajax({
        url: url,
        data: 'access_token='+token,
        type: 'post',
        dataType: 'json',
        success: function (yanit) {
             //alert(JSON.stringify(yanit));
            //alert(yanit.status_code);
            //alert(yanit.status_code);
            var tur;
            var turBaslik;
            var isim;
            var qrcode ;
            if(yanit.status_code == 200)
            {

                $('.alacak_listele').html(" ");

                // alert('alacak listeledim');
                $.each(yanit.alacaklar, function (index, value) {
                    if(value.tur == 0)
                    {
                        tur = "fa fa-turkish-lira";
                        turBaslik = "Nakit";
                    }
                    else
                    {
                        tur = "fa fa-credit-card";
                        turBaslik = "Kart";
                    }

                    
                    
                    if(value.okunma == 1)
                    {
                        qrcode = "";
                    }else 
                    {
                        qrcode= value.qrcode;
                    }


                    if(value.odeyecek == "")
                    {
                        isim= "Borç";
                    }else
                    {
                        isim = value.odeyecek;
                    }


                    $('.alacak_listele').append('' +
                        '<li class="accordion-item swipeout" id="alacak_verecek_id_'+value.alacak_id+'"> ' +
                        '<a href="#" class="item-content swipeout-content item-link"> ' +
                        '<div class="item-media "> ' +
                        '<span class="fa fa-question-circle-o fa-2x color-green"></span> ' +
                        '</div> ' +
                        '<div class="item-inner " > ' +
                        '<div class="item-title-row"> ' +
                        '<div class="item-title ">'+isim+'</div> ' +
                        '<div class="item-after" > '+value.tutar+'₺ </div> ' +
                        '</div> ' +
                        '<div class="item-subtitle"> ' +
                        '<span class="fa '+tur+'"></span> ' +
                        '- '+turBaslik+' - '+value.time +
                        '</div> ' +
                        '</div> ' +
                        '</a> ' +
                        '<div class="swipeout-actions-left"> ' +
                        '<a href="#" class="swipeout-overswipe bg-red sil" data-alacak="'+value.alacak_id+'" ><span class="fa fa-frown-o"></span></a> ' +
                        '</div> ' +
                        '<div class="swipeout-actions-right"> ' +
                        '<!-- Add this button and item will be deleted automatically --> ' +
                        '<a href="#" class="swipeout-overswipe bg-green onayla" data-alacak="'+value.alacak_id+'"><span class="fa fa-smile-o"></span></a> ' +
                        '</div> ' +
                        '<div class="accordion-item-content"> ' +
                        '<div class="content-block"> ' +
                        '<span>'+value.aciklama+'</span>'+
                        '<p> '
                        +qrcode+
                        '</p> ' +
                        '</div> ' +
                        '</div> ' +
                        '</li>'
                    );
                });

                
                // myApp.addNotification({
                //     title: 'Gider.XYZ',
                //     message: 'Alacak listesi başarıyla güncellendi .'
                // });

            }
            else
            {
                // myApp.addNotification({
                //     title: 'Gider.XYZ',
                //     message: 'Alacak listesi yüklenirken hata oluştu !'
                // });

            }
        }
    });
}

function verecekYenile() {
    var url = base_url + 'verecek/listele';

    // alert(token);

    $.ajax({
        url: url,
        data: 'access_token='+token,
        type: 'post',
        dataType: 'json',
        success: function (yanit) {
            // alert(JSON.stringify(yanit));
            // alert(yanit.status_code);
            // alert(yanit.status_code);
            var tur;
            var turBaslik;
            if(yanit.status_code == 200)
            {

                $('.verecek_listele').html(" ");

                //alert('vereceklerini listeledim');
                $.each(yanit.verecekler, function (index, value) {
                    if(value.tur == 0)
                    {
                        tur = "fa fa-turkish-lira";
                        turBaslik = "Nakit";
                    }
                    else
                    {
                        tur = "fa fa-credit-card";
                        turBaslik = "Kart";
                    }

                    // alert(tur);
                    // alert(turBaslik);

                    $('.verecek_listele').append('' +
                        '<li class="">' +
                        '<a href="#" class="item-content  item-link">' +
                        '<div class="item-media">' +
                        '<span class="fa fa-question-circle-o fa-2x color-green"></span>' +
                        '</div> ' +
                        '<div class="item-inner" > ' +
                        '<div class="item-title-row"> ' +
                        '<div class="item-title ">'+value.odenecek+'</div> ' +
                        '<div class="item-after" > '+value.tutar+'<i class="fa fa-turkish-lira"></i> ' +
                        '</div> ' +
                        '</div> ' +
                        '<div class="item-subtitle"> ' +
                        '<span class="'+tur+'"></span> '+
                        turBaslik+' - '+value.time+
                        '</div> ' +
                        '</div> ' +
                        '</a> ' +
                        '</li>'
                    );
                });

                // myApp.addNotification({
                //     title: 'Gider.XYZ',
                //     message: 'Verecek listesi başarıyla güncellendi .'
                // });

            }
            else
            {
                myApp.addNotification({
                    title: 'Gider.XYZ',
                    message: 'Verecek listesi yüklenirken hata oluştu !'
                });

            }
        }
    });
    
}

function odaYenile() {
    $.ajax({
        url: base_url + 'oda/listele',
        data: 'access_token=' + token,
        type: 'post',
        dataType: 'json',
        success: function (yanit) {

            //alert(JSON.stringify(yanit));

            $('.odalar').html(" ");

            if (yanit.status_code == 200) {
                $.each(yanit.odalar, function (index, value) {
                    var kullanici_str = "";

                    $.each(value.kullanicilar,function (index, kullanici) {
                        kullanici_str += ", "+kullanici.username;
                    });

                    $('.odalar').append('' +
                        '<li class="accordion-item swipeout" > ' +
                        '<a href="#" class="item-content swipeout-content item-link"> ' +
                        '<div class="item-media"> ' +
                        '<span class="fa fa-list fa-2x color-orange"></span> ' +
                        '</div> ' +
                        '<div class="item-inner" > ' +
                        '<div class="item-title-row"> ' +
                        '<div class="item-title ">'+value.baslik+'</div> ' +
                        '<div class="item-after" > </div> ' +
                        '</div> ' +
                        '<div class="item-subtitle"><span class="fa fa-users" style="margin-right: 30px;">'+kullanici_str+'</span></div> ' +
                        '</div> ' +
                        '</a> ' +
                        '<div class="accordion-item-content"> ' +
                        '<div class="content-block"> ' +
                        '<p> ' +
                        value.qrcode +
                        '</p> ' +
                        '</div> ' +
                        '<div class="swipeout-actions-right"> ' +
                        '<a href="#" class="swipeout-delete swipeout-overswipe" data-oda-key="'+value.oda_key+'" data-confirm="Odadan çıkmak istediğinize emin misiniz?" data-confirm-title="Geri dönüşünüz olmayabilir.."><span class="fa fa-trash-o"></span></a> ' +
                        '</div> ' +
                        '</div>' +
                        '</li>' +
                        '')


                });

            }
        }
    });
}

$(document).on('click','.anasayfaYenile',function () {
    anasayfaYenile();
});

$(document).on('click','.ekle',function () {
    $.ajax({
        url: base_url + 'oda/listele-baslik',
        data: 'access_token=' + token,
        type: 'post',
        dataType: 'json',
        success: function (yanit) {


            var html = '';

            if (yanit.status_code == 200) {
                $.each(yanit.odalar, function (index, value) {

                    html += '<option value="' + value.oda_key + '">' + value.baslik + '</option>';

                });
                $('.odalar_select').html(html);
            }
            else {

            }
        }
    });       
});

$(document).on('click','.alacakVerecek',function () {
    alacakYenile();
});

$(document).on('click','.verecek_tab', function () {
    $('.borc_okut').slideDown("slow");

    var url = base_url + 'verecek/listele';

   // alert(token);

    $.ajax({
        url: url,
        data: 'access_token='+token,
        type: 'post',
        dataType: 'json',
        success: function (yanit) {
            // alert(JSON.stringify(yanit));
            // alert(yanit.status_code);
            // alert(yanit.status_code);
            var tur;
            var turBaslik;
            if(yanit.status_code == 200)
            {
                
                $('.verecek_listele').html(" ");
                
                //alert('vereceklerini listeledim');
                $.each(yanit.verecekler, function (index, value) {
                    if(value.tur == 0)
                    {
                        tur = "fa fa-turkish-lira";
                        turBaslik = "Nakit";
                    }
                    else
                    {
                        tur = "fa fa-credit-card";
                        turBaslik = "Kart";
                    }

                    // alert(tur);
                    // alert(turBaslik);
                    
                    $('.verecek_listele').append('' +
                        '<li class="">' +
                        '<a href="#" class="item-content  item-link">' +
                        '<div class="item-media">' +
                        '<span class="fa fa-question-circle-o fa-2x color-green"></span>' +
                        '</div> ' +
                        '<div class="item-inner" > ' +
                        '<div class="item-title-row"> ' +
                        '<div class="item-title ">'+value.odenecek+'</div> ' +
                        '<div class="item-after" > '+value.tutar+'<i class="fa fa-turkish-lira"></i> ' +
                        '</div> ' +
                        '</div> ' +
                        '<div class="item-subtitle"> ' +
                        '<span class="'+tur+'"></span> '+
                        turBaslik+' - '+value.time+
                        '</div> ' +
                        '</div> ' +
                        '</a> ' +
                        '</li>'
                    );
                });

                // myApp.addNotification({
                //     title: 'Gider.XYZ',
                //     message: 'Verecek listesi başarıyla güncellendi .'
                // });

            }
            else
            {
                myApp.addNotification({
                    title: 'Gider.XYZ',
                    message: 'Verecek listesi yüklenirken hata oluştu !'
                });

            }
        }
    });
});

$(document).on('click','.alacak_tab',function () {
    alacakYenile();
});

$(document).on('click','.sosyal', function () {
    var message = {
        text: "Sende bütçeni tüm platformlardan takip etmek ister misin ? ",
        url: "http://gider.xyz"
    };
    window.socialmessage.send(message);
});

$(document).on('change','.selectbox', function () {

    var attr = $(this).val();
    //alert(attr);

    if (attr == 1)
    {
        //alert("Gider çalıştı");
    }
    if(attr == 2 )
    {
        //alert("Gelir çalıştı");
    }

    $('.oda').slideToggle("slow");
    $('.kategori').slideToggle("slow");

});

$(document).on('change','.kategori_selectbox',function () {

    var attr = $(this).val();

    if(attr == 3)
    {
        $('.oda').slideToggle("slow");
    }else 
    {
        $('.oda').show();
    }
});

window.localStorage.setItem('tur','&tur=0');
$(document).on('click','.checkbox',function () {
   
    if(window.localStorage.getItem('tur') == "&tur=0")
    {
        window.localStorage.setItem('tur','&tur=1');
    }else 
    {
        window.localStorage.setItem('tur','&tur=0');

    }
});

$(document).on('click','.gelirGiderKaydetButon', function () {

    $('.gelirGiderKaydetButon').text("Ekleniyor lütfen bekleyin...");

    $('.access_token').val(token);

    var form = $('#gelirGiderEkle');
    var checkbox = $('.checkbox');

    var is_checked = "";
    if (checkbox.is('checked'))
    {
        is_checked = "&tur=1";
    }
    else
    {
       is_checked = "&tur=0";
    }

    alert(is_checked);
    
    var oda_key = $('.odalar_select option:selected').val();
    var kategori = $('.kategoriler_select option:selected').val();
    var tutar = $('.money').val();
    var aciklama = $('.aciklama').val();


    var attr = $('.selectbox option:selected').val();
   // alert(attr);
    var url =base_url;

    if (attr == 1)
    {
        url += "gider/ekle";
    }
    if(attr == 2 )
    {
        url += "gelir/ekle";
    }
    
    if (myApp.device.ios)
    {
        
        var iphone_tur = $('.iphone_tur option:selected').val();
        if(iphone_tur == 0)
        {
            window.localStorage.setItem('tur','&tur=0');
            alert(window.localStorage.getItem('tur'));
        }
        if(iphone_tur == 1) 
        {
            window.localStorage.setItem('tur','&tur=1');
            alert(window.localStorage.getItem('tur'));

        }
        
        // todo tur değişkenini select'den yakala ve tür objesini &tur=1 \\ &tur=0 olarak ekle.
    }
    
        var tur = window.localStorage.getItem('tur');
        
    alert(window.localStorage.getItem('tur'));


    var data = 'access_token='+window.localStorage.getItem('access_token')+tur+'&key='+oda_key+'&kategori='+kategori+'&tutar='+tutar+'&aciklama='+aciklama;

        $.ajax({
        url: url,
        data:data,
        type: 'post',
        dataType: 'json',
        success: function (yanit) {
            if(yanit.status_code == 200)
            {
                myApp.addNotification({
                    title: 'Gider.XYZ',
                    message: 'Başarıyla eklendi .'
                });
            }else
            {
                myApp.addNotification({
                    title: 'Gider.XYZ',
                    message: 'Ekleme sırasında hata meydana geldi :('
                });
            }
            $('.gelirGiderKaydetButon').text("Kaydet");
            $('.money').val("");
            $('.aciklama').val("");
        }
    });

    
});

$(document).on('click', '.odaListele',function () {
    $.ajax({
        url: base_url + 'oda/listele',
        data: 'access_token=' + token,
        type: 'post',
        dataType: 'json',
        success: function (yanit) {

            //alert(JSON.stringify(yanit));

            $('.odalar').html(" ");

            if (yanit.status_code == 200) {
                $.each(yanit.odalar, function (index, value) {
                    var kullanici_str = "";
                    
                    $.each(value.kullanicilar,function (index, kullanici) {
                        kullanici_str += ", "+kullanici.username;
                    });

                    $('.odalar').append('' +
                        '<li class="accordion-item swipeout" > ' +
                        '<a href="#" class="item-content swipeout-content item-link"> ' +
                        '<div class="item-media"> ' +
                        '<span class="fa fa-list fa-2x color-orange"></span> ' +
                        '</div> ' +
                        '<div class="item-inner" > ' +
                        '<div class="item-title-row"> ' +
                        '<div class="item-title ">'+value.baslik+'</div> ' +
                        '<div class="item-after" > </div> ' +
                        '</div> ' +
                        '<div class="item-subtitle"><span class="fa fa-users" style="margin-right: 30px;">'+kullanici_str+'</span></div> ' +
                        '</div> ' +
                        '</a> ' +
                        '<div class="accordion-item-content"> ' +
                        '<div class="content-block"> ' +
                        '<p> ' +
                        value.qrcode +
                        '</p> ' +
                        '</div> ' +
                        '<div class="swipeout-actions-right"> ' +
                        '<a href="#" class="swipeout-delete swipeout-overswipe" data-oda-key="'+value.oda_key+'" data-confirm="Odadan çıkmak istediğinize emin misiniz?" data-confirm-title="Geri dönüşünüz olmayabilir.."><span class="fa fa-trash-o"></span></a> ' +
                        '</div> ' +
                        '</div>' +
                        '</li>' +
                        '')


                });

            }
        }
    });
});

$(document).on('click','.sil',function () {
    var alacak_verecek_id = $(this).attr('data-alacak');
    myApp.confirm('Silmek istediğine emin misin?',function () {
        //myApp.alert('Evet dedim');

        $('#alacak_verecek_id_'+alacak_verecek_id).fadeOut("fast");
       
        $.ajax({
            url: base_url + 'alacak/sil',
            data: 'access_token=' + token+'&alacak_id='+alacak_verecek_id,
            type: 'post',
            dataType: 'json',
            success: function (yanit) { }
        });
        
    },function () {
    })
});

$(document).on('click','.onayla',function () {
    var alacak_verecek_id = $(this).attr('data-alacak');
    myApp.confirm('Onaylamak istediğine emin misin?',function () {
        //myApp.alert('Evet dedim');
        $('#alacak_verecek_id_'+alacak_verecek_id).fadeOut("fast");

        $.ajax({
            url: base_url + 'alacak/onayla',
            data: 'access_token=' + token+'&alacak_id='+alacak_verecek_id,
            type: 'post',
            dataType: 'json',
            success: function (yanit) { }
        });

    },function () {
    })
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

$(document).on('click','.odayaKatilButon', function () {
    cordova.plugins.barcodeScanner.scan(
        function (result) {
           // alert(result.text);
            $.ajax({
                url: base_url + 'oda/katil',
                data: 'access_token=' + token+'&key='+result.text,
                type: 'post',
                dataType: 'json',
                success: function (yanit) {
                    if(yanit.status_code == 200)
                    {

                        var kullanici_str = "";

                        $.each(yanit.kullanicilar,function (index, kullanici) {
                            kullanici_str += ", "+kullanici.username;
                        });
                        
                        $('.odalar').append('' +
                            '<li class="accordion-item swipeout" > ' +
                            '<a href="#" class="item-content swipeout-content item-link"> ' +
                            '<div class="item-media"> ' +
                            '<span class="fa fa-list fa-2x color-orange"></span> ' +
                            '</div> ' +
                            '<div class="item-inner" > ' +
                            '<div class="item-title-row"> ' +
                            '<div class="item-title ">'+yanit.baslik+'</div> ' +
                            '<div class="item-after" > </div> ' +
                            '</div> ' +
                            '<div class="item-subtitle"><span class="fa fa-users" style="margin-right: 30px;">'+kullanici_str+'</span></div> ' +
                            '</div> ' +
                            '</a> ' +
                            '<div class="accordion-item-content"> ' +
                            '<div class="content-block"> ' +
                            '<p> ' +
                            yanit.qrcode +
                            '</p> ' +
                            '</div> ' +
                            '<div class="swipeout-actions-right"> ' +
                            '<a href="#" class="swipeout-delete swipeout-overswipe" data-oda-key="'+yanit.oda_key+'" data-confirm="Odadan çıkmak istediğinize emin misiniz?" data-confirm-title="Geri dönüşünüz olmayabilir.."><span class="fa fa-trash-o"></span></a> ' +
                            '</div> ' +
                            '</div>' +
                            '</li>' +
                            '')


                        myApp.addNotification({
                            title: 'Gider.XYZ',
                            message: 'Odaya katılma işlemem tamamlandı .'
                        });
                    }
                }
            });


        },
        function (error)
        {
            alert("Scanning failed: " + error);
        }
    );
});

$(document).on('click','.odaKurButon',function(){

    //oda kur yukarı silinir
    $(this).slideUp("slow");
    $('.odayaKatilButon').slideToggle("slow"); //odaya katıl yukarı silinir

    $('.odaKurDiv').slideToggle("slow"); //oda kur divi aşağıya iner.

});

$(document).on('click','.vazgec', function () {
    $('.odaKurDiv').slideToggle("slow");
    $('.odayaKatilButon').slideToggle("slow");
    $('.odaKurButon').slideToggle("slow");

});

$(document).on('click','.odaKurKaydetButon', function () {

    var value = $('.odaBaslik').val();

    //alert(value);
    $.ajax({
        url: base_url + 'oda/olustur',
        data: 'access_token=' + token+'&baslik='+value,
        type: 'post',
        dataType: 'json',
        success: function (yanit) {
            if(yanit.status_code == 200)
            {
                $('.odaBaslik').val("");
                var kullanici_str = "";

                $.each(yanit.kullanicilar,function (index, kullanici) {
                    kullanici_str += ", "+kullanici.username;
                });

                $('.odalar').append('' +
                    '<li class="accordion-item swipeout" > ' +
                    '<a href="#" class="item-content swipeout-content item-link"> ' +
                    '<div class="item-media"> ' +
                    '<span class="fa fa-list fa-2x color-orange"></span> ' +
                    '</div> ' +
                    '<div class="item-inner" > ' +
                    '<div class="item-title-row"> ' +
                    '<div class="item-title ">'+yanit.baslik+'</div> ' +
                    '<div class="item-after" > </div> ' +
                    '</div> ' +
                    '<div class="item-subtitle"><span class="fa fa-users" style="margin-right: 30px;">'+kullanici_str+'</span></div> ' +
                    '</div> ' +
                    '</a> ' +
                    '<div class="accordion-item-content"> ' +
                    '<div class="content-block"> ' +
                    '<p> ' +
                    yanit.qrcode +
                    '</p> ' +
                    '</div> ' +
                    '<div class="swipeout-actions-right"> ' +
                    '<a href="#" class="swipeout-delete swipeout-overswipe" data-oda-key="'+yanit.oda_key+'" data-confirm="Odadan çıkmak istediğinize emin misiniz?" data-confirm-title="Geri dönüşünüz olmayabilir.."><span class="fa fa-trash-o"></span></a> ' +
                    '</div> ' +
                    '</div>' +
                    '</li>' +
                    '')
            }
        }
    });


    // todo : QR KOD OLUŞTUR İNSERT ET VB.

    $('.odaKurDiv').slideToggle("slow");
    $('.odayaKatilButon').slideToggle("slow");
    $('.odaKurButon').slideToggle("slow");


});


$(document).on('click', '.borcOkut',function () {
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            //alert(result.text);

            $.ajax({
                url: base_url + 'verecek/onayla',
                data: 'access_token=' + token+'&verecek_key='+result.text,
                type: 'post',
                dataType: 'json',
                success: function (yanit) {
                    
                    alert("yanit geldi");
                    if(yanit.status_code == 200)
                    {
                        
                        
                        
                        myApp.addNotification({
                            title: 'Gider.XYZ',
                            message: 'Işlem başarıyla gerçekleştirildi ve Vereceklerim listenize eklendi.'
                        });
                    }else
                    {
                        myApp.addNotification({
                            title: 'Gider.XYZ',
                            message: 'Işlemi gerçekleştiremedim :( .'
                        });
                    }
                }
            });


        },
        function (error)
        {
            alert("Scanning failed: " + error);
        }
    );
})


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






