document.addEventListener('turbolinks:load', function () {
  if (!$('.mypage-block')[0]) return false; //ユーザーマイページではないなら以降実行しない。
  

  $("#selling").on("click", function (e) { //出品中ボタンが押された時
    e.preventDefault(); //デフォルトで発動するリンクの遷移を防ぐ
    

    $.ajax({ //AJAXでuser/sellingを動かす
        url: "/users/selling",
        type: "GET",
        dataType: 'json',
      }).done(function (items) {
        if (items.length == 0) return false //categoryが空、つまり孫が選択された場合、処理を終了させる。
          items.forEach(function (item) { // カテゴリを一つずつ渡してoptionタグを一つずつ組み立てていく。
           console.log(item.image)
          });

        // changed_form.nextAll(".select-category").remove(); //選択肢たカテゴリ以降のカテゴリを全て消去。カテゴリの選び直し対策。

        // const html = buildCategoryForm(categories);// カテゴリのフォームを組み立てる
        // $(".select-category:last").after(html);// 組み立てたフォームを表示
      })
      .fail(function () {
        alert('error');
      })
  });
  
});