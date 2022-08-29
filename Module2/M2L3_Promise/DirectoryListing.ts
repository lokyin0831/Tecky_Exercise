import fs from 'fs';

function listAllTs(dir: string) {
    fs.promises.readdir(dir).then(async (files: string[]) => {
        for(let filename of files) {
            const stat = await fs.promises.stat(`${dir}/${filename}`)
            const extension = getExtension(filename)
            if (stat.isFile() && extension === 'ts') {
                console.log(filename)
            }
        }
    })
}

function getExtension(filename: string) {
    return filename.split('.').pop();
}

listAllTs('/Users/christy/')