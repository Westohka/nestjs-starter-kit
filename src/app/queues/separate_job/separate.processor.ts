import { Job, DoneCallback } from 'bull';

async function start(job: Job, cb: DoneCallback): Promise<void> {
  console.log(`[${process.pid}] ${JSON.stringify(job.data)}`);
  cb(null, null);
}

export default function (job: Job, cb: DoneCallback) {
  start(job, cb);
}
