$(document).ready(function() {

    $('#searchMovie').val('');
    $('#search').prop('disabled', true);
    $('#searchMovie').keyup(function() {
        $('#search').prop('disabled', this.value == "" ? true : false);
    })
    $('[data-toggle="tooltip"]').tooltip();


});

var url = 'http://api.themoviedb.org/3/',
    mode = 'search/movie?query=',
    input,
    movieName,
    key = '&api_key=82cec52b253b88751754f2c461c661c7';

function getMovies() {
    var input = $('#searchMovie').val(),
        movieName = encodeURI(input);
    $.ajax({
        type: 'GET',
        url: url + mode + input + key,
        async: false,
        jsonpCallback: 'testing',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function(json) {
            if ((json.results).length > 0) {
                $("#divPeliculas").html("");
                var divBox = $("#divPeliculas");
                divBox.append("<div id='tituloPanel' class='panel-heading'>Películas encontradas</div><table class='table' id='resultado''></table>")
                $("#resultado").append("<tbody><tr><td>Miniatura</td><td>Titulo</td><td>Sinopsis</td></tr></tbody>");
                $.each(json.results, function(i, val) {
                    var resultTable = $("#resultado");
                    resultTable.append("<tr><td><img class='poster' src='https://image.tmdb.org/t/p/original/" + val.poster_path + "'><td><p class='titleMovie' id='" + val.id + "' onClick='loadImages(this)' data-toggle='tooltip' data-placement='top' title='Click para ver las imagenes!'>" + val.title + "</p></td><td><p class='overviewMovie'>" + val.overview + "</p></td></tr>");

                });
                $(".newSearch").css("visibility", "visible");
            } else {
                alert('no hay resultados que coincidan con su busqueda');
                reload();
            }

        },
        error: function(e) {
            console.log(e.message);
        }
    });
}

function reload() {
    location.reload();
}

function loadImages(id) {
    var movieSelected = $(id).attr('id');
    movieIdSelected = encodeURI(movieSelected);
    mode = "movie/" + movieIdSelected + "/images?";
    $.ajax({
        type: 'GET',
        url: url + mode + key,
        async: false,
        jsonpCallback: 'testing',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function(img) {
            console.log(img);
            var slider = $(".carousel-inner");
            $.each(img.backdrops, function(i, val) {

                slider.prepend("<div class='item'><li><img src='http://image.tmdb.org/t/p/original" + val.file_path + "' style='margin-right:auto; margin-left:auto; display:block; width:80%;' / ></li></div>");


            });
            $(".item").first().addClass("active");
            $('html, body').animate({
                scrollTop: $("#myCarousel").offset().top
            }, 2000);

            $("#myCarousel").css("visibility", "visible");
            $("#myCarousel").css("display", "table-cell");
        },
        error: function(e) {
            console.log(e.message);
        }
    });


}