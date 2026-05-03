// articles/how-ai-works.js
const ARTICLE_how_ai_works = {
  id: "how-ai-works",
  title: "How AI Really Understands Your Text",
  subtitle: "It is not magic. It is math, probability, and a lot of pattern matching. Here is what actually happens when you type a prompt.",
  category: "Tools",
  author: "Shivansh Bansal",
  date: "May 2026",
  readTime: "5 min read",
  featured: false,
  cover: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop",
  content: `
<p>You type a question into an AI chat. A second later, you get a response that sounds like a human wrote it. The whole thing feels like magic. It is not. It is probability, matrix multiplication, and some very clever engineering.</p>

<p>Here is what actually happens behind the screen when an AI reads your text and writes back. No hype. No anthropomorphism. Just the mechanics.</p>

<h2>The First Step: Turning Words Into Numbers</h2>

<p>AI does not read words. It reads numbers. Every piece of text you type gets converted into numerical representations called tokens. A token is roughly a word or a piece of a word. The sentence "I love programming" might become three tokens: ["I", "love", "programming"]. But an unusual word like "tokenization" might split into ["token", "iz", "ation"].</p>

<p>Each token maps to a unique number in the model's vocabulary. Modern models have vocabularies of 50,000 to 200,000 tokens. This mapping is called a tokenizer, and it is the first layer of translation between human language and machine language.</p>

<pre><code>Input: "How does AI work?"
Tokens: ["How", " does", " AI", " work", "?"]
Token IDs: [1847, 821, 332, 2091, 29]</code></pre>

<p>The tokenizer is not universal. Different models use different tokenizers. That is why you sometimes see weird splitting behavior with uncommon words or code snippets. The model learned patterns based on how its specific tokenizer breaks text apart.</p>

<h2>Embeddings: Where Meaning Becomes Geometry</h2>

<p>Token IDs are just labels. The number 332 for "AI" does not carry any meaning by itself. So each token ID gets converted into an embedding: a dense vector of hundreds or thousands of floating point numbers.</p>

<p>Think of an embedding as a coordinate in a very high dimensional space. Words with similar meanings end up closer together in this space. "King" and "queen" are nearby. "Paris" and "France" are nearby. This is not hardcoded. The model learned these relationships during training by reading billions of documents.</p>

<blockquote>Embeddings are not understanding. They are statistical correlations that happen to align with human intuition about meaning. The model does not "know" what a king is. It just knows that "king" appears in contexts mathematically similar to "queen", "crown", and "throne".</blockquote>

<p>The famous result everyone cites: if you take the vector for "king", subtract "man", and add "woman", you get something very close to "queen". This works because the model captured semantic relationships as geometric operations. But it breaks down fast for anything more nuanced than analogies.</p>

<h2>Attention: The Mechanism That Reads Context</h2>

<p>Here is where it gets interesting. A bag of embeddings tells you nothing about word order or relationships. "The dog bit the man" and "The man bit the dog" have the same words but completely different meanings.</p>

<p>Modern AI uses an architecture called the transformer. The key innovation is self-attention. For every token in your input, the model asks: how much should I pay attention to every other token when processing this one?</p>

<p>When processing the word "it" in "The cat sat on the mat because it was tired", attention weights will strongly connect "it" back to "cat". When the sentence is "The cat sat on the mat because it was soft", "it" connects more to "mat". The model figures this out from patterns it saw during training.</p>

<pre><code>Simplified attention flow for "The cat was hungry so it ate":

"it" ───→ "cat"   (weight: 0.72)
"it" ───→ "The"   (weight: 0.03)
"it" ───→ "was"   (weight: 0.08)
"it" ───→ "hungry" (weight: 0.12)
"it" ───→ "so"    (weight: 0.05)</code></pre>

<p>Attention happens in parallel across all tokens, across multiple "heads" that each focus on different kinds of relationships. One head might track pronoun references. Another might track subject-verb agreement. Another might track negation. The model learns what to track automatically.</p>

<h2>The Prediction Machine: Next Token, Every Time</h2>

<p>After your input passes through the embedding layer, the attention layers, and several feed-forward neural network layers, the model produces a probability distribution over its entire vocabulary for the next token.</p>

<p>That is it. The entire model is a next-token predictor. It does not plan out a full response and then write it. It generates one token at a time, feeds that token back into itself, and repeats until it decides to stop.</p>

<pre><code>Input:  "The capital of France is"
Output probabilities (top 5):
  "Paris"      → 0.847
  "Lyon"       → 0.032
  "a"          → 0.021
  "called"     → 0.018
  "known"      → 0.011</code></pre>

<p>This is why AI can sound confident while being completely wrong. It is optimizing for what sounds plausible, not for what is true. If the training data contained a lot of incorrect information stated confidently, the model learned to reproduce that pattern.</p>

<h2>Temperature: Controlled Randomness</h2>

<p>The probability distribution above does not always pick the highest probability token. That parameter is called temperature, and it controls how deterministic or creative the output is.</p>

<p>At temperature 0, the model always picks the most likely token. The output is consistent but can feel robotic. At higher temperatures like 0.7 or 1.0, lower probability tokens sometimes get selected. This introduces variety but also increases the chance of nonsense.</p>

<ul>
<li><strong>Temperature 0.1–0.3</strong>: Predictable, safe, good for code and factual answers</li>
<li><strong>Temperature 0.5–0.7</strong>: Balanced, most default settings land here</li>
<li><strong>Temperature 0.8–1.2</strong>: Creative, varied, more prone to hallucination</li>
</ul>

<p>There is also top-p sampling (nucleus sampling), which restricts the model to only consider tokens whose cumulative probability reaches a threshold. This prevents the model from picking extremely unlikely tokens while still allowing variation.</p>

<h2>Training: Where the Model Learns Everything</h2>

<p>None of this works without training. A transformer starts with random weights. It knows nothing. Training involves showing it billions of examples and adjusting the weights to minimize prediction errors.</p>

<p>The process has stages:</p>

<ol>
<li><strong>Pre-training</strong>: The model reads massive amounts of text (hundreds of billions of tokens) and learns to predict the next token. This is where it picks up grammar, facts, reasoning patterns, and biases. This costs millions of dollars in compute.</li>
<li><strong>Fine-tuning</strong>: The pre-trained model gets additional training on specific datasets to improve behavior on particular tasks like following instructions or writing code.</li>
<li><strong>Alignment</strong>: Techniques like RLHF (Reinforcement Learning from Human Feedback) tune the model to produce helpful, harmless outputs. This is why models refuse certain requests and try to be polite.</li>
</ol>

<blockquote>The model does not learn during your conversation. When an AI remembers something from earlier in a chat, it is just attending to those tokens in the context window. The weights are frozen. The model does not get smarter from talking to you.</blockquote>

<h2>Context Window: The Memory Limit</h2>

<p>Every model has a context window: a maximum number of tokens it can process at once. This includes both your input and the generated output. Once the window fills up, earlier tokens effectively disappear from the model's attention.</p>

<p>Modern models support context windows from 4,096 to over 200,000 tokens. But longer context does not always mean better recall. Models tend to pay more attention to the beginning and end of long inputs, a phenomenon called the "lost in the middle" problem. Important information buried in the center of a 100,000 token document may get less attention than information at the edges.</p>

<h2>Why AI Hallucinates</h2>

<p>Hallucination is not a bug. It is an inevitable consequence of how the model works. The model generates text by predicting what tokens are likely to come next based on patterns in its training data. When it does not know something, it does not say "I do not know". It generates whatever text looks most plausible given the patterns it learned.</p>

<p>If the training data contained many examples of confident-sounding answers to specific questions, the model learned that pattern. It does not have a separate truth-checking module. Every output is just the next most probable token sequence.</p>

<p>This is why asking an AI to cite sources often produces fake citations. The model learned that academic text includes citations formatted a certain way, so it generates citations that look right without checking if the papers actually exist.</p>

<h2>What AI Is Not Doing</h2>

<p>It helps to understand what is not happening:</p>

<ul>
<li><strong>It is not thinking</strong>: There is no internal monologue or conscious deliberation. It is matrix multiplication and softmax.</li>
<li><strong>It is not understanding</strong>: It has no concept of truth, meaning, or reality. It only knows statistical patterns in text.</li>
<li><strong>It is not remembering</strong>: Each request is processed independently. The conversation history is just text in the context window.</li>
<li><strong>It is not learning from you</strong>: Your interactions do not update the model weights in real time.</li>
</ul>

<p>None of this diminishes what AI can do. It is remarkable that statistical pattern matching on text can produce useful code, coherent essays, and working solutions to real problems. But knowing how it actually works helps you use it better and catch it when it is wrong.</p>

<h2>Using AI More Effectively</h2>

<p>Now that you know the mechanics, here is what actually works:</p>

<ul>
<li><strong>Be specific in prompts</strong>: The model predicts based on context. More specific context narrows the probability distribution toward what you want.</li>
<li><strong>Provide examples</strong>: Few-shot prompting works because the model conditions its predictions on the pattern your examples establish.</li>
<li><strong>Ask for reasoning</strong>: Prompting the model to "think step by step" works because it generates intermediate tokens that constrain subsequent predictions toward more accurate answers.</li>
<li><strong>Verify important facts</strong>: The model has no truth verification. Cross-check anything that matters.</li>
<li><strong>Use lower temperature for code and facts</strong>: You want the most probable correct answer, not a creative variation.</li>
</ul>

<p>AI is a tool built on probability, not intelligence. Treat it like a very fast autocomplete trained on the internet, and you will get far better results than if you treat it like an oracle.</p>
  `
};
