// code adapted from https://github.com/AmericanRedCross/nepal-maps/blob/gh-pages/js/main.js

var dataProductsGIS;
var thumbnails;

var unitButtons;
var platformButtons;
var typeButtons;
var yearButtons; 
var confidentialityButtons;

var visibleUnits = [];
var visiblePlatforms = [];
var visibleTypes = [];
var visibleYears = [];
var visibleConfidentiality = [];

var unitTags = [];
var platformTags = [];
var typeTags = [];
var yearTags = [];
var confidentialityTags = [];
var nameTags = [];

var nameForItemSearch;
document.getElementById("searchproducts").value = "";

function openLink(item){
	window.open(link);
}


function getMeta() {
	var dsv = d3.dsv(",", "text/plain; charset=ISO-8859-1");
	dsv("data/products.csv", function(metadata){
		console.log(metadata);
		for (i=0;i<metadata.length;i++){
			if (metadata[i].show === "no") {
				metadata.splice(i,1);
			}
		}
		dataProductsGIS = metadata;
		generateCarousel("initialCarousel", metadata);
		generateThumbnails("portfolioElement", metadata);
	});
	
}

function generateCarousel(classItem ,metadata) {
	
	function showLastUpdates(){
		ProductArray = dataProductsGIS;
		ProductArray.sort(function(a,b){
			return parseFloat((b.publication_date).replace(/-/g,"")) - parseFloat((a.publication_date).replace(/-/g,""));
		});
		var lastUpdates = [];
		for (i=0;i<ProductArray.length;i++){
			lastUpdates.push(ProductArray[i]);
		}
		console.log(lastUpdates);
		for (i=0;i<lastUpdates.length;i++){
			$("#lastupdates").append('<div>' + (lastUpdates[i].publication_date).replace(/-/g,".") + ' - <a href="' + lastUpdates[i].link + '" target="_blank" style="color:#0431B4;">' + lastUpdates[i].name + '</a><span style="color:#626565; text-shadow:"> | ' + lastUpdates[i].product_type_name + '<span></div></br>');
		}	
	}
	

	
	function generateCarouselItemHtml(item){
		htmlStr = 
			'<div class="item '+classItem+'" id="' + item.code + '_carousel">' +
				'<img src="' + item.thumbnail + '" alt="Image not available" style="display: block;">' +
				'<div class="container">' +
					'<a class="carousel-caption" href="' + item.link + '" target="_blank">' +
						'<h1>' + item.name + '</h1>' +
						'<p>' + item.description + '</p>'
					'</a>' +
				'</div>' +
			'</div>';
		return htmlStr;
	}
	
/*	var highlightedN = 0;
	metadata.forEach(function(i) {
		if (i.highlight == "yes") {
						
			// add carousel indicator
			$(".carousel-indicators").append('<li data-target="#carousel" data-slide-to="' + highlightedN + '" class=""></li>');
			
			// add carousel item
			$(".carousel-inner").append(generateCarouselItemHtml(i));
			
			//debugger;
			
			
			// add active class to first slide
			if (highlightedN == 0) {
				$( ".carousel-indicators li:last-child" ).addClass( "active" );
				$( ".carousel-inner div:last-child" ).addClass( "active" );
			}
			highlightedN += 1;
			
		}
	});
*/
	showLastUpdates();
}

