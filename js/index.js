

const app = new Vue({
    el:'#app',

    created() {
        this.getDatos();
    },

    data:{
        mensaje:'Valor del dolar en colombia',
        tiempo:0,
        valor_dolar: 0,
        fecha : new Date().toISOString().substr(0,10),
        fecha_maxima : new Date().toISOString().substr(0,10),
        cantidad_dolares:0,
        valor_calcular:0,
        valor:0,
        hayInternet:false
    },
    methods: {

        getComprobarInternet(){
          if(navigator.onLine){
              this.hayInternet = true;
          }  
        },


        getDatos(){
            
        this.getComprobarInternet();

        if(!this.hayInternet){
            this.valor_dolar = 'Verifique su conexión a internet'
        }else{

            let fecha  = this.fecha;

           // console.log(fecha)

            const url_api = `https://www.datos.gov.co/resource/32sa-8pi3.json?vigenciadesde=${fecha}T00:00:00.000`;
          
          
         try {

            this.$http.get(url_api).then((response)=>{

    
                if(response.data.length >0){
                    this.valor = response.data[0].valor;
                    this.valor_dolar = "$ " + new Intl.NumberFormat().format(this.valor);    
                }else{
                    this.valor_dolar = 'Sin resultado, verifique la fecha';
                    this.valor = 0
                    this.valor_calcular = 0
                    this.cantidad_dolares = 0
                }
             
            })

             
         } catch (error) {
             console.log(err)
         }
        }

        },

        calcular(){
           if(this.valor > 0){
            let valor = parseFloat(this.cantidad_dolares * this.valor);
            this.valor_calcular = new Intl.NumberFormat().format(valor);
           }
        }

    },
})