#AI Written

require "bootstrap"

Jekyll::Hooks.register :site, :after_init do |site|
  bootstrap_scss = File.join(Gem.loaded_specs["bootstrap"].full_gem_path, "assets/stylesheets")
  puts "Adding Bootstrap SCSS path: #{bootstrap_scss}"
  site.config["sass"] ||= {}
  site.config["sass"]["load_paths"] ||= []
  site.config["sass"]["load_paths"] << bootstrap_scss
end