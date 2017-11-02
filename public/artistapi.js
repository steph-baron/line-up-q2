// Get the artist image & name after form submit on user profile page
document.querySelector("#searchForm").addEventListener("submit", function (event){
  event.preventDefault();
    var searchTerm = document.querySelector("#artist").value;
    // console.log(searchTerm);

    $.get("https://rest.bandsintown.com/artists/"+searchTerm+"?app_id=lineupapp", function(data){

      var name = data.name;
      var nameNode = document.createTextNode(name);
      var createNameElement = document.createElement('p');
      createNameElement.appendChild(nameNode);
      createNameElement.setAttribute("style", "color: white;");
      var address = document.querySelector('#artistName');
      address.appendChild(createNameElement);

      var image = data.image_url;
      var imageNode = document.createTextNode(image);
      console.log(imageNode);
      var createImageElement = document.createElement('img');
      console.log(createImageElement);
      // createImageElement.appendChild(imageNode);
      var imageAddress = document.querySelector('#artistName');
      createImageElement.src = image;
      imageAddress.appendChild(createImageElement);
  })
