# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20160714091400) do

  create_table "employees", :force => true do |t|
    t.string   "name"
    t.string   "address"
    t.float    "salary"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "status"
    t.string   "email"
    t.string   "phone"
  end

  create_table "skill_names", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "skill_names", ["name"], :name => "index_skill_names_on_name", :unique => true

  create_table "skills", :force => true do |t|
    t.integer  "skill_name_id"
    t.integer  "skillable_id"
    t.string   "skillable_type"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  add_index "skills", ["skill_name_id", "skillable_id", "skillable_type"], :name => "idx_uniq_skill", :unique => true
  add_index "skills", ["skillable_id", "skillable_type"], :name => "index_skills_on_skillable_id_and_skillable_type"

  create_table "vacancies", :force => true do |t|
    t.string   "title"
    t.float    "salary"
    t.date     "expire_at"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "address"
  end

end
