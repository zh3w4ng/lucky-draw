#!/usr/bin/env ruby
require 'csv'
require 'json'
list = {}
CSV.foreach("list.csv", quote_char: '"') do |row|
  # use row here...
  company, id, name, gender = row
 #  if gender == 'M'
 # 	gender = 'Male'
 #  else
	# gender = 'Female'
 #  end
  puts id
  list[company+' '+id] = { sid: id,  name:  name, company: company, gender: gender }
end

File.open("list.json","w") do |f|
  f.write(JSON.pretty_generate(list))
end
