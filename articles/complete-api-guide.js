var ARTICLE_complete_api_guide = {
  id: "complete-api-guide",
  title: "APIs Explained: From Zero to Building Your Own",
  subtitle: "What APIs are, how they work, and how to build one in Python, C, and JavaScript — all in one guide.",
  category: "Dev",
  author: "Shivansh Bansal",
  date: "May 2025",
  readTime: "15 min read",
  featured: false,
  cover: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1200&auto=format&fit=crop",
  content: `
<p>Everyone talks about APIs. "Just use the API." "We have an API for that." "The API is down." But nobody stops to explain what one actually is in plain English. This guide does that — and then shows you how to build one yourself in three different languages.</p>

<h2>What is an API, Actually?</h2>
<p>API stands for Application Programming Interface. Ignore the jargon. Here is the real explanation:</p>

<p>Imagine you are at a restaurant. You don't walk into the kitchen and cook your own food. You tell the waiter what you want, the waiter goes to the kitchen, and the kitchen sends back your food. You never see what happens in the kitchen. You don't need to.</p>

<p>An API is the waiter. You send a request, something happens behind the scenes, and you get a response back. You don't need to know how the other side works internally.</p>

<p>When you log into an app using Google, that app is calling Google's API. When a weather app shows your local forecast, it is calling a weather API. When you pay with a card online, a payment API is running in the background.</p>

<h2>How APIs Communicate — HTTP Basics</h2>
<p>Most modern APIs talk over HTTP, the same protocol your browser uses to load websites. There are four main actions:</p>
<ul>
  <li><strong>GET</strong> — fetch data ("give me the user with id 5")</li>
  <li><strong>POST</strong> — send new data ("create a new user")</li>
  <li><strong>PUT</strong> — update existing data ("change this user's name")</li>
  <li><strong>DELETE</strong> — remove data ("delete this user")</li>
</ul>

<p>The API responds with a status code and usually a JSON body. Common status codes:</p>
<pre><code>200 OK           → worked fine
201 Created      → new resource made
400 Bad Request  → you sent something wrong
401 Unauthorized → you need to authenticate
404 Not Found    → resource doesn't exist
500 Server Error → something broke on their end</code></pre>

<h2>What is JSON?</h2>
<p>JSON is the language APIs use to send data back and forth. It looks like this:</p>
<pre><code>{
  "name": "Shivansh",
  "age": 22,
  "skills": ["C", "Python", "Linux"],
  "active": true
}</code></pre>

<p>It is just structured text. Every language can read and write it. When an API sends you data, it is almost always in this format.</p>

<h2>Building an API in Python</h2>
<p>Python is the easiest starting point. We will use Flask, a lightweight web framework:</p>
<pre><code>pip install flask</code></pre>

<p>Create a file called <code>app.py</code>:</p>
<pre><code>from flask import Flask, jsonify, request

app = Flask(__name__)

# In-memory database (just a list for now)
users = [
    {"id": 1, "name": "Shivansh", "lang": "C"},
    {"id": 2, "name": "Aditya",   "lang": "Python"},
]

# GET all users
@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(users)

# GET one user by id
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = next((u for u in users if u['id'] == user_id), None)
    if user is None:
        return jsonify({"error": "Not found"}), 404
    return jsonify(user)

# POST create a new user
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = {
        "id": len(users) + 1,
        "name": data['name'],
        "lang": data.get('lang', 'unknown')
    }
    users.append(new_user)
    return jsonify(new_user), 201

# DELETE a user
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    global users
    users = [u for u in users if u['id'] != user_id]
    return jsonify({"message": "Deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)</code></pre>

<p>Run it:</p>
<pre><code>python app.py</code></pre>

<p>Test it with curl:</p>
<pre><code># Get all users
curl http://localhost:5000/users

# Get user with id 1
curl http://localhost:5000/users/1

# Create a new user
curl -X POST http://localhost:5000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Ravi","lang":"JavaScript"}'

# Delete user with id 2
curl -X DELETE http://localhost:5000/users/2</code></pre>

<blockquote>Flask is perfect for learning and small projects. For production Python APIs, look into FastAPI — it is faster, has automatic documentation, and validates data automatically.</blockquote>

<h2>Building an API in JavaScript (Node.js)</h2>
<p>Node.js with Express is the most popular API stack in the world. Install it:</p>
<pre><code>npm init -y
npm install express</code></pre>

<p>Create <code>server.js</code>:</p>
<pre><code>const express = require('express');
const app = express();
app.use(express.json());

let users = [
  { id: 1, name: 'Shivansh', lang: 'C' },
  { id: 2, name: 'Aditya',   lang: 'Python' },
];

// GET all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET one user
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
});

// POST create user
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    lang: req.body.lang || 'unknown'
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// DELETE user
app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.json({ message: 'Deleted' });
});

app.listen(3000, () => console.log('API running on port 3000'));</code></pre>

<p>Run it:</p>
<pre><code>node server.js</code></pre>

<p>The curl commands are identical to the Python example, just change port 5000 to 3000.</p>

<h2>Building an API in C</h2>
<p>C has no built-in HTTP server so we use a library called <strong>libmicrohttpd</strong>. This is closer to how real embedded and systems APIs work.</p>

<p>Install on Termux or Linux:</p>
<pre><code># Termux
pkg install libmicrohttpd

# Debian/Ubuntu
apt install libmicrohttpd-dev</code></pre>

<p>Create <code>api.c</code>:</p>
<pre><code>#include &lt;microhttpd.h&gt;
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;stdlib.h&gt;

#define PORT 8888

static enum MHD_Result
handle_request(void *cls,
               struct MHD_Connection *connection,
               const char *url,
               const char *method,
               const char *version,
               const char *upload_data,
               size_t *upload_data_size,
               void **con_cls)
{
    const char *response_str;
    int status = MHD_HTTP_OK;

    if (strcmp(url, "/hello") == 0 && strcmp(method, "GET") == 0) {
        response_str = "{\"message\": \"Hello from C API!\"}";
    } else if (strcmp(url, "/status") == 0) {
        response_str = "{\"status\": \"running\", \"lang\": \"C\"}";
    } else {
        response_str = "{\"error\": \"Not found\"}";
        status = MHD_HTTP_NOT_FOUND;
    }

    struct MHD_Response *response = MHD_create_response_from_buffer(
        strlen(response_str),
        (void *)response_str,
        MHD_RESPMEM_PERSISTENT
    );

    MHD_add_response_header(response, "Content-Type", "application/json");
    int ret = MHD_queue_response(connection, status, response);
    MHD_destroy_response(response);
    return ret;
}

int main() {
    struct MHD_Daemon *daemon = MHD_start_daemon(
        MHD_USE_SELECT_INTERNALLY,
        PORT, NULL, NULL,
        &handle_request, NULL,
        MHD_OPTION_END
    );

    if (daemon == NULL) {
        fprintf(stderr, "Failed to start server\n");
        return 1;
    }

    printf("C API running on port %d\n", PORT);
    printf("Press Enter to stop...\n");
    getchar();

    MHD_stop_daemon(daemon);
    return 0;
}</code></pre>

<p>Compile and run:</p>
<pre><code>clang api.c -o api -lmicrohttpd
./api</code></pre>

<p>Test it:</p>
<pre><code>curl http://localhost:8888/hello
curl http://localhost:8888/status</code></pre>

<blockquote>The C API is intentionally simple — no dynamic user list, no POST handling. C shines for high-performance APIs in embedded systems, game servers, and network daemons where you need total control over memory and speed. For a full REST API with POST/DELETE, you would manage your own string parsing and memory allocation.</blockquote>

<h2>Consuming an API (Reading Data From One)</h2>
<p>Building is one side. The other side is calling someone else's API. Here is how to do it in each language:</p>

<p><strong>Python:</strong></p>
<pre><code>import requests

response = requests.get('https://api.github.com/users/IamShivanshCoder')
data = response.json()
print(data['name'])
print(data['public_repos'])</code></pre>

<p><strong>JavaScript (browser or Node):</strong></p>
<pre><code>fetch('https://api.github.com/users/IamShivanshCoder')
  .then(res => res.json())
  .then(data => {
    console.log(data.name);
    console.log(data.public_repos);
  });</code></pre>

<p><strong>C (using libcurl):</strong></p>
<pre><code>#include &lt;curl/curl.h&gt;
#include &lt;stdio.h&gt;

int main() {
    CURL *curl = curl_easy_init();
    if (curl) {
        curl_easy_setopt(curl, CURLOPT_URL,
            "https://api.github.com/users/IamShivanshCoder");
        curl_easy_setopt(curl, CURLOPT_USERAGENT, "termuxlab/1.0");
        curl_easy_perform(curl);
        curl_easy_cleanup(curl);
    }
    return 0;
}</code></pre>

<h2>Key Concepts to Know Before You Ship</h2>
<ul>
  <li><strong>Authentication</strong> — most real APIs require an API key or token in the request header: <code>Authorization: Bearer YOUR_TOKEN</code></li>
  <li><strong>Rate limiting</strong> — APIs limit how many requests you can make per minute to prevent abuse</li>
  <li><strong>CORS</strong> — when a browser calls an API from a different domain, the API must explicitly allow it</li>
  <li><strong>Versioning</strong> — good APIs version their endpoints: <code>/api/v1/users</code> so old clients don't break when you update</li>
</ul>

<h2>Which Language Should You Use?</h2>
<ul>
  <li><strong>Python</strong> — best for learning, scripting, data APIs, and rapid prototyping</li>
  <li><strong>JavaScript/Node</strong> — best for web backends, real-time apps, and when your frontend is also JS</li>
  <li><strong>C</strong> — best for embedded systems, game servers, and performance-critical network services</li>
</ul>

<p>The concepts are identical across all three. Routes, methods, status codes, JSON — once you understand them in one language you understand them everywhere. The syntax is the only thing that changes.</p>
`
};
