import os from "os";

/*
userInfo()
{
  uid: -1,
  gid: -1,
  username: 'DNA',
  homedir: 'C:\\Users\\DNA',
  shell: null
}
*/
console.log(os.userInfo());
// console.log(os.userInfo().username);

// totalmem() --> print 16415313920 (byte)
console.log(os.totalmem());

// freemem() --> print 1683087360 (byte)
console.log(os.freemem());

/*  cpus()
[
  {
    model: 'AMD Ryzen 7 7840HS w/ Radeon 780M Graphics     ',
    speed: 3793,
    times: { user: 33437, nice: 0, sys: 149515, idle: 70368031, irq: 3015 }
  },
  {
    model: 'AMD Ryzen 7 7840HS w/ Radeon 780M Graphics     ',
    speed: 3793,
    times: { user: 21781, nice: 0, sys: 31328, idle: 70497546, irq: 562 }
  },
  .
  .
  .
] */
console.log(os.cpus());
