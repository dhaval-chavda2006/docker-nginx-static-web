document.addEventListener('DOMContentLoaded', () => {
    // 1. Heading Animation (Typewriter Effect)
    const title = document.querySelector('.head h1');
    const text = title.textContent;
    title.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    typeWriter();

    // 2. Submit Logic & Issue Card
    const submitBtn = document.querySelector('button[name="btn"]');
    
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Stop page refresh
        
        const selectedBooks = [];
        const rows = document.querySelectorAll('#t1 tr:not(:first-child):not(:last-child)');
        
        rows.forEach(row => {
            const checkbox = row.querySelector('input[type="checkbox"]');
            if (checkbox && checkbox.checked) {
                const bookTitle = row.cells[1].textContent;
                selectedBooks.push(bookTitle);
            }
        });

        if (selectedBooks.length > 0) {
            showIssueCard(selectedBooks);
        } else {
            alert("Please select at least one book!");
        }
    });

    function showIssueCard(books) {
        // Create the card element
        const card = document.createElement('div');
        card.className = 'issue-card';
        
        card.innerHTML = `
            <h3>Books Issued Successfully!</h3>
            <ul>${books.map(book => `<li>${book}</li>`).join('')}</ul>
            <p>Please return within 14 days.</p>
            <button onclick="this.parentElement.remove()">Close</button>
        `;
        
        document.body.appendChild(card);
    }
});