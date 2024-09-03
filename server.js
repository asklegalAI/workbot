//This is the backend for the chatbot.  
//To use this system:Install the necessary dependencies: (1) `npm install express body-parser natural` (2) Run the server: `node server.js (3) Integrate the React component into your frontend application.
//This implementation provides a basic foundation for answering work law questions. Here are some important notes: 1. The knowledge base is very limited. In a real-world scenario, you'd want to expand this significantly and possibly use a database to store the information.
2. The natural language processing is very simple. For a more robust solution, consider using more advanced NLP techniques or integrating with a service like DialogFlow or IBM Watson.
3. This system does not provide personalized legal advice. Always include a disclaimer that this is for informational purposes only and users should consult with a qualified attorney for specific legal advice.
4. The answers provided are general and may not account for state-specific laws or recent changes in legislation. Regular updates to the knowledge base would be necessary.
5. For enhanced security and scalability, consider implementing rate limiting, input sanitization, and error logging.
6. In a production environment, you'd want to implement proper error handling, logging, and possibly caching for frequently asked questions.//

const express = require('express');
const bodyParser = require('body-parser');
const natural = require('natural');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Simple knowledge base
const knowledgeBase = {
  'minimum wage': 'The federal minimum wage is $7.25 per hour as of 2021. However, many states and some cities have higher minimum wages.',
  'overtime': 'Generally, employees are entitled to overtime pay of at least 1.5 times their regular rate for hours worked over 40 in a workweek.',
  'discrimination': 'It is illegal for an employer to discriminate against a person because of their race, color, religion, sex (including gender identity, sexual orientation, and pregnancy), national origin, age (40 or older), disability or genetic information.',
  'breaks': 'Federal law does not require lunch or coffee breaks. However, when employers do offer short breaks (usually lasting about 5 to 20 minutes), federal law considers the breaks as compensable work hours.',
  'termination': 'Most employment is "at-will," meaning an employer can terminate an employee at any time for any reason, except an illegal one, or for no reason without incurring legal liability.',
  'fmla': 'The Family and Medical Leave Act (FMLA) provides certain employees with up to 12 weeks of unpaid, job-protected leave per year. It also requires that their group health benefits be maintained during the leave.',
};

// Simple NLP to process questions
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

function processQuestion(question) {
  const tokens = tokenizer.tokenize(question.toLowerCase());
  const stems = tokens.map(token => stemmer.stem(token));
  
  for (const [key, value] of Object.entries(knowledgeBase)) {
    if (stems.some(stem => key.includes(stem))) {
      return value;
    }
  }
  
  return "I'm sorry, I don't have specific information about that. Please consult with a qualified employment law attorney for accurate advice.";
}

app.post('/api/work-law-bot', (req, res) => {
  const question = req.body.question;
  const answer = processQuestion(question);
  res.json({ answer });
});

app.listen(port, () => {
  console.log(`Work Law Bot server listening at http://localhost:${port}`);
});
