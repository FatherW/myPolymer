
// loadScript("http://code.jquery.com/jquery-1.10.2.js");

loadStyle("https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css");
loadStyle("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css");
loadStyle("https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css");

loadScript("https://code.jquery.com/jquery-2.1.3.min.js");
loadScript("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js");
initPopupTemplate('dz-buy-photo');

var API_URL = 'https://api.shutterstock.com/v2';
var $ = window['jQuery'];

customElements.define('dz-buy-photo',
class extends HTMLElement {
  constructor() {
    super();
      let that = this;
      let user = store.get('user') || null;
      let templateContent = document.getElementById('dz-buy-photo-tpl').content;
      this.fileManager = new AwsPackage(user);
      this.appendChild(templateContent.cloneNode(true));
      this.querySelector('#search-button').addEventListener('click',e=>{
          // that.search();
          // this.fileManager.getData('https://stock.adobe.io/Rest/Media/1/Search/Files','locale=en_US').then(res=>{
          //   console.log('Result',res);
          // });    

          // this.postData('https://stock.adobe.io/Rest/Media/1/Search/Files','locale=en_US',{'x-product': 'DazzleStock',
          // 'x-api-key': 'd9b126638ff44a84a0145c89a8c8ee01'}).then(res=>{
          //     console.log('Post Result',res);
          // });
          let keyword = this.querySelector('#keyword').value;
          console.log(keyword);
          var opts = {
              method: 'GET',      
              headers: {
                "x-product": "DazzleStock",
                'x-api-key':'d9b126638ff44a84a0145c89a8c8ee01'
              }
            };
            fetch('https://stock.adobe.io/Rest/Media/1/Search/Files?locale=en_US&search_parameters[words]='+keyword+'&search_parameters[limit]=100&search_parameters[offset]=16', opts).then(function (response) {
              return response.json();
            })
            .then(function (body) {
                console.log('Result',body);
                that.querySelector('#image-search-results').innerHTML='';
                body.files.forEach(item=>{
                  let figure = document.createElement('figure');
                  figure.innerHTML = item.thumbnail_html_tag;
                  that.querySelector('#image-search-results').appendChild(figure);     
                });
                //doSomething with body;
            });

      });

    }
    addImage(item){

    }

    postData(url, data,headers) {
      // Default options are marked with *
      
      return new Promise(function (resolve, reject) {
        fetch(url, {
          body: JSON.stringify(data), // must match 'Content-Type' header
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, same-origin, *omit
          headers: headers,
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'no-cors', // no-cors, cors, *same-origin
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // *client, no-referrer
        })
        .then(response => {
          resolve(response.json());
        }) // parses response to JSON
      });
      
    }

    search() {

      // $('#image-search-results, #video-search-results').empty();
      var imageSearchResults = this.querySelector('#image-search-results');
      imageSearchResults.innerHTML = '';

      // Serialize form options
      // var opts = $('input').filter(function() {
      //   if (this.value === '#999999') return;
      //   if (this.name === 'client_id') return;
      //   if (this.name === 'client_secret') return;
      //   return !!this.value;
      // }).serialize();
  
      // opts += '&' + $('select').filter(function() {
      //   return !!this.value;
      // }).serialize();
      // opts = useColorsInNatureIfSearchingOnlyByColor(opts);

      // query=restaurant&safe=true&image_type=photo&orientation=horizontal&page=1&per_page=9

      var opts = {
        "query":"restaurant",
        "safe":true,
        "image_type":"photo",
        "orientation":"horizontal",
        "page":1,
        "per_page":9
      };
      console.log('Requesting: ' + opts)
  

      // Search and display images

    //  search(opts, 'image');
  
      // var $container = $('#' + mediaType + '-search-results');
      var $container = imageSearchResults;
      // var createComponentFunc = mediaType === 'image'
      //   ? renderImageComponent
      //   : renderVideoComponent;
      var createComponentFunc = renderImageComponent;

      var authorization = encodeAuthorization();
      if (!authorization) return;
      
      this.postData(API_URL + '/images/search',opts, {
        Authorization: authorization
      }).then(data=>{
        if (data.total_count === 0) {
          $container.append('<p>No Results</p>');
          return;
        }
    
        var minHeightCSS = /horizontal/.test(opts) ? 'horizontal-image' : 'vertical-image';
        data.data.forEach(item=>{
          var component = createComponentFunc(item, minHeightCSS);
          $container.append(component);
        },err=>{
          // alert('Failed to retrieve ' + mediaType + ' search results:\n' + JSON.stringify(xhr.responseJSON, null, 2));
              console.log('Error');
        });
      })

      // var jqxhr = $.ajax({
      //   url: API_URL + '/' + mediaType + 's/search',
      //   data: opts,
      //   headers: {
      //     Authorization: authorization
      //   }
      // })
      // .done(function(data) {
      //   if (data.total_count === 0) {
      //     $container.append('<p>No Results</p>');
      //     return;
      //   }
    
      //   var minHeightCSS = /horizontal/.test(opts) ? 'horizontal-image' : 'vertical-image';
      //   $.each(data.data, function(i, item) {
      //     var component = createComponentFunc(item, minHeightCSS);
      //     $container.append(component);
      //   });
    
      //   // Reduce the options area to show the results
      //   if (window.innerWidth < 600) $('.collapse.in').collapse();
      // })
      // .fail(function(xhr, status, err) {
      //   alert('Failed to retrieve ' + mediaType + ' search results:\n' + JSON.stringify(xhr.responseJSON, null, 2));
      // });
    
      // return jqxhr;
    }
    connectedCallback(){
    
     }

});


