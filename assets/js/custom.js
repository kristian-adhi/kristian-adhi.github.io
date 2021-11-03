$(document).ready(function () {
    $('#linkedin').load('html/linkedin-profile.html');

});

$(window).scroll(function () {
    if ($(this).scrollTop() > 40) {
        $('#navbar').addClass('bg-white');
        $('#navbar').removeClass('bg-transparent');
    } else {
        $('#navbar').addClass('bg-transparent');
        $('#navbar').removeClass('bg-white');
    }
});

$('#modalNavigation').click(function () {
    $('#modalNavigation').modal('toggle');
});

$(document).on("click", ".openImageDialog", function () {
    let myImageId = $(this).data('id');
    $(".modal-body #myImage").attr("src", myImageId);
});

function show_project(id) {

    $.getJSON("assets/data/project.json",
        function (data) {
            let res = data.filter(x => x.id == id);
            let res_not_id = data.filter(x => x.id != id);

            $.each(res_not_id, function (key, val) {
                id_project = val.id;

                $('.carousel-' + id_project).hide();
                $('.carousel-' + id_project).parent().hide();

            });

            $.each(res, function (key, val) {
                id_project = val.id
                url = val.url;
                link = '-';

                if (url != '' && url != '-') {
                    link = '<a href="' + url + '" target="_blank">' + url + '</a>';
                }

                $('#header-project-name').html(val.name);
                $('#header-project-name').find("br").remove();
                $('#project-name').html(val.name);
                $('#description').html(val.description);
                $('#project-url').html(link);

                // $('.carousel-' + id_project).show();

                data = val.images;
                arr_size = (typeof data !== 'undefined') ? data.length : 0;
                
                $('.carousel-inner').html("");
                $('.carousel-indicators').html("");
                $('.carousel-control-prev').hide();
                $('.carousel-control-next').hide();

                if (arr_size > 0) {

                    if (arr_size > 1) {
                        $('.carousel-control-prev').show();
                        $('.carousel-control-next').show();
                    } else {
                        $('.carousel-control-prev').hide();
                        $('.carousel-control-next').hide();
                    }

                    carousel_item = '';
                    carousel_indicator = '';
                    
                    for (let i = 0; i < arr_size; i++) {

                        img_url = data[i].img_url;

                        if (img_url != '') {
                                
                            active = (i == 0) ? 'active' : '';

                            carousel_item += `<div class="carousel-item banner-max-height ${active}">'
                                                <a href="#picture" data-id="${img_url}" class="openImageDialog thumbnail" data-toggle="modal">
                                                    <img class="d-block w-100 h-100" src="${img_url}" alt="banner">
                                                </a>
                                            </div>`;

                            /* carousel_item += '<div class="carousel-item banner-max-height '+active+'">'
                                                +'<a href="#picture" data-id="'+img_url+'" class="openImageDialog thumbnail" data-toggle="modal">'
                                                    +'<img class="d-block w-100 h-100" src="'+img_url+'" alt="banner">'
                                                +'</a>'
                                            +'</div>'; */

                            carousel_indicator += '<li data-target="#bannerCarousole" data-slide-to="'+i+'" class="'+active+'"></li>';
                            
                        }
                        

                    }

                    $('.carousel-inner').html(carousel_item);
                    $('.carousel-indicators').html(carousel_indicator);



                }
            
            });


            $('#modal_project').modal('show');

        }
    );
}