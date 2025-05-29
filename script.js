document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply the saved theme
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Simulate typing indicator
    function simulateTyping() {
        const typingIndicator = document.querySelector('.typing-indicator');
        
        // Show typing indicator for 3 seconds every 10 seconds
        setInterval(() => {
            typingIndicator.style.display = 'flex';
            setTimeout(() => {
                typingIndicator.style.display = 'none';
                
                // Add a new received message after typing stops
                const messagesContainer = document.querySelector('.chat-messages');
                const newMessage = document.createElement('div');
                newMessage.className = 'message received';
                newMessage.innerHTML = `
                    <div class="message-content">
                        <p>Just sent you the files. Let me know if you need anything else!</p>
                        <span class="message-time">${getCurrentTime()}</span>
                    </div>
                `;
                messagesContainer.appendChild(newMessage);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 3000);
        }, 10000);
    }
    
    // Get current time in HH:MM AM/PM format
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        return `${hours}:${minutes} ${ampm}`;
    }
    
    // Send message functionality
    const chatInput = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.send-btn');
    
    function sendMessage() {
        const messageText = chatInput.value.trim();
        if (messageText) {
            const messagesContainer = document.querySelector('.chat-messages');
            const newMessage = document.createElement('div');
            newMessage.className = 'message sent';
            newMessage.innerHTML = `
                <div class="message-content">
                    <p>${messageText}</p>
                    <span class="message-time">${getCurrentTime()}</span>
                </div>
            `;
            messagesContainer.appendChild(newMessage);
            chatInput.value = '';
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Simulate reply after 1-3 seconds
            setTimeout(() => {
                simulateReply();
            }, Math.random() * 2000 + 1000);
        }
    }
    
    function simulateReply() {
        const replies = [
            "Thanks for letting me know!",
            "Got it, I'll check it out.",
            "That sounds great!",
            "I appreciate your message.",
            "Let me think about that and get back to you."
        ];
        
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        const messagesContainer = document.querySelector('.chat-messages');
        
        // Show typing indicator
        const typingIndicator = document.querySelector('.typing-indicator');
        typingIndicator.style.display = 'flex';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // After 2 seconds, hide typing and show reply
        setTimeout(() => {
            typingIndicator.style.display = 'none';
            
            const newMessage = document.createElement('div');
            newMessage.className = 'message received';
            newMessage.innerHTML = `
                <div class="message-content">
                    <p>${randomReply}</p>
                    <span class="message-time">${getCurrentTime()}</span>
                </div>
            `;
            messagesContainer.appendChild(newMessage);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 2000);
    }
    
    // Event listeners for sending messages
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Initialize typing simulation
    simulateTyping();
});