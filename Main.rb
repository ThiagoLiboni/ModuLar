$LOAD_PATH << __dir__
require 'sketchup.rb'
require 'extensions.rb'
require 'json'
require 'ostruct'
require 'bridge.rb'
require 'csv'
require_relative 'connection_db.rb'


module Modular
  module Main
    
    
    class ComponentObserver < Sketchup::SelectionObserver
      def onSelectionBulkChange(selection)
        selection.each do |component|
          process_component(component)
          process_internal_components(component)
          end
          Modular::Main.deselection if selection.empty?
      end
      
      def onSelectionCleared(selection)
        Modular::Main.deselection
      end
      
      def process_component(component)
        return unless component.is_a?(Sketchup::ComponentInstance) # Verifica se é um componente
        definition_name = component.definition.name
        return unless definition_name.start_with?("Piso_", "Lateral_", "Teto_") # Verifica se o nome da definição corresponde a um dos valores desejados
        Modular::Main.get_measure(component)
      end
      
      def process_internal_components(component)
        component.definition.entities.each do |entity|
          next unless entity.is_a?(Sketchup::ComponentInstance)
          process_component(entity)
        end
      end
    end
    
    @@dados = []
    @@path = ""
    def self.add_selection_observer
      observer = Modular::Main::ComponentObserver.new
      Sketchup.active_model.selection.add_observer(observer)
      
    end
    # obtem as dimesões de componentes selecionado
    def self.get_measure(component)
         
            bounds = component.bounds  
            
            # Calcula o tamanho do componente nas direções x, y e z
            elemento = component.name
            comprimento = bounds.width
            largura = bounds.height
            espessura = bounds.depth
            parametro = [comprimento, largura, espessura]
            parametro = parametro.sort

            espessura_final = parametro[0]  
            comprimento_final = parametro[-1]
            largura_final = parametro[1]

            # Imprime as dimensões
            puts "Dimensões do componente: #{elemento}"
            puts "Comprimento: #{comprimento_final}"
            puts "Largura: #{largura_final}"
            puts "Espessura: #{espessura_final}"
          
            @@dados << {elemento:elemento,comprimento:comprimento_final,largura:largura_final,espessura:espessura_final}
          
    end
    
    def self.deselection
      @@dados = []
      puts "elementos deselecionado"
    end
    

   def self.exportTable
    if @@path
      csv_file_path = 'dados_componentes.csv'
      CSV.open(csv_file_path, 'wb', col_sep: ';') do |csv|
        # Escreve a primeira linha da tabela
        csv << ["Projeto", "Elemento", "Comprimento", "Largura", "Espessura"]
      
        # Escreve a segunda linha apenas com o resultado de self.get_file_js
        csv << [self.get_filename_js]
      
        # Itera sobre os dados e escreve as linhas subsequentes da tabela
        @@dados.each do |dado|
          csv << ["",dado[:elemento], dado[:comprimento], dado[:largura], dado[:espessura]]
        end
      end
      dados_csv = CSV.read(csv_file_path, headers: true, col_sep: ';')
      Connection_DB.insert_data_into_db(@@dados)
      Connection_DB.replace_table_data(@@dados)

    end    
    puts "Dados exportados com sucesso: #{csv_file_path}"
    
  end

    

    def self.auto_start
      self.home_toolbar
      self.start_node_server
      self.home_html_dialog
    end

    # inicia uma sessão com servidor Node
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

    # cria um ambiente de interação com HTML
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
        
    def self.get_File
        model = Sketchup.active_model
        if model
          file_name = model.path
          if file_name.empty?
            puts "O modelo não foi salvo ainda."
                        # Abre a janela de "Salvar Como"
            file_path = UI.savepanel("Salvar Como", "", "Modelos do SketchUp (*.skp)|*.skp||")
            # Verifica se o usuário selecionou um arquivo
            if file_path
              # Salva o modelo com o caminho especificado
              Sketchup.active_model.save(file_path)
              puts "Modelo salvo em: #{file_path}"
              @@path = file_name
              self.exportTable
              puts "tabela criada"
              return nil
            else
                # Se o usuário cancelou a operação, nil será retornado
                puts "Operação de salvar como cancelada."
                return nil
            end
          else
            puts "Modelo: #{file_name}"
            @@path = file_name
            self.exportTable
            puts "tabela criada"
            # return File.basename(file_name)
          end
        else
          puts "Nenhum modelo está aberto no SketchUp no momento."
          return nil
        end
    end
    
    def self.get_filename_js
      @@path
    end
    

    
     # obtém e insere o componente no modelo.
    def self.get_component( url, multi = false )
      filepath = url
      slash(filepath)
      @mru_skp_path = File.dirname(filepath)
      model = Sketchup.active_model
      deflist = model.definitions
      comp = deflist.find {|cdef|
        next false if cdef.group?
        slash(cdef.path) == filepath 
      }
      if comp 
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

    # lida com caracteres de endereço
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
    
      
      cmd_export = UI::Command.new("Exportar") { self.get_File }
=begin  cmd_export.large_icon = "path_to_large_icon.png" # Substitua "path_to_large_icon.png" pelo caminho para o ícone grande
        cmd_export.small_icon = "path_to_small_icon.png" # Substitua "path_to_small_icon.png" pelo caminho para o ícone pequeno
=end      
        cmd_export.tooltip = "Exportar Tabela" # Defina uma dica de ferramenta para o ícone
      toolbar.add_item cmd_export

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

  UI.start_timer(0.1, false) do
    Modular::Main.add_selection_observer
  end