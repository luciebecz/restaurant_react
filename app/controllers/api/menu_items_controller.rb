class Api::MenuItemsController < ApplicationController
  def index
  end

  def show
  end

  def create 
  end 

  def update 
  end 

  def destroy 
  end 

  private 
    def menu_item_params
      params.require(:menu_items).permit(:name, :description, :price)
    end 

    def set_menu_item
    end 
end
