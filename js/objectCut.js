export class Section {
    constructor(id, x, y,) {
        this.x = x;
        this.y = y;
        this.PA = x * y;
        this.id = id;
        this.orientacao;
    }

    indetifySelection() {

        return this.id + ' ' + this.x + ' ' + this.y;
    }
    //Define as propriedades do corte
    parameter(margin, cut, X, Y, orientacao) {
        this.margin = margin;
        this.cut = cut;
        this.X = X;
        this.Y = Y;
        this.orientacao = orientacao
        console.log(this.margin)
        return [ ]
    }
    // Identifica a secção para divisão das seções 
    divisionSection(number, Px, Py) {
        
        
        this.Px = Px
        this.Py = Py
        this.number = number

        const areaSheet = (this.X - 2 * this.margin) * (this.Y - 2 * this.margin);
        const sheet = document.getElementById('cutBoard')

        const margin_X = (this.margin * 100 / this.X) 
        const margin_Y = (this.margin * 100 / this.Y) 
        console.log(margin_X, margin_Y)
        console.log(this.margin)
        sheet.style.padding = `${margin_Y}% ${margin_X}% `

        console.log(areaSheet)
      
        
        const newSection = document.createElement('div');
        newSection.className = `Section s-${number}`
        this.classe = newSection.className
        const sectionBlank = document.createElement('div')
        sectionBlank.id = `section${this.number}`;
        
        sheet.appendChild(newSection);
        document.querySelector(`.s-${number}`).appendChild(sectionBlank);
        let new_X;
        let new_Y;

        if (this.orientacao === "V") {
            const newArea_X_vertical = Px + this.cut;
            const newArea_Y_vertical = this.Y-2*this.margin;
            console.log(Px)
            let width_X = newArea_X_vertical * 100 / this.X
            

            newSection.style.width = `${width_X}%`;
            newSection.style.height = `100%`;
            
            

            sectionBlank.style.height = `100%`;
            let width_Px = Px * 100 / newArea_X_vertical
            sectionBlank.style.width = `${width_Px}%`;
            
            new_X=newArea_X_vertical
            new_Y=newArea_Y_vertical
            console.log(new_X,new_Y)
            
        } else if (this.orientacao=== "H"){
            const newArea_X_horizontal = this.X-2*this.margin;
            const newArea_Y_horizontal = Py + this.cut;
            
            sheet.style.flexDirection = "column"
        

            newSection.style.width = `calc(((${newArea_X_horizontal} * 100) / ${this.X}) * 1%)`;
            newSection.style.height = `calc(((${newArea_Y_horizontal} * 100) / ${this.Y}) * 1%)`;
            newSection.style.marginLeft = `calc(((${this.margin}* 100) / ${this.X})* 1%)`
            newSection.style.display = "flex";
            newSection.style.flexDirection = "column";

            sectionBlank.style.height = `calc(((${Py} * 100) / ${newArea_Y_horizontal}) * 1%)`;
            sectionBlank.style.width = `100%`;
            
            new_X=newArea_X_horizontal
            new_Y=newArea_Y_horizontal
            console.log(new_X,new_Y)
        }
        

            // idd.style.width = `calc(${this.X - 2 * this.margin})`;

        const newArea = new_X * new_Y;
        this.dashedSection()
        

        return [newArea, new_X, new_Y, this.classe];
    }


    dashedSection() {

        const dashed = document.createElement('div');
        dashed.id = `${this.number}-dashed`;
        dashed.className = 'dashed';
        const classes = this.classe.split(" ")
        const classe = classes[1]
        console.log(classe)
        const newSection = document.querySelector(`.${classe}`);
        if (newSection) { newSection.appendChild(dashed) };
        const corte = this.cut / 2
         const section_heigth = this.Py + this.cut
         const section_width = this.Px + this.cut
         console.log(section_heigth)

        if (this.orientacao === "H") {
            let m_Y = corte * 100 / section_heigth
            dashed.style.margin = `${m_Y}% 0`
            dashed.style.borderTop = '1px black dashed'
            dashed.style.borderLeft = 'none'
        } else if (this.orientacao === "V") {
            let m_X = corte * 100 / section_width
            dashed.style.margin = `0 ${m_X}%`
            dashed.style.borderLeft = '1px black dashed'
            dashed.style.borderRight = 'none'
            dashed.style.borderTop = 'none'
            dashed.style.height = `100%`;
        }
        return dashed;
    }
}