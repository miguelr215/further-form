document.getElementById("furtherForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  const form = event.target;
  // Gather form data and convert to plain object
  const formData = new FormData(form);
  const plainObject = Object.fromEntries(formData.entries());
  console.log('plain ob:', plainObject);

  // Convert to JSON string
  const jsonString = JSON.stringify(plainObject);
  console.log('json str:', jsonString);

  try {
    // Send POST as JSON
    const response = await fetch(form.action, {
      method: "POST",
      headers: {
        "Accept": "application/json"        
      },
      body: jsonString
    });

    if (!response.ok) {
      throw new Error("Oops, something went wrong. Please try again");
    }

    // Handle JSON response
    const data = await response.json();
    
    if (data.status === 'success') {
        document.getElementById("formResult").textContent = 'Thank you for your submission!';
        document.getElementById("formResult").classList.add('success');
    }
  } catch (error) {
    document.getElementById("formResult").textContent = "Error: " + error.message;
    document.getElementById("formResult").classList.add('error');
  }
});
