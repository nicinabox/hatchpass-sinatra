require 'rack/cache'
require 'bundler'
require 'rubygems'
require 'compass'
require 'sinatra'
require 'erb'
require 'sass'
require 'digest/md5'
require 'digest/sha1'
require 'digest/sha2'
require 'base64'
require File.expand_path(File.dirname(__FILE__) + '/lib/config')

Bundler.require

# use Rack::Cache,
#   :metastore => "file:tmp/meta", 
#   :entitystore => "file:tmp/body"

require './app'
run Sinatra::Application