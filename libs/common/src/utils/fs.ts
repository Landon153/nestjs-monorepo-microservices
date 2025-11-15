import * as fs from 'fs';

export const checkingFolder = async (dir: string): Promise<void> => {
  return new Promise((resolve) => {
    if (fs.existsSync(dir)) resolve();
    else {
      fs.mkdirSync(dir);
      resolve();
    }
  });
};
