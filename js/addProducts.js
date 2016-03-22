// code adapted from https://github.com/AmericanRedCross/nepal-maps/blob/gh-pages/js/main.js

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

function openLink(item){
	
	debugger;
	
	/*
	if(d3.select(item.parentNode).classed('Web-map')){
		var thisUrl = $(item).find('.thumbnail-link').attr('href');
		window.open(thisUrl);
	} else {
		var modalDescription = $(item).find('.modalDescription').html();
		var mapJpg = $(item).find('img').attr("data-original").slice(0,-10) + '_thumb.jpg';
		var img_maxHeight = (windowHeight*0.45).toString() + "px";
		$(".modal-detailedDescription").empty();
		$(".modal-detailedDescription").html(modalDescription);
		$(".modal-img").css('max-height', img_maxHeight);
		$(".modal-img").attr('src', mapJpg);
		$('#myModal').modal();
	}
	*/

	window.open(link);
}


function getMeta() {
	var dsv = d3.dsv(";", "text/plain");
	//d3.csv("data/products.csv", function(metadata){
	dsv("data/products.csv", function(metadata){
		//console.log(products);
		generateCarousel(metadata);
		generateThumbnails(metadata);
	});
}

function generateCarousel(metadata) {
	//console.log(metadata);
	

	
	function generateCarouselItemHtml(item){
		htmlStr = 
			'<div class="item">' + //onclick="openLink(this);">' +
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
	
	var highlightedN = 0;
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
}

function generateThumbnails(metadata){
	
	var links = [];
	/*function isLab(type){
		if (type == "lab") { return " | Lab"; }
		else { return ""; }
	}
	function isLabTesting(type){
		if (type == "lab_testing") { return " | Lab Testing"; }
		else { return ""; }
	}*/
	
	function dateStr2YearClass(date) {
		if (date != "") {
			var year = date.split(".")[2];
			//return 'year-' + year;
			return year;
		}		
	}
	
	function generateThumbnailHtml(item){
		var itemHtml = 
			/*'<div class="col-md-3 text-center portfolioElement" id="' + item.id_str + 
			'"><!-- circle --><div class="ih-item circle colored effect13 from_left_and_right">' +
					'<a href="' + item.link + '" id="' + item.code + 
						'"><div class="img"><img src="' + item.thumbnail + '" alt="image not available"></div>' +
							'<div class="info"><div class="info-back">' +
								'<h3>' + item.name + '</h3>' +
								'<p>' + item.confidentiality_name + '</p>' +
							'</div></div></a></div><!-- end circle -->' +
				'<h4>' + item.name + '</h4>' +
				'<p class="product-description"><span style="font-weight:bold;">' + item.icrc_unit_name + isLab(item.product_type_code) + '</span> | ' + item.description + '</p></div>';
		*/
			'<div class="col-md-3 text-center portfolioElement" id="' + item.id_str + 
			'"><!-- circle --><div class="ih-item circle colored effect13 from_left_and_right" id="' + item.code + '">' +
					'<a href="' + item.link +  
						'" target="_blank"><div class="img">' +
						//'<img src="' + item.thumbnail + '" alt="image not available">' +
						'</div>' +
						//'">' +
							'<div class="info"><div class="info-back">' +
								'<h3>' + item.name + '</h3>' +
								'<p>' + item.confidentiality_name + '</p>' +
							'</div></div>' +
							'</a>' +
							'</div><!-- end circle -->' +
				'<h4>' + item.name + '</h4>' +
				//'<p class="product-description"><span style="font-weight:bold;">' + item.icrc_unit_name + isLab(item.product_type_code) + isLabTesting(item.product_type_code) + '</span> | ' + item.description + '</p>' +
				'<p class="product-description"><span style="font-weight:bold;">' + item.icrc_unit_name + " | " + item.product_type_code + '</span> | ' + item.description + '</p>' +
				'<a style="color:#428bca;font-style:italic;" href="' + item.bitly + '">' + item.bitly + '</a></div>';
		
		
		
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
		element.classed(d.icrc_unit_code, true);
        element.classed(d.platform_code, true);
		element.classed(d.product_type_code, true);
		element.classed(dateStr2YearClass(d.publication_date), true);
		element.classed(d.confidentiality_name, true);

        // build arrays of tags
        // Units
		var itemUnit = d.icrc_unit_code.match(/\S+/g);
        $.each(itemUnit, function(index, unit){
            if (unitTags.indexOf(unit) === -1){
                unitTags.push(unit);
            }
        });
		// Platforms
        var itemPlatform = d.platform_code.match(/\S+/g);
        $.each(itemPlatform, function(index, platform){
            if (platformTags.indexOf(platform) === -1){
                platformTags.push(platform);
            }
        });
		// Types
		var itemType = d.product_type_code.match(/\S+/g);
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
		// Years
		if (d.confidentiality_name != "") {
			var itemConfidentiality = d.confidentiality_name.match(/\S+/g);
			$.each(itemConfidentiality, function(index, confidentiality){
				if (confidentialityTags.indexOf(confidentiality) === -1){
					confidentialityTags.push(confidentiality);
				}
			});
		}
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
    var unitFilterHtml = '<button id="ALL-UNIT" class="btn btn-small btn-unit filtering all filter-button" type="button" onclick="toggleFilter('+"'ALL-UNIT'"+', this);"'+
        '>All<span class="glyphicon glyphicon-check" style="float:right;"></span></button>';
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
}

// filter function
// ===============
function toggleFilter (filter, element) {
    // set unit, platform, type, year, confidentiality to All, when no thumbnails are showing and refresh filters option is clicked
    if(filter === "REFRESH"){
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