function generateThumbnails(classItem, metadata){
	
	var links = [];
	
	function dateStr2YearClass(date) {
		if (date != "") {
			var year = date.split("-")[0];
			//return 'year-' + year;
			return year;
		}		
	}
	
	function generateThumbnailHtml(item){
		var itemHtml = 
			'<div class="col-md-3 text-center ' +classItem+ '" id="' + item.id_str + 
			'"><!-- circle --><div class="ih-item circle colored effect13 from_left_and_right" id="' + item.code + '">' +
					'<a href="' + item.link +  
						'" target="_blank" id="' + item.code + '"><div class="img" id="' + item.code + '">' +
						'</div>' +
							'<div class="info" id="' + item.code + '"><div class="info-back" id="' + item.code + '">' +
								'<h3>' + item.name + '</h3>' +
								'<p style="color:#cdcdcd;font-weight:bold;">' + item.product_type_name + '</p>' +
							'</div></div>' +
							'</a>' +
							'</div><!-- end circle -->' +
				'<h4 id="' + item.code + '">' + item.name + '</h4>' +
				'<p class="product-description" id="' + item.code + '"><span style="font-weight:bold;" id="' + item.code + '">' + item.icrc_unit_name + " | " + item.confidentiality_name + " | " + item.product_type_name + '</span> | ' + item.description + '</p>' +
				'<a style="color:#428bca;font-style:italic;" href="' + item.bitly + '" id="' + item.code + '">' + item.bitly + '</a></div>';
		
		
		
		links.push([item.code, item.link, item.thumbnail])
		return itemHtml;
	}
	
	thumbnails = d3.select("#product-thumbnails").selectAll('div')
		.data(metadata).enter().append('div')
		.attr('id', function(d){ return d.id_num; })
		.classed('thumbnailWrap', true)
		.html(function(d) {return generateThumbnailHtml(d); })
	
    thumbnails.each(function(d){
        var element = d3.select(this);
		
		
        // Add classes to thumbnails for filtering
		element.classed(d.icrc_unit_name, true);
        element.classed(d.platform_name, true);
		element.classed(d.product_type_name, true);
		element.classed(dateStr2YearClass(d.publication_date), true);
		element.classed(d.confidentiality_name, true);

        // build arrays of tags
        // Units
		var itemUnit = d.icrc_unit_name.match(/^[\s\S]+/g);
        $.each(itemUnit, function(index, unit){
            if (unitTags.indexOf(unit) === -1){
                unitTags.push(unit);
            }
        });
		// Platforms
        var itemPlatform = d.platform_name.match(/^[\s\S]+/g);
        $.each(itemPlatform, function(index, platform){
            if (platformTags.indexOf(platform) === -1){
                platformTags.push(platform);
            }
        });
		// Types
		var itemType = d.product_type_name.match(/^[\s\S]+/g);
        $.each(itemType, function(index, type){
            if (typeTags.indexOf(type) === -1){
                typeTags.push(type);
            }
        });
		// Years
		if (d.publication_date != "") {
			var itemYear = dateStr2YearClass(d.publication_date).match(/\S+/g);
			$.each(itemYear, function(index, year){
				if (yearTags.indexOf(year) === -1){
					yearTags.push(year);
					yearTags.sort(function(a, b){return a-b});
				}
			});
		}
		// Confidentiality
		if (d.confidentiality_name != "") {
			var itemConfidentiality = d.confidentiality_name.match(/\S+/g);
			$.each(itemConfidentiality, function(index, confidentiality){
				if (confidentialityTags.indexOf(confidentiality) === -1){
					confidentialityTags.push(confidentiality);
				}
			});
		}
		// Names
		var itemName = d.name.match(/^[\s\S]+/g);
        $.each(itemName, function(index, name){
            if (nameTags.indexOf(name) === -1){
                nameTags.push(name);
            }
        });
      }
    )
	
	/*
	thumbnails.sort(function(a,b){
		return new Date(b.date) - new Date(a.date);
    });
	*/
	
	links.forEach(function(l){
		
		//add background - thumbnail
		$('#' + l[0]).css("background-image", "url(" + l[2] + ")");
		
		
		//add animation
		if (l[1].substring(0,1) == "#"){ // also possible with .charAt(0)
		
			if (l[1] == "#carousel") {
	
				$('#' + l[0]).click(function (){ // go to map carousel
					//$('#carousel').slideToggle(300);
					$('html,body').animate({
						scrollTop: $(l[1]).offset().top - 80 // number (80) could vary in function of the page style
					}, 1000);
				});
			}
			else if (l[1] == "#calltoaction") {
				//debugger;
				$('#' + l[0]).click(function (){ // go to map calltoaction
					//$('#carousel').slideToggle(300);
					$('html,body').animate({
						scrollTop: $(l[1]).offset().top - 0 // number  could vary in function of the page style
					}, 1000);
				});
				
			}
		
		}
	})
	
	generateFilterButtons();
}

