import fs from 'fs';

function listAllRecursive(dir: string) {
    fs.promises.readdir(dir).then(async (files: string[]) => {
        for(let filename of files) {
            const stat = await fs.promises.stat(`${dir}/${filename}`)
            const extension = getExtension(filename)
            if (stat.isDirectory()) {
                listAllRecursive(`${dir}/${filename}`)
            } else if (stat.isFile() && extension === 'ts') {
                console.log(filename)
            }
        }
    })
}

function getExtension(filename: string) {
    return filename.split('.').pop();
}

listAllRecursive('/Users/christy/Desktop/Code/Tecky-Exercise/Modual2/M2L3_Promise')