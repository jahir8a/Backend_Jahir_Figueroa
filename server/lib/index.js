const fs = require('fs'),
	path = require('path'),
	Storage = require('../Storage')

function filter(parametros,callback){
	Storage.getData()
	.then(function(bienesRaices){
		
		let resultbienesRaices = bienesRaices
		if(parametros.rango!=undefined){
			resultbienesRaices = bienesRaices.filter(function(bienesMap){
				return parseInt(bienesMap.Precio.replace("$","").replace(",","")) >= parametros.rango.from 
				&&
				parseInt(bienesMap.Precio.replace("$","").replace(",","")) <= parametros.rango.to
			})
		}
		if(parametros.ciudad!=''){
			resultbienesRaices = resultbienesRaices.filter(function(bienesMap){
				return bienesMap.Ciudad >= parametros.ciudad && bienesMap.Ciudad <= parametros.ciudad
			})
		}
		if(parametros.tipo!=''){
			resultbienesRaices = resultbienesRaices.filter(function(bienesMap){
				return bienesMap.Tipo >= parametros.tipo && bienesMap.Tipo <= parametros.tipo
			})
		}
		
		
		callback(null,resultbienesRaices)
	}).catch(function(err){
		callback(err)
	})
}

module.exports = filter