function generateFilterButtons(){
    
	// Unit buttons
	unitTags.sort();
    var unitFilterHtml = '<button id="ALL-UNIT" class="btn btn-small btn-unit filtering all filter-button" value="wsfs" style="float:left;" type="button" onclick="toggleFilter('+"'ALL-UNIT'"+', this);"'+
        '>All <span class="glyphicon glyphicon-check" style="float:right;"></span></div></button>';
    $.each(unitTags, function(index, tag){
        var itemHtml = '<button id="'+tag+'" class="btn btn-small btn-unit filter-button" type="button" onclick="toggleFilter('+"'"+tag+"'"+', this);">'+tag.toUpperCase()+
            '<span class="glyphicon glyphicon-unchecked" style="float:right;"></span></button>';
        unitFilterHtml += itemHtml;
    });
    $('#unitButtons').html(unitFilterHtml);
    unitButtons = $("#unitButtons").children();

	// Platform buttons
    platformTags.sort();
    var platformFilterHtml = '<button id="ALL-PLATFORM" class="btn btn-small btn-class filtering all filter-button" type="button" onclick="toggleFilter('+"'ALL-PLATFORM'"+', this);"'+
        '>All <span class="glyphicon glyphicon-check" style="float:right;"></span></button>';
    $.each(platformTags, function(index, tag){
        var itemHtml = '<button id="'+tag+'" class="btn btn-small btn-class filter-button" type="button" onclick="toggleFilter('+"'"+tag+"'"+', this);">'+tag.toUpperCase()+
            '<span class="glyphicon glyphicon-unchecked" style="float:right;"></span></button>';
        platformFilterHtml += itemHtml;
    });
    $('#platformButtons').html(platformFilterHtml);
    platformButtons = $("#platformButtons").children();
	
	// Type buttons
	typeTags.sort();
    var typeFilterHtml = '<button id="ALL-TYPE" class="btn btn-small btn-class filtering all filter-button" type="button" onclick="toggleFilter('+"'ALL-TYPE'"+', this);"'+
        '>All <span class="glyphicon glyphicon-check" style="float:right;"></span></button>';
    $.each(typeTags, function(index, tag){
        var itemHtml = '<button id="'+tag+'" class="btn btn-small btn-class filter-button" type="button" onclick="toggleFilter('+"'"+tag+"'"+', this);">'+tag.toUpperCase()+
            '<span class="glyphicon glyphicon-unchecked" style="float:right;"></span></button>';
        typeFilterHtml += itemHtml;
    });
    $('#typeButtons').html(typeFilterHtml);
    typeButtons = $("#typeButtons").children();
	
	// Year buttons
	yearTags.reverse();
    var yearFilterHtml = '<button id="ALL-YEAR" class="btn btn-small btn-class filtering all filter-button" type="button" onclick="toggleFilter('+"'ALL-YEAR'"+', this);"'+
        '>All <span class="glyphicon glyphicon-check" style="float:right;"></span></button>';
    $.each(yearTags, function(index, tag){
        var itemHtml = '<button id="'+tag+'" class="btn btn-small btn-class filter-button" type="button" onclick="toggleFilter('+"'"+tag+"'"+', this);">'+tag.toUpperCase()+
            '<span class="glyphicon glyphicon-unchecked" style="float:right;"></span></button>';
        yearFilterHtml += itemHtml;
    });
    $('#yearButtons').html(yearFilterHtml);
    yearButtons = $("#yearButtons").children();
	
	// confidentiality buttons
	confidentialityTags.sort();
    var confidentialityFilterHtml = '<button id="ALL-CONFIDENTIALITY" class="btn btn-small btn-class filtering all filter-button" type="button" onclick="toggleFilter('+"'ALL-CONFIDENTIALITY'"+', this);"'+
        '>All <span class="glyphicon glyphicon-check" style="float:right;"></span></button>';
    $.each(confidentialityTags, function(index, tag){
        var itemHtml = '<button id="'+tag+'" class="btn btn-small btn-class filter-button" type="button" onclick="toggleFilter('+"'"+tag+"'"+', this);">'+tag.toUpperCase()+
            '<span class="glyphicon glyphicon-unchecked" style="float:right;"></span></button>';
        confidentialityFilterHtml += itemHtml;
    });
    $('#confidentialityButtons').html(confidentialityFilterHtml);
    confidentialityButtons = $("#confidentialityButtons").children();
	
	$("#landmarkforsearch").append('<div class="col-md-2" style="width:100%"> <div id="goforsearch" style="height:100%;">&nbsp</div></div>');
}

// filter function
// ===============

