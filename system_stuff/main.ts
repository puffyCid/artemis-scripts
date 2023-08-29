import {
  cpus,
  disks,
  kernelVersion,
  memory,
  osVersion,
  platform,
  uptime,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

function main() {
  const time = uptime();
  const kernel = kernelVersion();
  const os = osVersion();
  const info = platform();
  const disk = disks();
  const mem = memory();
  const cpu = cpus();

  console.log(
    `Uptime: ${time} - Kernel: ${kernel} - OS: ${os} - Platform: ${info}`,
  );
  console.log(
    `Disks Space: ${
      disk[0].total_space
    } - Total Memory: ${mem.total_memory} - CPU Brand: ${cpu[0].brand}`,
  );
}

main();
