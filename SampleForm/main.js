$(function() {
    // 画面表示時に最初のフォームにフォーカスを当てる
    $('input:visible').eq(0).focus();

    // ラジオボタンの遷移
    $('.radio').click(function(){
        $('.radio').prop('checked', false);
        $(this).prop('checked', true);
    });

    var search = decodeURIComponent(location.search);
    var param = search.split("&");
    var name, seibetu, select;

    param.map(value => {

        if(value.indexOf("name") >= 0){
            name = value.split("=")[1];
        }

        if(value.indexOf("seibetu") >= 0) {
            seibetu = value.split("=")[1];
        }

        if (value.indexOf("select") >= 0){
            select = value.split("=")[1];
        }
    });
    var table_value = "<tr><th scope='row'>" + name + "</th><td>" + seibetu + "</td><td>" + select + "</td></tr>";
    $('.table > tbody').append(table_value);
});

function submit() {

    // validation
    if ($('#input-name').val() == "") {
        alert("名前を入力してください");
        location.reload();
    } else if (! $('.contact__input__agree').is(':checked')){
        alert("同意のチェックを入れてください");
        location.reload();
    }

    // modal画面項目に値を設定
    $('.modal-name').text($('#input-name').val());
    $('.modal-seibetu').text($('.radio:checked').val());
    $('.modal-select').text($('#input-select').val());
}

function next() {
    var name = $('#input-name').val();
    var seibetu = $('.radio:checked').val();
    var select = $('#input-select').val();
    window.location.href = '/complete?name=' + name + "&seibetu=" + seibetu + "&select=" + select;
}
