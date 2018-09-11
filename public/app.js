//Inicializador del elemento Slider




function InitBuscador(document,window,undefined,$){
	(function(){
		return Buscador = {
      apiUrl: '/buscador',
	  $slider: $("#rangoPrecio"),
      $busqueda: $('#checkPersonalizada'),
      $buscar : $('#buscar'),
      $listaBienesRaices:$('.lista'),
      $ciudades: $('#ciudad'),
      $tipos: $('#tipo'),
      bienesRaicesAll:{},
      customSearch:false,
	  parametrosFiltro:{ciudad:'',tipo:'',rango:{}},
	  
			
	  Init: function(){
				var self = this 
				self.setSearch()
				self.buscarTodos()
				self.initSlider()
				self.loadTipo()
				self.loadCiudad()
      },
	  initSlider:function(){
		  self = this
		  self.$slider.ionRangeSlider({
		  type: "double",
		  grid: false,
		  min: 0,
		  max: 100000,
		  from: 1000,
		  to: 20000,
		  prefix: "$",
		  // onStart: function (data) {
			// self.parametrosFiltro.rango = {from:data.from,to:data.to} 
			
		  // },
		  onFinish: function (data) {
			self.parametrosFiltro.rango = {from:data.from,to:data.to}
			//self.filtrar(self.parametrosFiltro)		
		  }
		})
	  },
      setSearch:function() {
        self = this 
        self.$busqueda.on('change', (e) => {
          if (this.customSearch == false) {
            this.customSearch = true
			//self.filtrar(self.parametrosFiltro)
          } else {
            this.customSearch = false
			self.parametrosFiltro={ciudad:'',tipo:'',rango:{}}
          }
          $('#personalizada').toggleClass('invisible')
        })
      },
      ajaxRequest: function(url,type,data){
        return $.ajax({
          url:url,
          type:type,
          data:data
        })
      },
      buscarTodos: function(){
        let self = this
		self.$listaBienesRaices.empty()
				let endpoint = self.apiUrl + '/showall'
        self.$buscar.on('click',function(e){
		  if(self.parametrosFiltro.rango.from==undefined && self.parametrosFiltro.ciudad=='' && self.parametrosFiltro.tipo==''){
          self.ajaxRequest(endpoint,'GET',{})
					.done(function(data){
					let bienesRaices = data
					bienesRaices.forEach(element => {
					  self.renderBienesRaices(element)
					});
					}).fail(function(err){
						console.log(err)
					})
		  }else{
			self.filtrar(self.parametrosFiltro)
		  }			  
        })
      },
	  filtrar: function(parametrosFiltro){
		  
        let self = this
		self.$listaBienesRaices.empty()
				let endpoint = self.apiUrl + '/showall'
			let params = {parametros:parametrosFiltro}
          self.ajaxRequest(endpoint,'POST',params)
					.done(function(data){
					let bienesRaices = data
					bienesRaices.forEach(element => {
					  self.renderBienesRaices(element)
					});
					}).fail(function(err){
						console.log(err)
					})
          
        
      },
      renderBienesRaices:function(element){
		 
        let template = `<div class="card horizontal">
              <div class="card-image">
                <img src="img/home.jpg"/>
              </div>
              <div class="card-stacked">
                <div class="card-content">
                  <div>
                    <b>Direccion: </b><p>${element.Direccion}</p>
                  </div>
                  <div>
                    <b>Ciudad: </b><p>${element.Ciudad}</p>
                  </div>
                  <div>
                    <b>Telefono: </b><p>${element.Telefono}</p>
                  </div>
                  <div>
                    <b>Código postal: </b><p>${element.Codigo_Postal}</p>
                  </div>
                  <div>
                    <b>Precio: </b><p>${element.Precio}</p>
                  </div>
                  <div>
                    <b>Tipo: </b><p>${element.Tipo}</p>
                  </div>
                </div>
                <div class="card-action right-align">
                  <a href="#">Ver más</a>
                </div>
              </div>
            </div>`
            self.$listaBienesRaices.append(template)
      },
      loadCiudad:function(){
        self = this
        let endpoint = self.apiUrl + '/ciudades'
          self.ajaxRequest(endpoint,'GET',{})
					.done(function(data){
						self.$ciudades.css('display', 'inline')
            data.forEach(element => {   
			self.$ciudades.append(`<option value="${element}">${element}</option>`)
			
          })
					}).fail(function(err){
						console.log(err)
          })
          self.$ciudades.on('change', function(event) {
				let ciudadSeleccionado = $("#ciudad option:selected").val()
				self.parametrosFiltro.ciudad=ciudadSeleccionado
				//self.filtrar(self.parametrosFiltro)
			})

      },
      loadTipo : function(){
        self = this
        let endpoint = self.apiUrl + '/tipos'
          self.ajaxRequest(endpoint,'GET',{})
					.done(function(data){
						self.$tipos.css('display', 'inline');
            data.forEach(element => {   
            
            self.$tipos.append(`<option value="${element}">${element}</option>`)
			
          })
					}).fail(function(err){
						console.log(err)
          })   
          self.$tipos.on('change', function(event) {
				let tipoSeleccionado = $("#tipo option:selected").val()
				self.parametrosFiltro.tipo = tipoSeleccionado
				//self.filtrar(self.parametrosFiltro)
			})
      }
    }
	})()
	Buscador.Init()
}
InitBuscador(document,window,undefined,jQuery)

