const headerColors = ['#3D8D7A', '#B3D8A8', '#FBFFE4', '#72BAA9', '#A6CDC6', '#CCC']; 



document.getElementById('fetch-btn').addEventListener('click', fetchTodos);

function fetchTodos() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
            document.getElementById('fetch-btn').style.display = 'none';
            generateAccordion(groupTodosByUserId(data));
        });
}

function groupTodosByUserId(todos) {
    return todos.reduce((acc, todo) => {
        if (!acc[todo.userId]) {
            acc[todo.userId] = [];
        }
        acc[todo.userId].push(todo);
        return acc;
    }, {});
}

function generateAccordion(groupedTodos) {
    const accordionContainer = document.getElementById('accordion-container');
    for (const userId in groupedTodos) {
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';

        const accordionHeader = document.createElement('div');
        accordionHeader.className = 'accordion-header';
        accordionHeader.innerText = `User ID: ${userId}`;
        accordionHeader.style.backgroundColor = headerColors[userId % headerColors.length];
        accordionHeader.addEventListener('click', () => toggleAccordion(accordionContent));

        const accordionContent = document.createElement('div');
        accordionContent.className = 'accordion-content';

        groupedTodos[userId].forEach(todo => {
            const card = document.createElement('div');
            card.className = 'card';

            const title = document.createElement('h4');
            title.innerText = todo.title;

            const completed = document.createElement('input');
            completed.type = 'checkbox';
            completed.checked = todo.completed;

            card.appendChild(title);
            card.appendChild(completed);
            accordionContent.appendChild(card);
        });

        accordionItem.appendChild(accordionHeader);
        accordionItem.appendChild(accordionContent);
        accordionContainer.appendChild(accordionItem);
    }
}

function toggleAccordion(content) {
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
}
