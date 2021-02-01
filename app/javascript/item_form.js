document.addEventListener('turbolinks:load', function () {
  if (!$('#item_form')[0]) return false; //商品出品・編集ページではないなら以降実行しない。

  function newFileField(index) { //新規画像投稿用のfile_fieldを作成しappendする。
  	const html = `
               <input accept="image/*" class="new-item-image" style="display: block;" data-index="${index}" type="file" name="item[images_attributes][${index}][src]" id="item_images_attributes_${index}_src">
               `;
    return html;
  }

  function buildImagePreview(blob_url, index) { //選択した画像ファイルのプレビューを表示する。
    html = `
            <div class="item-image new" data-index=${index}>
              <img src =${blob_url} class="item-image__image">
              <div class="item-image__buttons">
                <div class="item-image__buttons--edit">
                編集
                </div>
                <div class="item-image__buttons--delete">
                削除
                </div>
              </div>
            </div>
            `;
    return html;
  }

  //灰色の箱をクリックしたら
  $("#select-image-button").on("click", function(){
  	const file_field = $(".new-item-image:last");// 新規画像投稿用のfile_fieldの一番最後のものを取得する。
    file_field.trigger("click"); // file_fieldをクリックさせる。

  });

  // //file_fieldが変化したら
  $("#image-file-fields").on("change", `input[type="file"]`, function (e) { //新しく画像が選択された、もしくは変更しようとしたが何も選択しなかった時
    console.table(e.target.files);//画像の情報をテーブル形式で表示

    const file = e.target.files[0];//fileを取得

    let index = $(this).data("index");//カスタムデータ属性を取得
    console.log("選択した画像のindex=", index);

    const blob_url = window.URL.createObjectURL(file); //選択された画像をblob url形式に変換する。

    if ($(`.item-image[data-index="${index}"]`)[0]) { //プレビュー画像が既に表示されている、つまり画像の変更をしたい場合
      console.log("画像の変更を行います");
      return false; //処理を中断し、編集ボタンを経由した際はプレビュー画像とfile_fieldの追加を行わないようにする
    }
    
    const preview_html = buildImagePreview(blob_url, index);//プレビュー用HTML作成する関数を呼び出す
    $("#select-image-button").before(preview_html); //灰色の箱の直前にappendする

    index += 1;//カスタムデータ属性をインクリメント
    const file_field_html = newFileField(index);
    $("#image-file-fields").append(file_field_html);//新しいfile_fieldをappendする
  });


  //削除ボタンを押したら
  $("#selected-item-images").on("click", ".item-image__buttons--delete",function(e) {//javascriptによって後から追加されるものにも対応できるようにした
  	const index = $(this).parents(".item-image").data("index"); //選択した画像のindexを取得
  	$(this).parents(".item-image").remove(); //プレビュー画像を削除
  	$(`#item_images_attributes_${index}__destroy`).prop("checked", true); //削除用チェックボックスにチェック
  	$(`#item_images_attributes_${index}_src`).remove(); //file_fieldを削除
  });

  //編集ボタンを押したら
  $("#selected-item-images").on("click", ".item-image__buttons--edit", function(e) {
  	const index = $(this).parents(".item-image").data("index"); //選択肢た画像のindexを取得
  	$(`#item_images_attributes_${index}_src`).trigger("click"); //file_fieldをクリック
  	console.log(index, "編集ボタンを押しましたね？");
  });




  
});