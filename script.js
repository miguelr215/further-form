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
        document.getElementById("formResult").style.display = 'block';
        document.getElementById("formResult").style.opacity = '1';
        document.getElementById("formResultCopy").style.display = 'block';
        document.getElementById("formResultCopy").style.opacity = '1';
        document.getElementById("formResultCopy").textContent = 'Thank you for your submission!';
        document.getElementById("formResultCopy").classList.add('success');
        document.getElementById("firstName").value = '';
        document.getElementById("lastName").value = '';
        document.getElementById("email").value = '';
        document.getElementById("phone").value = '';
        document.getElementById("formHeader").style.display = 'none';
        document.getElementById("formBody").style.display = 'none';
        document.getElementById("formFooter").style.display = 'none';
    }
  } catch (error) {
    document.getElementById("formResult").style.display = 'block';
    document.getElementById("formResult").style.opacity = '1';
    document.getElementById("formResultCopy").style.display = 'block';
    document.getElementById("formResultCopy").style.opacity = '1';
    document.getElementById("formResultCopy").textContent = "Error: " + error.message;
    document.getElementById("formResultCopy").classList.add('error');
  }
});

document.getElementById("backToFormBtn").addEventListener("click", function() {
    document.getElementById("formHeader").style.display = 'block';
    document.getElementById("formBody").style.display = 'block';
    document.getElementById("formFooter").style.display = 'block';
    document.getElementById("formResult").style.display = 'none';
    document.getElementById("formResult").style.opacity = '0';
    document.getElementById("formResultCopy").style.display = 'none';
    document.getElementById("formResultCopy").style.opacity = '0';

})