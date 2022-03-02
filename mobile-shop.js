const searchfield = () => {
    const searchfield = document.getElementById('search-field');
    const searchtext = searchfield.value;

    // clear data  
    searchfield.value = '';
    // clear Phone details field 
    document.getElementById('phone-details-box').textContent = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchtext}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displaysearchresult(data.data))
};

// To view search result 
const displaysearchresult = phone => {
    const searchresult = document.getElementById('search-result')
    if (phone.length === 0) {
        document.getElementById('not-found').style.display = 'block'
    }
    else {
        document.getElementById('not-found').style.display = 'none'

    }

    // clear data  
    searchresult.textContent = '';
    phone.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML =
            `<div class="card rounded">
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title"> Name: ${phone.phone_name}</h5>
      <h5 class="card-title"> Brand: ${phone.brand}</h5>
     <button href="#phone-details-box" class="rounded btn-success" onclick="phoneDetails('${phone.slug}')">view Details</button>
    </div>
  </div>`;
        searchresult.appendChild(div)
    })
}

const phoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => phoneDisplyshow(data.data))
}

// To view specifics product details 
const phoneDisplyshow = phone => {
    console.log(phone)
    // console.log( phoneDisplyshow);
    const phoneDetailsfield = document.getElementById('phone-details-box');
    // clear data  
    phoneDetailsfield.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `<img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
      <h5 class="card-title text-bold">${phone.name}</h5>
      <p class="card-text"><span class="bold">Brand: </span>${phone.brand}</p>
      <p class="card-text"><span class="bold">Release Date: </span>${phone.releaseDate ? phone.releaseDate : 'No Release Date found'}</p>
      <p><span class="bold">Main Features</span></p>
      <p class="card-text"><span class="bold">Memory: </span>${phone.mainFeatures.memory}</p>
      <p class="card-text"><span class="bold">DisplaySize: </span>${phone.mainFeatures.displaySize}</p>
      <p class="card-text"><span class="bold">Storage: </span>${phone.mainFeatures.storage}</p>
      <p class="card-text"><span class="bold">ChipSet: </span>${phone.mainFeatures.chipSet}</p>
      <p class="card-text"><span class="bold">slug: </span>${phone.slug}</p>
      <p class="card-text"><span class="bold">sensors: </span>${phone.mainFeatures.sensors}</p>
      <a href="#" class="btn btn-primary">Close</a>
      <a href="#" class="btn btn-primary">Buy now</a>`;
    phoneDetailsfield.appendChild(div)
};