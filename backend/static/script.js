function validateEmails() {
    const input = document.getElementById("emails").value;

    const emails = input
        .split(/[\n,]+/)
        .map(e => e.trim())
        .filter(e => e);

    fetch("/bulk-validate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ emails })
    })
    .then(res => res.json())
    .then(data => {
        const results = document.getElementById("results");
        results.innerHTML = "";

        data.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.email} → ${item.valid ? "Valid" : "Invalid"}`;
            li.className = item.valid ? "valid" : "invalid";
            results.appendChild(li);
        });
    })
    .catch(err => console.error(err));
}