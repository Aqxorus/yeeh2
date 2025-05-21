import { glob } from 'glob';
import path from 'path';

async function deleteCachedFile(file: any) {
  const filePath = path.resolve(file);

  if (require.cache[filePath]) {
    delete require.cache[filePath];
  }
}

async function loadFiles(dirName: any) {
  try {
    const files = await glob(
      path.join(process.cwd(), dirName, '**/*.ts').replace(/\\/g, '/')
    );
    const tsFiles = files.filter((file) => path.extname(file) === '.ts');

    await Promise.all(tsFiles.map(deleteCachedFile));
  } catch (err) {
    console.error('Error loading files:', err);
    throw err;
  }
}

export { loadFiles };
