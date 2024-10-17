let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toyForm = document.querySelector(".add-toy-form"); 

toyForm.addEventListener("submit", (event) => {
  event.preventDefault(); 
  createToy(); 
});

  fetchToys();
  function fetchToys() {
    fetch('http://localhost:3000/toys')
      .then(response => response.json())
      .then(toys => {
        toys.forEach(toy => renderToy(toy));
      })
  }

  function renderToy(toy) {
    const toyCollection = document.getElementById("toy-collection");
    
    const toyCard = document.createElement("div");
    toyCard.className = "card";
    
    const toyName = document.createElement("h2");
    toyName.textContent = toy.name;
    
    const toyImage = document.createElement("img");
    toyImage.src = toy.image;
    toyImage.className = "toy-avatar";
    
    const toyLikes = document.createElement("p");
    toyLikes.textContent = `${toy.likes} Likes`;
    
    const likeButton = document.createElement("button");
    likeButton.className = "like-btn";
    likeButton.id = toy.id;
    likeButton.textContent = "Like ❤️";
  
    
    likeButton.addEventListener("click", () => {
      updateLikes(toy, toyLikes);
    });
  
    toyCard.append(toyName, toyImage, toyLikes, likeButton);
    toyCollection.appendChild(toyCard);

  }


function updateLikes(toy, toyLikesElement) {
  const updatedLikes = toy.likes + 1;

  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: updatedLikes
    })
  })
  .then(response => response.json())
  .then(updatedToy => {
    
    toy.likes = updatedToy.likes;
    toyLikesElement.textContent = `${updatedToy.likes} Likes`;
  })
  .catch(error => console.error("Error updating likes:", error));
}

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

 
function createToy() {
  const nameInput = toyForm.querySelector('input[name="name"]');
  const imageInput = toyForm.querySelector('input[name="image"]');
  
  const newToy = {
    name: nameInput.value,
    image: imageInput.value,
    likes: 0
  };
  
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newToy)
    })
    .then(Response => Response.json())
    .then(toy => {
      renderToy(toy);
      toyForm.reset();
    });
  }

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
