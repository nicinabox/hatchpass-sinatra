require 'compass'
require 'sinatra'
require 'erb'
require 'sass'
require 'digest/md5'
require 'digest/sha1'
require 'digest/sha2'
require 'base64'
include Digest

# set sinatra's variables
set :app_file, __FILE__
set :root, File.dirname(__FILE__)
set :views, "views"
set :public, 'static'

configure do
  Compass.add_project_configuration(File.join(Sinatra::Application.root, 'config', 'compass.config'))
end

# at a minimum, the main sass file must reside within the ./views directory. here, we create a ./views/stylesheets directory where all of the sass files can safely reside.
get '/stylesheets/:name.css' do
  content_type 'text/css', :charset => 'utf-8'
  scss(:"stylesheets/#{params[:name]}", Compass.sass_engine_options)
end


def create_password data
  symbols = "!@#]^&*(%[?${+=})_-|/<>".split(//)
  
  hash = SHA256.hexdigest("#{data['domain']}:#{data['master']}")
  hash = SHA256.hexdigest("#{hash+data['key']}")[0...data['settings']['length'].to_i]
  #hash = Base64.strict_encode64(hash)
  
  host, tld = data['domain'].split(".")
  nums = 0
  secret = hash.split(//)
  key_num = data['settings']['key'].match(/\d/)[0].to_i
  this_upper = true
  
  
  # interpolate symsymbolbols
  if data['settings']['symbols']
    secret.each_with_index do |item, num|
      key_num ||= secret[item].to_i
    
      secret_idx = (num + key_num / 3) + 1
      sym_idx = nums + num + key_num * nums + tld.size * num
      # $nums+$key+$firstNum*$nums+count($tld)*$key
      unless secret[secret_idx].nil? or secret_idx < 0 or sym_idx < 0 or secret[sym_idx].nil?
        secret.insert secret_idx, symbols[sym_idx] 
      end
      nums += 1 if item.is_a?(Integer)
    end
  end
  secret.join[0...data['settings']['length'].to_i]           
end

get "/:key?" do 
  if params[:key]
    erb :index
  else
    key = SHA1.hexdigest("#{Time.now.to_i}")[10...15]
    redirect to("/#{key}")
  end
end

post '/:key' do
  @secret = create_password params
end
