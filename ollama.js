const ollama = {
  /**
   * send prompt to ai.
   */
  sendMessage: async (input, { apiKey, model = "mistral" }) => {
    const url = "http://127.0.0.1:11434/api/chat";
    const messages = [{ role: "user", content: input }];
    const data = { model, stream: false, messages };

    console.log(`Prompting Ollama with model: ${model}...`);

    try {
      // Initial request
      const initialResponse = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const initialResult = await initialResponse.json();

      // Don't log the entire response
      if (initialResult.message) {
        return initialResult.message.content;
      } else {
        throw new Error("No message content in Ollama response");
      }
    } catch (err) {
      console.error("Error during AI processing:", err.message);
      throw new Error(`Local model issues. Details: ${err.message}`);
    }
  },

  getPromptForSingleCommit: (
    diff,
    { commitType, customMessageConvention, language }
  ) => {
    return (
      `Write a SHORT and CONCISE git commit message (1-2 lines max) based on the diff below in ${language} language` +
      (commitType ? ` with commit type '${commitType}'. ` : ". ") +
      "Your entire response must be just the commit message, no other text. " +
      "Use the present tense and follow conventional commits format (<type>: <subject>)" +
      `${
        customMessageConvention
          ? `. Additionally apply these JSON formatted rules to your response, even though they might be against previous mentioned rules ${customMessageConvention}: `
          : ": "
      }` +
      "\n\n" +
      diff
    );
  },

  getPromptForMultipleCommits: (
    diff,
    { commitType, customMessageConvention, numOptions, language }
  ) => {
    return (
      `Generate ${numOptions} SHORT and CONCISE git commit message options (each 1-2 lines max) based on the diff below in ${language} language` +
      (commitType ? ` with commit type '${commitType}'. ` : ". ") +
      `Your response must contain exactly ${numOptions} different commit message options separated by semicolons (;). ` +
      "Each message should be distinct and highlight different aspects of the changes. " +
      "For each option, use the present tense and follow conventional commits format (<type in lowercase>: <subject>). " +
      "Do not include any explanations, notes, or other text beyond the commit messages themselves. " +
      `${
        customMessageConvention
          ? `Additionally apply these JSON formatted rules to your response, even though they might be against previously mentioned rules ${customMessageConvention}: `
          : ""
      }` +
      "\n\n" +
      diff
    );
  },
  filterApi: ({ prompt, numCompletion = 1, filterFee }) => {
    //ollama dont have any limits and is free so we dont need to filter anything
    return true;
  },
};

export default ollama;
