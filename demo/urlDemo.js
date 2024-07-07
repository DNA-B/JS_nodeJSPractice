import url from "url";

const urlString = "https://www.google.com/search?q=hello+world";

/* URL Object
URL {
  href: 'https://www.google.com/search?q=hello+world',
  origin: 'https://www.google.com',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'www.google.com',
  hostname: 'www.google.com',
  port: '',
  pathname: '/search',
  search: '?q=hello+world',
  searchParams: URLSearchParams { 'q' => 'hello world' },
  hash: ''
} s*/
const urlObj = new URL(urlString);
// console.log(urlObj);
// console.log(urlObj.hostname);

// format() --> print String type 'https://www.google.com/search?q=hello+world'
console.log(url.format(urlObj));

// import.meta.url --> print file URL 'file:///C:/Users/DNA/DEV/nodejs-crash/urlDemo.js'
console.log(import.meta.url);

// fileURLToPath() --> print convert file URL to Path 'C:\Users\DNA\DEV\nodejs-crash\urlDemo.js'
console.log(url.fileURLToPath(import.meta.url));

// URLsearchParams() --> print URLSearchParams { 'q' => 'hello world' }
const params = new URLSearchParams(urlObj.search);
console.log(params);
// print 'hello world'
console.log(params.get("q"));

// append() --> print URLSearchParams { 'q' => 'hello world', 'limit' => '5' }
params.append("limit", "5");
console.log(params);

// delete() --> print URLSearchParams { 'q' => 'hello world' }
params.delete("limit");
console.log(params);
