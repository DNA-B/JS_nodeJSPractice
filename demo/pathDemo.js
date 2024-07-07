import path from "path";
import url from "url";

const filePath = "./dir1/dir2/test.txt";

// basename() --> print 'text.txt'
console.log(path.basename(filePath));

// dirname() --> print './dir1/dir2'
console.log(path.dirname(filePath));

// extname() --> print '.txt'
console.log(path.extname(filePath));

/* 
parse()
{
  root: '',
  dir: './dir1/dir2',
  base: 'test.txt',
  ext: '.txt',
  name: 'test'
}
*/
console.log(path.parse(filePath));

// C:\Users\DNA\DEV\nodejs-crash\pathDemo.js
// C:\Users\DNA\DEV\nodejs-crash
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename + "\n" + __dirname);

// join() --> 운영체제별로 path 구분자 다른 것을 알아서 수정해서 join
// C:\Users\DNA\DEV\nodejs-crash\dir1\dir2\test.txt
const filePath2 = path.join(__dirname, "dir1", "dir2", "test.txt");
console.log(filePath2);

// resolve()
// C:\Users\DNA\DEV\nodejs-crash\dir1\dir2\test.txt
const filePath3 = path.resolve(__dirname, "dir1", "dir2", "test.txt");
console.log(filePath3);
