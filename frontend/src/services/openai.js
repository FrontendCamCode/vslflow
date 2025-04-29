// This file will contain the OpenAI API integration
// Note: You'll need to add your OpenAI API key to the .env file as REACT_APP_OPENAI_API_KEY

import OpenAI from 'openai';

// Initialize the OpenAI client
const initializeOpenAI = () => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('OpenAI API key not found. Please add REACT_APP_OPENAI_API_KEY to your .env file.');
    return null;
  }
  
  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true // Note: In a production environment, API calls should be made from the backend
  });
};

/**
 * Generate script content using OpenAI
 * @param {string} prompt - The prompt for OpenAI
 * @returns {Promise<string>} - The generated content
 */
export const generateScriptContent = async (prompt) => {
  try {
    const openai = initializeOpenAI();
    
    if (!openai) {
      throw new Error('OpenAI client not initialized');
    }
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4', // or 'gpt-3.5-turbo' for a less expensive option
      messages: [
        { 
          role: 'system', 
          content: 'You are a professional VSL (Video Sales Letter) script writer. Write compelling, persuasive content that is concise and focused.' 
        },
        { 
          role: 'user', 
          content: prompt 
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });
    
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating content with OpenAI:', error);
    throw error;
  }
};

export default {
  generateScriptContent
};