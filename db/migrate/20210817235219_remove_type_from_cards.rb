class RemoveTypeFromCards < ActiveRecord::Migration[6.1]
  def change
    remove_column :cards, :type
  end
end
