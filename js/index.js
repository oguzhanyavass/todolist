document.addEventListener("DOMContentLoaded", function () {
    var list = document.getElementById("list");
    var taskInput = document.getElementById("task");
  
    function saveToLocalStorage() {
      localStorage.setItem("todoList", list.innerHTML);
    }
  
    function loadFromLocalStorage() {
      var savedList = localStorage.getItem("todoList");
      if (savedList) {
        list.innerHTML = savedList;
        addCloseButton(); // Close button'ları yüklenen öğelerin üzerine ekler
      }
    }
  
    function addNewElement() {
  var inputValue = taskInput.value.trim();
  if (inputValue === "") {
    showErrorToast("Listeye boş ekleme yapamazsınız!");
    return;
  }

  var li = document.createElement("li");
  li.innerText = inputValue;

  var closeButton = document.createElement("span");
  closeButton.innerText = "x";
  closeButton.className = "close-button";
  closeButton.onclick = function () {
    removeElement(li);
  };

  li.appendChild(closeButton);
  list.appendChild(li);

  showSuccessToast("Listeye eklendi.");
  
  taskInput.value = ""; // Ekleme yapıldığında input alanını temizler

  saveToLocalStorage();
  addCloseButton(); // Yeni eklenen öğenin üzerine close button ekler
}

    function removeElement(element) {
      element.remove();
      saveToLocalStorage();
    }
  
  
    function showErrorToast(message) {
      var toast = document.createElement("div");
      toast.className = "toast error";
      toast.innerText = message;
  
      var toastContainer = document.getElementById("toast-container");
      toastContainer.appendChild(toast);
  
      var errorToastInstance = new bootstrap.Toast(toast, {
        delay: 4000,
      });
      errorToastInstance.show();
    }
  
    function showSuccessToast(message) {
        var toastContainer = document.getElementById("toast-container");
        if (!toastContainer) {
          console.error("Toast container element not found.");
          return;
        }
      
        var toast = document.createElement("div");
        toast.className = "toast success";
        toast.innerText = message;
      
        toastContainer.appendChild(toast);
      
        var successToastInstance = new bootstrap.Toast(toast, {
          delay: 4000,
        });
        successToastInstance.show();
      }
      
    
    function addCloseButton() {
        var listItems = document.querySelectorAll("#list li");
        listItems.forEach(function (item) {
          if (!item.querySelector(".close-button")) {
            var closeButton = document.createElement("span");
            closeButton.innerText = "x";
            closeButton.className = "close-button";
            closeButton.onclick = function () {
              removeElement(item);
            };
            item.appendChild(closeButton);
          }
        });
      }
    
      // Event listeners
      document.getElementById("liveToastBtn").addEventListener("click", addNewElement);
      taskInput.addEventListener("keydown", function (event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          addNewElement();
        }
      });
    
  
    list.addEventListener("click", function (event) {
      var clickedElement = event.target;
      if (clickedElement.classList.contains("close-button")) {
        var listItem = clickedElement.parentElement;
        removeElement(listItem);
      } else if (clickedElement.tagName === "LI") {
        clickedElement.classList.toggle("checked");
        saveToLocalStorage();
      }
    });
  
    loadFromLocalStorage();
  });
