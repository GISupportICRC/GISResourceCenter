
var ln = x=window.navigator.language; 
window["saludo"];
window["search"]
window["premi_tab"];
window["poi_tab"];
window["Labels"];
//console.log(ln);
if (ln == "es" || ln == "es-ES" || ln == "es-AR" || ln == "es-GT" || ln == "es-CR" || ln == "es-PA" || ln == "es-DO" || ln == "es-MX" || ln == "es-VE" || ln == "es-CO" || ln == "es-PE" || ln == "es-EC" || ln == "es-NI" || ln == "es-HN" || ln == "es-PR" || ln == "es-MX"|| ln == "es-NI" || ln == "es-HN" || ln == "es-PR" || ln == "es-CL"|| ln == "es-SV" || ln == "es-BO" || ln == "es-UY" || ln == "es-PY"  ){
	$('#site-button').prop('title', 'Selecciona un lugar');
	$('#filter-button').prop('title', 'Filtro');
	$('#list-button').prop('title', 'Lista de reportes');
	$('#add-button').prop('title', 'Añade un POI');
	$('#add-premises-button').prop('title', 'Solicita una instalacion');	
	$('#howto-button').prop('title', 'Guia rapida del sitio');
	$('#guide').prop('title', 'Guia en PDF');
	saludo="Bienvenido ";
	search="Buscar un lugar...";
	premi_tab="Activa la capa Premises para visualizar los datos.";
	poi_tab="Activa la capa POI para visualizar los datos."
	Labels=" Etiquetar el mapa";  
	$('#welcome_text').html('<p>El proposito de esta aplicacion es mostrar las instalaciones, que seran validadas, y los POIs (Puntos de interes).</p>'+
						'<p>Aqui podras avisarnos de los errores detectados dentro del dataset de instalaciones, a la vez, que podras crear nuevos POIs o avisarnos de errores y cambios. Si encuentras algun error o falta de informacion en ICRC premises, por favor, avisanos usando <i class="fa fa-comment report-icon"></i> button. Eres libere de añadir cualquer POI que pienses que puede ser interesante para ti o tus compañeros. ¡Adelante!</p>'+
						'<p><b>Por favor, selecciona un lugar</b></p>');	
	$('#welcome_text_question').html('<p>Para cualquier pregunta contacte con <a href="mailto:gisupport@icrc.org">gisupport@icrc.org</a></p>'+
						'<p>&copy; <small>ICRC GIS 2015 EHG1500100</small></p>');	

}
else if(ln == "fr" || ln == "fr-BE" || ln == "fr-CA" || ln == "fr-CH" || ln == "fr-LU" || ln == "fr-FR"){
	$('#site-button').prop('title', 'Chosir une place');
	$('#filter-button').prop('title', 'Filtre');
	$('#list-button').prop('title', 'Liste des rapportes');
	$('#add-button').prop('title', 'Ajouter un POI');
	$('#add-premises-button').prop('title', 'Solicita una instalacion');	
	$('#howto-button').prop('title', 'Guide du site');
	$('#guide').prop('title', 'Guide en PDF');
	saludo="Bienvenue ";
	search="Chercher une place...";
	premi_tab="Activate Premises layer to visualize data.";
	poi_tab="Activate POI layer to visualize data.";
	Labels=" Etiqueter dans le carte";
	$('#welcome_text').html('<p>The purpose of this application is to show the premises, in order to be validated, and the POIs (Points Of Interest).</p>'+
						'<p>Here you will be able to report errors detected into the premises dataset and create new POIs or report errors and changes. If you find some wrong or missing information on ICRC premises, please report it using the <i class="fa fa-comment report-icon"></i> button. Feel free to add any POI that you think could be of interest to you or your colleagues. Enjoy!</p>'+
						'<p><b>Please select a site</b></p>');	
	$('#welcome_text_question').html('<p>For any question please contact <a href="mailto:gisupport@icrc.org">gisupport@icrc.org</a></p>'+
						'<p>&copy; <small>ICRC GIS 2015 EHG1500100</small></p>');


}
else{
	saludo="Welcome ";
	search="Search location...";
	premi_tab="Activate Premises layer to visualize data.";
	poi_tab="Activate POI layer to visualize data.";
	Labels=" Labels on map";
	$('#welcome_text').html('<p>The purpose of this application is to show the premises, in order to be validated, and the POIs (Points Of Interest).</p>'+
						'<p>Here you will be able to report errors detected into the premises dataset and create new POIs or report errors and changes. If you find some wrong or missing information on ICRC premises, please report it using the <i class="fa fa-comment report-icon"></i> button. Feel free to add any POI that you think could be of interest to you or your colleagues. Enjoy!</p>'+
						'<p><b>Please select a site</b></p>');
	$('#welcome_text_question').html('<p>For any question please contact <a href="mailto:gisupport@icrc.org">gisupport@icrc.org</a></p>'+
						'<p>&copy; <small>ICRC GIS 2015 EHG1500100</small></p>');	
}