function startIntro(){
	var intro = introJs();
	intro.setOptions({
		steps: [
			/*{ 
				intro: "<b>Welcome!</b><br>This application you will help you to find all ICRC premises in your city, as well as some useful points of interest!"
			},*/
			{
				element:'#R_C',
				intro: "Welcometo Gis Resource Center. In this web you can find all our web map products orders for diferents categories",
				position: 'bottom'
			},
			{ 
				element:'#Service',
				intro: "These are our diferents activities, click over the icons and explore !",
				position: 'right'
			},
			{ 
				element: '#Products',
				intro: "We have differents products order by, unit, status, publication year, product platform and confidentiality. Click and make your filter",
				position: 'left'
			},
			{
				element: '#refreshfilterbutton',
				intro: ' If you want clear your selection click in this button.',
				position: 'left'
			},
			{
				element: document.querySelector('.to-contact'),
				intro: 'If you have any question only click here and send us an email. we will solve your question.',
			},
			{
				element: '#searchproducts',
				intro: ' This is other way to find a product, you only write the name or the words of your prodcut and the web find it.s',
			},
			{
				element: '#Ser_map',
				intro: '  Click here to open a new tab with our search map web. inside this web you can find the papers map in pdf with more information.',
				position: 'bottom'
			},
			{
				element: document.querySelector('.pull-right'),
				intro: ' Direct link to the geoportal.',
			}	
		]
	});

	intro.start();

}

