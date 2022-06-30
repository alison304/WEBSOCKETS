const fs = require('fs');

class Contenedor {
    constructor(nombre) {
      this._nombre = nombre;
    }

    get nombre() {
        return this._nombre;
    }
  
    async save(object) {
        let arr = await this.read();
        let id = arr.length + 1;
        object.id = id;
        arr.push(object)
        let data = JSON.stringify(arr);
        fs.writeFileSync(`./${this.nombre}.txt`,data);
        return id;
    }

    async update(object) {
        let arr = await this.read();
        let element = arr.find(x=> x.id === object.id);
        if (element == undefined) {
            return null;
        }
        let index = arr.indexOf(element);
        arr[index] = object;
        let data = JSON.stringify(arr);
        fs.writeFileSync(`./${this.nombre}.txt`,data);
    }    
  
    async getById(id) {
        let arr = await this.read();
        let element = arr.find(x=> x.id === Number(id));
        if (element == undefined) {
            return null;
        }
        return element;
    }
  
    async getAll() {
        let arr = await this.read();
        return arr;
    }

    readSync() {
        let arr = fs.readFileSync(`./${this.nombre}.txt`);
        return arr;
    }

    async deleteById(id) {
        let arr = await this.read();
        arr = arr.filter(element => element.id !== Number(id));
        let data = JSON.stringify(arr);
        fs.writeFileSync(`./${this.nombre}.txt`,data);        
    }
  
    async deleteAll() {
        let initialValue = [];
        fs.writeFileSync(`./${this.nombre}.txt`,JSON.stringify(initialValue));
    }

    async read() {
        try {
            if (fs.existsSync(`./${this.nombre}.txt`)) {
                const contenido = await fs.promises.readFile(`./${this.nombre}.txt`,"utf-8");
                return JSON.parse(contenido);
            } else {
                let initialValue = [];
                fs.writeFileSync(`./${this.nombre}.txt`,JSON.stringify(initialValue));
                return initialValue;
            }
        } catch (error) {
            console.log("Error de Lectura", error);
        }
    }
}

module.exports = Contenedor

