#!/usr/bin/env ruby
require 'csv'
require 'json'
list = {}
CSV.foreach("list.csv") do |row|
  # use row here...
  id, name, company, division = row
  list[id] = { name:  name, company: company, division: division }
end

File.open("list.json","w") do |f|
  f.write(JSON.pretty_generate(list))
end
