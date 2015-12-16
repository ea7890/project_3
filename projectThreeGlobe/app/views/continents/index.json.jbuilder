json.array!(@continents) do |continent|
  json.extract! continent, :id, :name, :image
  json.url continent_url(continent, format: :json)
end
