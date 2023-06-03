// Menu object with food items and their prices
const menu = {
  1: { name: "Burger", price: 120 },
  2: { name: "Pizza", price: 150 },
  3: { name: "Fries", price: 69 },
  4: { name: "Sandwish", price: 149 },
  5: { name: "Food5", price: 699 },
  6: { name: "Food6", price: 5 },
  7: { name: "Food7", price: 5 },
  8: { name: "Food8", price: 5 },
  9: { name: "ColdDrink", price: 50 },
  10: { name: "Lassi", price: 30 }
};

// Function to calculate the total bill
function calculateBill(order, tipPercentage, quantity) {
  let total = 0;

  for (const item of order) {
    const food = menu[item.foodNumb];
    const quantity = item.quantity;
    const price = food.price * quantity;
    total = total + price;
    console.log(`${food.name} - ${quantity} x ₹${food.price} = ₹${price}`);
  }
  const gst = total * 0.18; // 18% GST
  total = total + gst;
  console.log(`GST (18%): ₹${gst.toFixed(2)}`);

  if (tipPercentage) {
    const tip = total * (tipPercentage / 100);
    total = total + tip;
    console.log(`Tip (${tipPercentage}%): ₹${tip.toFixed(2)}`);
  }

  if ((quantity) > 3) {
    const Discount = total * 0.05; // 5% DISCOUNT
    total = total - Discount;
    console.log(`discount (5%): ₹${Discount.toFixed(2)}`);
    console.log(`Total Bill: ₹${total.toFixed(2)}`);
    // total = 'Total Bill: ₹ $total.toFixed(2)';
    // alert(total);
  } else {
    console.log("discount (0%): ₹0");
    console.log(`Total Bill: ₹${total.toFixed(2)}`);
    // alert('Total Bill: ₹${total.toFixed(2)}');
  }
}

// Function to prompt user for food selection and quantity
function takeOrder() {
  const order = [];
  let continueOrder = true;
  let quantity;

  while (continueOrder) {
    const foodNumb = parseInt(prompt("Enter food number (1-10):"));
    const food = menu[foodNumb];

    if (food) {
      quantity = parseInt(prompt(`Enter quantity for ${food.name}:`));
      order.push({ foodNumb, quantity });
    } else {
      console.log("Invalid food number. Please try again.");
    }

    continueOrder = confirm("Do you want to add more items to your order?");
  }

  const tipPercentage = parseFloat(
    prompt("Enter tip percentage (or 0 for no tip):")
  );

  calculateBill(order, tipPercentage, quantity);
}

// Start the order process
takeOrder();