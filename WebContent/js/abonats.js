$(document).ready(function(){
	
	var wsUrl = "http://192.1.1.21:8080/WSAPSA/services/Abonats?wsdl";

	
	$('#abonat').click(function(){
		$('#abonat').val('');
		vaciarDatosBloquesPantalla() 
	});
	
	$('#abonat').change(function(){
		rellenarDatosBloquesPantalla();
	});
	
	
	
	function rellenarDatosBloquesPantalla(){
		rellenarCodigoAbonado();
		obtenerDatosAbonado();
		obtenerDatosFiscales();	
	}
	
	function vaciarDatosBloquesPantalla() {
		vaciarDatosAbonado();
	}
	
	function rellenarCodigoAbonado() {
		var actualValor = $('#abonat').val();
		var ceros = "";
		
		for (i=1;i<=12-actualValor.length;i=i+1)
			ceros=ceros+"0";

		$('#abonat').val(ceros+actualValor);
	}
	
	
	
	function vaciarDatosAbonado() {
		$('.data').text('');
		$('#tituloAbonat').text('Cercar Abonat');
	}
	
	function obtenerDatosAbonado() {

		var soapRequest =
			'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservices.apsa.es"> \
			   <soapenv:Header/> \
			   <soapenv:Body> \
				  <web:intraDadesSubministrament> \
					 <web:contrato>' + $('#abonat').val() + '</web:contrato> \
				  </web:intraDadesSubministrament> \
			   </soapenv:Body> \
			</soapenv:Envelope>';
		
		$.ajax({
			type: 'POST',
			url: wsUrl,
			beforeSend: function( xhr ){
				xhr.setRequestHeader("SOAPAction","");
			},
			contentType: 'text/xml; charset=UTF-8',
			dataType: 'xml',
			processData: false,
			data: soapRequest,
			
			success: function(data, status, req) {
				var text = $(req.responseXML).find("intraDadesSubministramentResponse").text();
				var abonado = JSON.parse(text);
				
				$('#tituloAbonat').text ("[" + abonado.contrato + "] " + abonado.nombre + "  -  " + abonado.direccion);
				$('#abonadoNombre').text(abonado.nombre);
				$('#abonadoDNI').text(abonado.nif);
				$('#abonadoFechaAlta').text(abonado.fechaAlta);
				$('#abonadoEstado').text(abonado.estado);
				$('#abonadoFinca').text(abonado.finca);
				$('#abonadoTelefono').text(abonado.tfno);
				$('#abonadoDireccion').text(abonado.direccion);
				$('#abonadoTipSub').text(abonado.tipSub);
				$('#abonadoAUPAC').text(abonado.aupac);
			},
			
			error: function(data, status, req) {
				console.log("- " + data.readyState + "\n - " + 
							data.responseText + "\n - " + 
							data.status + "\n - " + 
							data.statusText + "\n - " + 
							data.getAllResponseHeaders());
			}
		});
	}
	
	
	function obtenerDatosFiscales() {

		var soapRequest =
			'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservices.apsa.es"> \
			   <soapenv:Header/> \
			   <soapenv:Body> \
				  <web:intraDadesFiscals> \
					 <web:contrato>' + $('#abonat').val() + '</web:contrato> \
				  </web:intraDadesFiscals> \
			   </soapenv:Body> \
			</soapenv:Envelope>';		
			
		$.ajax({
			type: 'POST',
			url: wsUrl,
			beforeSend: function( xhr ){
				xhr.setRequestHeader("SOAPAction","");
			},
			contentType: 'text/xml; charset=UTF-8',
			dataType: 'xml',
			processData: false,
			data: soapRequest,

			success: function(data, status, req) {
				var text = $(req.responseXML).find("intraDadesFiscalsResponse").text();
				var fiscals = JSON.parse(text);
				
				$('#abonadoDireccionFiscal').text(fiscals.direccion);
				$('#abonadoCP').text(fiscals.cp);
				$('#abonadoMunicipio').text(fiscals.municipio);
				$('#abonadoProvincia').text(fiscals.provincia);				
			},
			
			error: function(data, status, req) {
				console.log("- " + data.readyState + "\n - " + 
							data.responseText + "\n - " + 
							data.status + "\n - " + 
							data.statusText + "\n - " + 
							data.getAllResponseHeaders());
			}  
		});
	}
	
	
});