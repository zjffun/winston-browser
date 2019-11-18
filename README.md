# winston-browser
A browser for winston.

## Simple Server

Using Loggly like API, see [HTTP/S Event Endpoint](https://www.loggly.com/docs/http-endpoint/), exmaples: 

### Post Event to Server

- ORIGIN: Your origin.
- TOKNE: Any.
- TAGS: Separate each tag by using a comma.

```bash
curl ORIGIN/inputs/TOKEN/tag/TAGS/ -H "content-type:application/x-www-form-urlencoded" -d "{\"message\":\"hello world\", \"from\":\"hoover\"}" 
```

After sending the event, you should see the response ok which indicates we received it.

```json
{"response" : "ok"}
```

eg: 

```bash
curl http://localhost:3000/inputs/my-token/tag/tag1,tag2/ -H "content-type:application/json" --data-binary "{\"message\":\"hello world\", \"from\":\"form hoover\"}"
```

```bash
curl http://localhost:3000/inputs/my-token/tag/tag1,tag2/ -H "content-type:text/plain" -d "hello world from text" 
```

not support..
```bash
curl http://localhost:3000/inputs/my-token/tag/tag1,tag2/ -H "content-type:application/x-www-form-urlencoded" -d "{\"message\":\"hello world\", \"from\":\"form hoover\"}" 
```

### Select Events

Open `ORIGIN` in browser, eg: `http://localhost:3000/`