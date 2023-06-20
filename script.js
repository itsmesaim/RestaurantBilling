// Menu object with food items and their prices
const menu = {
  1: { name: "Burger", price: 120 },
  2: { name: "Pizza", price: 150 },
  3: { name: "Fries", price: 69 },
  4: { name: "Sandwish", price: 149 },
  5: { name: "ColdDrink", price: 50 },
  6: { name: "Lassi", price: 30 }
};

// Function to update the menu on the HTML page
function updateMenu() {
  const menuList = document.getElementById("menu-list");
  menuList.innerHTML = "";

  for (const [foodNumb, food] of Object.entries(menu)) {
    const listItem = document.createElement("li");
    listItem.textContent = `${food.name} - ₹${food.price}`;
    menuList.appendChild(listItem);
  }
}

// Function to update the update-message div on the HTML page
function updateMessage(message) {
  const updateMessageDiv = document.getElementById("update-message");
  updateMessageDiv.textContent = message;
}

// Function to update the order-details div on the HTML page
function updateOrderDetails(order, tipPercentage, quantity) {
  const orderDetailsDiv = document.getElementById("order-details");
  orderDetailsDiv.innerHTML = "";

  let total = 0;

  for (const item of order) {
    const food = menu[item.foodNumb];
    const itemPrice = food.price * item.quantity;
    total += itemPrice;

    const itemDetails = document.createElement("p");
    itemDetails.textContent = `${food.name} - ${item.quantity} x ₹${food.price} = ₹${itemPrice}`;
    orderDetailsDiv.appendChild(itemDetails);
  }

  const gst = total * 0.18; // 18% GST
  total += gst;

  const gstDetails = document.createElement("p");
  gstDetails.textContent = `GST (18%): ₹${gst.toFixed(2)}`;
  orderDetailsDiv.appendChild(gstDetails);

  if (tipPercentage) {
    const tip = total * (tipPercentage / 100);
    total += tip;

    const tipDetails = document.createElement("p");
    tipDetails.textContent = `Tip (${tipPercentage}%): ₹${tip.toFixed(2)}`;
    orderDetailsDiv.appendChild(tipDetails);
  }

  if (quantity > 3) {
    const discount = total * 0.05; // 5% DISCOUNT
    total -= discount;

    const discountDetails = document.createElement("p");
    discountDetails.textContent = `Discount (5%): ₹${discount.toFixed(2)}`;
    orderDetailsDiv.appendChild(discountDetails);
  } else {
    const discountDetails = document.createElement("p");
    discountDetails.textContent = `Discount (0%): ₹0`;
    orderDetailsDiv.appendChild(discountDetails);
  }

  const totalBillDetails = document.createElement("p");
  totalBillDetails.textContent = `Total Bill: ₹${total.toFixed(2)}`;
  orderDetailsDiv.appendChild(totalBillDetails);
}

// Function to add a new food item to the menu
function addNewFood() {
  const newName = prompt("Enter the name of the new food you would like to add:");
  const newPrice = parseInt(prompt("Enter the price of the new item:"));
  const newFoodNumb = Object.keys(menu).length + 1;
  menu[newFoodNumb] = { name: newName, price: newPrice };
  updateMenu();
  updateMessage("New menu item added successfully!");
}

// Function to handle the admin functions
function handleAdminFunctions() {
  addNewFood();
}

// Function to take the order from the user
function takeOrder() {
  const order = [];
  let continueOrder = true;
  let quantity;

  while (continueOrder) {
    const foodNumb = parseInt(prompt("Enter food number:"));
    const food = menu[foodNumb];

    if (food) {
      quantity = parseInt(prompt(`Enter quantity for ${food.name}:`));
      order.push({ foodNumb, quantity });
    } else {
      alert("Invalid food number. Please try again.");
    }

    continueOrder = confirm("Do you want to add more items to your order?");
  }

  const tipPercentage = parseInt(prompt("Enter tip percentage (or 0 for no tip):"));

  updateOrderDetails(order, tipPercentage, quantity);
}

// Initialize the menu on page load
updateMenu();

