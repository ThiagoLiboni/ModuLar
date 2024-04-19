require 'mysql2'


class ConnectionDB

        @@client = Mysql2::Client.new(
          host: ENV['DB_HOST'],
          username: ENV['DB_USERNAME'],
          password: ENV['DB_PASSWORD'],
          database: ENV['DB_DATABASE']
        )
      
    def self.client
          @@client
        end

    def self.insert_data_into_db(dados)
            return unless dados && dados.empty?

            dados.each do |dado|
                projeto = dado[:projeto]
                elemento = dado[:elemento]
                comprimento = dado[:comprimento]
                largura = dado[:largura]
                espessura = dado[:espessura]
                grupo = dado[:grupo]
                
                
                query = "INSERT INTO table_components (projeto, elemento, comprimento, largura, espessura, grupo) VALUES"
                placeholders = []
      
                data.each do |dado|
                placeholders << "(?, ?, ?, ?, ?, ?)"
                end
            
                query += placeholders.join(", ")
                values = data.map { |dado| [dado[:projeto], dado[:elemento], dado[:comprimento], dado[:largura], dado[:espessura], dado[:grupo]] }
                
                # Executar a consulta SQL
                self.client.query(query, values)
            end
            
            # Fechar a conexão com o banco de dados
            self.client.close
        end
        


    def self.replace_table_data(data)
            
        return unless data && !data.empty?
      
        query = "REPLACE INTO table_components (projeto, elemento, comprimento, largura, espessura, grupo) VALUES"
        placeholders = []
      
        data.each do |dado|
          placeholders << "(?, ?, ?, ?, ?, ?)"
        end
      
        query += placeholders.join(", ")
        
        values = data.map { |dado| [dado[:projeto], dado[:elemento], dado[:comprimento], dado[:largura], dado[:espessura], dado[:grupo]] }
      
        self.client.query(query, values)
      end


      self.client.close
  end