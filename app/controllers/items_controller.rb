class ItemsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_item, only:[:edit, :update, :destroy]
  before_action :seller?, only:[:edit, :update, :destroy]

  def new
  	@item = Item.new
    render layout: 'no_menu' # レイアウトファイルを指定
  end

  def create
  	@item = Item.new(item_params)
  	if @item.save!
      redirect_to root_path, notice: "出品に成功しました"
    else
      render layout: 'no_menu', template: 'items/new' # レイアウトファイル指定
    end
  end

  def edit
    render layout: 'no_menu'
  end

  def update
  	if @item.update(item_params)
  		redirect_to root_path, notice: "商品の編集が完了しました。"
  	else
  		render layout: 'no_menu', action: :edit
  	end
  end

  def destroy
  	if @item.destroy
  		redirect_to root_path, notice: "商品の削除が完了しました。"
  	else
  		render layout: 'no_menu', action: :edit
  	end
  end

  def purchase_confirmation
    render layout: 'no_menu'
  end


  private
  def item_params
  	params.require(:item).permit(:name, :detail, :category_id, :condition, :delivery_fee_payer, :delivery_method, :prefecture_id, :delivery_days, :price).merge(seller_id: current_user.id)
  end

  def set_item
  	@item = Item.find(params[:id])
  end

  def seller?
  	redirect_to root_path, notice: "あなたは出品者ではありません。" unless current_user.id == @item.seller_id
  end
end
