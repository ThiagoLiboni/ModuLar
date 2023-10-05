$LOAD_PATH << __dir__
require 'sketchup.rb'
require 'extensions.rb'
require 'json'
require 'ostruct'
require 'bridge.rb'






module Modular
  module Main

    def self.auto_start
      self.home_toolbar
      self.start_node_server
      self.home_html_dialog
    end
    
    def self.start_node_server
        # Verifique se o servidor Node.js já está em execução
        
        if @node_server_pid.nil? || !Process.kill(0, @node_server_pid)
          # Inicie o servidor Node.js em segundo plano
          auth_login_mjs_path = File.join(__dir__, 'app.mjs')
          @node_server_pid = spawn('node', auth_login_mjs_path)
      
          # Aguarde um momento para garantir que o servidor esteja pronto
          sleep(2)
        end
    end

     # Cria um HTML Dialog com o servidor
    def self.home_html_dialog
      
      start_node_server #iniciar o servidor

      dialog = UI::HtmlDialog.new(
        {
          :dialog_title => "Ambientes Planejados",
          :preferences_key => "com.sample.plugin",
          :scrollable => true,
          :resizable => true,
          
        })
        
            
            dialog.set_url("http://127.0.0.1:3000/Authentication")
            ML::Modular::Bridge.decorate(dialog)
            
          # Abre o diálogo
          dialog.show
          dialog.add_action_callback("get") do |action_context, url|
            Modular::Main.ref(url)
            
          end
          
          dialog.add_action_callback("getTex") do |action_context, url, name|
            
            Modular::Main.apply_texture(url,name)
            puts nome, url
            
            
          end
    end
    
     # Este é o método que obtém e insere o componente no modelo.
    def self.get_component( url, multi = false )
      filepath = url
      slash(filepath)
      # At this point we could also save a reference to this path.
      # Sort of our own Most Recently used path:
      @mru_skp_path = File.dirname(filepath)
      model = Sketchup.active_model
      deflist = model.definitions
      comp = deflist.find {|cdef|
        next false if cdef.group?
        slash(cdef.path) == filepath 
      }
      if comp # already loaded into DefinitionList
        model.place_component(comp, multi)
      else
        begin
          comp = deflist.load(filepath)
        rescue => err
          UI.messagebox(
            'Error loading component:'<<
            "\\n#{File.basename(filepath)}\n\n"<<err.message
          )
        else
          model.place_component(comp, multi)
        end
      end
    end
  
    def self.slash(filepath)
      filepath.gsub!(/\\\\|\\/,'/')
    end

    def self.ref(url)
      get_component(url, true)
      puts  "Componente inserido: #{url}"
    end    

    # Cria e aplica o material recebido
    def self.apply_texture(texture_path, material_name)
      begin
              # Obtém o modelo ativo do SketchUp
        model = Sketchup.active_model

        existing_material = model.materials[material_name]

        unless existing_material
        
          # Cria um novo material
          new_material = model.materials.add(material_name)

          # Define a textura do material usando um arquivo PNG
          texture_file = texture_path  # Substitua pelo caminho do seu arquivo PNG
          new_material.texture = texture_file
        end

        # Aplica o novo material a um componente ou grupo selecionado (opcional)
        model.selection.grep(Sketchup::ComponentInstance).each do |component|
          component.material = existing_material || new_material
        end

             
          # Atualiza a visualização para refletir as alterações
          model.active_view.refresh
        rescue => e
          UI.messagebox("Ocorreu um erro #{e.message}")
          UI.messagebox("O material '#{material_name}' não foi encontrado no modelo.")
      end
    end
    
     
    @@toolbar_created = false  # Variável de classe para controlar se a barra de ferramentas foi criada
      
    
    def self.create_toolbar
      return if @@toolbar_created  # Se a barra de ferramentas já foi criada, saia da função
      cmd_study = UI::Command.new("Estudo") { self.home_html_dialog}
      toolbar = UI::Toolbar.new "ModuLar"
      toolbar.add_item cmd_study
      toolbar.show
      @@toolbar_created = true  # Marca a barra de ferramentas como criada
    end
      

    def self.home_toolbar
      self.create_toolbar  # Chama o método para criar a barra de ferramentas
    end
    
    
    # Método principal que cria um item no menu do sketchup
    unless file_loaded?(__FILE__)
      menu = UI.menu("Plugins")
      menu.add_item("Nome do Plugin") {
      self.auto_start
      self.home_toolbar
      }
    end
  end
      
  file_loaded(__FILE__)
  
end
Modular::Main.auto_start

