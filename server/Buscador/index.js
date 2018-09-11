const 	express = require('express'),
		Storage = require('../Storage'),
		filter = require('../lib')
		Router = express.Router()



Router.get('/showall',function(req,res){
    //get usuario
		Storage.getData().then(function(bienesRaices){
			res.json(bienesRaices)
		}).catch(function(error){
			res.sendStatus(500).json(error)
		})
})

Router.post('/showall',function(req,res){
    //get usuario
	let parametros = req.body.parametros
	if(parametros){
		filter(parametros,function(err,data){
			if(err) res.sendStatus(500).json(err)
			res.json(data)
		})
	}
})



Router.get('/ciudades',function(req,res){
    //get ciudades
    Storage.getData().then(function(bienesRaices){
        let ciudades = bienesRaices.map((currentValue, index, arr)=>{
                return currentValue.Ciudad
        })
        let ciudadesFiltradas = [...new Set(ciudades)]
        res.json(ciudadesFiltradas)
    }).catch(function(error){
        res.sendStatus(500).json(error)
    })
})

Router.get('/tipos',function(req,res){
    //get tipos
    Storage.getData().then(function(bienesRaices){
        let tipos = bienesRaices.map((currentValue, index, arr)=>{
                return currentValue.Tipo
        })
        let tiposFiltrados = [...new Set(tipos)]
        res.json(tiposFiltrados)
    }).catch(function(error){
        res.sendStatus(500).json(error)
    })
})



module.exports = Router