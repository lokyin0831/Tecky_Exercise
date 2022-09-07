import formidable, { Files } from "formidable"
export const uploadDir = 'uploads'
import express from 'express';

const form = formidable({
    uploadDir: uploadDir,
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
    filter: part => {
        if (part && part.mimetype) {
            // console.log(part)
            const type = part.mimetype
            if (type.startsWith('image/')) {
                return true
            }
        }
        
        return false
    },
    filename: (originalName, originalExt, part, form) => {
        let ext = part.mimetype?.split('/').pop()
        let timestamp = Date.now()
        return `Cls-${timestamp}.${ext}`
    }
})

export const formParse = (req: express.Request) => {
    return new Promise((resolve, reject) => {
        // req.body => fields :36
        form.parse(req, (err, fields, files: Files) => {
            if (err) {
                reject(err)
                return
            }
            const text = fields.text
            let file = Array.isArray(files.image) ? files.image[0] : files.image
            // Get File Name
            const filename = file.newFilename
            resolve({
                filename,
                text
            })
        })
    })
}