function resetFilterButtons()	{
	
	// Unit buttons
		$.each(unitButtons, function(i, button){
            $(button).children().removeClass("glyphicon-check"); // span is children of button
            $(button).children().addClass("glyphicon-unchecked");
            $(button).removeClass("filtering");
        })
        $("#ALL-UNIT").children().removeClass("glyphicon-unchecked");
        $("#ALL-UNIT").children().addClass("glyphicon-check");
        $("#ALL-UNIT").addClass("filtering");
        // Platform buttons
		$.each(platformButtons, function(i, button){
            $(button).children().removeClass("glyphicon-check");
            $(button).children().addClass("glyphicon-unchecked");
            $(button).removeClass("filtering");
        })
        $("#ALL-PLATFORM").children().removeClass("glyphicon-unchecked");
        $("#ALL-PLATFORM").children().addClass("glyphicon-check");
        $("#ALL-PLATFORM").addClass("filtering");
		// Type buttons
		$.each(typeButtons, function(i, button){
            $(button).children().removeClass("glyphicon-check");
            $(button).children().addClass("glyphicon-unchecked");
            $(button).removeClass("filtering");
        })
        $("#ALL-TYPE").children().removeClass("glyphicon-unchecked");
        $("#ALL-TYPE").children().addClass("glyphicon-check");
        $("#ALL-TYPE").addClass("filtering");
		// Year buttons
		$.each(yearButtons, function(i, button){
            $(button).children().removeClass("glyphicon-check");
            $(button).children().addClass("glyphicon-unchecked");
            $(button).removeClass("filtering");
        })
        $("#ALL-YEAR").children().removeClass("glyphicon-unchecked");
        $("#ALL-YEAR").children().addClass("glyphicon-check");
        $("#ALL-YEAR").addClass("filtering");
		// confidentiality buttons
		$.each(confidentialityButtons, function(i, button){
            $(button).children().removeClass("glyphicon-check");
            $(button).children().addClass("glyphicon-unchecked");
            $(button).removeClass("filtering");
        })
        $("#ALL-CONFIDENTIALITY").children().removeClass("glyphicon-unchecked");
        $("#ALL-CONFIDENTIALITY").children().addClass("glyphicon-check");
        $("#ALL-CONFIDENTIALITY").addClass("filtering");
}

function toggleFilter (filter, element) {
	
    // set unit, platform, type, year, confidentiality to All, when no thumbnails are showing and refresh filters option is clicked
    if(filter === "REFRESH"){
		document.getElementById("searchproducts").value = "";
		for (i=0;i<dataProductsGIS.length;i++){
		$('#' + dataProductsGIS[i].id_str).show();
		$('#' + dataProductsGIS[i].code).show();
		$('#' + dataProductsGIS[i].code + '_carousel').show();
		};
        
		resetFilterButtons();

    } else {
    // if a filter button is clicked
        var containerId = '#' + $(element).parent().attr('id');
        var sameFilterButtons = $(containerId).children();
        // check if filter is for all
        if($(element).hasClass('all')){
            $.each(sameFilterButtons, function(i, button){
                $(button).children().removeClass("glyphicon-check");
                $(button).children().addClass("glyphicon-unchecked");
                $(button).removeClass("filtering");
            })
            $(element).children().removeClass("glyphicon-unchecked");
            $(element).children().addClass("glyphicon-check");
            $(element).addClass("filtering");
        } else {
            // clear the ALL filter for the filter category
            var sameCategoryAll = $(containerId).find('.all');
            $(sameCategoryAll).children().addClass("glyphicon-unchecked");
            $(sameCategoryAll).children().removeClass("glyphicon-check");
            $(sameCategoryAll).removeClass("filtering");
			
			
            // if clicked class filter is on, then turn it off
            if($(element).hasClass("filtering") === true){
                $(element).removeClass("filtering");
                $(element).children().removeClass("glyphicon-check");
                $(element).children().addClass("glyphicon-unchecked");
                // if no class filters are turned on, toggle 'All' back on
                var noClassFiltering = true;
                $.each(sameFilterButtons, function(i, button){
                    if ($(button).hasClass("filtering")){
                        noClassFiltering = false;
                    }
                });
                if (noClassFiltering === true){
                    $(sameCategoryAll).children().removeClass("glyphicon-unchecked");
                    $(sameCategoryAll).children().addClass("glyphicon-check");
                    $(sameCategoryAll).addClass("filtering");
                }
            // if clicked class filter is off, then turn it on
            } else {
                $(element).addClass("filtering");
                $(element).children().removeClass("glyphicon-unchecked");
                $(element).children().addClass("glyphicon-check");
            }
			
			
        }
    }
    // check to see what which units are active
    visibleUnits = [];
    $.each(unitButtons, function(i, button){
        if($(button).hasClass("filtering")){
            var buttonid = $(button).attr("id");
            visibleUnits.push(buttonid);
        }
    })
    // check to see what platforms are active
    visiblePlatforms = [];
    $.each(platformButtons, function(i, button){
        if($(button).hasClass("filtering")){
            var buttonid = $(button).attr("id");
            visiblePlatforms.push(buttonid);
        }
    })
	// check to see what types are active
    visibleTypes = [];
    $.each(typeButtons, function(i, button){
        if($(button).hasClass("filtering")){
            var buttonid = $(button).attr("id");
            visibleTypes.push(buttonid);
        }
    })
	// check to see what years are active
    visibleYears = [];
    $.each(yearButtons, function(i, button){
        if($(button).hasClass("filtering")){
            var buttonid = $(button).attr("id");
            visibleYears.push(buttonid);
        }
    })
	// check to see what confidentiality are active
    visibleConfidentiality = [];
    $.each(confidentialityButtons, function(i, button){
        if($(button).hasClass("filtering")){
            var buttonid = $(button).attr("id");
            visibleConfidentiality.push(buttonid);
        }
    })
	
    toggleThumbnails();
	
}

