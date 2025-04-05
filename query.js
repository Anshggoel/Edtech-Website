// Chatbot functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatMessages = document.getElementById('chatMessages');
const userMessage = document.getElementById('userMessage');
const sendMessageBtn = document.getElementById('sendMessage');

// Toggle chatbot visibility
chatbotToggle.addEventListener('click', () => {
    chatbotContainer.classList.toggle('active');
});

document.querySelector('.close-chat').addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
});

// Send message function
async function sendMessage() {
    const message = userMessage.value.trim();
    if (message) {
        addMessage('user', message);
        userMessage.value = '';
        
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator');
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            // Call AI API for response
            const response = await getAIResponse(message);
            typingIndicator.remove();
            addMessage('ai', response);
        } catch (error) {
            typingIndicator.remove();
            addMessage('ai', "Sorry, I'm having trouble connecting to the AI service.");
            console.error('AI API error:', error);
        }
    }
}

// B.Tech level knowledge base
const studyKnowledgeBase = {
    // Study techniques
    'how to study engineering subjects': 'For engineering subjects: 1) Focus on fundamental concepts 2) Solve numerical problems regularly 3) Create concept maps 4) Relate theory to practical applications',
    'best way to take notes for btech': 'For technical subjects: 1) Use the Cornell system with left column for formulas 2) Highlight key derivations 3) Maintain separate sections for theory and problems 4) Include real-world examples',
    
    // Subject-specific advice
    'how to study mathematics': 'B.Tech math requires: 1) Daily practice of problems 2) Understanding proofs 3) Mastering standard formulas 4) Solving previous year papers',
    'how to study programming': 'For coding subjects: 1) Practice daily on platforms like HackerRank 2) Understand algorithms before implementation 3) Work on mini-projects 4) Learn debugging techniques',
    'how to study theory subjects': 'For subjects like HSS: 1) Create concise notes 2) Use mnemonics 3) Focus on application-based learning 4) Discuss in study groups',
    
    // Exam preparation
    'how to prepare for semester exams': 'B.Tech exam strategy: 1) Start with weightage analysis 2) Solve 5+ years of question papers 3) Focus on lab manuals 4) Create formula sheets',
    'how to score good marks in btech': 'To score well: 1) Attend all labs 2) Maintain regular study hours 3) Clarify doubts immediately 4) Balance theory and practical learning',
    
    // Project and lab work
    'how to do engineering projects': 'Project tips: 1) Choose relevant topics 2) Break into modules 3) Document properly 4) Test thoroughly 5) Prepare good presentations',
    'how to prepare for lab exams': 'Lab exam prep: 1) Practice all experiments 2) Understand procedures 3) Prepare viva answers 4) Review observation records'
};

// Function to get AI response from local knowledge base
async function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check for direct matches
    for (const [question, answer] of Object.entries(studyKnowledgeBase)) {
        if (lowerMessage.includes(question)) {
            return answer;
        }
    }

    // B.Tech specific keywords
    const keywords = {
        'engineering': 'For engineering subjects, focus on conceptual understanding combined with practical application.',
        'btech': 'B.Tech requires balancing theory, labs, and projects. Manage time effectively across all components.',
        'semester': 'Semester exams need systematic preparation - solve previous papers and focus on important topics.',
        'lab': 'Lab work is crucial - document procedures properly and understand the underlying principles.',
        'project': 'Projects demonstrate applied knowledge - choose relevant topics and implement systematically.',
        'programming': 'Coding skills need regular practice - solve problems daily and work on mini-projects.',
        'mathematics': 'Engineering math requires problem-solving practice - focus on applications rather than just theory.'
    };

    for (const [keyword, response] of Object.entries(keywords)) {
        if (lowerMessage.includes(keyword)) {
            return response;
        }
    }

    // Fallback response
    return "I'm a study assistant. Could you ask about study techniques, note-taking, or exam preparation?";
}

// Add message to chat
function addMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Event listeners
sendMessageBtn.addEventListener('click', sendMessage);
userMessage.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Original query form functionality
document.getElementById('queryForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const studentName = document.getElementById('studentName').value.trim();
    const questionText = document.getElementById('question').value.trim();

    if (studentName && questionText) {
        const questionsContainer = document.getElementById('questionsContainer');

        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `<strong>${studentName} asks:</strong> ${questionText}`;

        const answerInput = document.createElement('textarea');
        answerInput.placeholder = 'Write your answer here...';
        answerInput.rows = 2;

        const submitAnswerButton = document.createElement('button');
        submitAnswerButton.textContent = 'Submit Answer';
        submitAnswerButton.addEventListener('click', function () {
            if (answerInput.value.trim()) {
                const answerElement = document.createElement('div');
                answerElement.classList.add('answer');
                answerElement.innerHTML = `
                    ${answerInput.value.trim()}
                    <button class=\"remove-answer\">Remove</button>
                `;
                questionElement.appendChild(answerElement);

                answerElement.querySelector('.remove-answer').addEventListener('click', function () {
                    answerElement.remove();
                });

                answerInput.value = ''; 
            }
        });

        questionElement.appendChild(answerInput);
        questionElement.appendChild(submitAnswerButton);

        questionsContainer.appendChild(questionElement);

        document.getElementById('queryForm').reset();
    }
});
