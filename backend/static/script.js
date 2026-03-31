async function validateEmails() {
    const emails = document.getElementById("emails").value.split("\n");

    const response = await fetch("http://127.0.0.1:5000/validate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ emails })
    });

    const data = await response.json();

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    data.results.forEach(item => {
        const p = document.createElement("p");
        p.textContent = `${item.email} - ${item.status}`;
        p.className = item.status === "Valid" ? "valid" : "invalid";
        resultsDiv.appendChild(p);
    });
}