// Base 64 encode Client ID and Client Secret for use in the Authorization header
function encodeAuthorization() {




  // var clientId = $('input[name=client_id]').val();
  var clientId = '127827b64136775c65a2';
  // var clientSecret = $('input[name=client_secret]').val();
  var clientSecret = '5198b8193b928442671a42c90b83cda8c49d29b6';
  
  if (!clientId || !clientSecret) {
    $('#collapseAuthentication').collapse('show');
    alert('Client id and/or client secret are missing in the API key section, with out these you wont be able to contact the API.');
    return;
  }
  return 'Basic ' + window.btoa(clientId + ':' + clientSecret);
}

// Search media by type
function search(opts, mediaType) {
  var $container = $('#' + mediaType + '-search-results');
  var createComponentFunc = mediaType === 'image'
    ? renderImageComponent
    : renderVideoComponent;

  authorization = encodeAuthorization();
  if (!authorization) return;

  var jqxhr = $.ajax({
    url: API_URL + '/' + mediaType + 's/search',
    data: opts,
    headers: {
      Authorization: authorization
    }
  })
  .done(function(data) {
    if (data.total_count === 0) {
      $container.append('<p>No Results</p>');
      return;
    }

    var minHeightCSS = /horizontal/.test(opts) ? 'horizontal-image' : 'vertical-image';
    $.each(data.data, function(i, item) {
      var component = createComponentFunc(item, minHeightCSS);
      $container.append(component);
    });

    // Reduce the options area to show the results
    if (window.innerWidth < 600) $('.collapse.in').collapse();
  })
  .fail(function(xhr, status, err) {
    alert('Failed to retrieve ' + mediaType + ' search results:\n' + JSON.stringify(xhr.responseJSON, null, 2));
  });

  return jqxhr;
}

// Fetch media details
function fetchDetails(event) {
  event.preventDefault();

  var id = event.target.id;
  var mediaType = event.target.tagName === 'IMG' ? 'image' : 'video';
  var authorization = encodeAuthorization();

  if (!id || !authorization) return;

  renderLoadingDetails(id);

  var jqxhr = $.ajax({
      url: API_URL + '/' + mediaType + 's/' + id,
      headers: {
        Authorization: authorization
      }
    })
    .done(function(data) {
      console.log('JSON response', data);

      if (!data || !data.assets || !data.assets) return;

      renderDetails(data);
    })
    .fail(function(xhr, status, err) {
      alert('Failed to retrieve ' + mediaType + ' details:\n' + JSON.stringify(xhr.responseJSON, null, 2));
    });

  return jqxhr;
}

/* Render functions */

// Create image wrapper component
function renderImageComponent(image, minHeightCSS) {
  if (!image || !image.assets || !image.assets.large_thumb || !image.assets.large_thumb.url) return;

  var wrapper = $('<div>');
  var thumbWrapper = $('<div>');
  var thumbnail = $('<img>');
  var description = $('<p>');

  $(thumbnail)
    .click(fetchDetails)
    .attr('id', image.id)
    .attr('src', image.assets.large_thumb.url)
    .attr('title', image.description);

  $(thumbWrapper)
    .addClass('thumbnail-crop')
    .css('height', image.assets.large_thumb.height)
    .css('width', image.assets.large_thumb.width)
    .append(thumbnail);

  $(wrapper)
    .addClass('image-float-wrapper image ' + minHeightCSS)
    .append(thumbWrapper);

  return wrapper;
}

