async function validateEmails() {
    const input = document.getElementById("emails").value;

    // split + clean emails
    const emails = input
        .split(/[\n,]+/)
        .map(e => e.trim())
        .filter(e => e);

    try {
        const response = await fetch("/bulk-validate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ emails })
        });

        if (!response.ok) {
            throw new Error("API error");
        }

        const data = await response.json();

        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "";

        data.forEach(item => {
            const p = document.createElement("p");
            p.textContent = `${item.email} - ${item.valid ? "Valid" : "Invalid"}`;
            p.className = item.valid ? "valid" : "invalid";
            resultsDiv.appendChild(p);
        });

    } catch (error) {
        console.error(error);
        alert("Something went wrong!");
    }
}