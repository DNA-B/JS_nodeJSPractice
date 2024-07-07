/* argv
PS C:\Users\DNA\DEV\nodejs-crash\demo> node .\processDemo.js import
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\DNA\\DEV\\nodejs-crash\\demo\\processDemo.js',
  'import'
]*/
console.log(process.argv);

// process.env
console.log(process.env);

// process.LOGNAME
console.log(process.env.LOGNAME);

// pid --> print 43380
console.log(process.pid);

// cwd() --> C:\Users\DNA\DEV\nodejs-crash\demo
console.log(process.cwd());

// title --> C:\WINDOWS\System32\WindowsPowerShell\v1.0\powershell.exe
console.log(process.title);

/* memoryUsage()
{
  rss: 27459584,
  heapTotal: 4890624,
  heapUsed: 4476008,
  external: 1699535,
  arrayBuffers: 11670
} */
console.log(process.memoryUsage());

// uptime() --> print 0.0484557
console.log(process.uptime());

// process event listener
process.on("exit", (code) => {
    console.log(`About to exit with code : ${code}`);
});

// exit()
process.exit(0);
