document.getElementById("furtherForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  const form = event.target;
  // Gather form data and convert to plain object
  const formData = new FormData(form);
  const plainObject = Object.fromEntries(formData.entries());

  // Convert to JSON string
  const jsonString = JSON.stringify(plainObject);

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
        const formResult = document.getElementById("formResult");
        const formResultCopy = document.getElementById("formResultCopy");
        formResult.style.display = 'block';
        formResult.style.opacity = '1';
        formResultCopy.style.display = 'block';
        formResultCopy.style.opacity = '1';
        formResultCopy.textContent = 'Thank you for your submission!';
        formResultCopy.classList.add('success');
        document.getElementById("firstName").value = '';
        document.getElementById("lastName").value = '';
        document.getElementById("email").value = '';
        document.getElementById("phone").value = '';
        document.getElementById("formHeader").style.display = 'none';
        document.getElementById("formBody").style.display = 'none';
        document.getElementById("formFooter").style.display = 'none';
    }
  } catch (error) {
    const formResult = document.getElementById("formResult");
    const formResultCopy = document.getElementById("formResultCopy");
    formResult.style.display = 'block';
    formResult.style.opacity = '1';
    formResultCopy.style.display = 'block';
    formResultCopy.style.opacity = '1';
    formResultCopy.textContent = "Error: " + error.message;
    formResultCopy.classList.add('error');
  }
});

document.getElementById("backToFormBtn").addEventListener("click", function() {
    const formResult = document.getElementById("formResult");
    const formResultCopy = document.getElementById("formResultCopy");
    document.getElementById("formHeader").style.display = 'block';
    document.getElementById("formBody").style.display = 'block';
    document.getElementById("formFooter").style.display = 'block';
    formResult.style.display = 'none';
    formResult.style.opacity = '0';
    formResultCopy.style.display = 'none';
    formResultCopy.style.opacity = '0';

})