include Digest

# set sinatra's variables
set :app_file, __FILE__
set :root, File.dirname(__FILE__)
set :views, "views"
set :public, 'public'

before do
  expires 36000, :public, :must_revalidate
  response.headers["Access-Control-Allow-Origin"] = "*"
  response.headers["Access-Control-Allow-Methods"] = "*"
  response.headers["Access-Control-Request-Header"] = "X-Requested-With"
end

helpers do
  def mobile?
    request.env["HTTP_USER_AGENT"] && request.env["HTTP_USER_AGENT"][/(Mobile|WebOS)/]
  end
  def versioned_javascript(js)
    "/js/#{js}.js"
  end
end

get '/stylesheets/:name.css' do
  content_type 'text/css', :charset => 'utf-8'
  scss(:"stylesheets/#{params[:name]}", Compass.sass_engine_options)
end

def version_2 data
  symbols = "!@#]^&*(%[?${+=})_-|/<>".split(//)
  data['domain'].downcase!
  hash = SHA2.hexdigest("#{data['master']}:#{data['domain']}")
  hash = SHA2.hexdigest("#{hash}#{data['key']}")[0...data['settings']['length'].to_i]
  hash = Base64.strict_encode64(hash)

  host, tld = data['domain'].split(".")
  tld = 'com' if tld.nil?
  
  
  
end

def version_1 data
  symbols = "!@#]^&*(%[?${+=})_-|/<>".split(//)
  data['domain'].downcase!
  hash = SHA2.hexdigest("#{data['master']}:#{data['domain']}")
  hash = SHA2.hexdigest("#{hash}#{data['key']}")[0...data['settings']['length'].to_i]
  #hash = Base64.strict_encode64(hash)

  host, tld = data['domain'].split(".")
  tld = 'com' if tld.nil?
  nums = 0
  key_num = hash.match(/\d/)[0].to_i
  secret = hash.split(//)
  this_upper = true
  puts "--"
  secret.each_with_index do |item, num|
    if item.match(/[a-zA-Z]/) # Letters
        if data['settings']['caps'] == "true" && !this_upper
          this_upper = true
           secret[num] = item.match(/[a-zA-Z]/)[0].upcase
        else
          this_upper = false
        end
    else # Numbers
      if data['settings']['symbols'] == "true"
        secret_idx = num + key_num / 3
        p secret[secret_idx]
        sym_idx = nums + num + (key_num * nums) + (1 * num)
        # puts sym_idx
        unless secret[secret_idx].nil? or secret_idx < 0 or sym_idx < 0 or symbols[sym_idx].nil?
          # p symbols[sym_idx]
          secret[secret_idx] += symbols[sym_idx]
        end
      end
      nums += 1
    end
  end
  p secret
  secret.join[0...data['settings']['length'].to_i]
end

def create_password data, version=1
  case version
  when 1
    version_1 data
  when 2
    #version_1 data
  end
end

get '/create' do
  unless params['settings']
    params['settings'] = {
      "symbols" => params['symbols'],
      "caps"    => params['caps'],
      "length"  => params['length']
    }
  end
  create_password params
end
get '/about' do
  erb :about,:layout => :'layouts/layout'
end

post '/fetch_key' do
  
end

get '/:key?' do |key|
  if key
    erb :index, :layout => :'layouts/layout'
  else
    key = SHA2.hexdigest("#{Time.now.to_i}")[0...5]
    redirect to("/#{key}")
  end
end

post '/:key' do
  @secret = create_password params, 1
end

