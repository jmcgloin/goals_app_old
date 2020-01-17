class CreateSteps < ActiveRecord::Migration[6.0]
  def change
    create_table :steps do |t|
      t.string :step_name
      t.integer :goal_id
      t.integer :minutes_to_complete
      t.boolean :completed
      t.string :desciption

      t.timestamps
    end
  end
end