// Create video wrapper component
function renderVideoComponent(video) {
  if (!video || !video.assets || !video.assets.thumb_mp4 || !video.assets.thumb_mp4.url) return;

  var wrapper = $('<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">');
  var preview = $('<video width="100%">');
  var description = $('<p>');

  $(preview)
    .click(fetchDetails)
    .attr('id', video.id)
    .attr('src', video.assets.thumb_mp4.url)
    .attr('controls', true)
    .attr('autoplay', true)
    .attr('title', video.description);

  $(wrapper)
    .addClass('video-wrapper video')
    .append(preview)

  return wrapper;
}

// Display media details in a modal
function renderDetails(data) {
  var detailTemplate = $('.detail-template');
  detailTemplate.find('.modal-body').html('<div></div><p><strong>Keywords: </strong><small></small></p>')

  if (data.media_type === 'image') {
    var thumbWrapper = $('<div>');
    var thumbnail = $('<img>');

    $(thumbnail)
      .click(fetchDetails)
      .attr('id', data.id)
      .attr('src', data.assets.preview.url)
      .attr('title', data.description);

    $(thumbWrapper)
      .addClass('thumbnail-crop')
      .css('height', data.assets.preview.height)
      .css('width', data.assets.preview.width)
      .append(thumbnail);

    detailTemplate.find('.modal-body').find('div')
      .append(thumbWrapper)
  } else if (data.media_type === 'video') {
    detailTemplate.find('.modal-body').find('div')
      .append('<video></video>');

    detailTemplate.find('video')
      .attr('src', data.assets.preview_mp4.url)
      .attr('controls', true);
  }

  detailTemplate.find('h3').html(data.description);
  detailTemplate.find('small').html(data.keywords.join(', '));
}

// Render a loading spinner while we wait for image/video details
function renderLoadingDetails(id) {
  var detailTemplate = $('.detail-template');

  detailTemplate.find('.modal-body').html('<i class="fa fa-5x fa-spinner fa-spin"></i>')
  detailTemplate.find('h3').html('Loading ' + id + '...');
  detailTemplate.modal('show');
}

// Simulate user chooses an image/video
function renderServerSideInstructions() {
  alert('Here you will need server-side code to purchase and download the un-watermarked image. See the documentation at https://developers.shutterstock.com/guides/licensing');
}

// Add categories to the category <select>
function renderCategories() {
  var categorySelect = $('[name="category"]')[0];
  ['Abstract', 'Animals/Wildlife', 'Backgrounds/Textures', 'Beauty/Fashion', 'Buildings/Landmarks', 'Business/Finance', 'Celebrities', 'Editorial', 'Education', 'Food and Drink', 'Healthcare/Medical', 'Holidays', 'Illustrations/Clip-Art', 'Industrial', 'Interiors', 'Miscellaneous', 'Model Released Only', 'Nature', 'Objects', 'Parks/Outdoor', 'People', 'Religion', 'Science', 'Signs/Symbols', 'Sports/Recreation', 'Technology', 'The Arts', 'Transportation', 'Vectors', 'Vintage'].map(function(category) {
    categorySelect.add(new Option(category, category));
  });
}

function setDefaultPerPage() {
  var imagesWhichFitOnThePage = (window.innerWidth * window.innerHeight) / (300 * 300);
  var bestPerPage;

  $('select[name=per_page]')
    .find('option')
    .each(function() {
      if (this.value < imagesWhichFitOnThePage) {
        bestPerPage = this.value;
      }
    });

  if (bestPerPage) {
    $('select[name=per_page]').val(bestPerPage);
  }
}

function setColor(target) {
  $("input[name=color]").val(target.value);
}

function useColorsInNatureIfSearchingOnlyByColor (opts) {
  if (/color/.test(opts) & !/category/.test(opts) && !/query/.test(opts)){
    opts += '&category=Nature';
  }
  return opts;
}

// On Page Load
$(function() {
  renderCategories();
  setDefaultPerPage();

  $('#search-form').submit(function(e) {
    e.preventDefault();

    // Clear current media results
    $('#image-search-results, #video-search-results').empty();

    // Serialize form options
    var opts = $('input').filter(function() {
      if (this.value === '#999999') return;
      if (this.name === 'client_id') return;
      if (this.name === 'client_secret') return;
      return !!this.value;
    }).serialize();

    opts += '&' + $('select').filter(function() {
      return !!this.value;
    }).serialize();
    opts = useColorsInNatureIfSearchingOnlyByColor(opts);
    console.log('Requesting: ' + opts)

    // Search and display images
    search(opts, 'image');

    // Reduce # videos to better fit on the page
    var perPage = $('select[name=per_page]').val();
    if (perPage > 24) {
      opts = opts.replace('per_page=' + perPage, 'per_page=' + perPage / 2);
    }

    // Search and display videos
    search(opts, 'video');

    return false;
  });

  // Load results on page load
  // $('#search-form').submit();

});