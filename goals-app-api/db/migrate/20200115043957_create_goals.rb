class CreateGoals < ActiveRecord::Migration[6.0]
  def change
    create_table :goals do |t|
      t.string :goal_name
      t.date :deadline
      t.integer :importance
      t.boolean :completed
      t.string :metric
      t.integer :user_id

      t.timestamps
    end
  end
end