/*$(function() {
    var availableTags = nameTags;
    $( "#searchproducts" ).autocomplete({
      source: availableTags
    });
  });
*/
function toggleThumbnails(){

  thumbnails.each(function(d){
	
	//debugger;
	
    var thisThumbnail = d3.select(this);
    var hasUnit = false;
    $.each(visibleUnits, function(iU, unit){
        if(thisThumbnail.classed(unit) || $.inArray("ALL-UNIT", visibleUnits) != -1){
            hasUnit = true;
        }
    });
    var hasPlatform = false;
    $.each(visiblePlatforms, function(iC, platform){
        if(thisThumbnail.classed(platform) || $.inArray("ALL-PLATFORM", visiblePlatforms) != -1){
            hasPlatform = true;
        }
    });	
	var hasType = false;
    $.each(visibleTypes, function(iC, type){
        if(thisThumbnail.classed(type) || $.inArray("ALL-TYPE", visibleTypes) != -1){
            hasType = true;
        }
    });
	var hasYear = false;
    $.each(visibleYears, function(iC, year){
        if(thisThumbnail.classed(year) || $.inArray("ALL-YEAR", visibleYears) != -1){
            hasYear = true;
        }
    });
	var hasConfidentiality = false;
    $.each(visibleConfidentiality, function(iC, confidentiality){
        if(thisThumbnail.classed(confidentiality) || $.inArray("ALL-CONFIDENTIALITY", visibleConfidentiality) != -1){
            hasConfidentiality = true;
        }
    });
	/* // Accumulative filter for cases when selected filters must be contained in the result (cases where more than one class per item is possible, eg: adm boundaries and affected areas keyword)
    var hasPlatform = true;
    if($.inArray("ALL-PLATFORM", visiblePlatforms) == -1){
		$.each(visiblePlatforms, function(iC, platform){
			if(thisThumbnail.classed(platform) === false){
				hasPlatform = false;
			}
		});
    }
	*/
	
	
    if(hasUnit === true && hasPlatform === true && hasType === true && hasYear === true && hasConfidentiality === true){ // if(hasUnit === true && hasPlatform){
      thisThumbnail.classed('noMatch', false);
    } else {
        thisThumbnail.classed('noMatch', true);
    }
  });
}

getMeta();

$(function() {
    var availableTags = nameTags;
    $('#searchproducts').autocomplete({
      source: availableTags
    });
	});
	
function search_Products(inputValue){
	
	var searchedItemName = inputValue;
	var searchedItemRank;
	
	for (i=0;i<dataProductsGIS.length;i++){
		if (dataProductsGIS[i].name === searchedItemName) {
			searchedItemRank = i;
		}
	};
	
	for (i=0;i<dataProductsGIS.length;i++){
			$('#' + dataProductsGIS[i].id_str).show();
			$('#' + dataProductsGIS[i].code).show();
			$('#' + dataProductsGIS[i].code + '_carousel').show();
	};
	
	for (i=0;i<dataProductsGIS.length;i++){
		if (dataProductsGIS[i].code !== dataProductsGIS[searchedItemRank].code) {
			$('#' + dataProductsGIS[i].id_str).hide();
			$('#' + dataProductsGIS[i].code).hide();
			$('#' + dataProductsGIS[i].code + '_carousel').hide();
		}
	};
	
};

	$("#searchproducts").click(function(){
	$("#refreshfilterbutton").click();
/*	if($("#goforsearch").length != 0) {
		var goForSearch = document.getElementById("goforsearch");
		goForSearch.parentNode.removeChild(goForSearch);
		}
*/
});

	$("#searchproducts").keyup(function(event){
    if(event.keyCode == 13){
        $("#searchproductsbutton").click();
    }
});

	$("#searchproductsbutton").click(function(event){
		$('html, body').animate({
			scrollTop: $("#goforsearch").offset().top,
//			bottom: "+=100px",
//			scrollTop: "1850px",
        }, 100);
});

	$('#search-header-btn').click(function(){
	window.open("http://search.gva.icrc.priv:15000/resourcecentre/page/search?cloudview.r=f%2FSource%2Fmaps&cloudview.s=desc%28document_lastmodifieddate%29");
});


